
export type Member = {
  avatar: string;
  name: string;
  id: string;
};

export interface Params {
  count: number;
}

export interface ListItemDataType {
  // id: string;
  // owner: string;
  // // title: string;
  // avatar: string;
  // cover: string;
  // status: 'normal' | 'exception' | 'active' | 'success';
  // percent: number;
  // logo: string;
  // href: string;
  // body?: any;
  // updatedAt: number;
  // createdAt: number;
  // subDescription: string;
  // description: string;
  // activeUser: number;
  // newUser: number;
  star: number;
  like: number;
  message: number;
  // content: string;
  // members: Member[];

  PMID: string;
  Authors: string;
  Title: string;
  Abstract: string;
  Keywords: string[];
  PublicationTypes: string[];
  ResearchMethods: null;
}

// 根据您提供的后端返回数据的结构，这些数据已经是一个数组，每个元素都是一个对象，每个对象包含了一个文章的所有信息。

// export type TableListPagination = {
//   total: number;
//   pageSize: number;
//   current: number;
// };


