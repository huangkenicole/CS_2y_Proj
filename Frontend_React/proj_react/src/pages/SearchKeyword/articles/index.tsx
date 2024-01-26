import {LikeOutlined, LoadingOutlined, MessageOutlined, StarOutlined} from '@ant-design/icons';
import {useRequest} from '@umijs/max';
import {Button, Card, Col, Form, List, Row, Select, Spin, Tag} from 'antd';
import {DefaultOptionType} from 'antd/es/select';
import type {FC} from 'react';
import {useMemo, useState} from 'react';
import {categoryOptions} from '../mock';
import ArticleListContent from './components/ArticleListContent';
import StandardFormRow from './components/StandardFormRow';
import TagSelect from './components/TagSelect';
// import {queryFakeList} from './service';
// import { searchArticles } from './service';
import useStyles from './style.style';
import React from 'react';
import {Pagination} from 'antd';

const FormItem = Form.Item;

// const pageSize = 15;

// import type { Article } from './data.d.ts';
import type {ListItemDataType} from './data.d';

type ArticlesProps = {
  // data: ListItemDataType;
  data: ListItemDataType[]; // 要拿到数组形式的数据，否则dataSource={data}这里的获取会出错
  // data: {
  //   // Title: string;
  //   Abstract: string;
  //   Authors: string;
  //   updatedAt: number; // 更新时间
    loading: boolean; // Receive the loading prop // 设置loading icon spin Step 4/6


  // href: string; // 文章链接
  // };
};
// 确保 ArticlesProps 接口定义了一个 articles 数组 ↑


