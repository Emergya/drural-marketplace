from django.core.exceptions import ValidationError
from phonenumber_field.phonenumber import to_python
from phonenumbers.phonenumberutil import is_possible_number

from .error_codes import AccountErrorCode


def validate_possible_number(phone, country=None):
    phone_number = to_python(phone, country)
    if (
        phone_number
        and not is_possible_number(phone_number)
        or not phone_number.is_valid()
    ):
        raise ValidationError(
            "The phone number entered is not valid.", code=AccountErrorCode.INVALID
        )
    return phone_number


class ContainsOneDigitsValidator:
    def validate(self, password, user=None):
        if not any(char.isdigit() for char in password):
            raise ValidationError(
                "Password must contain at least one number.",
                code='password_too_weak')

class ContainsOneUppercaseValidator:
    def validate(self, password, user=None):
        if not any(char.isupper() for char in password):
            raise ValidationError(
                "Password must contain at least one uppercase character.",
                code='password_too_weak')

class ContainsOneLowercaseValidator:
    def validate(self, password, user=None):
        if not any(char.islower() for char in password):
            raise ValidationError(
                "Password must contain at least one lowercase character.",
                code='password_too_weak')

class ContainsOneSpecialCharactersValidator:
    def validate(self, password, user=None):
        special_characters ="!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"
        if  not any(char in special_characters for char in password):
            raise ValidationError(
                "Password must contain at least one special character.",
                code='password_too_weak')