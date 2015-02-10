from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets





urlpatterns = patterns('',
                       # Examples:
                       # url(r'^$', 'healthapp.views.home', name='home'),
                       # url(r'^blog/', include('blog.urls')),

                       url(r'^admin/', include(admin.site.urls)),
                       url(r'^$', 'healthapp.views.home_page', name='home_page'),
                       url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
)
