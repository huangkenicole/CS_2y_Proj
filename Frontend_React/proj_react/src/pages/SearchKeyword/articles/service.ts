import { request } from '@umijs/max';
// import type { ListItemDataType, Params } from './data.d';

// export async function queryFakeList(
//   params: Params,
// ): Promise<{ data: { list: ListItemDataType[] } }> {
//   return request('/api/fake_list', {
//     params,
//   });
// }


export async function searchArticles(keyword: string) {
  return request('http://localhost:8000/api/search/keyword/', {
    params: { keyword },
  });
}

// 404
// export async function searchArticles(keyword: string) {
//   return request('/api/search/keyword/', {
//     params: { keyword },
//   });
// }

// 这样写后端：[14/Jan/2024 00:59:32] "GET /search/keywords?token%20=%20123&keyword=depression HTTP/1.1" 404 2456
// 但在生产环境中，您通常不会直接在代码中硬编码后端服务的 URL，因为这会导致在不同环境之间部署时出现问题。

// /api/search/keyword/