// const Articles: FC = () => {
const Articles: FC<ArticlesProps> = ({loading,data}) => {
// 设置loading icon spin Step 5/6
  const [form] = Form.useForm();

  const {styles} = useStyles();


  // const {data, reload, loading, loadMore, loadingMore} = useRequest(
  //   () =>
  //   // {
  //   //   return queryFakeList({
  //   //     count: pageSize,
  //   //   });
  //   // },
  //   {
  //     loadMore: true,
  //   },
  // );

  // const list = data?.list || [];


  // 分页状态 手动配置分页器1/4
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // 默认10条/页

  // 处理分页变化 改变页码时更新状态 手动配置分页器2/4
  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPageSize(pageSize);
    // 这里还可以根据需要加载新的数据
  };

  // 计算当前页面显示的数据 手动配置分页器3/4
  const currentData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);


  const setOwner = () => {
    form.setFieldsValue({
      owner: ['wzj'],
    });
  };

  const owners = [
    {
      id: 'wzj',
      name: '我自己',
    },
    {
      id: 'wjh',
      name: '吴家豪',
    },
  ];

  const IconText: React.FC<{
    type: string;
    text: React.ReactNode;
  }> = ({type, text}) => {
    switch (type) {
      case 'star-o':
        return (
          <span>
            <StarOutlined style={{marginRight: 8}}/>
            {text}
          </span>
        );
      case 'like-o':
        return (
          <span>
            <LikeOutlined style={{marginRight: 8}}/>
            {text}
          </span>
        );
      case 'message':
        return (
          <span>
            <MessageOutlined style={{marginRight: 8}}/>
            {text}
          </span>
        );
      default:
        return null;
    }
  };

  const formItemLayout = {
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 24},
      md: {span: 12},
    },
  };

  // const loadMoreDom = list.length > 0 && (
  //   <div style={{textAlign: 'center', marginTop: 16}}>
  //     <Button onClick={loadMore} style={{paddingLeft: 48, paddingRight: 48}}>
  //       {loadingMore ? (
  //         <span>
  //           <LoadingOutlined/> 加载中...
  //         </span>
  //       )
  //         : (
  //         '加载更多'
  //       )
  //       }
  //     </Button>
  //   </div>
  // );


  const ownerOptions = useMemo<DefaultOptionType[]>(
    () =>
      owners.map((item) => ({
        label: item.name,
        value: item.id,
      })),
    [owners],
  );


  return (
    <>
      <Card bordered={false}>
        <Form
          layout="inline"
          form={form}
          initialValues={{
            owner: ['ke', 'admin'],
          }}
          // onValuesChange={reload}
        >
          <StandardFormRow title="Publication Types" block style={{paddingBottom: 11}}>
            <FormItem name="category">
              <TagSelect expandable>
                {categoryOptions.map((category) => (
                  <TagSelect.Option value={category.value!} key={category.value}>
                    {category.label}
                  </TagSelect.Option>
                ))}
              </TagSelect>
            </FormItem>
          </StandardFormRow>
          <StandardFormRow title="Author" grid>
            <FormItem name="owner" noStyle>
              <Select
                mode="multiple"
                placeholder="选择 owner"
                style={{minWidth: '6rem'}}
                options={ownerOptions}
              />
            </FormItem>
            {/*<a className={styles.selfTrigger} onClick={setOwner}>*/}
            {/*  只看自己的*/}
            {/*</a>*/}
          </StandardFormRow>
          <StandardFormRow title="Other Options" grid last>
            <Row gutter={16}>
              <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                <FormItem {...formItemLayout} label="Sort By" name="user">
                  <Select
                    placeholder="不限"
                    style={{maxWidth: 200, width: '100%'}}
                    options={[
                      {
                        label: '李三',
                        value: 'lisa',
                      },
                    ]}
                  />
                </FormItem>
              </Col>
              <Col xl={8} lg={10} md={12} sm={24} xs={24}>
                <FormItem {...formItemLayout} label="Rate" name="rate">
                  <Select
                    placeholder="不限"
                    style={{maxWidth: 200, width: '100%'}}
                    options={[
                      {
                        label: '优秀',
                        value: 'good',
                      },
                    ]}
                  />
                </FormItem>
              </Col>
            </Row>
          </StandardFormRow>
        </Form>
      </Card>


      <Card
        style={{marginTop: 24}}
        bordered={false}
        bodyStyle={{padding: '8px 32px 32px 32px'}}
      >

        {/*// 设置loading icon spin Step 6/6*/}
        <Spin spinning={loading}>
        <List<ListItemDataType>
          size="large"
          // loading={loading} // 显示加载状态
          rowKey="PMID" //rowKey="id" 定义了列表中每一项的唯一标识符
          itemLayout="vertical"
          // loadMore={loadMoreDom}
          // dataSource={data}
          dataSource={currentData}
          // pagination={{ pageSize: 5 }}

          // 使用 item 渲染每个列表项
          // 在您的 List 组件中，dataSource 属性指定了列表的数据来源，它应该是一个数组。每个数组中的元素会被 renderItem 函数遍历，并渲染为一个列表项
          renderItem={(item) => (

            //  ******** 返回3个logo 收藏点赞评论 + title + 文献类型 + 文章内容组件 ********

            <List.Item
              // key={item.id}
              key={item.PMID}
              actions={[
                <IconText key="star" type="star-o" text={item.star}/>,
                <IconText key="like" type="like-o" text={item.like}/>,
                <IconText key="message" type="message" text={item.message}/>,

              ]}
              extra={<div className={styles.listItemExtra}/>}
            >

              <List.Item.Meta
                // title={
                //   <a className={styles.listItemMetaTitle} href={item.href}>
                //     {item.title}
                //   </a>
                // }
                title={
                  <a href={`/articles/${item.PMID}`}>
                    {item.Title}
                  </a>
                }


                // description={
                //   <span>
                //     <Tag>Ant Design</Tag>
                //     <Tag>设计语言</Tag>
                //     <Tag>蚂蚁金服</Tag>
                //   </span>
                // }
                description={
                  <span>
                    {item.PublicationTypes && item.PublicationTypes.length > 0 ? (
                      item.PublicationTypes.map((type, index) => (
                        <Tag key={index}>{type}</Tag> // 显示出版类型
                      ))) : (<Tag>None</Tag> // 如果没有出版类型，显示"None"
                    )}
                  </span>
                }


              />


              <ArticleListContent data={item}/>

            </List.Item>


          )}
        />
          </Spin>


      </Card>

      {/* 手动配置分页器4/4*/}
      <Pagination
        style={{marginTop: '16px'}} // Adjust the value as needed
        current={currentPage}
        pageSize={pageSize}
        total={data.length}
        onChange={handlePageChange}
        showSizeChanger
        showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}

        // ... 其他 Pagination 属性
      />

    </>
  );
};

export default Articles;
