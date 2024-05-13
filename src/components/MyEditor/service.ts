import {Constants} from "@/util/constants";
import {request} from "@umijs/max";
// @ts-ignore
import qs from 'qs';

export const upload = (params: { [key: string]: any },options?: Record<string, any>) => {
  return request(Constants.uploadUrl, {
    method: 'POST',
    data: qs.stringify(params),
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    ...(options || {}),
  });
};
