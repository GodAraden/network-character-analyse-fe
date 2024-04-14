import { UserView } from '@/store/modules/user/types';

// eslint-disable-next-line import/prefer-default-export
export const showUser = (user: Pick<UserView, 'username' | 'nickname'>) => {
  return `${user.nickname} (${user.username})`;
};
