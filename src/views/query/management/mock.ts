import Mock from 'mockjs';
import qs from 'query-string';
import setupMock, { successResponseWrap } from '@/utils/setup-mock';
import { GetParams } from '@/types/global';

const { Random } = Mock;

const usernames = [];

for (let i = 0; i < 20; i += 1) {
  // 假设这里有一些中文姓名的拼音
  const chineseNames = [
    'zhangsan',
    'lisi',
    'wangwu',
    'zhaoliu',
    'qianqi',
    'sunba',
    'zhoujiu',
    'wushi',
    'zhengshi',
    'faner',
  ];
  const randomName =
    chineseNames[Math.floor(Math.random() * chineseNames.length)];
  const randomNumber = Math.floor(Math.random() * 90) + 10;
  const combinedString = `${randomName}${randomNumber}`;
  usernames.push(combinedString);
}

const data = Mock.mock({
  'list|55': [
    {
      'id': /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
      'ruleId':
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
      'name': /^查询\d{3}$/,
      'network': '',
      'analyse': '',
      'createAt': +new Date(Random.date()),
      'operator|1': usernames,
      'status|1': [-1, 0, 1],
    },
  ],
});

setupMock({
  setup() {
    Mock.mock(new RegExp('/api/query/list'), (params: GetParams) => {
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
