__author__ = 'Administrator'
from django.conf.urls import url
from diet import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    url(r'^diet/$', views.DietList.as_view()),
    url(r'^diet/(?P<pk>[0-9]+)/$', views.DietDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)