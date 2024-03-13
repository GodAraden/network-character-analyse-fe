import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const USERMANAGEMENT: AppRouteRecordRaw = {
  path: '/user-management',
  name: 'UserManagement',
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
      name: 'UserManagement',
      component: () => import('@/views/user-management/index.vue'),
    },
  ],
};

export default USERMANAGEMENT;
