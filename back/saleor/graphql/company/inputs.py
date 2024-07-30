import graphene
from graphene import Enum

from ..account.mutations.base import UserInput
from ..core.enums import LanguageCodeEnum
from ..core.types import Upload


class CompanyStatusEnum(Enum):
    PENDING = "PEN"
    ACCEPTED = "ACC"
    REJECTED = "REJ"
    DEACTIVATED = "DEA"


class FilterAddressFieldEnum(Enum):
    POSTAL_CODE = "postal_code"
    LOCALITY = "locality"
    REGION = "region"


class CompanyAddressInput(graphene.InputObjectType):
    street = graphene.String(required=False, description="Determines the street.")
    street_second_line = graphene.String(
        required=False, description="Determines the second street."
    )
    postal_code = graphene.String(
        required=False, description="Determines the postal code."
    )
    locality = graphene.String(
        required=False, description="Determines the municipality."
    )
    region = graphene.String(required=False, description="Determines the province.")
    country = graphene.String(required=False, description="Determines the country.")
    latitude = graphene.Float(
        required=True, description="Latitude of the company location"
    )
    longitude = graphene.Float(
        required=True, description="Latitude of the company location"
    )


class CompanyValidationInput(graphene.InputObjectType):
    reason = graphene.String(
        required=True, description="Determines why the validation status"
    )
    status = graphene.Argument(
        CompanyStatusEnum, required=True, description="Determine the status of company."
    )


class CompanyInput(graphene.InputObjectType):
    name = graphene.String(
        required=False, description="Determines the legal name of company."
    )
    public_name = graphene.String(
        required=False, description="Determines the shop (public) name of company."
    )
    cif = graphene.String(
        required=False, description="Determines the legal identifier of company."
    )
    address = graphene.Argument(
        CompanyAddressInput,
        required=False,
        description="Determines the address of company.",
    )
    phone = graphene.String(
        required=False, description="Determines the phone of company."
    )
    email = graphene.String(
        required=False, description="Determines the email of company."
    )
    language_code = graphene.Argument(
        LanguageCodeEnum,
        required=False,
        description="Determine the language of company.",
    )
    description = graphene.String(
        required=False,
        description="Determines the shop description of company.",
    )
    image = Upload(
        required=False, description="Represents a file in a multipart request."
    )
    banner = Upload(
        required=False, description="Represents an file in a multipart request."
    )
    banner_alt = graphene.String(required=False, description="Alt text for an image.")


class CompanyLinkStripeAccountInput(graphene.InputObjectType):
    return_url = graphene.String(
        description=(
            "Redirect URL after link compnay with Stripe account succesfully."
        ),
        required=False,
    )
    refresh_url = graphene.String(
        description=(
            "Redirect URL after link compnay with Stripe account succesfully."
        ),
        required=False,
    )


class FilterAddressInput(graphene.InputObjectType):
    field = graphene.Argument(
        FilterAddressFieldEnum,
        required=True,
        description="Determine the status of company.",
    )
    value = graphene.String(description="Value to filter.", required=False)


class CompanyChatwootInput(graphene.InputObjectType):
    is_active = graphene.Boolean(
        description="Determine if chatwoot will be set active or not."
    )
    password = graphene.String(description="Password for Chatwoot user.")


class CompnayChatwootCreateInput(CompanyChatwootInput):
    website_url = graphene.String(
        description="Frontend URL where the chat will be released.", required=True
    )


class AgentCreateInput(UserInput):
    redirect_url = graphene.String(
        required=True,
        description=(
            "URL of a view where users should be redirected to "
            "set the password. URL in RFC 1808 format."
        ),
    )
