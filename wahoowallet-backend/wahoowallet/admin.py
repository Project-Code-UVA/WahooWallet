from django.contrib import admin
from django.apps import apps
# Register your models here.
wahoowallet = apps.get_app_config(__name__.split('.')[-2])

for model in wahoowallet.get_models():
    admin.site.register(model)