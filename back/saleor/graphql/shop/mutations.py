import re

import graphene
from django.core.exceptions import ValidationError

from ...account import models as account_models
from ...company.models import Company
from ...core.chatwoot_utils import (
    create_account_chatwoot,
    create_account_user_chatwoot,
    create_inbox_chatwoot,
    create_user_chatwoot,
    update_user_chatwoot,
    validate_chatwoot_password,
)
from ...core.error_codes import ShopErrorCode
from ...core.exceptions import PermissionDenied
from ...core.permissions import OrderPermissions, SitePermissions
from ...core.utils.url import validate_storefront_url
from ...graphql.core.types.upload import Upload
from ...graphql.core.utils import (
    add_hash_to_file_name,
    validate_commission,
    validate_image_file,
    validate_logo_file,
)
from ...graphql.utils import get_user_or_app_from_context
from ...site.models import ShopChatwootCredentials, ShopGoogleAnalytics, SiteSettings
from ..account.i18n import I18nMixin
from ..account.types import AddressInput
from ..core.enums import LanguageCodeEnum, WeightUnitsEnum
from ..core.mutations import BaseMutation, ModelDeleteMutation, ModelMutation
from ..core.types.common import OrderSettingsError, ShopError
from .types import OrderSettings, Shop


class GaTagInput(graphene.InputObjectType):
    measurement_id = graphene.String(description="Google Analytics ID.")
    is_active = graphene.Boolean(description="Enable Google Analytics.")


class ShopSettingsInput(graphene.InputObjectType):
    header_text = graphene.String(description="Header text.")
    description = graphene.String(description="SEO description.")
    include_taxes_in_prices = graphene.Boolean(description="Include taxes in prices.")
    display_gross_prices = graphene.Boolean(
        description="Display prices with tax in store."
    )
    charge_taxes_on_shipping = graphene.Boolean(description="Charge taxes on shipping.")
    track_inventory_by_default = graphene.Boolean(
        description="Enable inventory tracking."
    )
    default_weight_unit = WeightUnitsEnum(description="Default weight unit.")
    automatic_fulfillment_digital_products = graphene.Boolean(
        description="Enable automatic fulfillment for all digital products."
    )
    default_digital_max_downloads = graphene.Int(
        description="Default number of max downloads per digital content URL."
    )
    default_digital_url_valid_days = graphene.Int(
        description="Default number of days which digital content URL will be valid."
    )
    default_mail_sender_name = graphene.String(
        description="Default email sender's name."
    )
    default_mail_sender_address = graphene.String(
        description="Default email sender's address."
    )
    customer_set_password_url = graphene.String(
        description="URL of a view where customers can set their password."
    )
    default_language = graphene.Argument(
        LanguageCodeEnum, description="Default shop language."
    )
    primary_color = graphene.String(description="Primary color of the marketplace.")
    secondary_color = graphene.String(description="Primary color of the marketplace.")
    logo = Upload(description="Logo image file.")
    logo_alt = graphene.String(description="Alt text for an image.")
    dashboard_banner = Upload(description="Dashboard banner file.")
    dashboard_banner_alt = graphene.String(description="Alt text for an image.")
    storefront_banner = Upload(description="Storefront banner file.")
    storefront_banner_alt = graphene.String(description="Alt text for an image.")
    ga_tag = graphene.Argument(
        GaTagInput,
        description="Google Analytics tracking code.",
        required=False,
    )
    # commision
    commission_rate = graphene.Float(description="Commmission rate for the shop.")


class SiteDomainInput(graphene.InputObjectType):
    domain = graphene.String(description="Domain name for shop.")
    name = graphene.String(description="Shop site name.")


