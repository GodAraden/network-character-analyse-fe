import axios from 'axios';
import { UserEntity, UserView } from '@/store/modules/user/types';

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
