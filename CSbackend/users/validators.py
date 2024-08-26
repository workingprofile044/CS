from django.core.exceptions import ValidationError
import re

class UppercaseValidator:
    def validate(self, password, user=None):
        if not re.findall(r'[A-Z]', password):
            raise ValidationError("The password must contain at least one uppercase letter, A-Z.")

    def get_help_text(self):
        return "Your password must contain at least one uppercase letter, A-Z."

class NumberValidator:
    def validate(self, password, user=None):
        if not re.findall(r'\d', password):
            raise ValidationError("The password must contain at least one digit, 0-9.")

    def get_help_text(self):
        return "Your password must contain at least one digit, 0-9."

class SpecialCharacterValidator:
    def validate(self, password, user=None):
        if not re.findall(r'[()[\]{}|\\`~!@#$%^&*_\-+=;:\'",<>./?]', password):
            raise ValidationError("The password must contain at least one special character: " + "()[]{}|\\`~!@#$%^&*_-+=;:'\",<>./?")

    def get_help_text(self):
        return "Your password must contain at least one special character: " + "()[]{}|\\`~!@#$%^&*_-+=;:'\",<>./?"