class ShopSettingsUpdate(ModelMutation):
    shop = graphene.Field(Shop, description="Updated shop.")

    class Arguments:
        input = ShopSettingsInput(
            description="Fields required to update shop settings.", required=True
        )

    class Meta:
        description = "Updates shop settings."
        permissions = (SitePermissions.MANAGE_SETTINGS,)
        model = SiteSettings
        error_type_class = ShopError
        error_type_field = "shop_errors"

    # @classmethod
    # def add_commission_rate(cls, info, instance, commission_rate):
    #     site = info.context.site
    #     shop_commission, _ = ShopCommission.objects.update_or_create(
    #         site_settings = site.settings,
    #         defaults = {
    #             'commission_rate': commission_rate
    #         }
    #     )
    #     shop_commission.save()
    #     instance.shop_commission = shop_commission

    @classmethod
    def add_google_analytics(cls, info, instance, data):
        site = info.context.site
        google_analytics = ShopGoogleAnalytics.objects.update_or_create(
            site_settings=site.settings, defaults=data.get("ga_tag")
        )
        google_analytics[0].save()
        instance.google_analytics = google_analytics[0]

    @classmethod
    def clean_input(cls, info, instance, data):
        cleaned_input = super().clean_input(info, instance, data)
        if data.get("customer_set_password_url"):
            try:
                validate_storefront_url(data["customer_set_password_url"])
            except ValidationError as error:
                raise ValidationError(
                    {"customer_set_password_url": error}, code=ShopErrorCode.INVALID
                )
        if data.get("logo"):
            image_data = info.context.FILES.get(data["logo"])
            validate_logo_file(image_data, "logo", ShopErrorCode)
            add_hash_to_file_name(image_data)

        if data.get("storefront_banner"):
            image_data = info.context.FILES.get(data["storefront_banner"])
            validate_image_file(image_data, "storefront_banner", ShopErrorCode)
            add_hash_to_file_name(image_data)

        if data.get("dashboard_banner"):
            image_data = info.context.FILES.get(data["dashboard_banner"])
            validate_image_file(image_data, "dashboard_banner", ShopErrorCode)
            add_hash_to_file_name(image_data)

        if data.get("ga_tag"):
            ga_tag = data.pop("ga_tag")
            if ga_tag.get("is_active") and ga_tag.get("measurement_id") == "":
                raise ValidationError(
                    {"ga_tag": "Google Analytics cannot be active without an id."},
                    code=ShopErrorCode.INVALID,
                )

            if (
                ga_tag.get("is_active") is not None
                and ga_tag.get("measurement_id") is None
            ):
                if hasattr(instance, "google_analytics") is False:
                    raise PermissionDenied(
                        "Google Analytics not configured.\
                        Please configure Google Analytics first."
                    )
        if data.get("commission_rate", False) or data.get("commission_rate") == 0:
            validate_commission(data["commission_rate"], ShopErrorCode)
        return cleaned_input

    @classmethod
    def construct_instance(cls, instance, cleaned_data):
        for field_name, desired_value in cleaned_data.items():
            if field_name != "ga_tag":
                current_value = getattr(instance, field_name)
                if current_value != desired_value:
                    setattr(instance, field_name, desired_value)
        return instance

    @classmethod
    def perform_mutation(cls, _root, info, **data):
        instance = info.context.site.settings
        data = data.get("input")
        cleaned_input = cls.clean_input(info, instance, data)
        if cleaned_input.get("ga_tag"):
            cls.add_google_analytics(info, instance, cleaned_input)
        instance = cls.construct_instance(instance, cleaned_input)
        cls.clean_instance(info, instance)
        instance.save()
        return ShopSettingsUpdate(shop=Shop())


