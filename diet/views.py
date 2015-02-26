from django.shortcuts import render
from diet.serializers import DietSerializer
from diet.models import Diet
from rest_framework import generics

# Create your views here.
class DietList(generics.ListCreateAPIView):
    queryset = Diet.objects.all()
    serializer_class = DietSerializer

class DietDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Diet.objects.all()
    serializer_class = DietSerializer




