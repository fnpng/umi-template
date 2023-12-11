import setupMock from '@/utils/setupMock';
import Mock from 'mockjs';

const ng = '/api';

setupMock({
  setup: () => {
    Mock.mock(new RegExp(`${ng}/user/getUserList`), () => {
      const data = Mock.mock({
        total: 24,
        current: 1,
        pageSize: 10,
        'list|24': [
          {
            userId: '@id',
            userName: '@cname(0, 100)',
            displayName: '@cname(3, 5)',
            phone: '@integer(10000000000, 19999999999)',
            email: '@email',
            'status|1': [-1, 1],
            createdTime: '@datetime',
            updatedTime: '@datetime',
          },
        ],
      });

      return {
        code: 200,
        msg: 'success',
        data,
      };
    });

    Mock.mock(new RegExp(`${ng}/user/deleteUserById`), () => {
      return {
        code: 200,
        msg: 'success',
      };
    });
  },
});