class ShopAddressUpdate(BaseMutation, I18nMixin):
    shop = graphene.Field(Shop, description="Updated shop.")

    class Arguments:
        input = AddressInput(description="Fields required to update shop address.")

    class Meta:
        description = (
            "Update the shop's address. If the `null` value is passed, the currently "
            "selected address will be deleted."
        )
        permissions = (SitePermissions.MANAGE_SETTINGS,)
        error_type_class = ShopError
        error_type_field = "shop_errors"

    @classmethod
    def perform_mutation(cls, _root, info, **data):
        site_settings = info.context.site.settings
        data = data.get("input")

        if data:
            if not site_settings.company_address:
                company_address = account_models.Address()
            else:
                company_address = site_settings.company_address
            company_address = cls.validate_address(
                data, instance=company_address, info=info
            )
            company_address.save()
            site_settings.company_address = company_address
            site_settings.save(update_fields=["company_address"])
        else:
            if site_settings.company_address:
                site_settings.company_address.delete()
        return ShopAddressUpdate(shop=Shop())


class ShopDomainUpdate(BaseMutation):
    shop = graphene.Field(Shop, description="Updated shop.")

    class Arguments:
        input = SiteDomainInput(description="Fields required to update site.")

    class Meta:
        description = "Updates site domain of the shop."
        permissions = (SitePermissions.MANAGE_SETTINGS,)
        error_type_class = ShopError
        error_type_field = "shop_errors"

    @classmethod
    def perform_mutation(cls, _root, info, **data):
        site = info.context.site
        data = data.get("input")
        domain = data.get("domain")
        name = data.get("name")
        if domain is not None:
            site.domain = domain
        if name is not None:
            site.name = name
        cls.clean_instance(info, site)
        site.save()
        return ShopDomainUpdate(shop=Shop())


class ShopFetchTaxRates(BaseMutation):
    shop = graphene.Field(Shop, description="Updated shop.")

    class Meta:
        description = "Fetch tax rates."
        permissions = (SitePermissions.MANAGE_SETTINGS,)
        error_type_class = ShopError
        error_type_field = "shop_errors"

    @classmethod
    def perform_mutation(cls, _root, info):
        if not info.context.plugins.fetch_taxes_data():
            raise ValidationError(
                "Could not fetch tax rates. Make sure you have supplied a "
                "valid credential for your tax plugin.",
                code=ShopErrorCode.CANNOT_FETCH_TAX_RATES.value,
            )
        return ShopFetchTaxRates(shop=Shop())


class StaffNotificationRecipientInput(graphene.InputObjectType):
    user = graphene.ID(
        required=False,
        description="The ID of the user subscribed to email notifications..",
    )
    email = graphene.String(
        required=False,
        description="Email address of a user subscribed to email notifications.",
    )
    active = graphene.Boolean(
        required=False, description="Determines if a notification active."
    )


class StaffNotificationRecipientCreate(ModelMutation):
    class Arguments:
        input = StaffNotificationRecipientInput(
            required=True,
            description="Fields required to create a staff notification recipient.",
        )

    class Meta:
        description = "Creates a new staff notification recipient."
        model = account_models.StaffNotificationRecipient
        permissions = (SitePermissions.MANAGE_SETTINGS,)
        error_type_class = ShopError
        error_type_field = "shop_errors"

    @classmethod
    def clean_input(cls, info, instance, data):
        cleaned_input = super().clean_input(info, instance, data)
        cls.validate_input(instance, cleaned_input)
        email = cleaned_input.pop("email", None)
        if email:
            staff_user = account_models.User.objects.filter(email=email).first()
            if staff_user:
                cleaned_input["user"] = staff_user
            else:
                cleaned_input["staff_email"] = email
        return cleaned_input

    @staticmethod
    def validate_input(instance, cleaned_input):
        email = cleaned_input.get("email")
        user = cleaned_input.get("user")
        if not email and not user:
            if instance.id and "user" in cleaned_input or "email" in cleaned_input:
                raise ValidationError(
                    {
                        "staff_notification": ValidationError(
                            "User and email cannot be set empty",
                            code=ShopErrorCode.INVALID,
                        )
                    }
                )
            if not instance.id:
                raise ValidationError(
                    {
                        "staff_notification": ValidationError(
                            "User or email is required", code=ShopErrorCode.REQUIRED
                        )
                    }
                )
        if user and not user.is_staff:
            raise ValidationError(
                {
                    "user": ValidationError(
                        "User has to be staff user", code=ShopErrorCode.INVALID
                    )
                }
            )


