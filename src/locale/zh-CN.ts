import localeMessageBox from '@/components/message-box/locale/zh-CN';
import localeLogin from '@/views/login/locale/zh-CN';

import localeWorkplace from '@/views/dashboard/workplace/locale/zh-CN';

import localeMonitor from '@/views/dashboard/monitor/locale/zh-CN';

import localeSearchTable from '@/views/list/search-table/locale/zh-CN';
import localeCardList from '@/views/list/card/locale/zh-CN';

import localeStepForm from '@/views/form/step/locale/zh-CN';
import localeGroupForm from '@/views/form/group/locale/zh-CN';

import localeDataAnalysis from '@/views/visualization/data-analysis/locale/zh-CN';
import localeMultiDAnalysis from '@/views/visualization/multi-dimension-data-analysis/locale/zh-CN';

import localeRuleEditor from '@/views/rule/editor/locale/zh-CN';
import localeRuleManagement from '@/views/rule/management/locale/zh-CN';

import localeUserInfo from '@/views/user/locale/zh-CN';

import localeUserManagement from '@/views/user-management/locale/zh-CN';

import localeSettings from './zh-CN/settings';

export default {
  'title': '网络人物关联信息分析系统',
  'menu.dashboard': '仪表盘',
  'menu.list': '列表页',
  'menu.form': '表单页',
  'menu.visualization': '数据可视化',
  'menu.rule': '规则配置',
  'menu.user': '个人中心',
  'menu.user-management': '用户管理',
  'menu.arcoWebsite': 'Arco Design',
  'navbar.docs': '文档中心',
  'navbar.action.locale': '切换为中文',
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
