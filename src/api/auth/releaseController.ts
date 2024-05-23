// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
const ng = '/auth';

/** 初始化获取接口 GET /release/getAllPath */
export async function getAllPath(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AUTH.getAllPathParams,
  options?: { [key: string]: any },
) {
  return request<AUTH.ResponseListInterfaceEntity>(`${ng}/release/getAllPath`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 登录 传参: name，password 示例：{"name":"admin","password":"admin"} POST /release/login */
export async function login(body: AUTH.UserDTO, options?: { [key: string]: any }) {
  return request<AUTH.ResponseString>(`${ng}/release/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 注册 传参: name，password, email 示例：{"name":"test111","password":"test111","email":"test111@qq.com"} POST /release/register */
export async function register(body: AUTH.UserDTO, options?: { [key: string]: any }) {
  return request<AUTH.ResponseVoid>(`${ng}/release/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
