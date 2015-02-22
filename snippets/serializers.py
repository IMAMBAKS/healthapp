__author__ = 'Administrator'
from django.forms import widgets
from rest_framework import serializers
from snippets.models import Snippet

class SnippetSerializer(serializers.ModelSerializer):
    class Meta:
            model = Snippet
            fields = ('id', 'title')


    def create(self, validated_data):
        """
        :param validated_data: the validated data
        :return: a new "Snippet"  instance
        """
        return Snippet.objects.create(**validated_data)


    def update(self, instance, validated_data):
        """
        :param instance: update and return an existing 'Snippet'
        :param validated_data: given the validated data
        :return:
        """

        instance.title = validated_data.get('title', instance.title)
        instance.save()
        return instance
