import axios from 'axios';
import { UserEntity, UserView } from '@/store/modules/user/types';
import { Mixin } from '@/types/global';

export type LoginParams = Pick<UserEntity, 'username' | 'password'>;
export type LoginRes = Pick<UserEntity, 'id' | 'role'>;

export async function login(params: LoginParams) {
  const { data } = await axios.post<LoginRes>('/api/user/login', params);
  return data;
}

export function logout() {
  return axios.post<LoginRes>('/api/user/logout');
}

export async function getUserInfo() {
  const { data } = await axios.get<UserView>('/api/user/info');
  return data;
}

export type UpdateUserInfoAttrs = Partial<
  Pick<UserEntity, 'nickname' | 'password' | 'email' | 'avatar'>
>;
export type UpdateUserInfoReq = Mixin<
  Pick<UserEntity, 'id'> & UpdateUserInfoAttrs
>;
export type UpdateUserInfoRes = Pick<UserEntity, 'id'>;
export async function updateUserInfo(params: UpdateUserInfoReq) {
  const { id, ...payload } = params;
  const { data } = await axios.patch<UpdateUserInfoRes>(
    `/api/user/info/${id}`,
    payload
  );
  return data;
}
