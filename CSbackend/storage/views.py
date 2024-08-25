# storage/views.py

import os
from rest_framework import generics, permissions, status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import File
from .serializers import FileSerializer
from django.conf import settings

class FileListView(generics.ListAPIView):
    serializer_class = FileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return File.objects.filter(user=user)

class FileUploadView(generics.CreateAPIView):
    serializer_class = FileSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        file_obj = request.data['file']
        user = request.user
        file_path = os.path.join(settings.MEDIA_ROOT, user.username, file_obj.name)

        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        with open(file_path, 'wb+') as destination:
            for chunk in file_obj.chunks():
                destination.write(chunk)

        file_instance = File.objects.create(
            user=user,
            original_name=file_obj.name,
            file_path=file_path,
            size=file_obj.size,
            comment=request.data.get('comment', ''),
        )

        return Response(FileSerializer(file_instance).data, status=status.HTTP_201_CREATED)

class FileDeleteView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, pk, *args, **kwargs):
        try:
            file = File.objects.get(pk=pk, user=request.user)
            os.remove(file.file_path)
            file.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except File.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

class FileRenameView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, pk, *args, **kwargs):
        try:
            file = File.objects.get(pk=pk, user=request.user)
            new_name = request.data.get('new_name', None)
            if new_name:
                new_path = os.path.join(os.path.dirname(file.file_path), new_name)
                os.rename(file.file_path, new_path)
                file.original_name = new_name
                file.file_path = new_path
                file.save()
                return Response(FileSerializer(file).data)
            return Response(status=status.HTTP_400_BAD_REQUEST)
        except File.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
