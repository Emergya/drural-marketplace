from unittest.mock import ANY

import graphene
import pytest
from django.db import IntegrityError, transaction
from django_countries import countries

from .... import __version__
from ....account.models import Address
from ....core.error_codes import ShopErrorCode
from ....core.permissions import get_permissions_codename
from ....product.tests.utils import create_image, create_logo
from ....shipping import PostalCodeRuleInclusionType
from ....shipping.models import ShippingMethod
from ....site.models import ShopGoogleAnalytics, Site
from ...account.enums import CountryCodeEnum
from ...core.utils import str_to_enum
from ...tests.utils import (
    assert_no_permission,
    get_graphql_content,
    get_graphql_content_from_response,
    get_multipart_request_body,
)

COUNTRIES_QUERY = """
    query {
        shop {
            countries%(attributes)s {
                code
                country
            }
        }
    }
"""

LIMIT_INFO_QUERY = """
    {
      shop {
        limits {
          currentUsage {
            channels
          }
          allowedUsage {
            channels
          }
        }
      }
    }
"""


def test_query_countries(user_api_client):
    response = user_api_client.post_graphql(COUNTRIES_QUERY % {"attributes": ""})
    content = get_graphql_content(response)
    data = content["data"]["shop"]
    assert len(data["countries"]) == len(countries)


@pytest.mark.parametrize(
    "language_code, expected_value",
    (
        ("", "Afghanistan"),
        ("(languageCode: EN)", "Afghanistan"),
        ("(languageCode: PL)", "Afganistan"),
        ("(languageCode: DE)", "Afghanistan"),
    ),
)
def test_query_countries_with_translation(
    language_code, expected_value, user_api_client
):
    response = user_api_client.post_graphql(
        COUNTRIES_QUERY % {"attributes": language_code}
    )
    content = get_graphql_content(response)
    data = content["data"]["shop"]
    assert len(data["countries"]) == len(countries)
    assert data["countries"][0]["code"] == "AF"
    assert data["countries"][0]["country"] == expected_value


def test_query_name(user_api_client, site_settings):
    query = """
    query {
        shop {
            name
            description
        }
    }
    """
    response = user_api_client.post_graphql(query)
    content = get_graphql_content(response)
    data = content["data"]["shop"]
    assert data["description"] == site_settings.description
    assert data["name"] == site_settings.site.name


def test_query_company_address(user_api_client, site_settings, address):
    query = """
    query {
        shop{
            companyAddress{
                city
                streetAddress1
                postalCode
            }
        }
    }
    """
    site_settings.company_address = address
    site_settings.save()
    response = user_api_client.post_graphql(query)
    content = get_graphql_content(response)
    data = content["data"]["shop"]
    company_address = data["companyAddress"]
    assert company_address["city"] == address.city
    assert company_address["streetAddress1"] == address.street_address_1
    assert company_address["postalCode"] == address.postal_code


def test_query_domain(user_api_client, site_settings, settings):
    query = """
    query {
        shop {
            domain {
                host
                sslEnabled
                url
            }
        }
    }
    """
    response = user_api_client.post_graphql(query)
    content = get_graphql_content(response)
    data = content["data"]["shop"]
    assert data["domain"]["host"] == site_settings.site.domain
    assert data["domain"]["sslEnabled"] == settings.ENABLE_SSL
    assert data["domain"]["url"]


def test_query_languages(settings, user_api_client):
    query = """
    query {
        shop {
            languages {
                code
                language
            }
        }
    }
    """
    response = user_api_client.post_graphql(query)
    content = get_graphql_content(response)
    data = content["data"]["shop"]
    assert len(data["languages"]) == len(settings.LANGUAGES)


def test_query_permissions(staff_api_client):
    query = """
    query {
        shop {
            permissions {
                code
                name
            }
        }
    }
    """
    permissions_codenames = set(get_permissions_codename())
    response = staff_api_client.post_graphql(query)
    content = get_graphql_content(response)
    data = content["data"]["shop"]
    permissions = data["permissions"]
    permissions_codes = {permission.get("code") for permission in permissions}
    assert len(permissions_codes) == len(permissions_codenames)
    for code in permissions_codes:
        assert code in [str_to_enum(code) for code in permissions_codenames]


def test_query_charge_taxes_on_shipping(api_client, site_settings):
    query = """
    query {
        shop {
            chargeTaxesOnShipping
        }
    }"""
    response = api_client.post_graphql(query)
    content = get_graphql_content(response)
    data = content["data"]["shop"]
    charge_taxes_on_shipping = site_settings.charge_taxes_on_shipping
    assert data["chargeTaxesOnShipping"] == charge_taxes_on_shipping


def test_query_digital_content_settings(
    staff_api_client, site_settings, permission_manage_settings
):
    query = """
    query {
        shop {
            automaticFulfillmentDigitalProducts
            defaultDigitalMaxDownloads
            defaultDigitalUrlValidDays
        }
    }"""

    max_download = 2
    url_valid_days = 3
    site_settings.automatic_fulfillment_digital_products = True
    site_settings.default_digital_max_downloads = max_download
    site_settings.default_digital_url_valid_days = url_valid_days
    site_settings.save()

    response = staff_api_client.post_graphql(
        query, permissions=[permission_manage_settings]
    )
    content = get_graphql_content(response)
    data = content["data"]["shop"]
    automatic_fulfillment = site_settings.automatic_fulfillment_digital_products
    assert data["automaticFulfillmentDigitalProducts"] == automatic_fulfillment
    assert data["defaultDigitalMaxDownloads"] == max_download
    assert data["defaultDigitalUrlValidDays"] == url_valid_days


QUERY_RETRIEVE_DEFAULT_MAIL_SENDER_SETTINGS = """
    {
      shop {
        defaultMailSenderName
        defaultMailSenderAddress
      }
    }
"""


