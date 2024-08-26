# users/urls.py

from django.urls import path, include
from .views import RegisterView, LoginView, LogoutView, AdminUserListView

urlpatterns = [
    path('api/users/', include('users.urls')),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('admin-list/', AdminUserListView.as_view(), name='admin-list'),
]
