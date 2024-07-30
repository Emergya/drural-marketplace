from collections import defaultdict

import graphene
from django.contrib.auth.models import Group
from django.contrib.gis.geos import Point
from django.core.exceptions import ValidationError

from ...account.error_codes import AccountErrorCode
from ...account.notifications import send_set_password_notification
from ...account.utils import add_user_in_sellers_group, requestor_is_seller
from ...company import models, notifications
from ...company.error_codes import CompanyErrorCode as CompanyErrorCodeEnum
from ...company.events import company_validation_event
from ...company.notifications import send_new_agent_created_notification
from ...core.chatwoot_utils import (
    create_account_chatwoot,
    create_account_user_chatwoot,
    create_inbox_chatwoot,
    create_user_chatwoot,
    update_user_chatwoot,
    validate_chatwoot_password,
)
from ...core.exceptions import PermissionDenied
from ...core.permissions import AccountPermissions, CompanyPermissions
from ...core.tracing import traced_atomic_transaction
from ...core.utils.url import validate_storefront_url
from ...graphql.core.utils import (
    add_hash_to_file_name,
    validate_image_file,
    validate_image_file_banner,
)
from ...payment.gateways.stripe.stripe_api import (
    accounlink_create,
    account_create,
    get_account,
)
from ...settings import STRIPE_SECRET_API_KEY
from ...site.models import ShopChatwootCredentials
from ...wishlist.models import Wishlist
from ..core.mutations import ModelMutation
from ..core.types.common import AccountError, CompanyError
from ..utils import get_user_or_app_from_context
from .inputs import (
    AgentCreateInput,
    CompanyAddressInput,
    CompanyChatwootInput,
    CompanyInput,
    CompanyLinkStripeAccountInput,
    CompanyValidationInput,
    CompnayChatwootCreateInput,
)
from .utils import has_company_permissions


class CompanyCreate(ModelMutation):
    class Arguments:
        input = CompanyInput(
            required=True, description="Fields required to create a company."
        )

    class Meta:
        description = "Creates a new company"
        model = models.Company
        error_type_class = CompanyError

    @classmethod
    def check_permissions(cls, context, permissions=None):
        requestor = get_user_or_app_from_context(context)
        if requestor.is_staff:
            raise PermissionDenied()
        return context.user.is_authenticated

    @classmethod
    def clean_input(cls, info, instance, data, input_cls=None):
        if data.get("banner"):
            image_data = info.context.FILES.get(data["banner"])
            validate_image_file(image_data, "banner", CompanyErrorCodeEnum)
            add_hash_to_file_name(image_data)
            validate_image_file_banner(image_data, "banner", CompanyErrorCodeEnum)
        if not data.get("address"):
            raise ValidationError(
                {
                    "address": ValidationError(
                        "This field is required.", code=CompanyErrorCodeEnum.REQUIRED
                    )
                }
            )
        if ShopChatwootCredentials.objects.filter(email=data.get("email")).exists():
            raise ValidationError(
                {
                    "email": ValidationError(
                        "This Email is being used.",
                        code=CompanyErrorCodeEnum.UNIQUE,
                    )
                }
            )
        return super(CompanyCreate, cls).clean_input(info, instance, data, input_cls)

    @classmethod
    def create_company_address(cls, instance, data):
        address = data.get("address")
        if address:
            latitude = address.pop("latitude", None)
            longitude = address.pop("longitude", None)
            if latitude and longitude:
                location_point = Point(latitude, longitude, srid=4326)
                address["location_point"] = location_point
            models.CompanyAddress.objects.create(company=instance, **address)

    @classmethod
    @traced_atomic_transaction()
    def save(cls, info, instance, cleaned_input):
        instance.save()
        cls.create_company_address(instance, cleaned_input)
        instance.managers.add(info.context.user)
        notifications.send_company_created_notification(
            instance,
            info.context.plugins,
        )


