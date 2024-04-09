import axios from 'axios';
import { UserRole, UserState } from '@/store/modules/user/types';

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginRes {
  id: string;
  role: UserRole;
}
export async function login(params: LoginData) {
  const { data } = await axios.post<LoginRes>('/api/user/login', params);
  return data;
}

export function logout() {
  return axios.post<LoginRes>('/api/user/logout');
}

export async function getUserInfo() {
  const { data } = await axios.get<UserState>('/api/user/info');
  return data;
}
