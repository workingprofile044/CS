import re
from django.core.exceptions import ValidationError

class UppercaseValidator:
    def validate(self, password, user=None):
        if not re.findall(r'[A-Z]', password):
            raise ValidationError(
                "The password must contain at least one uppercase letter, A-Z.",
                code='password_no_upper',
            )

class NumberValidator:
    def validate(self, password, user=None):
        if not re.findall(r'\d', password):
            raise ValidationError(
                "The password must contain at least one digit, 0-9.",
                code='password_no_number',
            )

class SpecialCharacterValidator:
    def validate(self, password, user=None):
        if not re.findall(r'[^A-Za-z0-9]', password):
            raise ValidationError(
                "The password must contain at least one special character.",
                code='password_no_special',
            )

    def get_help_text(self):
        return "Your password must contain at least one special character."
