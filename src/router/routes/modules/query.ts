import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const LIST: AppRouteRecordRaw = {
  path: '/query',
  name: 'Query',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.query',
    requiresAuth: true,
    icon: 'icon-search',
    order: 2,
  },
  children: [
    {
      path: 'start',
      name: 'QueryStart',
      component: () => import('@/views/query/start/index.vue'),
      meta: {
        locale: 'menu.query.start',
        requiresAuth: true,
      },
    },
    {
      path: 'management',
      name: 'QueryManagement',
      component: () => import('@/views/query/management/index.vue'),
      meta: {
        locale: 'menu.query.management',
        requiresAuth: true,
      },
    },
    {
      path: 'result',
      name: 'QueryResult',
      component: () => import('@/views/query/result/index.vue'),
      meta: {
        locale: 'menu.query.result',
        requiresAuth: true,
      },
    },
  ],
};

export default LIST;
