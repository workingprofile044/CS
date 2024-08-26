# storage/urls.py

from django.urls import path, include
from .views import FileListView, FileUploadView, FileDeleteView, FileRenameView

urlpatterns = [
    path('api/users/', include('storage.urls')),
    path('files/', FileListView.as_view(), name='file-list'),
    path('upload/', FileUploadView.as_view(), name='file-upload'),
    path('delete/<int:pk>/', FileDeleteView.as_view(), name='file-delete'),
    path('rename/<int:pk>/', FileRenameView.as_view(), name='file-rename'),
]
