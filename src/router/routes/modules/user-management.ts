import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const USERMANAGEMENT: AppRouteRecordRaw = {
  path: '/user-management',
  name: 'user-management',
  component: DEFAULT_LAYOUT,
  redirect: '/user-management',
  meta: {
    locale: 'menu.user-management',
    hideChildrenInMenu: true,
    requiresAuth: true,
    icon: 'icon-user-group',
    order: 8,
    roles: ['admin'],
  },
  children: [
    {
      path: '',
      name: 'user-management',
      component: () => import('@/views/user-management/index.vue'),
      meta: {
        locale: 'menu.user-management.dataAnalysis',
        requiresAuth: true,
      },
    },
  ],
};

export default USERMANAGEMENT;
