from rest_framework import serializers
from .models import File

class FileSerializer(serializers.ModelSerializer):
    download_url = serializers.SerializerMethodField()

    class Meta:
        model = File
        fields = ['id', 'original_name', 'size', 'upload_date', 'comment', 'download_url']

    def get_download_url(self, obj):
        request = self.context.get('request')
        return request.build_absolute_uri(f'/api/storage/download/{obj.id}/')