class CompanyUpdate(ModelMutation):
    class Arguments:
        id = graphene.ID(required=True, description="ID of a company to update.")
        input = CompanyInput(
            required=True, description="Fields required to update a company."
        )

    class Meta:
        description = "Updates a company"
        model = models.Company
        error_type_class = CompanyError

    @classmethod
    def check_permissions(cls, context, permissions=None):
        return context.user.is_authenticated

    @classmethod
    def clean_input(cls, info, instance, data):
        cleaned_input = super().clean_input(info, instance, data)
        if data.get("banner"):
            image_data = info.context.FILES.get(data["banner"])
            validate_image_file(image_data, "banner", CompanyErrorCodeEnum)
            add_hash_to_file_name(image_data)
            validate_image_file_banner(image_data, "banner", CompanyErrorCodeEnum)
        if (
            data.get("email")
            and ShopChatwootCredentials.objects.filter(email=data.get("email")).exists()
        ):
            raise ValidationError(
                {
                    "email": ValidationError(
                        "This Email is being used.",
                        code=CompanyErrorCodeEnum.UNIQUE,
                    )
                }
            )
        return cleaned_input

    @classmethod
    def check_change_fields(cls, instance, cleaned_input):
        old_instance = models.Company.objects.filter(pk=instance.pk).get()
        return(
            old_instance.name != cleaned_input.get("name")
            or old_instance.email != cleaned_input.get("email")
            or old_instance.phone != cleaned_input.get("phone")
            or old_instance.cif != cleaned_input.get("cif")
            or old_instance.description != cleaned_input.get("description")
            or old_instance.language_code != cleaned_input.get("language_code")
            or old_instance.public_name != cleaned_input.get("public_name")
            )
        
    @classmethod
    def save(cls, info, instance, cleaned_input):
        user = info.context.user
        if not has_company_permissions(user, instance.pk):
            raise PermissionDenied()
        if cls.check_change_fields(instance, cleaned_input):
            instance.status = models.Company.Status.PENDING
        instance.save()


class CompanyAddressUpdate(ModelMutation):
    class Arguments:
        id = graphene.ID(required=True, description="ID of a company address.")
        input = CompanyAddressInput(
            required=True, description="Fields required to update address."
        )

    class Meta:
        description = "Updates a company address"
        model = models.CompanyAddress
        error_type_class = CompanyError

    @classmethod
    def check_permissions(cls, context, permissions=None):
        return context.user.is_authenticated

    @classmethod
    def save(cls, info, instance, cleaned_input):
        user = info.context.user
        if not has_company_permissions(user, instance.company.pk):
            raise PermissionDenied()
        instance.company.status = models.Company.Status.PENDING
        # Asign latitude and longitude to the company address
        latitude = cleaned_input.get("latitude")
        longitude = cleaned_input.get("longitude")
        instance.location_point = Point(latitude, longitude)
        instance.company.save()
        instance.save()


class CompanyValidation(ModelMutation):
    class Arguments:
        id = graphene.ID(required=True, description="ID of a company to update.")
        input = CompanyValidationInput(
            required=True, description="Fields required to validate a company."
        )

    class Meta:
        description = "Validates a company"
        model = models.Company
        permissions = (CompanyPermissions.MANAGE_COMPANIES,)
        error_type_class = CompanyError

    @classmethod
    def post_save_action(cls, info, instance, cleaned_input):
        company_validation_event(info.context, instance, cleaned_input.get("reason"))
        notifications.send_company_validation_notification(
            instance, info.context.plugins, reason=cleaned_input.get("reason")
        )


class CompanyEnable(ModelMutation):
    class Arguments:
        id = graphene.ID(required=True, description="ID of a company to enable.")

    class Meta:
        description = "Enables a company"
        model = models.Company
        error_type_class = CompanyError

    @classmethod
    def check_permissions(cls, context, permissions=None):
        return context.user.is_authenticated

    @classmethod
    def perform_mutation(cls, _root, info, **data):
        instance = cls.get_instance(info, **data)
        if not has_company_permissions(info.context.user, instance.pk):
            raise PermissionDenied()
        instance.is_enabled = True
        instance.save(update_fields=["is_enabled"])
        return cls.success_response(instance)


