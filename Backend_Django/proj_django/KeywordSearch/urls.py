from django.urls import path
from KeywordSearch.views import ArticleSearchView

urlpatterns = [
    # ... other url patterns
    # path('keyword/', search_articles, name='keyword_search'),
    path('keyword/', ArticleSearchView.as_view(), name='keyword_search'),
    # path('article/<string:keword>/', ArticleDataView.as_view(), name='article-data'),

]