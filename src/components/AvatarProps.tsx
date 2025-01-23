import userStore from '@/store/user';
import { Me, Power } from '@icon-park/react';
import { useNavigate, useSnapshot } from '@umijs/max';
import { Avatar, Dropdown, Modal } from 'antd';
import { useEffect, useState } from 'react';

export const AvatarProps = () => {
  const navigate = useNavigate();
  const { userSettings, userInfo, setUserInfo } = useSnapshot(userStore);
  const [visible, setVisible] = useState(false);
  const [modal, contextHolder] = Modal.useModal();

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
    switch (key) {
      case 'user-center':
        navigate('/user-center');
        break;
      case 'logout':
        modal.confirm({
          title: '温馨提示',
          content: '确定退出登录吗？',
          okText: '确认',
          cancelText: '取消',
          onOk: handleLogout,
        });
        break;
      default:
        break;
    }
  };

  const handleLogout = () => {
    navigate('/login');
    setVisible(false);
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
  };

  return {
    size: 'small',
    title: userInfo?.name || 'admin',
    render: (props: unknown, dom: React.ReactNode) => {
      return (
        <Dropdown
          placement="bottomRight"
          menu={{
            items: [
              {
                key: 'user-center',
                icon: <Me size={16} />,
                label: '个人中心',
              },
              {
                type: 'divider',
              },
              {
                key: 'logout',
                icon: <Power size={16} />,
                label: '退出登录',
              },
            ],
            onClick,
          }}
        >
          <div className="space-x-1">
            <Avatar
              size={36}
              src={require('@/assets/avatar.svg').default}
            ></Avatar>
            {dom}
            {contextHolder}
          </div>
        </Dropdown>
      );
    },
  };
};
