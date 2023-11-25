import {request} from '@umijs/max';
import {Constants} from '@/util/constants';

export async function list(body: Record<string, any>, options?: { [key: string]: any }) {
  return request(Constants.apiUrl + 'hotSearch/list', {
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

  return request(Constants.apiUrl + (body.id ? 'hotSearch/update' : 'hotSearch/save'), {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
export async function remove(body: Record<string, any>, options?: { [key: string]: any }) {
  return request(Constants.apiUrl + 'hotSearch/delete', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
