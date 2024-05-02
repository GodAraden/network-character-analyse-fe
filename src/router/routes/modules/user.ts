import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const USER: AppRouteRecordRaw = {
  path: '/user',
  name: 'User',
  component: DEFAULT_LAYOUT,
  redirect: '/user',
  meta: {
    locale: 'menu.user',
    icon: 'icon-user',
    requiresAuth: true,
    hideChildrenInMenu: true,
    order: 0,
    roles: ['*'],
  },
  children: [
    {
      path: '',
      name: 'User',
      component: () => import('@/views/user/index.vue'),
    },
  ],
};

export default USER;