def test_query_default_mail_sender_settings(
    staff_api_client, site_settings, permission_manage_settings
):
    site_settings.default_mail_sender_name = "Mirumee Labs Info"
    site_settings.default_mail_sender_address = "hello@example.com"
    site_settings.save(
        update_fields=["default_mail_sender_name", "default_mail_sender_address"]
    )

    query = QUERY_RETRIEVE_DEFAULT_MAIL_SENDER_SETTINGS

    response = staff_api_client.post_graphql(
        query, permissions=[permission_manage_settings]
    )
    content = get_graphql_content(response)

    data = content["data"]["shop"]
    assert data["defaultMailSenderName"] == "Mirumee Labs Info"
    assert data["defaultMailSenderAddress"] == "hello@example.com"


def test_query_default_mail_sender_settings_not_set(
    staff_api_client, site_settings, permission_manage_settings, settings
):
    site_settings.default_mail_sender_name = ""
    site_settings.default_mail_sender_address = None
    site_settings.save(
        update_fields=["default_mail_sender_name", "default_mail_sender_address"]
    )

    settings.DEFAULT_FROM_EMAIL = "default@example.com"

    query = QUERY_RETRIEVE_DEFAULT_MAIL_SENDER_SETTINGS

    response = staff_api_client.post_graphql(
        query, permissions=[permission_manage_settings]
    )
    content = get_graphql_content(response)

    data = content["data"]["shop"]
    assert data["defaultMailSenderName"] == ""
    assert data["defaultMailSenderAddress"] is None


def test_shop_digital_content_settings_mutation(
    staff_api_client, site_settings, permission_manage_settings
):
    query = """
        mutation updateSettings($input: ShopSettingsInput!) {
            shopSettingsUpdate(input: $input) {
                shop {
                    automaticFulfillmentDigitalProducts
                    defaultDigitalMaxDownloads
                    defaultDigitalUrlValidDays
                }
                errors {
                    field,
                    message
                }
            }
        }
    """

    max_downloads = 15
    url_valid_days = 30
    variables = {
        "input": {
            "automaticFulfillmentDigitalProducts": True,
            "defaultDigitalMaxDownloads": max_downloads,
            "defaultDigitalUrlValidDays": url_valid_days,
        }
    }

    assert not site_settings.automatic_fulfillment_digital_products
    response = staff_api_client.post_graphql(
        query, variables, permissions=[permission_manage_settings]
    )
    content = get_graphql_content(response)

    data = content["data"]["shopSettingsUpdate"]["shop"]
    assert data["automaticFulfillmentDigitalProducts"]
    assert data["defaultDigitalMaxDownloads"]
    assert data["defaultDigitalUrlValidDays"]
    site_settings.refresh_from_db()
    assert site_settings.automatic_fulfillment_digital_products
    assert site_settings.default_digital_max_downloads == max_downloads
    assert site_settings.default_digital_url_valid_days == url_valid_days


def test_shop_update_colors(
    staff_api_client, site_settings, permission_manage_settings
):
    query = """
        mutation updateSettings($input: ShopSettingsInput!) {
            shopSettingsUpdate(input: $input) {
                shop {
                    primaryColor
                    secondaryColor
                }
                errors {
                    field,
                    message
                }
            }
        }
    """
    primaryColor = "#7ebc59"
    secondaryColor = "#3f4349"

    variables = {
        "input": {
            "primaryColor": primaryColor,
            "secondaryColor": secondaryColor,
        }
    }
    response = staff_api_client.post_graphql(
        query, variables, permissions=[permission_manage_settings]
    )
    content = get_graphql_content(response)
    data = content["data"]["shopSettingsUpdate"]["shop"]
    assert data["primaryColor"] == primaryColor
    assert data["secondaryColor"] == secondaryColor


def test_shop_update_logo(
    monkeypatch, staff_api_client, site_settings, permission_manage_settings, media_root
):
    query = """
        mutation updateSettings($input: ShopSettingsInput!) {
            shopSettingsUpdate(input: $input) {
                shop {
                    logo{
                        url
                        alt
                    }
                }
                errors {
                    field
                    code
                    message
                }
            }
        }
    """
    try:
        with transaction.atomic():
            image_file, image_name = create_logo("logo")
            variables = {
                "input": {
                    "logo": image_name,
                }
            }
            body = get_multipart_request_body(query, variables, image_file, image_name)
            response = staff_api_client.post_multipart(
                body, permissions=[permission_manage_settings]
            )
            content = get_graphql_content(response)
    except IntegrityError:
        pass

    data = content["data"]["shopSettingsUpdate"]["shop"]
    assert data["logo"]["url"].startswith("http://testserver/media/customization/logo")


def test_shop_update_dashboard_banner(
    monkeypatch, staff_api_client, site_settings, permission_manage_settings, media_root
):
    query = """
        mutation updateSettings($input: ShopSettingsInput!) {
            shopSettingsUpdate(input: $input) {
                shop {
                    dashboardBanner{
                        url
                        alt
                    }
                }
                errors {
                    field,
                    message
                }
            }
        }
    """
    try:
        with transaction.atomic():
            dashboard_banner_file, dashboard_banner_name = create_image(
                "dashboard_banner"
            )

            variables = {
                "input": {
                    "dashboardBanner": dashboard_banner_name,
                }
            }
            body = get_multipart_request_body(
                query,
                variables,
                dashboard_banner_file,
                dashboard_banner_name,
            )
            response = staff_api_client.post_multipart(
                body, permissions=[permission_manage_settings]
            )
            content = get_graphql_content(response)
    except IntegrityError:
        pass

    data = content["data"]["shopSettingsUpdate"]["shop"]
    assert data["dashboardBanner"]["url"].startswith(
        "http://testserver/media/customization/dashboard_banner"
    )


def test_shop_update_storefront_banner(
    monkeypatch, staff_api_client, site_settings, permission_manage_settings, media_root
):
    query = """
        mutation updateSettings($input: ShopSettingsInput!) {
            shopSettingsUpdate(input: $input) {
                shop {
                    storefrontBanner{
                        url
                        alt
                    }
                }
                errors {
                    field,
                    message
                }
            }
        }
    """
    storefront_banner_file, storefront_banner_name = create_image("storefront_banner")

    variables = {
        "input": {
            "storefrontBanner": storefront_banner_name,
        }
    }
    body = get_multipart_request_body(
        query,
        variables,
        storefront_banner_file,
        storefront_banner_name,
    )
    response = staff_api_client.post_multipart(
        body, permissions=[permission_manage_settings]
    )
    content = get_graphql_content(response)
    data = content["data"]["shopSettingsUpdate"]["shop"]
    assert data["storefrontBanner"]["url"].startswith(
        "http://testserver/media/customization/storefront_banner"
    )


