// import dayjs from 'dayjs';
// import React from 'react';
// import useStyles from './index.style';
// type ArticleListContentProps = {
//   data: {
//     content: React.ReactNode;
//     updatedAt: number;
//     owner: string;
//     href: string;
//   };
// };
// const ArticleListContent: React.FC<ArticleListContentProps> = ({
//   data: { content, updatedAt, owner, href },
// }) => {
//   const { styles } = useStyles();
//   return (
//     <div>
//       <div className={styles.description}>{content}</div>
//       <div className={styles.extra}>
//         <a href={href}>{owner}</a> 发布在 <a href={href}>{href}</a>
//         <em>{dayjs(updatedAt).format('YYYY-MM-DD HH:mm')}</em>
//       </div>
//     </div>
//   );
// };
// export default ArticleListContent;
//
//
//
//
// // import { Avatar, Tag } from 'antd';
// // import dayjs from 'dayjs';
// // import React from 'react';
// // import useStyles from './index.style';
// //
// // type ArticleData = {
// //   PMID: string;
// //   Authors: string;
// //   Title: string;
// //   Abstract: string;
// //   Keywords: string[];
// //   PublicationTypes: string[];
// //   // Add more fields as necessary
// // };
// //
// // type ArticleListContentProps = {
// //   article: ArticleData;
// // };
// //
// // const ArticleListContent: React.FC<ArticleListContentProps> = ({
// //   article: { PMID, Authors, Title, Abstract, Keywords, PublicationTypes },
// // }) => {
// //   const { styles } = useStyles();
// //   return (
// //     <div>
// //       <a href={`https://pubmed.ncbi.nlm.nih.gov/${PMID}/`} target="_blank" rel="noopener noreferrer">
// //         <h4>{Title}</h4>
// //       </a>
// //       <div className={styles.description}>{Abstract}</div>
// //       <div className={styles.extra}>
// //         <Avatar src="/path/to/author/avatar" size="small" /> {/* Placeholder for author avatar */}
// //         {Authors}
// //         <div>
// //           {PublicationTypes.map((type) => (
// //             <Tag color="blue" key={type}>{type}</Tag>
// //           ))}
// //         </div>
// //         {/* You can format the date as needed, perhaps passed in from the API */}
// //         <em>{dayjs().format('YYYY-MM-DD HH:mm')}</em>
// //       </div>
// //       {/* Render Keywords if necessary */}
// //       <div>
// //         {Keywords.map((keyword, idx) => (
// //           <Tag color="geekblue" key={idx}>{keyword}</Tag>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };
// //
// // export default ArticleListContent;



import dayjs from 'dayjs';
import React from 'react';
import useStyles from './index.style';
// import type { Article } from './data.d.ts';

type ArticleListContentProps = {
  // data: Article;
  data: {
    // Title: string;
    Abstract: string;
    Authors: string;

    // href: string; // 文章链接
  };
};

const ArticleListContent: React.FC<ArticleListContentProps> = ({
  data: {  Abstract, Authors},
}) => {
  const { styles } = useStyles();
  return (

    <div>
      <div className={styles.description}>{Abstract}</div>
      <div className={styles.extra}>
        {Authors} 发布在 <a href='#'> www.pubmed.com</a>
        {/*<em>{dayjs(updatedAt).format('YYYY-MM-DD HH:mm')}</em>*/}
      </div>
    </div>

    // <div>
    //   <h3 className={styles.title}>{articleTitle}</h3> {/* 显示文章标题 */}
    //   <div className={styles.description}>
    //     {abstract.join(' ')} {/* 显示文章摘要 */}
    //   </div>
    //   <div className={styles.extra}>
    //     {authorList.map((author, index) => ( // 显示作者列表
    //       <a key={index} href={href}>{`${author.foreName} ${author.lastName}`}</a>
    //     ))}
    //     发布在 <a href={href}>{href}</a>
    //     <em>{dayjs(updatedAt).format('YYYY-MM-DD HH:mm')}</em>
    //   </div>
    // </div>
  );
};

export default ArticleListContent;
