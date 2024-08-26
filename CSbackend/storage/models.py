import os
import uuid
from django.db import models
from django.conf import settings

class File(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    original_name = models.CharField(max_length=255)
    file_path = models.CharField(max_length=255)
    size = models.PositiveIntegerField()
    upload_date = models.DateTimeField(auto_now_add=True)
    last_download_date = models.DateTimeField(null=True, blank=True)
    comment = models.TextField(blank=True)
    special_link = models.CharField(max_length=32, unique=True, default=uuid.uuid4().hex, editable=False)

    def save(self, *args, **kwargs):
        if not self.special_link:
            self.special_link = uuid.uuid4().hex
        super().save(*args, **kwargs)
