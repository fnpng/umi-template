// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
const ng = '/auth';

/** 接口绑定角色(增量绑定) 传参: interfaceId, roleIdList 示例:{"interfaceId":1964, "roleIdList":["SUPER_ADMIN"]} POST /management/Interface/bindRoles */
export async function bindInterfaceRoles(
  body: AUTH.InterfaceRoleDTO,
  options?: { [key: string]: any },
) {
  return request<AUTH.ResponseInteger>(`${ng}/management/Interface/bindRoles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 接口绑定用户(增量绑定) 传参: interfaceId, roleIdList 示例:{"interfaceId":1964, "userIdList":["1"]} POST /management/Interface/bindUsers */
export async function bindInterfaceUsers(
  body: AUTH.InterfaceUserDTO,
  options?: { [key: string]: any },
) {
  return request<AUTH.ResponseInteger>(`${ng}/management/Interface/bindUsers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 获取接口信息 GET /management/Interface/get */
export async function getInterface(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AUTH.getInterfaceParams,
  options?: { [key: string]: any },
) {
  return request<AUTH.ResponseInterfaceDTO>(`${ng}/management/Interface/get`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取接口分类列表 GET /management/Interface/getCategory */
export async function getCategory(options?: { [key: string]: any }) {
  return request<AUTH.ResponseMapStringListInterfaceDTO>(`${ng}/management/Interface/getCategory`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 根据传参获取接口分页列表 GET /management/Interface/getPage */
export async function getInterfacePage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AUTH.getInterfacePageParams,
  options?: { [key: string]: any },
) {
  return request<AUTH.ResponsePageInterfaceDTO>(`${ng}/management/Interface/getPage`, {
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

/** 获取已绑定/未绑定角色分页 GET /management/Interface/getRolePage */
export async function getInterfaceRolePage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AUTH.getInterfaceRolePageParams,
  options?: { [key: string]: any },
) {
  return request<AUTH.ResponsePageRoleDTO>(`${ng}/management/Interface/getRolePage`, {
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

/** 获取已绑定/未绑定角色下拉列表 GET /management/Interface/getRoles */
export async function getInterfaceRoles(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AUTH.getInterfaceRolesParams,
  options?: { [key: string]: any },
) {
  return request<AUTH.ResponseListRoleDTO>(`${ng}/management/Interface/getRoles`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取已绑定/未绑定用户分页 GET /management/Interface/getUserPage */
export async function getInterfaceUserPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AUTH.getInterfaceUserPageParams,
  options?: { [key: string]: any },
) {
  return request<AUTH.ResponsePageUserDTO>(`${ng}/management/Interface/getUserPage`, {
    method: 'GET',
    params: {
      // status has a default value: ACTIVE
      status: 'ACTIVE',
      // current has a default value: 1
      current: '1',
      // pageSize has a default value: 10
      pageSize: '10',
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取已绑定/未绑定用户下拉列表 GET /management/Interface/getUsers */
export async function getInterfaceUsers(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AUTH.getInterfaceUsersParams,
  options?: { [key: string]: any },
) {
  return request<AUTH.ResponseListUserDTO>(`${ng}/management/Interface/getUsers`, {
    method: 'GET',
    params: {
      // status has a default value: ACTIVE
      status: 'ACTIVE',
      ...params,
    },
    ...(options || {}),
  });
}

/** 接口绑定角色(重新绑定) 传参: interfaceId, roleIdList 示例:{"interfaceId":1964, "roleIdList":["SUPER_ADMIN"]} POST /management/Interface/reBindRoles */
export async function reBindInterfaceRoles(
  body: AUTH.InterfaceRoleDTO,
  options?: { [key: string]: any },
) {
  return request<AUTH.ResponseVoid>(`${ng}/management/Interface/reBindRoles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 接口绑定用户(重新绑定) 传参: interfaceId, roleIdList 示例:{"interfaceId":1964, "userIdList":["1"]} POST /management/Interface/reBindUsers */
export async function reBindInterfaceUsers(
  body: AUTH.InterfaceUserDTO,
  options?: { [key: string]: any },
) {
  return request<AUTH.ResponseVoid>(`${ng}/management/Interface/reBindUsers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 接口解绑角色 传参: interfaceId, roleIdList 示例:{"interfaceId":1964, "roleIdList":["SUPER_ADMIN"]} DELETE /management/Interface/unbindRoles */
export async function unbindInterfaceRoles(
  body: AUTH.InterfaceRoleDTO,
  options?: { [key: string]: any },
) {
  return request<AUTH.ResponseInteger>(`${ng}/management/Interface/unbindRoles`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 接口解绑用户 传参: interfaceId, roleIdList 示例:{"interfaceId":1964, "userIdList":["1"]} DELETE /management/Interface/unbindUsers */
export async function unbindInterfaceUsers(
  body: AUTH.InterfaceUserDTO,
  options?: { [key: string]: any },
) {
  return request<AUTH.ResponseInteger>(`${ng}/management/Interface/unbindUsers`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新接口绑定信息(重新绑定) 传参 id, roleIdList, userIdList 示例:{"id":"78b61afc14d64a638d367f0dbf376b8e","roleIdList":["SUPER_ADMIN"],"userIdList":["1"]}不传*IdList不更新*IdList，解绑所有传[] PUT /management/Interface/update */
export async function updateInterface(body: AUTH.InterfaceDTO, options?: { [key: string]: any }) {
  return request<AUTH.ResponseVoid>(`${ng}/management/Interface/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
