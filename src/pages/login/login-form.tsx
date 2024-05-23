import favicon from '@/favicon.svg';
import { Settings } from '@/utils/getSettings';
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
        components: {
          Form: {
            itemMarginBottom: 20,
          },
        },
      }}
    >
      <div
        className="max-w-md min-w-[440px] mx-auto rounded-[6px] shadow p-[28px]"
        style={
          {
            // background: 'rgb(255 255 255 / 20%)',
            // backdropFilter: ' blur(10px)',
          }
        }
      >
        <div
          className="text-center text-3xl font-bold mb-4 space_center flex-col"
          style={{
            color: settings.themeColor,
            filter: `drop-shadow(1px 1px 1px rgba(0,0,0,0.2))`,
          }}
        >
          <img src={favicon} alt="logo" className="h-[56px] mb-3" />
          {settings?.title}
        </div>
        <Form size="large">
          <Form.Item>
            <div className="block mb-1 text-sm font-medium leading-6 text-gray-900">
              用户名
            </div>
            <Input prefix={<User />} placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item>
            <div className="block mb-1 text-sm font-medium leading-6 text-gray-900">
              密码
            </div>
            <Input.Password prefix={<Lock />} placeholder="请输入密码" />
          </Form.Item>
          <div className="mb-4 space_bewteen">
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
