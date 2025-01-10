import { Settings } from '@/utils/useSettings';
import { Lock, User } from '@icon-park/react';
import { useNavigate } from '@umijs/max';
import {
  Button,
  Checkbox,
  ConfigProvider,
  Form,
  Input,
  Typography,
} from 'antd';

export default function LoginForm({ settings }: { settings: Settings }) {
  const navigate = useNavigate();

  const onsubmit = () => {
    navigate('/');
  };
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: settings?.themeColor,
          colorLink: settings?.themeColor,
        },
        components: {
          Form: {
            itemMarginBottom: 20,
          },
        },
      }}
    >
      <div className="max-w-md min-w-[440px] mx-auto rounded-[6px] shadow p-[28px]">
        <div
          className="text-center gap-3 text-2xl font-bold mb-8 space_center"
          style={{
            filter: `drop-shadow(1px 1px 1px rgba(0,0,0,0.2))`,
          }}
        >
          <div className="space_center p-1 rounded-md bg-slate-200">
            <img
              className="w-6 h-6"
              src={require('@/favicon.svg').default}
              alt="logo"
            />
          </div>
          {settings?.title}
        </div>
        {/* <div className="text-left text-xl font-bold mb-4 flex-col">
          欢迎登录
        </div> */}
        <Form size="large">
          <Form.Item>
            <div className="block mb-1 font-medium leading-6 text-gray-900">
              用户名
            </div>
            <Input prefix={<User />} placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item>
            <div className="block mb-1 font-medium leading-6 text-gray-900">
              密码
            </div>
            <Input.Password prefix={<Lock />} placeholder="请输入密码" />
          </Form.Item>
          <div className="mb-4 space_between">
            <Checkbox>记住密码</Checkbox>
            <Typography.Link href="#" className="float-right">
              忘记密码
            </Typography.Link>
          </div>
        </Form>
        <Button type="primary" size="large" block onClick={() => onsubmit()}>
          账号登录
        </Button>
        <Button type="text" block className="text-[#333] mt-4">
          注册请联系管理员
        </Button>
      </div>
    </ConfigProvider>
  );
}
