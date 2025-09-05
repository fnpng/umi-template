import { Avatar, Button, Divider, Form, Input, Segmented, Tag } from 'antd';
import { useState } from 'react';
import { BiSolidShieldPlus, BiSolidUser } from 'react-icons/bi';
import {
  FcCalendar,
  FcFeedback,
  FcIphone,
  FcPlanner,
  FcPodiumWithSpeaker,
  FcVoicePresentation,
} from 'react-icons/fc';

export default function UserCenter() {
  const userInfoList = [
    { key: '用户名称', value: 'admin', icon: <FcPodiumWithSpeaker /> },
    { key: '手机号码', value: '188****9088', icon: <FcIphone /> },
    { key: '电子邮箱', value: '188****9088@gmail.com', icon: <FcFeedback /> },
    {
      key: '账户状态',
      value: (
        <Tag className="m-0" color="blue">
          正常
        </Tag>
      ),
      icon: <FcVoicePresentation />,
    },
    { key: '注册时间', value: '2021-08-01 12:00:00', icon: <FcPlanner /> },
    { key: '最后登录时间', value: '2021-08-01 12:00:00', icon: <FcCalendar /> },
  ];

  const [form] = Form.useForm();
  const [segmentedValue, setSegmentedValue] = useState('baseInfo');

  const record = {
    userName: 'admin',
    displayName: '管理员',
    phone: '188****9088',
    email: '188****9088@qq.com',
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-4 flex flex-col bg-white rounded-md space_center relative overflow-hidden">
        <img
          src={require('@/assets/light_bg.jpg')}
          className="w-full h-[120px] object-cover absolute top-0 left-0 z-0"
        />
        <Avatar
          size={72}
          src={require('@/assets/avatar.png')}
          className="mt-[80px] shadow-md"
        />
        <div className="flex flex-col gap-4 w-full px-6 mt-3 pb-6">
          {userInfoList.map((item) => (
            <div className="space_between" key={item.key}>
              <span className="flex_center gap-1">
                <span className="text-[18px] flex_center bg-slate-100 p-1 rounded">
                  {item.icon}
                </span>{' '}
                {item.key}
              </span>
              <span>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white col-span-8 px-6 rounded-md">
        <Divider>基本信息</Divider>
        <Segmented
          value={segmentedValue}
          onChange={(value) => setSegmentedValue(value)}
          options={[
            {
              label: '基本资料',
              value: 'baseInfo',
              icon: <BiSolidUser size={18} />,
            },
            {
              label: '修改密码',
              value: 'security',
              icon: <BiSolidShieldPlus size={18} />,
            },
          ]}
        />
        {
          <Form
            form={form}
            labelCol={{
              style: { width: 80, textAlign: 'right' },
            }}
            style={{ marginTop: 20 }}
            initialValues={record}
            autoComplete="off"
          >
            {segmentedValue === 'baseInfo' && (
              <>
                <Form.Item label="用户名称" name="userName" required>
                  <Input placeholder="请输入" />
                </Form.Item>
                <Form.Item label="昵称" name="displayName">
                  <Input placeholder="请输入" />
                </Form.Item>
                <Form.Item label="手机号" name="phone" required>
                  <Input placeholder="请输入" />
                </Form.Item>
                <Form.Item label="邮箱" name="email">
                  <Input placeholder="请输入" />
                </Form.Item>
              </>
            )}
            {segmentedValue === 'security' && (
              <>
                <Form.Item label="旧密码" name="oldPassword" required>
                  <Input.Password placeholder="请输入" />
                </Form.Item>
                <Form.Item label="新密码" name="newPassword" required>
                  <Input.Password placeholder="请输入" />
                </Form.Item>
                <Form.Item label="确认密码" name="confirmPassword" required>
                  <Input.Password placeholder="请输入" />
                </Form.Item>
              </>
            )}
            <Form.Item label=" " colon={false}>
              <Button type="primary" className="mr-4">
                保存
              </Button>
              <Button>重置</Button>
            </Form.Item>
          </Form>
        }
      </div>
    </div>
  );
}
