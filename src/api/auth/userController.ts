// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
const ng = '/auth';

/** 用户绑定接口(增量绑定) 传参: userId, InterfaceIdList 示例: {"userId":"78b61afc14d64a638d367f0dbf376b8e","interfaceIdList":[1957]} POST /management/user/bindInterfaces */
export async function bindUserInterfaces(
  body: AUTH.InterfaceUserDTO,
  options?: { [key: string]: any },
) {
  return request<AUTH.ResponseInteger>(`${ng}/management/user/bindInterfaces`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户绑定角色(增量绑定) 传参: userId, roleIdList 示例: {"userId":"78b61afc14d64a638d367f0dbf376b8e","roleIdList":["CUSTOMIZE_ROLE"]} POST /management/user/bindRoles */
export async function bindUserRoles(body: AUTH.UserRoleDTO, options?: { [key: string]: any }) {
  return request<AUTH.ResponseInteger>(`${ng}/management/user/bindRoles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取用户信息 GET /management/user/get */
export async function getUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AUTH.getUserParams,
  options?: { [key: string]: any },
) {
  return request<AUTH.ResponseUserDTO>(`${ng}/management/user/get`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取当前用户详情 GET /management/user/getCurrentUser */
export async function getCurrentUser(options?: { [key: string]: any }) {
  return request<AUTH.ResponseAuthUserDTO>(`${ng}/management/user/getCurrentUser`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取已绑定/未绑定接口分页 GET /management/user/getInterfacePage */
export async function getUserInterfacePage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AUTH.getUserInterfacePageParams,
  options?: { [key: string]: any },
) {
  return request<AUTH.ResponsePageInterfaceDTO>(`${ng}/management/user/getInterfacePage`, {
    method: 'GET',
    params: {
      // current has a default value: 1
      current: '1',
      // pageSize has a default value: 10
      pageSize: '10',
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取可访问菜单 GET /management/user/getMenuTree */
export async function getMenuTree(options?: { [key: string]: any }) {
  return request<AUTH.ResponseListMenuDTO>(`${ng}/management/user/getMenuTree`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 根据传参获取用户分页列表 GET /management/user/getPage */
export async function getUserPageBy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AUTH.getUserPageByParams,
  options?: { [key: string]: any },
) {
  return request<AUTH.ResponsePageUserDTO>(`${ng}/management/user/getPage`, {
    method: 'GET',
    params: {
      // current has a default value: 1
      current: '1',
      // pageSize has a default value: 10
      pageSize: '10',
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取已绑定/未绑定角色分页 GET /management/user/getRolePage */
export async function getUserRolePage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AUTH.getUserRolePageParams,
  options?: { [key: string]: any },
) {
  return request<AUTH.ResponsePageRoleDTO>(`${ng}/management/user/getRolePage`, {
    method: 'GET',
    params: {
      // current has a default value: 1
      current: '1',
      // pageSize has a default value: 10
      pageSize: '10',
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取已绑定/未绑定角色下拉列表 GET /management/user/getRoles */
export async function getUserRoles(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AUTH.getUserRolesParams,
  options?: { [key: string]: any },
) {
  return request<AUTH.ResponseListRoleDTO>(`${ng}/management/user/getRoles`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 用户绑定角色(重新绑定) 传参: userId, roleIdList 示例: {"userId":"78b61afc14d64a638d367f0dbf376b8e","roleIdList":["CUSTOMIZE_ROLE"]} POST /management/user/reBindRoles */
export async function reBindUserRoles(body: AUTH.UserRoleDTO, options?: { [key: string]: any }) {
  return request<AUTH.ResponseVoid>(`${ng}/management/user/reBindRoles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户解绑接口 传参: userId, InterfaceIdList 示例: {"userId":"78b61afc14d64a638d367f0dbf376b8e","interfaceIdList":[1957]} DELETE /management/user/unbindInterfaces */
export async function unbindUserInterfaces(
  body: AUTH.InterfaceUserDTO,
  options?: { [key: string]: any },
) {
  return request<AUTH.ResponseInteger>(`${ng}/management/user/unbindInterfaces`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户解绑角色 传参: userId, roleIdList 示例: {"userId":"78b61afc14d64a638d367f0dbf376b8e","roleIdList":["CUSTOMIZE_ROLE"]} DELETE /management/user/unbindRoles */
export async function unbindUserRoles(body: AUTH.UserRoleDTO, options?: { [key: string]: any }) {
  return request<AUTH.ResponseInteger>(`${ng}/management/user/unbindRoles`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新用户信息 传参 id, name, email, status,roleIdList 示例:{"id":"78b61afc14d64a638d367f0dbf376b8e","name":"更新","email":"genxing@qq.com","status":"INACTIVE","roleIdList":["SUPER_ADMIN"]}不传roleIdList不更新roleIdList，解绑所有传[] PUT /management/user/update */
export async function updateUser(body: AUTH.UserDTO, options?: { [key: string]: any }) {
  return request<AUTH.ResponseVoid>(`${ng}/management/user/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
