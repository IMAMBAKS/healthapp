from django.db import models

# Create your models here.
class Diet(models.Model):
    RBM = models.FloatField(blank=True)
    proteinFactor = models.FloatField(blank=True)
    fatFactor = models.FloatField(blank=True)
    cutFactor = models.FloatField(blank=True)
    activityFactor = models.FloatField(blank=True)
