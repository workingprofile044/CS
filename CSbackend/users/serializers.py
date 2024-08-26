from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth.password_validation import validate_password
from storage.models import File
from django.db.models import Sum
from django.contrib.auth import authenticate
from django.utils.translation import gettext_lazy as _
from rest_framework.exceptions import AuthenticationFailed

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'full_name', 'email', 'password']

    def validate_password(self, value):
        validate_password(value)
        return value

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data['username'],
            full_name=validated_data['full_name'],
            email=validated_data['email'],
            password=validated_data['password'],
        )
        return user

class AdminUserSerializer(serializers.ModelSerializer):
    file_count = serializers.IntegerField(source='file_set.count', read_only=True)
    storage_used = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'full_name', 'is_admin', 'file_count', 'storage_used']

    def get_storage_used(self, obj):
        total_size = File.objects.filter(user=obj).aggregate(total_size=Sum('size'))['total_size'] or 0
        return total_size / (1024 * 1024)  # Convert bytes to MB



class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(
        style={'input_type': 'password'}, trim_whitespace=False
    )

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        if username and password:
            user = authenticate(request=self.context.get('request'),
                                username=username, password=password)

            if not user:
                raise AuthenticationFailed(_('Invalid credentials'), code='authorization')

        else:
            raise serializers.ValidationError(
                _('Must include "username" and "password".'), code='authorization'
            )

        data['user'] = user
        return data