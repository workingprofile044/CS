import os
import logging
from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from django.http import FileResponse, Http404
from rest_framework.decorators import api_view
from django.core.files.storage import default_storage
from django.conf import settings
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import File
from .serializers import FileSerializer
from rest_framework.exceptions import ValidationError
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated


logger = logging.getLogger(__name__)

class FileListView(generics.ListAPIView):
    serializer_class = FileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        logger.info(f"Fetching file list for user: {self.request.user}")
        return File.objects.filter(user=self.request.user)

class FileUploadView(generics.CreateAPIView):
    serializer_class = FileSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        file_obj = request.FILES.get('file')

        if not file_obj:
            raise ValidationError("No file provided.")  # Using DRF's ValidationError

        user = request.user
        user_folder = os.path.join(settings.MEDIA_ROOT, user.username)
        os.makedirs(user_folder, exist_ok=True)

        file_path = os.path.join(user_folder, file_obj.name)

        with default_storage.open(file_path, 'wb+') as destination:
            for chunk in file_obj.chunks():
                destination.write(chunk)

        file_record = File.objects.create(
            user=user,
            original_name=file_obj.name,
            size=file_obj.size,
            file_path=file_path,
            comment=request.data.get('comment', '')
        )

        serializer = self.get_serializer(file_record)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class FileDeleteView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, pk, *args, **kwargs):
        try:
            file = File.objects.get(pk=pk, user=request.user)
            if os.path.exists(file.file_path):
                os.remove(file.file_path)
                logger.info(f"Deleted file '{file.file_path}' for user '{request.user.username}'.")
            file.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except File.DoesNotExist:
            logger.warning(f"File with id '{pk}' not found for user '{request.user.username}'.")
            return Response(status=status.HTTP_404_NOT_FOUND)

class FileRenameView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, pk, *args, **kwargs):
        try:
            file = File.objects.get(pk=pk, user=request.user)
            new_name = request.data.get('new_name', None)
            if new_name:
                new_path = os.path.join(os.path.dirname(file.file_path), new_name)
                if os.path.exists(file.file_path):
                    os.rename(file.file_path, new_path)
                    file.original_name = new_name
                    file.file_path = new_path
                    file.save()
                    logger.info(f"Renamed file '{file.file_path}' to '{new_name}' for user '{request.user.username}'.")
                    return Response(FileSerializer(file, context={'request': request}).data)
                else:
                    raise ValidationError("File does not exist on the server.")  # Using DRF's ValidationError
            return Response(status=status.HTTP_400_BAD_REQUEST)
        except File.DoesNotExist:
            logger.warning(f"File with id '{pk}' not found for user '{request.user.username}'.")
            return Response(status=status.HTTP_404_NOT_FOUND)
        except ValidationError as e:
            logger.error(f"Validation error: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

# Remove permission requirement for public access
class FileDownloadView(APIView):
    permission_classes = []  # No permissions required, making it publicly accessible

    def get(self, request, pk, *args, **kwargs):
        try:
            file = File.objects.get(pk=pk)
            response = FileResponse(open(file.file_path, 'rb'))
            response['Content-Disposition'] = f'attachment; filename="{file.original_name}"'
            logger.info(f"File '{file.original_name}' downloaded.")
            return response
        except File.DoesNotExist:
            logger.warning(f"File with id '{pk}' not found.")
            raise Http404

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def test_auth(request):
    logger.info(f"User '{request.user.username}' authenticated successfully.")
    return Response({"detail": "Authenticated!"})