import localeMessageBox from '@/components/message-box/locale/zh-CN';
import localeLogin from '@/views/login/locale/zh-CN';

import localeWorkspace from '@/views/workspace/locale/zh-CN';

import localeQueryManagement from '@/views/query/management/locale/zh-CN';
import localeQueryStart from '@/views/query/start/locale/zh-CN';

import localeMultiDAnalysis from '@/views/query/result/locale/zh-CN';

import localeRuleEditor from '@/views/rule/editor/locale/zh-CN';
import localeRuleManagement from '@/views/rule/management/locale/zh-CN';

import localeUserInfo from '@/views/user/locale/zh-CN';

import localeUserManagement from '@/views/user-management/locale/zh-CN';

import localeSettings from './zh-CN/settings';

export default {
  'title': '网络人物关联信息分析系统',
  'menu.workspace': '工作台',
  'menu.query': '信息获取',
  'menu.rule': '规则配置',
  'menu.user': '个人中心',
  'menu.user-management': '用户管理',
  'menu.arcoWebsite': 'Arco Design',
  'navbar.docs': '文档中心',
  'navbar.action.locale': '切换为中文',
  ...localeSettings,
  ...localeMessageBox,
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
