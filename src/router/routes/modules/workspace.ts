import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const WORKSPACE: AppRouteRecordRaw = {
  path: '/workspace',
  name: 'Workspace',
  component: DEFAULT_LAYOUT,
  redirect: '/workspace',
  meta: {
    locale: 'menu.workspace',
    requiresAuth: true,
    icon: 'icon-apps',
    hideChildrenInMenu: true,
    order: 0,
  },
  children: [
    {
      path: '',
      name: 'Workspace',
      component: () => import('@/views/workspace/index.vue'),
    },
  ],
};

export default WORKSPACE;
