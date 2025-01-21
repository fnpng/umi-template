import { Settings } from '@/utils/useSettings';
import { Lock, Me } from '@icon-park/react';
import { useNavigate } from '@umijs/max';
import { Button, Form, Input, Typography } from 'antd';

export default function LoginForm({ settings }: { settings: Settings }) {
  const navigate = useNavigate();

  const onsubmit = () => {
    navigate('/');
  };
  return (
    <div className="bg-white max-w-md min-w-[440px] mx-auto rounded-[8px] p-[28px]">
      <div className="space_center mb-4 gap-2 text-xl font-bold">
        <img
          className="w-9 h-9"
          src={require('@/favicon.svg').default}
          alt="logo"
        />
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
          <Input prefix={<Me />} placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item>
          <div className="block mb-1 font-medium leading-6 text-gray-900">
            密码
          </div>
          <Input.Password prefix={<Lock />} placeholder="请输入密码" />
        </Form.Item>
      </Form>
      <Button
        className="my-2"
        type="primary"
        size="large"
        block
        onClick={() => onsubmit()}
      >
        账号登录
      </Button>
      <div className="mt-4 space_between">
        <span className="text-gray-400 hover:text-gray-800 cursor-pointer">
          忘记密码?
        </span>
        <Typography.Link href="#" className="float-right">
          注册帐号
        </Typography.Link>
      </div>
    </div>
  );
}
