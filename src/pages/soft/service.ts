import { request } from '@umijs/max';
import { Constants } from '@/util/constants';

export async function list(body: Record<string, any>, options?: { [key: string]: any }) {
  return request(Constants.apiUrl + 'soft/list', {
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
  return request(Constants.apiUrl + (body.id ? 'soft/update' : 'soft/save'), {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
export async function remove(body: Record<string, any>, options?: { [key: string]: any }) {
  return request(Constants.apiUrl + 'soft/delete', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
export async function tree(options?: { [key: string]: any }) {
  return request(Constants.apiUrl + 'soft/tree', {
    method: 'POST',
    ...(options || {}),
  });
}
export async function audit(body: Record<string, any>, options?: { [key: string]: any }) {
  return request(Constants.apiUrl + (body.status==1 ? 'soft/pass' : 'soft/reject'), {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
