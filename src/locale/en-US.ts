import localeMessageBox from '@/components/message-box/locale/en-US';
import localeLogin from '@/views/login/locale/en-US';

import localeWorkplace from '@/views/dashboard/workplace/locale/en-US';

import localeMonitor from '@/views/dashboard/monitor/locale/en-US';

import localeSearchTable from '@/views/list/search-table/locale/en-US';
import localeCardList from '@/views/list/card/locale/en-US';

import localeStepForm from '@/views/form/step/locale/en-US';
import localeGroupForm from '@/views/form/group/locale/en-US';

import localeDataAnalysis from '@/views/visualization/data-analysis/locale/en-US';
import localeMultiDAnalysis from '@/views/visualization/multi-dimension-data-analysis/locale/en-US';

import localeRuleEditor from '@/views/rule/editor/locale/en-US';
import localeRuleManagement from '@/views/rule/management/locale/en-US';

import localeUserInfo from '@/views/user/locale/en-US';

import localeUserManagement from '@/views/user-management/locale/en-US';

import localeSettings from './en-US/settings';

export default {
  'title': 'Network Character Related Information Analysis System',
  'menu.dashboard': 'Dashboard',
  'menu.list': 'List',
  'menu.form': 'Form',
  'menu.visualization': 'Data Visualization',
  'menu.rule': 'Rule Configuration',
  'menu.user': 'User Center',
  'menu.user-management': 'User Management',
  'menu.arcoWebsite': 'Arco Design',
  'navbar.docs': 'Docs',
  'navbar.action.locale': 'Switch to English',
  ...localeSettings,
  ...localeMessageBox,
  ...localeLogin,
  ...localeWorkplace,

  ...localeMonitor,
  ...localeSearchTable,
  ...localeCardList,
  ...localeStepForm,
  ...localeGroupForm,
  ...localeDataAnalysis,
  ...localeMultiDAnalysis,
  ...localeRuleEditor,
  ...localeRuleManagement,
  ...localeUserInfo,
  ...localeUserManagement,
};