class CompanyDisable(ModelMutation):
    class Arguments:
        id = graphene.ID(required=True, description="ID of a company to disable.")

    class Meta:
        description = "Disables a company"
        model = models.Company
        error_type_class = CompanyError

    @classmethod
    def check_permissions(cls, context, permissions=None):
        return context.user.is_authenticated

    @classmethod
    def perform_mutation(cls, _root, info, **data):
        instance = cls.get_instance(info, **data)
        if not has_company_permissions(info.context.user, instance.pk):
            raise PermissionDenied()
        instance.is_enabled = False
        instance.save(update_fields=["is_enabled"])
        return cls.success_response(instance)


class CompnayChatwootCreate(ModelMutation):
    class Arguments:
        id = graphene.ID(
            required=True, description="ID of a company to enable in Chatwoot"
        )
        input = CompnayChatwootCreateInput(
            required=True, description="Fields required to update address."
        )

    class Meta:
        description = "It enables the company chat"
        model = models.Company
        error_type_class = CompanyError

    @classmethod
    def check_permissions(cls, context, permissions=None):
        return context.user.is_authenticated

    @classmethod
    def clean_input(cls, info, instance, data):
        cleaned_input = super().clean_input(info, instance, data)
        password = cleaned_input["password"]
        website_url = cleaned_input["website_url"]
        validate_chatwoot_password(password)
        if models.ChatwootCredentials.objects.filter(company=instance).exists():
            raise ValidationError(
                {
                    "id": ValidationError(
                        "Chatwoot has been enabled for this company before.",
                        code=CompanyErrorCodeEnum.UNIQUE,
                    )
                }
            )
        if not website_url:
            raise ValidationError(
                {
                    "website_url": ValidationError(
                        "You must specify URL where the chat will be deployed.",
                        code=CompanyErrorCodeEnum.REQUIRED,
                    )
                }
            )
        return cleaned_input

    @classmethod
    def save(cls, info, instance, cleaned_input):
        user = info.context.user
        if not has_company_permissions(user, instance.pk):
            raise PermissionDenied()

        password = cleaned_input["password"]
        website_url = cleaned_input["website_url"]

        # Create user in Chatwoot
        user_api_response = create_user_chatwoot(
            instance.public_name, instance.email, password
        )
        user_id = user_api_response["id"]

        # Create account in Chatwoot
        account_api_response = create_account_chatwoot(instance.name)
        account_id = account_api_response["id"]

        # Link user and account in Chatwoot
        create_account_user_chatwoot(account_id, user_id)

        # Create inbox
        inbox_api_response = create_inbox_chatwoot(
            user_api_response["access_token"],
            account_id,
            instance.name,
            website_url,
        )

        models.ChatwootCredentials.objects.create(
            company=instance,
            is_active=cleaned_input["is_active"],
            chatwoot_user_id=user_id,
            chatwoot_account_id=account_id,
            user_api_key=user_api_response["access_token"],
            website_token=inbox_api_response["website_token"],
            hmac=inbox_api_response["hmac_token"],
        )


class CompnayChatwootUpdate(ModelMutation):
    class Arguments:
        id = graphene.ID(required=True, description="ID of a Chatwoot credentials.")
        input = CompanyChatwootInput(
            required=True, description="Field you can update the for Chatwoot settings."
        )

    class Meta:
        description = "It updates the company Chatwoot settings."
        model = models.ChatwootCredentials
        error_type_class = CompanyError

    @classmethod
    def check_permissions(cls, context, permissions=None):
        return context.user.is_authenticated

    @classmethod
    def clean_input(cls, info, instance, data):
        cleaned_input = super().clean_input(info, instance, data)
        if "password" in cleaned_input.keys():
            password = cleaned_input["password"]
            validate_chatwoot_password(password)
        return cleaned_input

    @classmethod
    def save(cls, info, instance, cleaned_input):
        user = info.context.user
        if not has_company_permissions(user, instance.pk):
            raise PermissionDenied()

        # Update password
        if "password" in cleaned_input.keys():
            update_user_chatwoot(
                instance.chatwoot_user_id,
                instance.company.public_name,
                cleaned_input["password"],
                instance.company.email,
            )

        instance.save()


