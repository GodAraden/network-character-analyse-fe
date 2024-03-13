import Mock from 'mockjs';

import './user';
import './message-box';

import '@/views/workspace/mock';

import '@/views/query/management/mock';

import '@/views/query/result/mock';

import '@/views/user-management/mock';

Mock.setup({
  timeout: '600-1000',
});
