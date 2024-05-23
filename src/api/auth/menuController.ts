// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
const ng = '/auth';

/** 添加菜单 传参: path,name,icon,parentId,order 示例：{"path":"/test","name":"测试","icon":"测试","order":1} POST /management/menu/add */
export async function addMenu(body: AUTH.MenuDTO, options?: { [key: string]: any }) {
  return request<AUTH.ResponseVoid>(`${ng}/management/menu/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除菜单 传参: idList 示例：{"idList":["da625f2ca05a4095bbabe8ef3b4cdbe7"]} DELETE /management/menu/deleteMenus */
export async function deleteMenus(body: AUTH.MenuDTO, options?: { [key: string]: any }) {
  return request<AUTH.ResponseVoid>(`${ng}/management/menu/deleteMenus`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取树型菜单 GET /management/menu/getTree */
export async function getTree(options?: { [key: string]: any }) {
  return request<AUTH.ResponseListMenuDTO>(`${ng}/management/menu/getTree`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 更新菜单 传参: id,path,name,icon,parentId,order 示例：{"id":"da625f2ca05a4095bbabe8ef3b4cdbe7","path":"/test","name":"测试","icon":"测试","order":1} PUT /management/menu/update */
export async function updateMenu(body: AUTH.MenuDTO, options?: { [key: string]: any }) {
  return request<AUTH.ResponseVoid>(`${ng}/management/menu/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
