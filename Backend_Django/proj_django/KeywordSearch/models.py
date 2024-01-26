from django.db import models

# Create your models here.
from django.db.models import JSONField
# from django.contrib.postgres.fields import JSONField

'''
一开始定义全部所需字段
'''


# class Article(models.Model):
#     title = models.CharField(max_length=200)
#     author = models.CharField(max_length=100)
#     content = models.TextField()
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
#
#     def __str__(self):
#         return self.title

class Article(models.Model):
    id = models.AutoField(primary_key=True)
    data = JSONField()
