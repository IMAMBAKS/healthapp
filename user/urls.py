__author__ = 'Administrator'
from django.conf.urls import url
from user import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    url(r'^user/$', views.UserList.as_view()),
    url(r'^user/(?P<pk>[0-9]+)/$', views.UserDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)