import os
import logging
from rest_framework import generics, permissions, status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import File
from .serializers import FileSerializer
from django.conf import settings
from django.core.exceptions import ValidationError
from django.http import FileResponse, Http404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

logger = logging.getLogger(__name__)



class FileListView(generics.ListAPIView):
    serializer_class = FileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return File.objects.filter(user=self.request.user)

class FileUploadView(generics.CreateAPIView):
    serializer_class = FileSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        logger.debug(f"Request data: {self.request.data}")
        logger.debug(f"Request files: {self.request.FILES}")

        file_obj = self.request.data.get('file')
        if not file_obj:
            logger.error("No file found in request data.")
            raise ValidationError("No file found in the request data.")

        user = self.request.user
        file_path = os.path.join(settings.MEDIA_ROOT, user.username, file_obj.name)

        os.makedirs(os.path.dirname(file_path), exist_ok=True)

        # Save file to disk
        with open(file_path, 'wb+') as destination:
            for chunk in file_obj.chunks():
                destination.write(chunk)

        # Save file details in the database
        serializer.save(
            user=user,
            original_name=file_obj.name,
            file_path=file_path,
            size=file_obj.size,
            comment=self.request.data.get('comment', ''),
        )

class FileDeleteView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, pk, *args, **kwargs):
        try:
            file = File.objects.get(pk=pk, user=request.user)
            if os.path.exists(file.file_path):
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
                if os.path.exists(file.file_path):
                    os.rename(file.file_path, new_path)
                    file.original_name = new_name
                    file.file_path = new_path
                    file.save()
                    return Response(FileSerializer(file, context={'request': request}).data)
                else:
                    raise ValidationError("File does not exist on the server.")
            return Response(status=status.HTTP_400_BAD_REQUEST)
        except File.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        except ValidationError as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class FileDownloadView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk, *args, **kwargs):
        try:
            file = File.objects.get(pk=pk, user=request.user)
            response = FileResponse(open(file.file_path, 'rb'))
            response['Content-Disposition'] = f'attachment; filename="{file.original_name}"'
            return response
        except File.DoesNotExist:
            raise Http404

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def test_auth(request):
    return Response({"detail": "Authenticated!"})
