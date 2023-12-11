import { Logout } from '@icon-park/react';
import { useNavigate } from '@umijs/max';
import { Dropdown } from 'antd';

export const getAvatarProps = () => {
  const navigate = useNavigate();

  const onClick = ({ key }: { key: string }) => {
    if (key === 'logout') {
      navigate('/login');
    }
  };

  return {
    src: 'https://tools3.cn/avatar-1.png',
    size: 'small',
    title: <span style={{ color: 'var(--text-color)' }}>admin</span>,
    render: (props: unknown, dom: React.ReactNode) => {
      return (
        <Dropdown
          placement="bottomRight"
          menu={{
            items: [
              {
                key: 'logout',
                icon: <Logout />,
                label: '退出登录',
              },
            ],
            onClick,
          }}
        >
          {dom}
        </Dropdown>
      );
    },
  };
};
