import { request } from '@umijs/max';
import { Constants } from '@/util/constants';

export async function list(body: Record<string, any>, options?: { [key: string]: any }) {
  return request(Constants.apiUrl + 'siteConfig/list', {
    method: 'POST',
    data: {
      ...body,
      pageNumber: body.current || 1,
    },
    ...(options || {}),
  }).then((result) => {
    return {
      success: true,
      data: result.data.content,
      total: result.data.total,
    };
  });
}
export async function save(body: Record<string, any>, options?: { [key: string]: any }) {
  return request(Constants.apiUrl + (body.id ? 'siteConfig/update' : 'siteConfig/save'), {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
export async function remove(body: Record<string, any>, options?: { [key: string]: any }) {
  return request(Constants.apiUrl + 'siteConfig/delete', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
