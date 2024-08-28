from rest_framework import serializers
from .models import File

class FileSerializer(serializers.ModelSerializer):
    download_url = serializers.SerializerMethodField()

    class Meta:
        model = File
        fields = ('id', 'user', 'original_name', 'size', 'comment', 'download_url')

    def create(self, validated_data):
        request = self.context.get('request')
        file_obj = request.FILES.get('file')

        # Automatically populate these fields
        validated_data['original_name'] = file_obj.name
        validated_data['size'] = file_obj.size
        validated_data['user'] = request.user

        return super().create(validated_data)

    def get_download_url(self, obj):
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(f'/api/storage/download/{obj.id}/')
        return None