def test_shop_settings_mutation(
    staff_api_client, site_settings, permission_manage_settings
):
    query = """
        mutation updateSettings($input: ShopSettingsInput!) {
            shopSettingsUpdate(input: $input) {
                shop {
                    headerText,
                    includeTaxesInPrices,
                    chargeTaxesOnShipping
                }
                errors {
                    field,
                    message
                }
            }
        }
    """
    charge_taxes_on_shipping = site_settings.charge_taxes_on_shipping
    new_charge_taxes_on_shipping = not charge_taxes_on_shipping
    variables = {
        "input": {
            "includeTaxesInPrices": False,
            "headerText": "Lorem ipsum",
            "chargeTaxesOnShipping": new_charge_taxes_on_shipping,
        }
    }
    response = staff_api_client.post_graphql(
        query, variables, permissions=[permission_manage_settings]
    )
    content = get_graphql_content(response)
    data = content["data"]["shopSettingsUpdate"]["shop"]
    assert data["includeTaxesInPrices"] is False
    assert data["headerText"] == "Lorem ipsum"
    assert data["chargeTaxesOnShipping"] == new_charge_taxes_on_shipping
    site_settings.refresh_from_db()
    assert not site_settings.include_taxes_in_prices
    assert site_settings.charge_taxes_on_shipping == new_charge_taxes_on_shipping


MUTATION_UPDATE_DEFAULT_MAIL_SENDER_SETTINGS = """
    mutation updateDefaultSenderSettings($input: ShopSettingsInput!) {
      shopSettingsUpdate(input: $input) {
        shop {
          defaultMailSenderName
          defaultMailSenderAddress
        }
        errors {
          field
          message
        }
      }
    }
"""


def test_update_default_sender_settings(staff_api_client, permission_manage_settings):
    query = MUTATION_UPDATE_DEFAULT_MAIL_SENDER_SETTINGS

    variables = {
        "input": {
            "defaultMailSenderName": "Dummy Name",
            "defaultMailSenderAddress": "dummy@example.com",
        }
    }

    response = staff_api_client.post_graphql(
        query, variables, permissions=[permission_manage_settings]
    )
    content = get_graphql_content(response)

    data = content["data"]["shopSettingsUpdate"]["shop"]
    assert data["defaultMailSenderName"] == "Dummy Name"
    assert data["defaultMailSenderAddress"] == "dummy@example.com"


@pytest.mark.parametrize(
    "sender_name",
    (
        "\nDummy Name",
        "\rDummy Name",
        "Dummy Name\r",
        "Dummy Name\n",
        "Dummy\rName",
        "Dummy\nName",
    ),
)
def test_update_default_sender_settings_invalid_name(
    staff_api_client, permission_manage_settings, sender_name
):
    query = MUTATION_UPDATE_DEFAULT_MAIL_SENDER_SETTINGS

    variables = {"input": {"defaultMailSenderName": sender_name}}

    response = staff_api_client.post_graphql(
        query, variables, permissions=[permission_manage_settings]
    )
    content = get_graphql_content(response)

    errors = content["data"]["shopSettingsUpdate"]["errors"]
    assert errors == [
        {"field": "defaultMailSenderName", "message": "New lines are not allowed."}
    ]


@pytest.mark.parametrize(
    "sender_email",
    (
        "\ndummy@example.com",
        "\rdummy@example.com",
        "dummy@example.com\r",
        "dummy@example.com\n",
        "dummy@example\r.com",
        "dummy@example\n.com",
    ),
)
def test_update_default_sender_settings_invalid_email(
    staff_api_client, permission_manage_settings, sender_email
):
    query = MUTATION_UPDATE_DEFAULT_MAIL_SENDER_SETTINGS

    variables = {"input": {"defaultMailSenderAddress": sender_email}}

    response = staff_api_client.post_graphql(
        query, variables, permissions=[permission_manage_settings]
    )
    content = get_graphql_content(response)

    errors = content["data"]["shopSettingsUpdate"]["errors"]
    assert errors == [
        {"field": "defaultMailSenderAddress", "message": "Enter a valid email address."}
    ]


def test_shop_domain_update(staff_api_client, permission_manage_settings):
    query = """
        mutation updateSettings($input: SiteDomainInput!) {
            shopDomainUpdate(input: $input) {
                shop {
                    name
                    domain {
                        host,
                    }
                }
            }
        }
    """
    new_name = "saleor test store"
    variables = {"input": {"domain": "lorem-ipsum.com", "name": new_name}}
    site = Site.objects.get_current()
    assert site.domain != "lorem-ipsum.com"
    response = staff_api_client.post_graphql(
        query, variables, permissions=[permission_manage_settings]
    )
    content = get_graphql_content(response)
    data = content["data"]["shopDomainUpdate"]["shop"]
    assert data["domain"]["host"] == "lorem-ipsum.com"
    assert data["name"] == new_name
    site.refresh_from_db()
    assert site.domain == "lorem-ipsum.com"
    assert site.name == new_name


MUTATION_CUSTOMER_SET_PASSWORD_URL_UPDATE = """
    mutation updateSettings($customerSetPasswordUrl: String!) {
        shopSettingsUpdate(input: {customerSetPasswordUrl: $customerSetPasswordUrl}){
            shop {
                customerSetPasswordUrl
            }
            errors {
                message
                field
                code
            }
        }
    }
"""


