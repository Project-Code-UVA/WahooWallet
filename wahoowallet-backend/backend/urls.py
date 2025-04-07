"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
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
from wahoowallet.views import get_ai_response, add_account, update_transaction_category, django_login, django_signup, update_username, update_password, update_email, connect_grubhub
from django.http import HttpResponse

def home(request):
    return HttpResponse("Wahoo Wallet API is running!")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name='home'),
    path('api/get_ai_response/', get_ai_response, name='get_ai_response'),
    path('api/add_account/', add_account, name='add_account'),
    path('api/update_transaction_category/', update_transaction_category, name='update_transaction_category'),
    path('api/django_login/', django_login, name='django_login'),
    path('api/django_signup/', django_signup, name='django_signup'),
    path('api/update_username/', update_username, name='update_username'),
    path('api/update_password/', update_password, name='update_password'),
    path('api/update_email/', update_email, name='update_email'),
    path('api/connect_grubhub/', connect_grubhub, name='connect_grubhub'),
]
