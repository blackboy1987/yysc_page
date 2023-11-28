import { request } from '@umijs/max';
import { Constants } from '@/util/constants';

export async function homeCenterBar(body: Record<string, any>, options?: { [key: string]: any }) {
  return request(Constants.apiUrl + 'homeCenterBar', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
export async function homeCenterBarSave(body: Record<string, any>, options?: { [key: string]: any }) {
  return request(Constants.apiUrl + 'homeCenterBarSave', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
