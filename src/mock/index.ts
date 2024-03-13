import Mock from 'mockjs';

import './user';
import './message-box';

import '@/views/workspace/mock';

import '@/views/list/card/mock';
import '@/views/list/search-table/mock';

import '@/views/form/step/mock';

import '@/views/visualization/data-analysis/mock';
import '@/views/visualization/multi-dimension-data-analysis/mock';

import '@/views/user-management/mock';

Mock.setup({
  timeout: '600-1000',
});
