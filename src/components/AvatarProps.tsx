import avatar from '@/assets/avatar.png';
import userStore from '@/store/user';
import { Power } from '@icon-park/react';
import { useNavigate, useSnapshot } from '@umijs/max';
import { Avatar, Dropdown } from 'antd';
import { useEffect } from 'react';

export const AvatarProps = () => {
  const navigate = useNavigate();
  const { userSettings, userInfo, setUserInfo } = useSnapshot(userStore);

  const getUserInfo = async () => {
    // const res = await getCurrentUser();
    // if (res.code === 200) {
    //   setUserInfo((res?.data as AUTH.UserDTO) || {});
    // }
  };

  useEffect(() => {
    if (
      !JSON.parse(localStorage.getItem('userInfo') ?? '{}')?.name &&
      localStorage.getItem('token')
    ) {
      getUserInfo();
    }
  }, []);

  const onClick = ({ key }: { key: string }) => {
    if (key === 'logout') {
      navigate('/login');
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
    }
  };

  return {
    size: 'small',
    title: (
      <span style={{ color: 'var(--text-color)' }}>
        {userInfo?.name || 'admin'}
      </span>
    ),
    render: (props: unknown, dom: React.ReactNode) => {
      return (
        <Dropdown
          placement="bottomRight"
          menu={{
            items: [
              {
                key: 'logout',
                icon: <Power />,
                label: '退出登录',
              },
            ],
            onClick,
          }}
        >
          <div className="space-x-1">
            <Avatar src={avatar}></Avatar>
            {dom}
          </div>
        </Dropdown>
      );
    },
  };
};
