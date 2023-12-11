import { request } from '@/utils/request';
import { PageResult } from './types';

const ng = '/api';

export type DataType = {
  userId: string;
  userName: string;
  displayName?: string;
  phone?: string[];
  email?: string;
  status: number;
  department?: string;
  createdTime: string;
  updatedTime: string;
};

export const getUserList = (data: Record<string, unknown>) => {
  return request<PageResult<DataType>>({
    url: `${ng}/user/getUserList`,
    method: 'get',
    data,
  });
};

export const deleteUserById = (data: { userId: string }) => {
  return request<PageResult<DataType>>({
    url: `${ng}/user/deleteUserById`,
    method: 'post',
    data,
  });
};

export const system = {
  getUserList,
  deleteUserById,
};

export default system;
