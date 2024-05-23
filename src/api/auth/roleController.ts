// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
const ng = '/auth';

/** 新增角色 传参: name, description 示例:{"name":"新增","description":"新增"} POST /management/role/add */
export async function addRole(body: AUTH.RoleDTO, options?: { [key: string]: any }) {
  return request<AUTH.ResponseVoid>(`${ng}/management/role/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 角色绑定接口(增量绑定) 传参: roleId, interfaceIdList 示例:{"roleId":"SUPER_ADMIN","interfaceIdList":[1958, 1959]} POST /management/role/bindInterfaces */
export async function bindRoleInterfaces(
  body: AUTH.InterfaceRoleDTO,
  options?: { [key: string]: any },
) {
  return request<AUTH.ResponseInteger>(`${ng}/management/role/bindInterfaces`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 角色绑定菜单(重新绑定) 传参: roleId, menuIdList 示例:{"roleId":"SUPER_ADMIN","menuIdList":["da625f2ca05a4095bbabe8ef3b4cdbe7", "8b1436a4c1e542edbdcda5620d0dd24e"]} POST /management/role/bindMenus */
export async function bindMenus(body: AUTH.MenuRoleDTO, options?: { [key: string]: any }) {
  return request<AUTH.ResponseVoid>(`${ng}/management/role/bindMenus`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 角色绑定用户(增量绑定) 传参: roleId, userIdList 示例:{"roleId":"CUSTOMIZE_ROLE","userIdList":["78b61afc14d64a638d367f0dbf376b8e"]} POST /management/role/bindUsers */
export async function bindRoleUsers(body: AUTH.UserRoleDTO, options?: { [key: string]: any }) {
  return request<AUTH.ResponseInteger>(`${ng}/management/role/bindUsers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 删除角色 无用户使用该角色时可删除 传参: idList 示例:{"idList":["d73a1170396a4e4ab9f4b770eaee22b2"]} DELETE /management/role/deleteRoles */
export async function deleteRoles(body: AUTH.RoleDTO, options?: { [key: string]: any }) {
  return request<AUTH.ResponseVoid>(`${ng}/management/role/deleteRoles`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据传参获取角色下拉列表 GET /management/role/getAll */
export async function getAll(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AUTH.getAllParams,
  options?: { [key: string]: any },
) {
  return request<AUTH.ResponseListRoleDTO>(`${ng}/management/role/getAll`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 获取已绑定/未绑定接口分页 GET /management/role/getInterfacePage */
export async function getRoleInterfacePage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AUTH.getRoleInterfacePageParams,
  options?: { [key: string]: any },
) {
  return request<AUTH.ResponsePageInterfaceDTO>(`${ng}/management/role/getInterfacePage`, {
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

/** 获取菜单 GET /management/role/getMenuTree */
export async function getRoleMenuTree(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AUTH.getRoleMenuTreeParams,
  options?: { [key: string]: any },
) {
  return request<AUTH.ResponseListMenuDTO>(`${ng}/management/role/getMenuTree`, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 根据传参获取角色分页 GET /management/role/getPage */
export async function getRolePageBy(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AUTH.getRolePageByParams,
  options?: { [key: string]: any },
) {
  return request<AUTH.ResponsePageRoleDTO>(`${ng}/management/role/getPage`, {
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

/** 获取已绑定/未绑定用户分页 GET /management/role/getUserPage */
export async function getRoleUserPage(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AUTH.getRoleUserPageParams,
  options?: { [key: string]: any },
) {
  return request<AUTH.ResponsePageUserDTO>(`${ng}/management/role/getUserPage`, {
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

/** 获取已绑定/未绑定用户下拉列表 GET /management/role/getUsers */
export async function getRoleUsers(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: AUTH.getRoleUsersParams,
  options?: { [key: string]: any },
) {
  return request<AUTH.ResponseListUserDTO>(`${ng}/management/role/getUsers`, {
    method: 'GET',
    params: {
      // status has a default value: ACTIVE
      status: 'ACTIVE',
      ...params,
    },
    ...(options || {}),
  });
}

/** 角色绑定用户(重新绑定) 传参: roleId, userIdList 示例:{"roleId":"CUSTOMIZE_ROLE","userIdList":["78b61afc14d64a638d367f0dbf376b8e"]} POST /management/role/reBindUsers */
export async function reBindRoleUsers(body: AUTH.UserRoleDTO, options?: { [key: string]: any }) {
  return request<AUTH.ResponseVoid>(`${ng}/management/role/reBindUsers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 角色解绑接口 传参: roleId, interfaceIdList 示例:{"roleId":"SUPER_ADMIN","interfaceIdList":[1958, 1959]} DELETE /management/role/unbindInterfaces */
export async function unbindRoleInterfaces(
  body: AUTH.InterfaceRoleDTO,
  options?: { [key: string]: any },
) {
  return request<AUTH.ResponseInteger>(`${ng}/management/role/unbindInterfaces`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 角色解绑用户 传参: roleId, userIdList 示例:{"roleId":"CUSTOMIZE_ROLE","userIdList":["78b61afc14d64a638d367f0dbf376b8e"]} DELETE /management/role/unbindUsers */
export async function unbindRoleUsers(body: AUTH.UserRoleDTO, options?: { [key: string]: any }) {
  return request<AUTH.ResponseInteger>(`${ng}/management/role/unbindUsers`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 更新角色 传参: id, name, description 示例:{"id":"e32d1aa739cc41f69a436c5c42e58492","name":"更新","description":"更新"} PUT /management/role/update */
export async function updateRole(body: AUTH.RoleDTO, options?: { [key: string]: any }) {
  return request<AUTH.ResponseVoid>(`${ng}/management/role/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