class AddCompanyAgent(ModelMutation):
    class Arguments:
        company = graphene.ID(required=True, description="ID of a company to enable.")
        input = AgentCreateInput(
            description="Fields required to create a agent user.", required=True
        )

    class Meta:
        description = "Creates a new agent user."
        exclude = ["password"]
        model = models.User
        permissions = (AccountPermissions.MANAGE_USERS,)
        error_type_class = AccountError
        error_type_field = "AccountError"

    @classmethod
    def clean_input(cls, info, instance, data):
        cleaned_input = super().clean_input(info, instance, data)

        if instance.is_staff:
            raise PermissionDenied()

        errors = defaultdict(list)
        if cleaned_input.get("redirect_url"):
            try:
                validate_storefront_url(cleaned_input.get("redirect_url"))
            except ValidationError as error:
                error.code = AccountErrorCode.INVALID
                errors["redirect_url"].append(error)

        if errors:
            raise ValidationError(errors)
        return cleaned_input

    @classmethod
    def save(cls, info, user, cleaned_input, company, new_user):
        user.save()
        if not requestor_is_seller(user):
            add_user_in_sellers_group(user)

        if new_user:
            user.companies.add(company)
            Wishlist.objects.create(user=user, default=True)
            send_set_password_notification(
                redirect_url=cleaned_input.get("redirect_url"),
                user=user,
                manager=info.context.plugins,
                channel_slug=None,
                staff=False,
            )

        send_new_agent_created_notification(
            user=user,
            company=company,
            manager=info.context.plugins,
        )

    @classmethod
    def perform_mutation(cls, _root, info, **data):
        requestor = get_user_or_app_from_context(info.context)
        company = cls.get_node_or_error(info, data.get("company"), field="company")
        email = data.get("input").get("email")
        instance = models.User.objects.filter(email=email).first()

        if not requestor.is_company_manager(company.id):
            raise PermissionDenied()

        data = data.get("input")
        if instance is None:
            instance = cls.get_instance(info, **data)
            cleaned_input = cls.clean_input(info, instance, data)
            instance = cls.construct_instance(instance, cleaned_input)
            cls.clean_instance(info, instance)
            new_user = True

        elif instance.is_company_manager(company.id):
            raise ValidationError(
                {
                    "email": ValidationError(
                        "This user is already a company manager.",
                        code=AccountErrorCode.UNIQUE,
                    )
                }
            )

        else:
            # user already exists but is not a company manager
            cleaned_input = cls.clean_input(info, instance, data)
            instance.companies.add(company)
            new_user = False

        cls.save(info, instance, cleaned_input, company, new_user=new_user)
        return cls.success_response(instance)


class RemoveCompanyAgent(ModelMutation):
    class Arguments:
        id = graphene.ID(required=True, description="ID of a agent to remove.")
        company = graphene.ID(required=True, description="ID of a company")

    class Meta:
        description = "Remove a agent from the company."
        model = models.User
        permissions = (AccountPermissions.MANAGE_USERS,)
        error_type_class = AccountError

    @classmethod
    def check_own_company(cls, requestor, company):
        if not requestor.is_company_manager(company.id) and not requestor.is_staff:
            raise PermissionDenied("You do not own the company.")

    @classmethod
    def check_agent_own_company(cls, instance, company):
        if not instance.is_company_manager(company.id):
            raise ValidationError(
                {
                    "id": ValidationError(
                        "This user is not a company manager.",
                        code=AccountErrorCode.INVALID,
                    )
                }
            )

    @classmethod
    def perform_mutation(cls, _root, info, **data):
        instance = cls.get_instance(info, **data)
        company = cls.get_node_or_error(info, data.get("company"), field="company")
        requestor = get_user_or_app_from_context(info.context)

        cls.check_own_company(requestor, company)
        cls.check_agent_own_company(instance, company)

        sellers_group = Group.objects.get(name="Sellers")
        instance.companies.remove(company)

        if (
            instance.groups.filter(id=sellers_group.id).exists()
            and not instance.companies.exists()
        ):
            instance.groups.remove(sellers_group)

        cls.save(instance)
        return cls.success_response(instance)

    @classmethod
    def save(cls, instance):
        instance.save()


