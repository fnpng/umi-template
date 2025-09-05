import userStore from '@/store/user';
import { useNavigate, useSnapshot } from '@umijs/max';
import { Avatar, Dropdown, Modal } from 'antd';
import { useEffect } from 'react';
import { BiLogOutCircle, BiUserCircle } from 'react-icons/bi';

const getCurrentUser = async () => {
  try {
    const response = await fetch(`${process.env.API_URL}/userInfo`);
    const data = await response.json();
    return data;
  } catch (error) {
    return [];
  }
};

export const AvatarProps = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useSnapshot(userStore);
  const [modal, contextHolder] = Modal.useModal();

  const getUserInfo = async () => {
    const res = await getCurrentUser();
    if (res.code === 200) {
      setUserInfo(res?.data || {});
    }
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
                icon: <BiUserCircle size={18} />,
                label: '个人中心',
              },
              {
                type: 'divider',
              },
              {
                key: 'logout',
                icon: <BiLogOutCircle size={18} />,
                label: '退出登录',
              },
            ],
            onClick,
          }}
        >
          <div className="space-x-1 !text-slate-500">
            <Avatar size={36} src={require('@/assets/avatar.png')}></Avatar>
            {dom}
            {contextHolder}
          </div>
        </Dropdown>
      );
    },
  };
};