class StaffNotificationRecipientUpdate(StaffNotificationRecipientCreate):
    class Arguments:
        id = graphene.ID(
            required=True, description="ID of a staff notification recipient to update."
        )
        input = StaffNotificationRecipientInput(
            required=True,
            description="Fields required to update a staff notification recipient.",
        )

    class Meta:
        description = "Updates a staff notification recipient."
        model = account_models.StaffNotificationRecipient
        permissions = (SitePermissions.MANAGE_SETTINGS,)
        error_type_class = ShopError
        error_type_field = "shop_errors"


class StaffNotificationRecipientDelete(ModelDeleteMutation):
    class Arguments:
        id = graphene.ID(
            required=True, description="ID of a staff notification recipient to delete."
        )

    class Meta:
        description = "Delete staff notification recipient."
        model = account_models.StaffNotificationRecipient
        permissions = (SitePermissions.MANAGE_SETTINGS,)
        error_type_class = ShopError
        error_type_field = "shop_errors"


class OrderSettingsUpdateInput(graphene.InputObjectType):
    automatically_confirm_all_new_orders = graphene.Boolean(
        required=True,
        description="When disabled, all new orders from checkout "
        "will be marked as unconfirmed. When enabled orders from checkout will "
        "become unfulfilled immediately.",
    )


class OrderSettingsUpdate(BaseMutation):
    order_settings = graphene.Field(OrderSettings, description="Order settings.")

    class Arguments:
        input = OrderSettingsUpdateInput(
            required=True, description="Fields required to update shop order settings."
        )

    class Meta:
        description = "Update shop order settings."
        permissions = (OrderPermissions.MANAGE_ORDERS,)
        error_type_class = OrderSettingsError
        error_type_field = "order_settings_errors"

    @classmethod
    def check_staff(cls, info):
        requestor = get_user_or_app_from_context(info.context)

        if not requestor.is_staff:
            raise PermissionDenied()

    @classmethod
    def perform_mutation(cls, _root, info, **data):
        cls.check_staff(info)
        instance = info.context.site.settings
        instance.automatically_confirm_all_new_orders = data["input"][
            "automatically_confirm_all_new_orders"
        ]
        instance.save(update_fields=["automatically_confirm_all_new_orders"])
        return OrderSettingsUpdate(order_settings=instance)


class ShopChatwootInput(graphene.InputObjectType):
    is_active = graphene.Boolean(
        description="Determine if chatwoot will be set active or not.",
    )
    password = graphene.String(
        description="Password for Chatwoot user.",
    )
    website_url = graphene.String(
        description="Frontend URL where the chat will be released.",
    )


class ShopChatwootCreateInput(ShopChatwootInput):
    email = graphene.String(
        description="The email address of the user.",
    )