class CompanyStripeAccountCreate(ModelMutation):
    class Arguments:
        id = graphene.ID(required=True, description="ID of a company address.")

    class Meta:
        description = "Create an Stripe account for a company"
        model = models.Company
        error_type_class = CompanyError

    @classmethod
    def check_permissions(cls, context, permissions=None):
        return context.user.is_authenticated

    @classmethod
    def validate_account(cls, instance, context):
        if models.StripeCredentials.objects.filter(company=instance).exists():
            raise ValidationError(
                {
                    "id": ValidationError(
                        "This company has an account on Stripe.",
                        code=CompanyErrorCodeEnum.ALREADY_EXISTS,
                    )
                }
            )
        requestor = get_user_or_app_from_context(context)
        if requestor not in instance.managers.all():
            raise PermissionDenied()

    @classmethod
    def perform_mutation(cls, _root, info, **data):
        instance = cls.get_instance(info, **data)
        cls.validate_account(instance, info.context)
        # cls.post_save_action(info, instance)
        stripe_account_id = account_create(STRIPE_SECRET_API_KEY, instance)["id"]
        models.StripeCredentials.objects.create(
            company=instance, is_enabled=False, account_id=stripe_account_id
        )
        return cls.success_response(instance)


class CompanyLinkStripeAccount(ModelMutation):
    class Arguments:
        id = graphene.ID(required=True, description="ID of a company address.")
        input = CompanyLinkStripeAccountInput(
            required=True,
            description="Fields required to link a company with an Stripe accoount.",
        )

    class Meta:
        description = "Link a company with an Stripe account"
        model = models.Company
        error_type_class = CompanyError

    stripe_form = graphene.String(description=("Stripe form to sign in."))

    @classmethod
    def perform_mutation(cls, _root, info, **data):
        instance = cls.get_instance(info, **data)
        data = data.get("input")
        cleaned_input = cls.clean_input(info, instance, data)
        instance = cls.construct_instance(instance, cleaned_input)
        requestor = get_user_or_app_from_context(info.context)
        if requestor not in instance.managers.all():
            raise PermissionDenied()
        link_data = accounlink_create(
            api_key=STRIPE_SECRET_API_KEY,
            account_id=instance.stripe_credentials.account_id,
            refresh_url=cleaned_input["refresh_url"],
            return_url=cleaned_input["return_url"],
        )
        return cls.success_response(instance, link_data["url"])

    @classmethod
    def success_response(cls, instance, url):
        """Return a success response."""
        return cls(
            errors=[],
            stripe_form=url,
        )


class CompanyEnbaleStripe(ModelMutation):
    """Enable payment with cards.

    Firstly you have to create an Stripe account and fulfill
    the Stripe form of thecompanyLinkStripeAccount mutation.
    """

    class Arguments:
        id = graphene.ID(required=True, description="ID of a company address.")

    class Meta:
        description = "Link a company with an Stripe account"
        model = models.Company
        error_type_class = CompanyError

    @classmethod
    def perform_mutation(cls, _root, info, **data):
        instance = cls.get_instance(info, **data)
        requestor = get_user_or_app_from_context(info.context)
        if not models.StripeCredentials.objects.filter(company=instance).exists():
            raise ValidationError(
                {
                    "id": ValidationError(
                        "This company has not any account on Stripe.",
                        code=CompanyErrorCodeEnum.NOT_FOUND,
                    )
                }
            )
        if requestor not in instance.managers.all():
            raise PermissionDenied()
        stripe_account = get_account(
            STRIPE_SECRET_API_KEY, instance.stripe_credentials.account_id
        )
        if stripe_account["requirements"]["pending_verification"]:
            raise ValidationError(
                {
                    "id": ValidationError(
                        "Stripe is validating your information.\
                                Please try again later.",
                        code=CompanyErrorCodeEnum.INVALID,
                    )
                }
            )
        requirements = stripe_account["requirements"].values()
        for requirement in requirements:
            if requirement:
                raise ValidationError(
                    {
                        "id": ValidationError(
                            "Firstly, you have to fulfill Stripe confiuration.",
                            code=CompanyErrorCodeEnum.INVALID,
                        )
                    }
                )
        instance.stripe_credentials.is_enabled = True
        instance.stripe_credentials.save()
        return cls.success_response(instance)
