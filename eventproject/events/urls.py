from django.urls import path
from events import views

urlpatterns = [
    path('', views.register_event, name='register'),
]