def test_shop_customer_set_password_url_update(
    staff_api_client, site_settings, permission_manage_settings
):
    customer_set_password_url = "http://www.example.com/set_pass/"
    variables = {"customerSetPasswordUrl": customer_set_password_url}
    assert site_settings.customer_set_password_url != customer_set_password_url
    response = staff_api_client.post_graphql(
        MUTATION_CUSTOMER_SET_PASSWORD_URL_UPDATE,
        variables,
        permissions=[permission_manage_settings],
    )
    content = get_graphql_content(response)
    data = content["data"]["shopSettingsUpdate"]
    assert not data["errors"]
    site_settings = Site.objects.get_current().settings
    assert site_settings.customer_set_password_url == customer_set_password_url


@pytest.mark.parametrize(
    "customer_set_password_url",
    [
        ("http://not-allowed-storefron.com/pass"),
        ("http://[value-error-in-urlparse@test/pass"),
        ("without-protocole.com/pass"),
    ],
)
def test_shop_customer_set_password_url_update_invalid_url(
    staff_api_client,
    site_settings,
    permission_manage_settings,
    customer_set_password_url,
):
    variables = {"customerSetPasswordUrl": customer_set_password_url}
    assert not site_settings.customer_set_password_url
    response = staff_api_client.post_graphql(
        MUTATION_CUSTOMER_SET_PASSWORD_URL_UPDATE,
        variables,
        permissions=[permission_manage_settings],
    )
    content = get_graphql_content(response)
    data = content["data"]["shopSettingsUpdate"]
    assert data["errors"][0] == {
        "field": "customerSetPasswordUrl",
        "code": ShopErrorCode.INVALID.name,
        "message": ANY,
    }
    site_settings.refresh_from_db()
    assert not site_settings.customer_set_password_url


def test_query_default_country(user_api_client, settings):
    settings.DEFAULT_COUNTRY = "US"
    query = """
    query {
        shop {
            defaultCountry {
                code
                country
            }
        }
    }
    """
    response = user_api_client.post_graphql(query)
    content = get_graphql_content(response)
    data = content["data"]["shop"]["defaultCountry"]
    assert data["code"] == settings.DEFAULT_COUNTRY
    assert data["country"] == "United States of America"


AVAILABLE_EXTERNAL_AUTHENTICATIONS_QUERY = """
    query{
        shop {
            availableExternalAuthentications{
                id
                name
            }
        }
    }
"""


@pytest.mark.parametrize(
    "external_auths",
    [
        [{"id": "auth1", "name": "Auth-1"}],
        [{"id": "auth1", "name": "Auth-1"}, {"id": "auth2", "name": "Auth-2"}],
        [],
    ],
)
def test_query_available_external_authentications(
    external_auths, user_api_client, monkeypatch
):
    monkeypatch.setattr(
        "saleor.plugins.manager.PluginsManager.list_external_authentications",
        lambda self, active_only: external_auths,
    )
    query = AVAILABLE_EXTERNAL_AUTHENTICATIONS_QUERY
    response = user_api_client.post_graphql(query)
    content = get_graphql_content(response)
    data = content["data"]["shop"]["availableExternalAuthentications"]
    assert data == external_auths


AVAILABLE_PAYMENT_GATEWAYS_QUERY = """
    query Shop($currency: String){
        shop {
            availablePaymentGateways(currency: $currency) {
                id
                name
            }
        }
    }
"""


def test_query_available_payment_gateways(user_api_client, sample_gateway, channel_EUR):
    query = AVAILABLE_PAYMENT_GATEWAYS_QUERY
    response = user_api_client.post_graphql(query)
    content = get_graphql_content(response)
    data = content["data"]["shop"]["availablePaymentGateways"]
    assert {gateway["id"] for gateway in data} == {
        "mirumee.payments.dummy",
        "sampleDummy.active",
    }
    assert {gateway["name"] for gateway in data} == {
        "Dummy",
        "SampleDummy",
    }


def test_query_available_payment_gateways_specified_currency_EUR1(
    user_api_client, sample_gateway, channel_EUR
):
    query = AVAILABLE_PAYMENT_GATEWAYS_QUERY
    response = user_api_client.post_graphql(query, {"currency": "EUR"})
    content = get_graphql_content(response)
    data = content["data"]["shop"]["availablePaymentGateways"]
    assert {gateway["id"] for gateway in data} == {
        "mirumee.payments.dummy",
        "sampleDummy.active",
    }
    assert {gateway["name"] for gateway in data} == {
        "Dummy",
        "SampleDummy",
    }


def test_query_available_payment_gateways_specified_currency_EUR2(
    user_api_client, sample_gateway, channel_EUR
):
    query = AVAILABLE_PAYMENT_GATEWAYS_QUERY
    response = user_api_client.post_graphql(query, {"currency": "EUR"})
    content = get_graphql_content(response)
    data = content["data"]["shop"]["availablePaymentGateways"]
    assert data[0]["id"] == "mirumee.payments.dummy"
    assert data[0]["name"] == "Dummy"


AVAILABLE_SHIPPING_METHODS_QUERY = """
    query Shop($channel: String!, $address: AddressInput){
        shop {
            availableShippingMethods(channel: $channel, address: $address) {
                id
                name
            }
        }
    }
"""


def test_query_available_shipping_methods_no_address(staff_api_client, channel_EUR):
    # given
    query = AVAILABLE_SHIPPING_METHODS_QUERY

    # when
    response = staff_api_client.post_graphql(query, {"channel": channel_EUR.slug})

    # then
    content = get_graphql_content(response)
    data = content["data"]["shop"]["availableShippingMethods"]
    assert len(data) == 0
    assert {ship_meth["id"] for ship_meth in data} == {
        graphene.Node.to_global_id("ShippingMethod", ship_meth.pk)
        for ship_meth in ShippingMethod.objects.filter(
            shipping_zone__channels__slug=channel_EUR.slug,
            channel_listings__channel__slug=channel_EUR.slug,
        )
    }


def test_query_available_shipping_methods_no_channel_shipping_zones(
    staff_api_client, channel_EUR
):
    # given
    query = AVAILABLE_SHIPPING_METHODS_QUERY
    channel_EUR.shipping_zones.clear()

    # when
    response = staff_api_client.post_graphql(query, {"channel": channel_EUR.slug})

    # then
    content = get_graphql_content(response)
    data = content["data"]["shop"]["availableShippingMethods"]
    assert len(data) == 0


