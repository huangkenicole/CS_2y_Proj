import {PageContainer} from '@ant-design/pro-components';
import {useLocation, useMatch} from '@umijs/max';
import {Col, Row, Input, Spin} from 'antd';
import type {FC} from 'react';
import Articles from "@/pages/SearchKeyword/articles";
import {searchArticles} from "@/pages/SearchKeyword/articles/service";
import React, {useState, Suspense, useRef} from "react";
import ArticleListContent from "@/pages/SearchKeyword/articles/components/ArticleListContent";
import {useRequest} from "@@/exports";
import TopSearch from "@/pages/dashboard/analysis/components/TopSearch";

import {
  ProTable,
} from '@ant-design/pro-components';

// type SearchProps = {
//   children?: React.ReactNode;
// };
//
//
//
// const Search: FC<SearchProps> = () => {
//   const location = useLocation();
//   let match = useMatch(location.pathname);
//
//   // handleFormSubmit 用户点击了搜索按钮
//   const handleFormSubmit = (value: string) => {
//     // eslint-disable-next-line no-console
//     console.log(value);
//   };

// 假设您的 mock 数据如下
const mockTableData = [
  {key: '1', rank: '1', keyword: 'depression', count: 275, percentage: '16%'},
  {key: '2', rank: '2', keyword: 'anxiety', count: 275, percentage: '16%'},
  {key: '3', rank: '3', keyword: 'physical activity prescription', count: 275, percentage: '16%'},
  {key: '4', rank: '4', keyword: 'exercise', count: 275, percentage: '16%'},
  {key: '5', rank: '5', keyword: 'test keywords...', count: 275, percentage: '16%'},
  {key: '6', rank: '6', keyword: 'test keywords...', count: 275, percentage: '16%'},
  {key: '7', rank: '7', keyword: 'test keywords...', count: 275, percentage: '16%'},
  {key: '8', rank: '8', keyword: 'test keywords...', count: 275, percentage: '16%'},
  // ...其他 mock 数据项
];

const columns = [
  {
    title: 'Rank',
    dataIndex: 'rank',
    key: 'rank',
  },
  {
    title: 'Searched Keywords',
    dataIndex: 'keyword',
    key: 'keyword',
  },
  {
    title: 'Search Counts',
    dataIndex: 'count',
    key: 'count',
  },
  // ...其他列定义
];


const Search = () => {
  const [articles, setArticles] = useState([]); // 用于存储从后端检索到的文章数据
  const [loading, setLoading] = useState(false); // 设置loading icon spin Step 1/6

//   // 假设您需要在状态中使用这个类型
// const [visitData2, searchData] = useState<AnalysisData>();


  const handleFormSubmit = async (keyword: string) => {
    // const handleFormSubmit = async (keyword) => { 参数keyword没有明确的类型注解，因此编译器无法推断其类型。因此默认将其类型设置为any。这通常不是一个好的做法，因为any类型基本上关闭了TypeScript的类型检查功能。
    try {
      setLoading(true); // 设置loading icon spin Step 2/6

      const response = await searchArticles(keyword);
      // if (response && response.articles) { // 假设后端返回一个名为 articles 的数组
      //   setArticles(response.articles); // 更新状态以存储检索到的文章
      if (response)
        setArticles(response);  // 给if 加{} 报错说要写finally 而不是else
      // console.log(response);
      else {
        // 处理后端没有返回预期数据的情况
        console.error('No articles found in the response'); // **** 重要返回提示！！ 区别下方的catch
      }
      // setLoading(false);
    } catch (error) {
      console.error('Error fetching articles:', error);
      // setLoading(false);
    } finally {
      setLoading(false); // Set loading to false when the search is complete (success or failure)
      // 设置loading icon spin Step 3/6
    }

  };


  return (
    <PageContainer
      content={
        <div style={{textAlign: 'center'}}>
          <Input.Search
            placeholder="Please enter keyword to search"
            enterButton="Search"
            size="large"
            onSearch={handleFormSubmit}  // 将 handleFormSubmit 函数绑定到搜索框
            style={{maxWidth: 522, width: '100%'}}
          />
        </div>
      }
    >
      {/*直接渲染 Articles 组件 */}
      {/*<Articles />*/}
      {/*<Articles data={item}/>*/}
      {/*<Articles data={articles}/>*/}


      <Row gutter={24}>
        <Col xl={18} lg={24} md={24} sm={24} xs={24}>
          {/*// 设置loading icon spin Step 3/6*/}
          <Articles loading={loading} data={articles}/>
        </Col>
        <Col xl={6} lg={24} md={24} sm={24} xs={24}>
          <ProTable
            columns={columns}
            dataSource={mockTableData}
            pagination={{pageSize: 5}}
            search={false}
          />

        </Col>
      </Row>

    </PageContainer>
  );
};

export default Search;
