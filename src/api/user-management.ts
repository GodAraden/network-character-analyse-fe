import axios from 'axios';
import { UserView } from '@/store/modules/user/types';

export interface QueryUserListReq extends Partial<UserView> {
  current?: number;
  pageSize?: number;
}

export interface QueryUserListRes {
  list: UserView[];
  total: number;
}

export function queryUserList(params: QueryUserListReq) {
  return axios.post<QueryUserListRes>('/api/user/list', params);
}

export type UpdateUserStatusReq = Pick<UserView, 'id' | 'status'>;
export type UpdateUserStatusRes = Pick<UserView, 'id'>;
export async function updateUserStatus(params: UpdateUserStatusReq) {
  const { id, status } = params;
  const { data } = await axios.patch<UpdateUserStatusRes>(
    `/api/user/status/${id}`,
    { status }
  );
  return data;
}
