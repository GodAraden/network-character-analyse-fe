import axios from 'axios';
import qs from 'query-string';

export interface User {
  id: string;
  usernames: string;
  nickname: string;
  role: 'admin' | 'user';
  email: string;
  createdTime: string;
  status: 'enable' | 'disable';
}

export interface QueryUserListReq extends Partial<User> {
  current: number;
  pageSize: number;
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
