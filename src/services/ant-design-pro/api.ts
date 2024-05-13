// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
import {Constants} from "@/util/constants";

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>(Constants.apiUrl+'currentUser', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>(Constants.apiUrl+'outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>(Constants.apiUrl+'login', {
    method: 'POST',
    data: body,
    ...(options || {}),
  });
}
