import { request } from '@umijs/max';
import { Constants } from '@/util/constants';

export async function list(body: Record<string, any>, options?: { [key: string]: any }) {
  return request(Constants.apiUrl + 'dic/list', {
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
  return request(Constants.apiUrl + (body.id ? 'dic/update' : 'dic/save'), {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
export async function remove(body: Record<string, any>, options?: { [key: string]: any }) {
  return request(Constants.apiUrl + 'dic/delete', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
export async function tree(options?: { [key: string]: any }) {
  return request(Constants.apiUrl + 'dicCategory/list', {
    method: 'POST',
    ...(options || {}),
  });
}

export async function categorySave(body: Record<string, any>, options?: { [key: string]: any }) {
  return request(Constants.apiUrl + (body.id ? 'dicCategory/update' : 'dicCategory/save'), {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
export async function categoryRemove(body: Record<string, any>, options?: { [key: string]: any }) {
  return request(Constants.apiUrl + 'dicCategory/delete', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
