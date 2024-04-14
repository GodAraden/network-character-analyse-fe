import localeLogin from '@/views/login/locale/en-US';

import localeWorkspace from '@/views/workspace/locale/en-US';

import localeQueryManagement from '@/views/query/management/locale/en-US';
import localeQueryStart from '@/views/query/start/locale/en-US';

import localeMultiDAnalysis from '@/views/query/result/locale/en-US';

import localeRuleEditor from '@/views/rule/editor/locale/en-US';
import localeRuleManagement from '@/views/rule/management/locale/en-US';

import localeUserInfo from '@/views/user/locale/en-US';

import localeUserManagement from '@/views/user-management/locale/en-US';

import localeSettings from './en-US/settings';
import localeTips from './en-US/tips';

export default {
  'title': 'Network Character Related Information Analysis System',
  'menu.workspace': 'Workspace',
  'menu.query': 'Query Information',
  'menu.rule': 'Rule Configuration',
  'menu.user': 'User Center',
  'menu.user-management': 'User Management',
  'menu.arcoWebsite': 'Arco Design',
  'navbar.docs': 'Docs',
  'navbar.action.locale': 'Switch to English',
  'messageBox.switchRoles': 'Switch Roles',
  'messageBox.userCenter': 'User Center',
  'messageBox.logout': 'Logout',
  ...localeSettings,
  ...localeTips,
  ...localeLogin,
  ...localeWorkspace,

  ...localeQueryManagement,
  ...localeQueryStart,
  ...localeMultiDAnalysis,
  ...localeRuleEditor,
  ...localeRuleManagement,
  ...localeUserInfo,
  ...localeUserManagement,
};