class ShopChatwootCreate(ModelMutation):
    shop = graphene.Field(Shop, description="Updated shop.")

    class Arguments:
        input = ShopChatwootCreateInput(
            description="Fields required to update address.", required=True
        )

    class Meta:
        description = "It enables the chat between sellers and administrators."
        permissions = (SitePermissions.MANAGE_SETTINGS,)
        model = SiteSettings
        error_type_class = ShopError
        error_type_field = "shop_errors"

    @classmethod
    def check_permissions(cls, context, permissions=None):
        requestor = get_user_or_app_from_context(context)
        return requestor.is_staff

    @classmethod
    def validate_email(cls, email):
        pat = "^[a-zA-Z0-9-_]+@[a-zA-Z0-9]+\.[a-z]{1,3}$"
        if not re.match(pat, email):
            raise ValidationError(
                {
                    "email": ValidationError(
                        "Introduce a correct emails.",
                        code=ShopErrorCode.INVALID,
                    )
                }
            )

    @classmethod
    def clean_input(cls, info, instance, data, input_cls=None):
        data = data.get("input")
        password = data.get("password")
        website_url = data.get("website_url")
        email = data.get("email")
        cls.validate_email(email)
        validate_chatwoot_password(password)
        if ShopChatwootCredentials.objects.all().exists():
            raise ValidationError(
                {
                    "id": ValidationError(
                        "Chatwoot has been enabled for this company before.",
                        code=ShopErrorCode.UNIQUE,
                    )
                }
            )
        if not website_url:
            raise ValidationError(
                {
                    "website_url": ValidationError(
                        "You must specify URL where the chat will be deployed.",
                        code=ShopErrorCode.REQUIRED,
                    )
                }
            )
        if Company.objects.filter(email=data.get("email")).exists():
            raise ValidationError(
                {
                    "email": ValidationError(
                        "Company with this Email already exists.",
                        code=ShopErrorCode.UNIQUE,
                    )
                }
            )
        return super(ShopChatwootCreate, cls).clean_input(
            info, instance, data, input_cls
        )

    @classmethod
    def perform_mutation(cls, root, info, **data):
        site = info.context.site
        cls.clean_input(info, site.settings, data)
        data = data.get("input")
        email = data.get("email")
        password = data.get("password")
        website_url = data.get("website_url")

        # Create user in Chatwoot
        user_api_response = create_user_chatwoot(site.name, email, password)
        user_id = user_api_response["id"]

        # Create account in Chatwoot
        account_api_response = create_account_chatwoot(site.name)
        account_id = account_api_response["id"]

        # Link user and account in Chatwoot
        create_account_user_chatwoot(account_id, user_id)

        # Create inbox
        inbox_api_response = create_inbox_chatwoot(
            user_api_response["access_token"],
            account_id,
            site.name,
            website_url,
        )

        chatwoot_credentials = ShopChatwootCredentials.objects.create(
            site_settings=site.settings,
            email=email,
            chatwoot_user_id=user_id,
            chatwoot_account_id=account_id,
            is_active=data.get("is_active"),
            user_api_key=user_api_response["access_token"],
            website_token=inbox_api_response["website_token"],
            hmac=inbox_api_response["hmac_token"],
        )
        site.chatwoot_credentials = chatwoot_credentials
        site.save()
        return ShopAddressUpdate(shop=Shop())


class ShopChatwootUpdate(BaseMutation):
    shop = graphene.Field(Shop, description="Updated shop.")

    class Arguments:
        input = ShopChatwootInput(
            required=True, description="Field you can update the for Chatwoot settings."
        )

    class Meta:
        description = "It updates the company Chatwoot settings."
        permissions = (SitePermissions.MANAGE_SETTINGS,)
        error_type_class = ShopError
        error_type_field = "shop_errors"

    @classmethod
    def check_permissions(cls, context, permissions=None):
        requestor = get_user_or_app_from_context(context)
        return requestor.is_staff

    @classmethod
    def clean_input(cls, info, instance, data, input_cls=None):
        if not ShopChatwootCredentials.objects.all().exists():
            raise ValidationError(
                {
                    "id": ValidationError(
                        "Chatwoot has not been enabled for this company before.",
                        code=ShopErrorCode.INVALID,
                    )
                }
            )

    @classmethod
    def perform_mutation(cls, _root, info, **data):
        cls.clean_input(info, info.context.site.settings, data)
        instance = info.context.site.settings.chatwoot_credentials
        data = data.get("input")
        # Update password
        if "password" in data.keys():
            validate_chatwoot_password(data.get("password"))
            update_user_chatwoot(
                instance.chatwoot_user_id,
                instance.site_settings.site.name,
                data.get("password"),
                instance.email,
            )

        if "is_active" in data.keys():
            instance.is_active = data.get("is_active")

        if "website_url" in data.keys():
            instance.website_url = data.get("website_url")

        instance.save()
        return ShopChatwootUpdate(shop=Shop())