def test_query_available_shipping_methods_for_given_address(
    staff_api_client,
    channel_EUR,
    shipping_method,
    shipping_zone_without_countries,
    address,
):
    # given
    query = AVAILABLE_SHIPPING_METHODS_QUERY
    shipping_method_count = ShippingMethod.objects.count()
    variables = {
        "channel": channel_EUR.slug,
        "address": {"country": CountryCodeEnum.US.name},
    }

    # when
    response = staff_api_client.post_graphql(query, variables)

    # then
    content = get_graphql_content(response)
    data = content["data"]["shop"]["availableShippingMethods"]
    assert len(data) == shipping_method_count - 1
    assert graphene.Node.to_global_id(
        "ShippingMethod", shipping_zone_without_countries.shipping_methods.first().pk
    ) not in {ship_meth["id"] for ship_meth in data}


def test_query_available_shipping_methods_no_address_vatlayer_set(
    staff_api_client,
    shipping_method,
    shipping_method_channel_EUR,
    channel_EUR,
    setup_vatlayer,
):
    # given
    query = AVAILABLE_SHIPPING_METHODS_QUERY

    # when
    response = staff_api_client.post_graphql(query, {"channel": channel_EUR.slug})

    # then
    content = get_graphql_content(response)
    data = content["data"]["shop"]["availableShippingMethods"]
    assert {ship_meth["id"] for ship_meth in data} == {
        graphene.Node.to_global_id("ShippingMethod", ship_meth.pk)
        for ship_meth in ShippingMethod.objects.filter(
            channel_listings__channel__slug=channel_EUR.slug
        )
    }


@pytest.mark.skip(reason="Passed when run inidividualy")
def test_query_available_shipping_methods_for_given_address_vatlayer_set(
    staff_api_client,
    channel_EUR,
    shipping_method,
    shipping_zone_without_countries,
    address,
    setup_vatlayer,
):
    # given
    query = AVAILABLE_SHIPPING_METHODS_QUERY
    shipping_method_count = ShippingMethod.objects.count()
    variables = {
        "channel": channel_EUR.slug,
        "address": {"country": CountryCodeEnum.ES.name},
    }

    # when
    response = staff_api_client.post_graphql(query, variables)

    # then
    content = get_graphql_content(response)
    data = content["data"]["shop"]["availableShippingMethods"]
    assert len(data) == shipping_method_count - 1
    assert graphene.Node.to_global_id(
        "ShippingMethod", shipping_zone_without_countries.pk
    ) in {ship_meth["id"] for ship_meth in data}


def test_query_available_shipping_methods_for_excluded_postal_code(
    staff_api_client, channel_EUR, shipping_method
):
    # given
    query = AVAILABLE_SHIPPING_METHODS_QUERY
    variables = {
        "channel": channel_EUR.slug,
        "address": {"country": CountryCodeEnum.PL.name, "postalCode": "53-601"},
    }
    shipping_method.postal_code_rules.create(
        start="53-600", end="54-600", inclusion_type=PostalCodeRuleInclusionType.EXCLUDE
    )

    # when
    response = staff_api_client.post_graphql(query, variables)

    # then
    content = get_graphql_content(response)
    data = content["data"]["shop"]["availableShippingMethods"]
    assert graphene.Node.to_global_id("ShippingMethod", shipping_method.pk) not in {
        ship_meth["id"] for ship_meth in data
    }


def test_query_available_shipping_methods_for_included_postal_code(
    staff_api_client, channel_EUR, shipping_method
):
    # given
    query = AVAILABLE_SHIPPING_METHODS_QUERY
    variables = {
        "channel": channel_EUR.slug,
        "address": {"country": CountryCodeEnum.PL.name, "postalCode": "53-601"},
    }
    shipping_method.postal_code_rules.create(
        start="53-600", end="54-600", inclusion_type=PostalCodeRuleInclusionType.INCLUDE
    )

    # when
    response = staff_api_client.post_graphql(query, variables)

    # then
    content = get_graphql_content(response)
    data = content["data"]["shop"]["availableShippingMethods"]
    assert graphene.Node.to_global_id("ShippingMethod", shipping_method.pk) in {
        ship_meth["id"] for ship_meth in data
    }


MUTATION_SHOP_ADDRESS_UPDATE = """
    mutation updateShopAddress($input: AddressInput){
        shopAddressUpdate(input: $input){
            errors{
                field
                message
            }
        }
    }
"""


def test_mutation_update_company_address(
    staff_api_client,
    permission_manage_settings,
    address,
    site_settings,
):
    variables = {
        "input": {
            "streetAddress1": address.street_address_1,
            "city": address.city,
            "country": address.country.code,
            "postalCode": address.postal_code,
        }
    }

    response = staff_api_client.post_graphql(
        MUTATION_SHOP_ADDRESS_UPDATE,
        variables,
        permissions=[permission_manage_settings],
    )
    content = get_graphql_content(response)
    assert "errors" not in content["data"]

    site_settings.refresh_from_db()
    assert site_settings.company_address
    assert site_settings.company_address.street_address_1 == address.street_address_1
    assert site_settings.company_address.city == address.city
    assert site_settings.company_address.country.code == address.country.code


def test_mutation_update_company_address_remove_address(
    staff_api_client, permission_manage_settings, site_settings, address
):
    site_settings.company_address = address
    site_settings.save(update_fields=["company_address"])
    variables = {"input": None}

    response = staff_api_client.post_graphql(
        MUTATION_SHOP_ADDRESS_UPDATE,
        variables,
        permissions=[permission_manage_settings],
    )
    content = get_graphql_content(response)
    assert "errors" not in content["data"]

    site_settings.refresh_from_db()
    assert not site_settings.company_address
    assert not Address.objects.filter(pk=address.pk).exists()


