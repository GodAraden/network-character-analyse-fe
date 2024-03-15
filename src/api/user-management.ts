import axios from 'axios';
import qs from 'query-string';
import { UserRole, UserStatus } from '@/store/modules/user/types';

export interface User {
  id: string;
  username: string;
  nickname: string;
  role: UserRole;
  email: string;
  createdTime: string;
  status: UserStatus;
}

export interface QueryUserListReq extends Partial<User> {
  current?: number;
  pageSize?: number;
}

export interface QueryUserListRes {
  list: User[];
  total: number;
}

export function queryUserList(params: QueryUserListReq) {
  return axios.get<QueryUserListRes>('/api/user-management/list', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
