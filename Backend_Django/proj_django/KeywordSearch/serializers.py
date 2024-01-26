from rest_framework import serializers
# from KeywordSearch.models import Article
from .models import Article

class ArticleSerializer(serializers.ModelSerializer):
    # class Meta:
    #     model = Article # 定义模型：它指定了序列化器将与之关联的模型Article
    #     fields = ['id', 'title', 'author', 'content', 'created_at', 'updated_at']
    #     # 应包含在序列化输出中的模型字段。

    class Meta:
        model = Article
        fields = ('id', 'data')