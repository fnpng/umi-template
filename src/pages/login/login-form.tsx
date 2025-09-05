import { Settings } from '@/utils/useSettings';
import { useNavigate } from '@umijs/max';
import { Button, Form, Input, Typography } from 'antd';
import { BsFillShieldLockFill, BsPersonCircle } from 'react-icons/bs';

export default function LoginForm({ settings }: { settings: Settings }) {
  const navigate = useNavigate();

  const onsubmit = () => {
    navigate('/');
  };
  return (
    <div className="bg-white max-w-md min-w-[440px] mx-auto rounded-[8px] p-[28px]">
      <div
        className="space_center mb-4 gap-2 text-2xl font-bold"
        style={{
          fontFamily: 'DingTalkJinBuTi',
        }}
      >
        <img
          className="w-9 h-9"
          src={require('@/favicon.svg').default}
          alt="logo"
        />
        {settings?.title}
      </div>
      <Form size="large">
        <Form.Item>
          <div className="block mb-1 font-medium leading-6 text-gray-900">
            用户名
          </div>
          <Input
            prefix={<BsPersonCircle className="mr-2" />}
            placeholder="请输入用户名"
          />
        </Form.Item>
        <Form.Item>
          <div className="block mb-1 font-medium leading-6 text-gray-900">
            密码
          </div>
          <Input.Password
            prefix={<BsFillShieldLockFill className="mr-2" />}
            placeholder="请输入密码"
          />
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
