// eslint-disable-next-line no-shadow
export const enum UserRole {
  NONE = '',
  ADMIN = 'admin',
  USER = 'user',
}
// eslint-disable-next-line no-shadow
export const enum UserStatus {
  ENABLE = 'enable',
  DISABLE = 'disable',
}

export type UserEntity = {
  id: number;
  username: string;
  avatar: string;
  password: string;
  nickname: string;
  email: string;
  createTime: number;
  status: UserStatus;
  role: UserRole;
};

export type UserView = Omit<UserEntity, 'password'>;
