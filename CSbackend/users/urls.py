from django.urls import path
from .views import RegisterView, LoginView, LogoutView, AdminUserListView
from .views import check_authentication

urlpatterns = [
    path('api/authenticated/', check_authentication),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('admin-list/', AdminUserListView.as_view(), name='admin-list'),
]