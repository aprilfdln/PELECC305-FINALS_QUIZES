from django.db import models

class EventRegistration(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.EmailField()
    age = models.IntegerField()
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.full_name