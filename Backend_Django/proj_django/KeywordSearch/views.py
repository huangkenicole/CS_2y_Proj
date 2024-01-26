import re

from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.core.paginator import Paginator
from .models import Article  # Assuming the Article model is already defined
from .serializers import ArticleSerializer  # Assuming an ArticleSerializer is defined

# @require_http_methods(["GET"])
# def search_articles(request):
#     query = request.GET.get('q', '')
#     if query:
#         search_results = Article.objects.filter(title__icontains=query)
#         paginator = Paginator(search_results, 10)  # Show 10 articles per page
#
#         page_number = request.GET.get('page')
#         page_obj = paginator.get_page(page_number)
#
#         serializer = ArticleSerializer(page_obj, many=True)
#         return JsonResponse(serializer.data, safe=False)
#     else:
#         return JsonResponse([], safe=False)

from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Article
from .serializers import ArticleSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Q
from django.db.models.expressions import Func, F
from .models import Article
from .serializers import ArticleSerializer
import json
import spacy

import en_core_web_sm  # python -m spacy download en_core_web_sm


# search/keyword/?keyword=depression
class ArticleSearchView(APIView):
    def __init__(self):  # 类的初始化操作，比如设置实例变量和进行一些初步的设置，__init__ 方法是类的构造函数，当一个类的实例被创建时，__init__ 方法会被自动调用。
        # 先下载：python -m spacy download en_core_web_sm
        self.nlp = spacy.load("en_core_web_sm")  # nlp = spacy.load("en_core_web_sm")

    def _extract_countries_with_spacy(self, article_data):
        # for affiliation_info in article_data["AuthorList"]["AffiliationInfo"]: 接口报405 但是代码不会报错。。问题在于 article_data["AuthorList"] 是一个列表，而不是一个字典，因此不能像字典一样直接访问其内部元素。

        countries = set()
        last_country = None  # 用于跟踪最后一个匹配的国家【最大】
        for author in article_data.get("Article", {}).get("AuthorList", []):
                for affiliation_info in author.get("AffiliationInfo", []): # 如果 "AffiliationInfo" 存在于字典中，就返回其对应的值（即列表），如果 "AffiliationInfo" 不存在，就返回一个空列表 []，以防止出现 KeyError。
        #             # 获取机构信息
        # for article in article_data["Article"].get("AuthorList", []).get("AffiliationInfo", []):

                    affiliation = affiliation_info.get("Affiliation", "")
                    # 使用spaCy处理文本
                    doc = self.nlp(affiliation)
                    # 收集所有地理政治实体
                    for ent in doc.ents:
                        if ent.label_ == "GPE":
                            # countries.add(ent.text)
                            last_country = ent.text  # 更新最后一个匹配的国家 而不是添加所有出现的地名
                    if last_country:
                        countries.add(last_country) # vs append
        return list(countries)

    def get(self, request, *args, **kwargs):
        keyword = request.query_params.get('keyword', None)
        if keyword:
            # 假设您的 JSONB 字段名为 `data` 并且您想要搜索 `ArticleTitle` 键
            articles = Article.objects.filter(data__Article__ArticleTitle__icontains=keyword)
            formatted_articles = []
            for article in articles:
                article_data = article.data
                # 检查 'Abstract' 键是否存在于 'Article' 字典中
                abstract_texts = article_data['Article']['Abstract'].get('AbstractText', []) if 'Abstract' in \
                                                                                                article_data[
                                                                                                    'Article'] else []
                # print(f"Debug: Author: {article_data.get('AuthorList')}")

                formatted_article = {
                    'PMID': article_data.get('PMID'),
                    # ？返回的字段前端是不是可以不拿也不用
                    'DOI': article_data["Article"].get("ELocationID", [None])[0] if article_data["Article"].get(
                        "ELocationID", []) else None,

                    'PubDate': ' '.join([
                        article_data["Article"]["Journal"]["JournalIssue"]["PubDate"].get(part, "")
                        for part in ["Month", "Year"]
                    ]),

                    # for author in article_data.get("AuthorList",[])  # [] error:访问 'AuthorList' 键之前，先检查它是否存在于字典中。如果不存在，提供合适默认值（比如一个空列表）
                    # extract_countries_with_spacy   VS self._extract_countries_with_spacy
                    'Countries': self._extract_countries_with_spacy(article_data),

                    'Authors': ', '.join([author['ForeName'] + ' ' + author['LastName']
                                          for author in article_data.get('Article', {})
                                         .get('AuthorList', [])]),  # 为空 - 不出现逗号 - 后续额外处理一下细节

                    'Title': article_data['Article'].get('ArticleTitle', ''),
                    'Abstract': ' '.join(abstract_texts),
                    'Keywords': article_data.get('KeywordList', []),
                    'PublicationTypes': article_data['Article'].get('PublicationTypeList', []),
                    'ResearchMethods': None  # 或其他适当的默认值

                }
                # print(f"Debug: Author: {formatted_article['Authors']}")

                formatted_articles.append(formatted_article)

            return Response(formatted_articles)

        else:
            return Response({'error': 'Keyword is required'}, status=400)
