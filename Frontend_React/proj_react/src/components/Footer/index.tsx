import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright="Powered by Ke Huang"
      links={[
        {
          key: 'bokeyuan-link',
          title: 'MyBlog',
          href: 'https://www.cnblogs.com/huangkenicole/',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/huangkenicole',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
