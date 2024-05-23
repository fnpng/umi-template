declare namespace AUTH {
  type AuthUserDTO = {
    id?: string;
    name?: string;
    email?: string;
    password?: string;
    roleIdList?: string[];
    roleIds?: string;
    status?: 'ACTIVE' | 'INACTIVE';
    createdAt?: string;
    updatedAt?: string;
    interfaceList?: InterfaceDTO[];
  };

  type getAllParams = {
    /** 角色名称 */
    name?: string;
    /** 角色类型 DEFAULT:默认 CUSTOMIZE:自定义 */
    type?: 'DEFAULT' | 'CUSTOMIZE';
    /** 角色描述 */
    description?: any;
  };

  type getAllPathParams = {
    /** 服务swagger地址 */
    path: string;
  };

  type getInterfacePageParams = {
    /** 接口请求地址 */
    path?: string;
    /** 接口请求方式 */
    method?: string;
    /** 接口描述 */
    description?: string;
    /** 页码 */
    current: number;
    /** 数量 */
    pageSize: number;
  };

  type getInterfaceParams = {
    /** 接口id */
    id: number;
  };

  type getInterfaceRolePageParams = {
    /** 查询类型ALL:所有,BIND:已绑定,UNBIND:未绑定 */
    selectType: 'BIND' | 'UNBIND';
    /** 接口id */
    interfaceId: number;
    /** 角色名 */
    name?: string;
    description?: string;
    /** 角色类型 */
    type?: 'DEFAULT' | 'CUSTOMIZE';
    /** 页码 */
    current: number;
    /** 数量 */
    pageSize: number;
  };

  type getInterfaceRolesParams = {
    /** 查询类型ALL:所有,BIND:已绑定,UNBIND:未绑定 */
    selectType: 'BIND' | 'UNBIND';
    /** 接口id */
    interfaceId: number;
    /** 角色名 */
    name?: string;
    /** 角色类型 */
    type?: 'DEFAULT' | 'CUSTOMIZE';
  };

  type getInterfaceUserPageParams = {
    /** 查询类型ALL:所有,BIND:已绑定,UNBIND:未绑定 */
    selectType: 'BIND' | 'UNBIND';
    /** 接口id */
    interfaceId: number;
    /** 用户名 */
    name?: string;
    /** 邮箱 */
    email?: string;
    /** 账户状态 */
    status?: 'ACTIVE' | 'INACTIVE';
    /** 页码 */
    current: number;
    /** 数量 */
    pageSize: number;
  };

  type getInterfaceUsersParams = {
    /** 查询类型ALL:所有,BIND:已绑定,UNBIND:未绑定 */
    selectType: 'BIND' | 'UNBIND';
    /** 接口id */
    interfaceId: number;
    /** 用户名 */
    name?: string;
    /** 账户状态 */
    status?: 'ACTIVE' | 'INACTIVE';
  };

  type getRoleInterfacePageParams = {
    /** 查询类型ALL:所有,BIND:已绑定,UNBIND:未绑定 */
    selectType: 'BIND' | 'UNBIND';
    /** 角色id */
    roleId: string;
    /** 接口请求地址 */
    path?: string;
    /** 接口请求方式 */
    method?: string;
    /** 接口描述 */
    description?: string;
    /** 页码 */
    current: number;
    /** 数量 */
    pageSize: number;
  };

  type getRoleMenuTreeParams = {
    /** 角色id */
    roleId: string;
  };

  type getRolePageByParams = {
    /** 角色名称 */
    name?: string;
    /** 角色描述 */
    description?: string;
    /** 角色类型 DEFAULT:默认 CUSTOMIZE:自定义 */
    type?: 'DEFAULT' | 'CUSTOMIZE';
    /** 页码 */
    current: number;
    /** 数量 */
    pageSize: number;
  };

  type getRoleUserPageParams = {
    /** 查询类型ALL:所有,BIND:已绑定,UNBIND:未绑定 */
    selectType: 'BIND' | 'UNBIND';
    /** 角色id */
    roleId: string;
    /** 用户名 */
    name?: string;
    /** 邮箱 */
    email?: string;
    /** 账户状态 */
    status?: 'ACTIVE' | 'INACTIVE';
    /** 页码 */
    current: number;
    /** 数量 */
    pageSize: number;
  };

  type getRoleUsersParams = {
    /** 查询类型ALL:所有,BIND:已绑定,UNBIND:未绑定 */
    selectType: 'BIND' | 'UNBIND';
    /** 角色id */
    roleId: string;
    /** 用户名 */
    name?: string;
    /** 账户状态 */
    status?: 'ACTIVE' | 'INACTIVE';
  };

  type getUserInterfacePageParams = {
    /** 查询类型ALL:所有,BIND:已绑定,UNBIND:未绑定 */
    selectType: 'BIND' | 'UNBIND';
    /** 用户id */
    userId: string;
    /** 接口路径 */
    path?: string;
    /** 接口方式 */
    method?: string;
    /** 接口描述 */
    description?: string;
    /** 页码 */
    current: number;
    /** 数量 */
    pageSize: number;
  };

  type getUserPageByParams = {
    /** 用户 */
    name?: string;
    /** 邮箱 */
    email?: string;
    /** 账户状态 */
    status?: 'ACTIVE' | 'INACTIVE';
    /** 页码 */
    current: number;
    /** 数量 */
    pageSize: number;
  };

  type getUserParams = {
    /** 用户Id */
    id: string;
  };

  type getUserRolePageParams = {
    /** 查询类型ALL:所有,BIND:已绑定,UNBIND:未绑定 */
    selectType: 'BIND' | 'UNBIND';
    /** 用户id */
    userId: string;
    /** 角色名 */
    name?: string;
    description?: string;
    /** 角色类型 */
    type?: 'DEFAULT' | 'CUSTOMIZE';
    /** 页码 */
    current: number;
    /** 数量 */
    pageSize: number;
  };

  type getUserRolesParams = {
    /** 查询类型ALL:所有,BIND:已绑定,UNBIND:未绑定 */
    selectType: 'BIND' | 'UNBIND';
    /** 用户id */
    userId: string;
    /** 角色名 */
    name?: string;
    /** 角色类型 */
    type?: 'DEFAULT' | 'CUSTOMIZE';
  };

  type InterfaceDTO = {
    /** 主键id */
    id?: number;
    /** 接口请求地址 */
    path?: string;
    /** 接口请求方式 */
    method?: string;
    /** 接口描述 */
    description?: string;
    /** 接口时间 */
    createdAt?: string;
    /** 更新时间 */
    updatedAt?: string;
    /** 更新人 */
    updatedBy?: string;
    /** 创建人 */
    createdBy?: string;
    pageSize?: number;
    current?: number;
    roleId?: string;
    roleName?: string;
    /** 角色id列表 */
    roleIdList?: string[];
    /** 用户id列表 */
    userIdList?: string[];
  };

  type InterfaceEntity = {
    id?: number;
    version?: number;
    createdAt?: string;
    createdBy?: string;
    updatedAt?: string;
    updatedBy?: string;
    path?: string;
    method?: string;
    description?: string;
  };

  type InterfaceRoleDTO = {
    /** 接口id */
    interfaceId?: number;
    /** 角色id */
    roleId?: string;
    /** 角色id列表 */
    roleIdList?: string[];
    /** 接口id列表 */
    interfaceIdList?: number[];
  };

  type InterfaceUserDTO = {
    /** 接口id */
    interfaceId?: number;
    /** 用户id */
    userId?: string;
    /** 用户id列表 */
    userIdList?: string[];
    /** 接口id列表 */
    interfaceIdList?: number[];
  };

  type MenuDTO = {
    /** 主键id */
    id?: string;
    /** 主键id列表 */
    idList?: string[];
    /** 菜单路径 */
    path?: string;
    /** 菜单名称 */
    name?: string;
    /** 菜单图标 */
    icon?: string;
    /** 父级菜单Id */
    parentId?: string;
    /** 菜单顺序 */
    order?: number;
    /** 绑定状态 */
    bindStatus?: boolean;
    /** 城建时间 */
    createdAt?: string;
    /** 更新时间 */
    updatedAt?: string;
    /** 更新人 */
    updatedBy?: string;
    /** 创建人 */
    createdBy?: string;
    pageSize?: number;
    current?: number;
    childMenuList?: MenuDTO[];
  };

  type MenuRoleDTO = {
    /** 菜单主键id */
    menuId?: string;
    /** 角色主键id */
    roleId?: string;
    /** 角色id列表 */
    roleIdList?: string[];
    /** 菜单id列表 */
    menuIdList?: string[];
  };

  type PageInterfaceDTO = {
    list?: InterfaceDTO[];
    current?: number;
    pageSize?: number;
    totalPages?: number;
    total?: number;
  };

  type PageRoleDTO = {
    list?: RoleDTO[];
    current?: number;
    pageSize?: number;
    totalPages?: number;
    total?: number;
  };

  type PageUserDTO = {
    list?: UserDTO[];
    current?: number;
    pageSize?: number;
    totalPages?: number;
    total?: number;
  };

  type ResponseAuthUserDTO = {
    data?: AuthUserDTO;
    code?: number;
    statusCode?: number;
    message?: string;
  };

  type ResponseInteger = {
    data?: number;
    code?: number;
    statusCode?: number;
    message?: string;
  };

  type ResponseInterfaceDTO = {
    data?: InterfaceDTO;
    code?: number;
    statusCode?: number;
    message?: string;
  };

  type ResponseListInterfaceEntity = {
    data?: InterfaceEntity[];
    code?: number;
    statusCode?: number;
    message?: string;
  };

  type ResponseListMenuDTO = {
    data?: MenuDTO[];
    code?: number;
    statusCode?: number;
    message?: string;
  };

  type ResponseListRoleDTO = {
    data?: RoleDTO[];
    code?: number;
    statusCode?: number;
    message?: string;
  };

  type ResponseListUserDTO = {
    data?: UserDTO[];
    code?: number;
    statusCode?: number;
    message?: string;
  };

  type ResponseMapStringListInterfaceDTO = {
    data?: Record<string, any>;
    code?: number;
    statusCode?: number;
    message?: string;
  };

  type ResponsePageInterfaceDTO = {
    data?: PageInterfaceDTO;
    code?: number;
    statusCode?: number;
    message?: string;
  };

  type ResponsePageRoleDTO = {
    data?: PageRoleDTO;
    code?: number;
    statusCode?: number;
    message?: string;
  };

  type ResponsePageUserDTO = {
    data?: PageUserDTO;
    code?: number;
    statusCode?: number;
    message?: string;
  };

  type ResponseString = {
    data?: string;
    code?: number;
    statusCode?: number;
    message?: string;
  };

  type ResponseUserDTO = {
    data?: UserDTO;
    code?: number;
    statusCode?: number;
    message?: string;
  };

  type ResponseVoid = {
    data?: Record<string, any>;
    code?: number;
    statusCode?: number;
    message?: string;
  };

  type RoleDTO = {
    /** 主键id */
    id?: string;
    /** 主键id列表 */
    idList?: string[];
    /** 角色名 */
    name?: string;
    /** 角色描述 */
    description?: string;
    /** 角色类型 DEFAULT:默认 CUSTOMIZE:自定义 */
    type?: 'DEFAULT' | 'CUSTOMIZE';
    /** 城建时间 */
    createdAt?: string;
    /** 更新时间 */
    updatedAt?: string;
    /** 更新人 */
    updatedBy?: string;
    /** 创建人 */
    createdBy?: string;
    pageSize?: number;
    current?: number;
  };

  type UserDTO = {
    id?: string;
    name?: string;
    email?: string;
    password?: string;
    roleIdList?: string[];
    roleIds?: string;
    status?: 'ACTIVE' | 'INACTIVE';
    createdAt?: string;
    updatedAt?: string;
  };

  type UserRoleDTO = {
    /** 用户主键id */
    userId?: string;
    /** 角色主键id */
    roleId?: string;
    /** 角色id列表 */
    roleIdList?: string[];
    /** 用户id列表 */
    userIdList?: string[];
  };
}
