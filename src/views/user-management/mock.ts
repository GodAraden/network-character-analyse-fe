import Mock from 'mockjs';
import qs from 'query-string';
import setupMock, { successResponseWrap } from '@/utils/setup-mock';
import { GetParams } from '@/types/global';

const { Random } = Mock;

const data = Mock.mock({
  'list|55': [
    {
      'id|+1': 100,
      'username': /[a-z]{4,8}0\d/,
      'nickname': /[A-Z]{8}/,
      'role|1': ['User', 'Admin'],
      'email': /\d{8,10}@qq\.com/,
      'status|1': ['enable', 'disable'],
      'createdTime': Random.datetime(),
    },
  ],
});

setupMock({
  setup() {
    Mock.mock(new RegExp('/api/user-management/list'), (params: GetParams) => {
      const { current = 1, pageSize = 10 } = qs.parseUrl(params.url).query;
      const p = current as number;
      const ps = pageSize as number;
      return successResponseWrap({
        list: data.list.slice((p - 1) * ps, p * ps),
        total: 55,
      });
    });
  },
});
