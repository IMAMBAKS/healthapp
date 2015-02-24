from django.db import models

# Create your models here.
class User(models.Model):
    name = models.CharField(max_length=20, blank=True, default='defaultTitle')
    weight = models.FloatField(blank=True)
    body_fat = models.FloatField(blank=True)


    def __str__(self):
        return self.name

