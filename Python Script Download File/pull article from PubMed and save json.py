""" Notice
如果要添加mesh搜索的话，需要加4步： add mesh Step1 + add mesh Step2 + add mesh Step3 + add mesh Step4
"""
# ，PubMed有Biopython中的Entrez模块
from Bio import Entrez  # 需要安装Biopython库，该库里有Entrez数据库，其下面包括了PubMed 和 PubMed Central。[记得区别这两个]
# 这一步安装如果报错的Solution: pip install --upgrade setuptools
# request库？
import xmltodict
import json


def search(query):
    # Add MeSH term to the query
    mesh_query = f"{query} [mesh]"  # add mesh Step1
    search
    Entrez.email = 'your.email@example.com'
    handle = Entrez.esearch(db='pubmed',  # 数据库
                            sort='relevance',  # 相当于Best match
                            retmax='5000',  # 读取数据条数 # 5000-4994  5020能拉到5015 ？？代码问题吗
                            retmode='xml',  # json会报错，好像是默认xml
                            term=query)  # esarch返回唯一 ID (UID) 列表
    results = Entrez.read(handle)
    return results


def fetch_details(id_list):
    ids = ','.join(id_list)
    Entrez.email = 'your.email@example.com'
    handle = Entrez.efetch(db='pubmed',
                           retmode='xml',
                           id=ids)
    results = Entrez.read(handle)
    return results


"""
把所有数据存在一个单独的json文件里 + 保存文件操作
"""
def getSingleFile_xmlToJson(id_list):
    ids = ','.join(id_list)
    Entrez.email = 'your.email@example.com'
    handle = Entrez.efetch(db='pubmed',
                           retmode='xml',
                           id=ids)

    results_xml = handle.read()  # Read the raw XML data
    # return resultsin_xml

    # Convert XML to a Python dictionary
    parsed_data = xmltodict.parse(results_xml)  # pip install xmltodict

    # Convert the Python dictionary to JSON
    json_data = json.dumps(parsed_data, indent=2)
    print(json_data)

    """
    Save the JSON data to a local file, Notice:
    json.dump用于将Python对象写入文件
    json.dumps用于将Python对象转换为JSON格式的字符串
    """

    # with open('pubmed_results.json', 'w') as f:
    #     json.dump(json_data, f)  # 这个输出的文件里的文本是一个长字符串，并且复制到json编辑器中会报错

    with open('pubmed_results.json', 'w') as f:
        f.write(json_data)
    print("JSON data has been exported to 'pubmed_results.json' ")


def get_xml_to_json(article):
    # Assuming 'MedlineCitation' is the key for each article in the results
    article_data = article['MedlineCitation']
    json_data = json.dumps(article_data, indent=2)
    return json_data


def saveSeperateFile_xmlToJson(json_data, index, path):
    # file = f'{path}/pubmed_{index}.json'  写成一行的形式
    filename = f'pubmed_{index}.json'
    file = path+'/'+filename

    with open(file, 'w') as f:
        f.write(json_data) # 文件没有会自动创建、路径需要手动
    print(f"{index} json has been exported to '{filename}' :)")


if __name__ == '__main__':

    results = search('physical activity prescription')
    id_list = results['IdList']
    papers = fetch_details(id_list)

    # xml_data = fetch_details(id_list)
    # print(xml_data)

    # 把所有数据存在一个单独的json文件里 + 保存文件操作
    # getSingleFile_xmlToJson(id_list)

    output_path = '../PubmedTestData/physical activity prescription' # 不写../会找不到路径
    # # 一篇文章 对应 一个json
    # for i, article in enumerate(papers['PubmedArticle']): # PubmedArticle 二级 只有一个
    #     json_data = get_xml_to_json(article)
    #     saveSeperateFile_xmlToJson(json_data, i+1, path=output_path)



    for i, paper in enumerate(papers['PubmedArticle']):
        if 'MeshHeadingList' in paper['MedlineCitation']:
            # Extract MeSH terms if available
            mesh_terms = paper['MedlineCitation']['MeshHeadingList']  # add mesh Step2
            mesh_terms_str = ', '.join([mesh_term['DescriptorName'] for mesh_term in mesh_terms]) # add mesh Step3

            json_data = get_xml_to_json(paper)
            saveSeperateFile_xmlToJson(json_data, i + 1, path=output_path)

            print("{}) {}".format(i+1, paper['MedlineCitation']['Article']['ArticleTitle']))
            print(f"   MeSH Terms: {mesh_terms_str}\n") # add mesh Step4


