import Mock from 'mockjs';
import qs from 'query-string';
import setupMock, { successResponseWrap } from '@/utils/setup-mock';
import { GetParams } from '@/types/global';

const data = Mock.mock({
  'list|11': [
    {
      'id': /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
      'name': /^规则\d{2}$/,
      'base': /^https?:\/\/example\d{2}\.com\/$/,
      'depth|1': [1, 2, 3],
      'rules|4-8': [
        {
          'name': /^(基础信息|关注列表|粉丝列表|发布记录)$/,
          'order|+1': 1,
          'path': /^\/(info|followings|follows|posts)$/,
          'resolve': '{}',
          'parameter': '{}',
        },
      ],
    },
  ],
});

setupMock({
  setup() {
    // submit
    Mock.mock(new RegExp('/api/rule/create'), () => {
      return successResponseWrap(
        Mock.mock({
          id: /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
        })
      );
    });

    Mock.mock(new RegExp('/api/rule/update'), () => {
      return successResponseWrap(true);
    });

    Mock.mock(new RegExp('/api/rule/info'), ({ url }) => {
      const params = new URLSearchParams(new URL(url).search);
      const info = data.list[0];
      return successResponseWrap(
        Mock.mock({
          ...info,
          id: params.get('id'),
        })
      );
    });

    Mock.mock(new RegExp('/api/rule/list'), (params: GetParams) => {
      const { current = 1, pageSize = 10 } = qs.parseUrl(params.url).query;
      const p = current as number;
      const ps = pageSize as number;
      return successResponseWrap({
        list: data.list.slice((p - 1) * ps, p * ps),
        total: 11,
      });
    });
  },
});