def test_mutation_update_company_address_remove_address_without_address(
    staff_api_client, permission_manage_settings, site_settings
):
    variables = {"input": None}

    response = staff_api_client.post_graphql(
        MUTATION_SHOP_ADDRESS_UPDATE,
        variables,
        permissions=[permission_manage_settings],
    )
    content = get_graphql_content(response)
    assert "errors" not in content["data"]

    site_settings.refresh_from_db()
    assert not site_settings.company_address


def test_staff_notification_query(
    staff_api_client,
    staff_user,
    permission_manage_settings,
    staff_notification_recipient,
):
    query = """
        {
            shop {
                staffNotificationRecipients {
                    active
                    email
                    user {
                        firstName
                        lastName
                        email
                    }
                }
            }
        }
    """

    response = staff_api_client.post_graphql(
        query, permissions=[permission_manage_settings]
    )
    content = get_graphql_content(response)

    assert content["data"]["shop"]["staffNotificationRecipients"] == [
        {
            "active": True,
            "email": staff_user.email,
            "user": {
                "firstName": staff_user.first_name,
                "lastName": staff_user.last_name,
                "email": staff_user.email,
            },
        }
    ]


MUTATION_STAFF_NOTIFICATION_RECIPIENT_CREATE = """
    mutation StaffNotificationRecipient ($input: StaffNotificationRecipientInput!) {
        staffNotificationRecipientCreate(input: $input) {
            staffNotificationRecipient {
                active
                email
                user {
                    id
                    firstName
                    lastName
                    email
                }
            }
            errors {
                field
                message
                code
            }
        }
    }
"""


def test_staff_notification_create_mutation(
    staff_api_client, staff_user, permission_manage_settings
):
    user_id = graphene.Node.to_global_id("User", staff_user.id)
    variables = {"input": {"user": user_id}}
    response = staff_api_client.post_graphql(
        MUTATION_STAFF_NOTIFICATION_RECIPIENT_CREATE,
        variables,
        permissions=[permission_manage_settings],
    )
    content = get_graphql_content(response)

    assert content["data"]["staffNotificationRecipientCreate"] == {
        "staffNotificationRecipient": {
            "active": True,
            "email": staff_user.email,
            "user": {
                "id": user_id,
                "firstName": staff_user.first_name,
                "lastName": staff_user.last_name,
                "email": staff_user.email,
            },
        },
        "errors": [],
    }


def test_staff_notification_create_mutation_with_staffs_email(
    staff_api_client, staff_user, permission_manage_settings
):
    user_id = graphene.Node.to_global_id("User", staff_user.id)
    variables = {"input": {"email": staff_user.email}}
    response = staff_api_client.post_graphql(
        MUTATION_STAFF_NOTIFICATION_RECIPIENT_CREATE,
        variables,
        permissions=[permission_manage_settings],
    )
    content = get_graphql_content(response)

    assert content["data"]["staffNotificationRecipientCreate"] == {
        "staffNotificationRecipient": {
            "active": True,
            "email": staff_user.email,
            "user": {
                "id": user_id,
                "firstName": staff_user.first_name,
                "lastName": staff_user.last_name,
                "email": staff_user.email,
            },
        },
        "errors": [],
    }


def test_staff_notification_create_mutation_with_customer_user(
    staff_api_client, customer_user, permission_manage_settings
):
    user_id = graphene.Node.to_global_id("User", customer_user.id)
    variables = {"input": {"user": user_id}}
    response = staff_api_client.post_graphql(
        MUTATION_STAFF_NOTIFICATION_RECIPIENT_CREATE,
        variables,
        permissions=[permission_manage_settings],
    )
    content = get_graphql_content(response)

    assert content["data"]["staffNotificationRecipientCreate"] == {
        "staffNotificationRecipient": None,
        "errors": [
            {"code": "INVALID", "field": "user", "message": "User has to be staff user"}
        ],
    }


def test_staff_notification_create_mutation_with_email(
    staff_api_client, permission_manage_settings, permission_manage_staff
):
    staff_email = "test_email@example.com"
    variables = {"input": {"email": staff_email}}
    response = staff_api_client.post_graphql(
        MUTATION_STAFF_NOTIFICATION_RECIPIENT_CREATE,
        variables,
        permissions=[permission_manage_settings, permission_manage_staff],
    )
    content = get_graphql_content(response)

    assert content["data"]["staffNotificationRecipientCreate"] == {
        "staffNotificationRecipient": {
            "active": True,
            "email": staff_email,
            "user": None,
        },
        "errors": [],
    }


def test_staff_notification_create_mutation_with_empty_email(
    staff_api_client, permission_manage_settings
):
    staff_email = ""
    variables = {"input": {"email": staff_email}}
    response = staff_api_client.post_graphql(
        MUTATION_STAFF_NOTIFICATION_RECIPIENT_CREATE,
        variables,
        permissions=[permission_manage_settings],
    )
    content = get_graphql_content(response)

    assert content["data"]["staffNotificationRecipientCreate"] == {
        "staffNotificationRecipient": None,
        "errors": [
            {
                "code": "INVALID",
                "field": "staffNotification",
                "message": "User and email cannot be set empty",
            }
        ],
    }


MUTATION_STAFF_NOTIFICATION_RECIPIENT_UPDATE = """
    mutation StaffNotificationRecipient (
        $id: ID!,
        $input: StaffNotificationRecipientInput!
    ) {
        staffNotificationRecipientUpdate(id: $id, input: $input) {
            staffNotificationRecipient {
                active
                email
                user {
                    firstName
                    lastName
                    email
                }
            }
            errors {
                field
                message
                code
            }
        }
    }
"""


def test_staff_notification_update_mutation(
    staff_api_client,
    staff_user,
    permission_manage_settings,
    staff_notification_recipient,
):
    old_email = staff_notification_recipient.get_email()
    assert staff_notification_recipient.active
    staff_notification_recipient_id = graphene.Node.to_global_id(
        "StaffNotificationRecipient", staff_notification_recipient.id
    )
    variables = {"id": staff_notification_recipient_id, "input": {"active": False}}
    staff_api_client.post_graphql(
        MUTATION_STAFF_NOTIFICATION_RECIPIENT_UPDATE,
        variables,
        permissions=[permission_manage_settings],
    )
    staff_notification_recipient.refresh_from_db()
    assert not staff_notification_recipient.active
    assert staff_notification_recipient.get_email() == old_email


