import { request } from '@umijs/max';
import { Constants } from '@/util/constants';

export async function list(body: Record<string, any>, options?: { [key: string]: any }) {
  return request(Constants.apiUrl + 'appVersion/list', {
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

  const formValues = {...body};
  if(formValues.rangeDate){
    formValues.beginDate = formValues.rangeDate[0].format("YYYY-MM-DD 00:00:00");
    formValues.endDate = formValues.rangeDate[1].format("YYYY-MM-DD 23:59:59");
  }
  delete formValues.rangeDate;


  return request(Constants.apiUrl + (body.id ? 'appVersion/update' : 'appVersion/save'), {
    method: 'POST',
    data: formValues,
    ...(options || {}),
  });
}
export async function remove(body: Record<string, any>, options?: { [key: string]: any }) {
  return request(Constants.apiUrl + 'appVersion/delete', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
