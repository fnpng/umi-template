import avatar from '@/assets/avatar.png';
import userStore from '@/store/user';
import { Power } from '@icon-park/react';
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
    if (key === 'logout') {
      modal.confirm({
        title: '温馨提示',
        content: '确定退出登录吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: handleOk,
      });
    }
  };

  const handleOk = () => {
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
            {contextHolder}
          </div>
        </Dropdown>
      );
    },
  };
};