def test_staff_notification_update_mutation_with_empty_user(
    staff_api_client,
    staff_user,
    permission_manage_settings,
    staff_notification_recipient,
):
    staff_notification_recipient_id = graphene.Node.to_global_id(
        "StaffNotificationRecipient", staff_notification_recipient.id
    )
    variables = {"id": staff_notification_recipient_id, "input": {"user": ""}}
    response = staff_api_client.post_graphql(
        MUTATION_STAFF_NOTIFICATION_RECIPIENT_UPDATE,
        variables,
        permissions=[permission_manage_settings],
    )
    content = get_graphql_content(response)

    staff_notification_recipient.refresh_from_db()
    assert content["data"]["staffNotificationRecipientUpdate"] == {
        "staffNotificationRecipient": None,
        "errors": [
            {
                "code": "INVALID",
                "field": "staffNotification",
                "message": "User and email cannot be set empty",
            }
        ],
    }


def test_staff_notification_update_mutation_with_empty_email(
    staff_api_client,
    staff_user,
    permission_manage_settings,
    staff_notification_recipient,
):
    staff_notification_recipient_id = graphene.Node.to_global_id(
        "StaffNotificationRecipient", staff_notification_recipient.id
    )
    variables = {"id": staff_notification_recipient_id, "input": {"email": ""}}
    response = staff_api_client.post_graphql(
        MUTATION_STAFF_NOTIFICATION_RECIPIENT_UPDATE,
        variables,
        permissions=[permission_manage_settings],
    )
    content = get_graphql_content(response)

    staff_notification_recipient.refresh_from_db()
    assert content["data"]["staffNotificationRecipientUpdate"] == {
        "staffNotificationRecipient": None,
        "errors": [
            {
                "code": "INVALID",
                "field": "staffNotification",
                "message": "User and email cannot be set empty",
            }
        ],
    }


ORDER_SETTINGS_UPDATE_MUTATION = """
    mutation orderSettings($confirmOrders: Boolean!) {
        orderSettingsUpdate(
            input: { automaticallyConfirmAllNewOrders: $confirmOrders }
        ) {
            orderSettings {
                automaticallyConfirmAllNewOrders
            }
        }
    }
"""


def test_order_settings_update_by_staff(
    staff_api_client, permission_manage_orders, site_settings
):
    assert site_settings.automatically_confirm_all_new_orders is True
    staff_api_client.user.user_permissions.add(permission_manage_orders)
    response = staff_api_client.post_graphql(
        ORDER_SETTINGS_UPDATE_MUTATION, {"confirmOrders": False}
    )
    content = get_graphql_content(response)
    response_settings = content["data"]["orderSettingsUpdate"]["orderSettings"]
    assert response_settings["automaticallyConfirmAllNewOrders"] is False
    site_settings.refresh_from_db()
    assert site_settings.automatically_confirm_all_new_orders is False


@pytest.mark.skip(
    reason="this action cannot be performed,\
         because there is no connection between User and App."
)
def test_order_settings_update_by_app(
    app_api_client, permission_manage_orders, site_settings
):
    assert site_settings.automatically_confirm_all_new_orders is True
    app_api_client.app.permissions.set([permission_manage_orders])
    response = app_api_client.post_graphql(
        ORDER_SETTINGS_UPDATE_MUTATION, {"confirmOrders": False}
    )
    content = get_graphql_content(response)
    response_settings = content["data"]["orderSettingsUpdate"]["orderSettings"]
    assert response_settings["automaticallyConfirmAllNewOrders"] is False
    site_settings.refresh_from_db()
    assert site_settings.automatically_confirm_all_new_orders is False


def test_order_settings_update_by_user_without_permissions(
    user_api_client, permission_manage_orders, site_settings
):
    assert site_settings.automatically_confirm_all_new_orders is True
    response = user_api_client.post_graphql(
        ORDER_SETTINGS_UPDATE_MUTATION, {"confirmOrders": False}
    )
    assert_no_permission(response)
    site_settings.refresh_from_db()
    assert site_settings.automatically_confirm_all_new_orders is True


ORDER_SETTINGS_QUERY = """
    query orderSettings {
        orderSettings {
            automaticallyConfirmAllNewOrders
        }
    }
"""


def test_order_settings_query_as_staff(
    staff_api_client, permission_manage_orders, site_settings
):
    assert site_settings.automatically_confirm_all_new_orders is True

    site_settings.automatically_confirm_all_new_orders = False
    site_settings.save(update_fields=["automatically_confirm_all_new_orders"])

    staff_api_client.user.user_permissions.add(permission_manage_orders)
    response = staff_api_client.post_graphql(ORDER_SETTINGS_QUERY)
    content = get_graphql_content(response)

    assert content["data"]["orderSettings"]["automaticallyConfirmAllNewOrders"] is False


def test_order_settings_query_as_user(user_api_client, site_settings):
    response = user_api_client.post_graphql(ORDER_SETTINGS_QUERY)
    assert_no_permission(response)


API_VERSION_QUERY = """
    query {
        shop {
            version
        }
    }
"""


def test_version_query_as_anonymous_user(api_client):
    response = api_client.post_graphql(API_VERSION_QUERY)
    assert_no_permission(response)


def test_version_query_as_customer(user_api_client):
    response = user_api_client.post_graphql(API_VERSION_QUERY)
    content = get_graphql_content_from_response(response)
    assert "errors" not in content, content


def test_version_query_as_app(app_api_client):
    response = app_api_client.post_graphql(API_VERSION_QUERY)
    content = get_graphql_content(response)
    assert content["data"]["shop"]["version"] == __version__


def test_version_query_as_staff_user(staff_api_client):
    response = staff_api_client.post_graphql(API_VERSION_QUERY)
    content = get_graphql_content(response)
    assert content["data"]["shop"]["version"] == __version__


