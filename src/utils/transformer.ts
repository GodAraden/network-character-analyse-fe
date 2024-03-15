import { User } from '@/api/user-management';

// eslint-disable-next-line import/prefer-default-export
export const showUser = (user: Pick<User, 'username' | 'nickname'>) => {
  return `${user.nickname} (${user.username})`;
};
