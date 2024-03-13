// eslint-disable-next-line no-shadow
export const enum UserRole {
  NONE = '',
  ALL = '*',
  ADMIN = 'admin',
  USER = 'user',
}
// eslint-disable-next-line no-shadow
export const enum UserStatus {
  ENABLE = 'enable',
  DISABLE = 'disable',
}

export interface UserState {
  id: number;
  username: string;
  avatar: string;
  // password: string;
  nickname: string;
  email: string;
  createTime: number;
  status: UserStatus;
  role: UserRole;
}
