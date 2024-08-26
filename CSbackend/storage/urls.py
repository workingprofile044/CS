from django.urls import path
from .views import FileListView, FileUploadView, FileDeleteView, FileRenameView, FileDownloadView

urlpatterns = [
    path('files/', FileListView.as_view(), name='file-list'),
    path('upload/', FileUploadView.as_view(), name='file-upload'),
    path('delete/<int:pk>/', FileDeleteView.as_view(), name='file-delete'),
    path('rename/<int:pk>/', FileRenameView.as_view(), name='file-rename'),
    path('download/<int:pk>/', FileDownloadView.as_view(), name='file-download'),
]
