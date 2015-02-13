__author__ = 'Administrator'
from django.forms import widgets
from rest_framework import serializers
from snippets.models import Snippet, LANGUAGE_CHOICES, STYLE_CHOICES

class SnippetSerializer(serializers.ModelSerializer):
    class Meta:
            model = Snippet
            fields = ('id', 'title', 'code', 'lineos', 'language', 'style')


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
        instance.code = validated_data.get('code', instance.code)
        instance.linenos = validated_data.get('linenos', instance.linenos)
        instance.language = validated_data.get('language', instance.language)
        instance.style = validated_data.get('style', instance.style)
        instance.save()
        return instance
