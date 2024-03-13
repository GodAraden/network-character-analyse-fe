import Mock from 'mockjs';
import qs from 'query-string';
import setupMock, { successResponseWrap } from '@/utils/setup-mock';
import { GetParams } from '@/types/global';
import { UserRole, UserStatus } from '@/store/modules/user/types';

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

const nicknames = [
  '清风徐来',
  '梦里花落',
  '流年似水',
  '墨染青衣',
  '云卷云舒',
  '夜色朦胧',
  '星河长明',
  '琉璃心碎',
  '梦里南柯',
  '静水深流',
  '轻舞飞扬',
  '落花无声',
  '倾城之恋',
  '梦回还珠',
  '月下独酌',
  '晨曦微光',
  '墨舞青云',
  '雨落心田',
  '微笑向阳',
  '秋水伊人',
];

const data = Mock.mock({
  'list|55': [
    {
      'id|+1': 100,
      'username|1': usernames,
      'nickname|1': nicknames,
      'role|1': [UserRole.ADMIN, UserRole.USER],
      'email': /\d{8,10}@qq\.com/,
      'status|1': [UserStatus.DISABLE, UserStatus.ENABLE],
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
