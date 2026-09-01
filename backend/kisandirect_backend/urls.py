"""
URL configuration for kisandirect_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from accounts.views import (
    register_user, 
    login_user,
    UserListView,
    OrderListCreateView,
    LogisticsListView,
    CropListCreateView,
    CropDetailView
    )

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/register/',register_user,name='register'),
    path('api/login/',login_user,name='login'),
    path('api/users/', UserListView.as_view(),name='user-list'),
    path('api/orders/',OrderListCreateView.as_view(),name='order-list'),
    path('api/logistics/',LogisticsListView.as_view(),name='logistics-list'),
    path('api/crops/',CropListCreateView.as_view(),name='crop-list'),
    path('api/crops/<int:pk>/',CropDetailView.as_view(),name='crop-detail'),
]