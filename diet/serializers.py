__author__ = 'Administrator'
from rest_framework import serializers
from diet.models import Diet

class DietSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diet
        fields =  ('id', 'fatFactor', 'proteinFactor', 'cutFactor', 'activityFactor', 'RBM')