def test_can_get_shop_limit_info_when_not_staff(user_api_client):
    query = LIMIT_INFO_QUERY
    response = user_api_client.post_graphql(query)
    content = get_graphql_content_from_response(response)
    assert "errors" not in content, content


def test_get_shop_limit_info_returns_null_by_default(staff_api_client):
    query = LIMIT_INFO_QUERY
    response = staff_api_client.post_graphql(query)
    content = get_graphql_content(response)
    assert content == {
        "data": {
            "shop": {
                "limits": {
                    "currentUsage": {"channels": None},
                    "allowedUsage": {"channels": None},
                }
            }
        }
    }


GOOGLE_ANALYTICS_SETTINGS_UPDATE_MUTATION = """
    mutation shopSettingsUpdate($input: ShopSettingsInput!) {
        shopSettingsUpdate(input: $input) {
            shop {
                googleAnalytics {
                    id
                    measurementId
                    isActive
                }
            }
        }
    }
"""


def test_google_analytics_settings_update_as_staff(
    staff_api_client, permission_manage_settings, site_settings
):

    with pytest.raises(ShopGoogleAnalytics.DoesNotExist) as e_info:
        site_settings.google_analytics
    assert e_info.value.args[0] == "SiteSettings has no google_analytics."

    staff_api_client.user.user_permissions.add(permission_manage_settings)
    variables = {"input": {"gaTag": {"measurementId": "G-12345", "isActive": True}}}
    response = staff_api_client.post_graphql(
        GOOGLE_ANALYTICS_SETTINGS_UPDATE_MUTATION,
        variables,
    )
    content = get_graphql_content(response)
    response_settings = content["data"]["shopSettingsUpdate"]["shop"]["googleAnalytics"]

    assert response_settings["measurementId"] == "G-12345"
    assert response_settings["isActive"] is True
    site_settings.refresh_from_db()
    assert site_settings.google_analytics.measurement_id == "G-12345"
    assert site_settings.google_analytics.is_active is True


def test_google_analytics_settings_update_as_staff_only_measurement_id(
    staff_api_client, permission_manage_settings, site_settings
):

    with pytest.raises(ShopGoogleAnalytics.DoesNotExist) as e_info:
        site_settings.google_analytics
    assert e_info.value.args[0] == "SiteSettings has no google_analytics."

    staff_api_client.user.user_permissions.add(permission_manage_settings)
    variables = {
        "input": {
            "gaTag": {
                "measurementId": "G-12345",
            }
        }
    }
    response = staff_api_client.post_graphql(
        GOOGLE_ANALYTICS_SETTINGS_UPDATE_MUTATION,
        variables,
    )
    content = get_graphql_content(response)
    response_settings = content["data"]["shopSettingsUpdate"]["shop"]["googleAnalytics"]

    assert response_settings["measurementId"] == "G-12345"
    site_settings.refresh_from_db()
    assert site_settings.google_analytics.measurement_id == "G-12345"


def test_google_analytics_settings_update_as_staff_only_is_active(
    staff_api_client, permission_manage_settings, site_settings
):

    with pytest.raises(ShopGoogleAnalytics.DoesNotExist) as e_info:
        site_settings.google_analytics
    assert e_info.value.args[0] == "SiteSettings has no google_analytics."

    staff_api_client.user.user_permissions.add(permission_manage_settings)
    variables = {"input": {"gaTag": {"isActive": True}}}
    response = staff_api_client.post_graphql(
        GOOGLE_ANALYTICS_SETTINGS_UPDATE_MUTATION,
        variables,
    )
    content = get_graphql_content_from_response(response)
    assert (
        content["errors"][0]["message"]
        == "Google Analytics not configured.                        Please configure Google Analytics first."
    )


GOOGLE_ANALYTICS_SETTINGS_QUERY = """
    query {
        shop {
            googleAnalytics {
                id
                measurementId
                isActive
            }
        }
    }
"""


def test_google_analytics_settings_query_as_staff(
    staff_api_client, permission_manage_settings, site_settings
):
    # add google analytics settings to site settings
    with transaction.atomic():
        site_settings.google_analytics = ShopGoogleAnalytics.objects.create(
            measurement_id="G-12345", is_active=True, site_settings=site_settings
        )

    staff_api_client.user.user_permissions.add(permission_manage_settings)

    response = staff_api_client.post_graphql(
        GOOGLE_ANALYTICS_SETTINGS_QUERY,
    )
    content = get_graphql_content(response)
    response_settings = content["data"]["shop"]["googleAnalytics"]

    assert response_settings["measurementId"] == "G-12345"
    assert response_settings["isActive"] is True
    site_settings.refresh_from_db()
    assert site_settings.google_analytics.measurement_id == "G-12345"
    assert site_settings.google_analytics.is_active is True

    response = staff_api_client.post_graphql(GOOGLE_ANALYTICS_SETTINGS_QUERY)
    content = get_graphql_content(response)
    response_settings = content["data"]["shop"]["googleAnalytics"]

    assert response_settings["measurementId"] == "G-12345"
    assert response_settings["isActive"] is True
    site_settings.refresh_from_db()
    assert site_settings.google_analytics.measurement_id == "G-12345"
    assert site_settings.google_analytics.is_active is True


GOOGLE_COMMISSION_SETTINGS_UPDATE_MUTATION = """
    mutation shopSettingsUpdate($input: ShopSettingsInput!) {
        shopSettingsUpdate(input: $input) {
            shop {
                commissionRate
            }
            errors {
                    field
                    code
                    message
                }
        }
    }
"""


def test_commission_settings_update_as_staff(
    staff_api_client, permission_manage_settings, site_settings
):
    staff_api_client.user.user_permissions.add(permission_manage_settings)
    variables = {"input": {"commissionRate": 0.7}}
    response = staff_api_client.post_graphql(
        GOOGLE_COMMISSION_SETTINGS_UPDATE_MUTATION,
        variables,
    )
    content = get_graphql_content(response)
    response_settings = content["data"]["shopSettingsUpdate"]["shop"]
    assert response_settings["commissionRate"] == 0.7
    site_settings.refresh_from_db()
    assert site_settings.commission_rate == 0.7
