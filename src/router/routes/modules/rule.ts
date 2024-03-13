import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const RULE: AppRouteRecordRaw = {
  path: '/rule',
  name: 'Rule',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.rule',
    requiresAuth: true,
    icon: 'icon-settings',
    order: 5,
    roles: ['admin'],
  },
  children: [
    {
      path: 'editor',
      name: 'RuleEditor',
      component: () => import('@/views/rule/editor/index.vue'),
      meta: {
        locale: 'menu.rule.editor',
        requiresAuth: true,
      },
    },
    {
      path: 'management',
      name: 'RuleManagement',
      component: () => import('@/views/rule/management/index.vue'),
      meta: {
        locale: 'menu.rule.management',
        requiresAuth: true,
      },
    },
  ],
};

export default RULE;
