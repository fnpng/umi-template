import { userStore } from '@/store';
import copyText from '@/utils/copyText';
import { Platte } from '@icon-park/react';
import { useSnapshot } from '@umijs/max';
import {
  Alert,
  Button,
  ColorPicker,
  Divider,
  Drawer,
  Form,
  Input,
  InputNumber,
  Radio,
  Switch,
} from 'antd';
import { ReactNode, useEffect, useState } from 'react';
import { Message } from '../AntdFeedback';

const Block = ({
  title,
  options,
  children,
}: {
  title?: ReactNode;
  options?: {
    label: string;
    value: string;
    type?: 'switch' | 'number' | 'text';
  }[];
  children?: ReactNode;
}) => {
  const { setUserSettings } = useSnapshot(userStore);

  return (
    <>
      <div className="font-bold mb-2">{title}</div>
      <div className="space-y-2">
        {options &&
          options.map((item) => {
            return (
              <div className={`space_between w-full`} key={item.value}>
                <span className="w-full">{item.label}</span>
                <Form.Item
                  name={item.value}
                  label=""
                  valuePropName={item.type === 'switch' ? 'checked' : 'value'}
                  className="mb-0"
                >
                  {item.type === 'switch' ? (
                    <Switch
                      onChange={(v) => setUserSettings({ [item.value]: v })}
                    />
                  ) : item.type === 'number' ? (
                    <InputNumber
                      suffix="px"
                      className="w-[210px]"
                      placeholder="请输入"
                      onChange={(v) => setUserSettings({ [item.value]: v })}
                    />
                  ) : (
                    <Input
                      className="w-[210px]"
                      placeholder="请输入"
                      onChange={(ev) =>
                        setUserSettings({ [item.value]: ev.target.value })
                      }
                    />
                  )}
                </Form.Item>
              </div>
            );
          })}
      </div>
      {children}
      <Divider />
    </>
  );
};

export default function PlatteSetting({
  className,
  color,
}: {
  className?: string;
  color?: string;
}) {
  const [collapse, setCollapse] = useState(false);
  const { userSettings, setUserSettings } = useSnapshot(userStore);
  const [form] = Form.useForm();

  useEffect(() => {
    if (collapse) {
      form.setFieldsValue(userSettings);
    }
  }, [collapse]);

  const onCopySettings = () => {
    copyText(JSON.stringify(userSettings, null, 2));
    Message.success('复制成功');
  };

  return (
    <div className={className} style={{ backgroundColor: color }}>
      <div
        onClick={() => {
          setCollapse(true);
        }}
        className="px-2 py-1"
      >
        <Platte />
      </div>
      <Drawer
        title={
          <>
            <Platte /> 页面风格配置
          </>
        }
        placement="right"
        closeIcon={false}
        onClose={() => setCollapse(false)}
        open={collapse}
      >
        <Form form={form}>
          <Block title="标题">
            <Form.Item name="title" label="">
              <Input
                placeholder="请输入标题"
                onChange={(ev) => setUserSettings({ title: ev.target.value })}
              />
            </Form.Item>
          </Block>
          <Block title="主题色">
            <Form.Item name="themeColor" label="">
              <ColorPicker
                showText
                className="w-full justify-start"
                presets={[
                  {
                    label: '推荐',
                    colors: [
                      '#F5222D',
                      '#FA8C16',
                      '#FADB14',
                      '#8BBB11',
                      '#52C41A',
                      '#13A8A8',
                      '#1677FF',
                      '#2F54EB',
                      '#722ED1',
                      '#EB2F96',
                      '#2b2b2b',
                    ],
                  },
                ]}
                onChange={(ev) =>
                  setUserSettings({ themeColor: ev.toHexString() })
                }
              />
            </Form.Item>
          </Block>
          <Block title="表单风格">
            <Form.Item name="formStyle" label="">
              <Radio.Group
                onChange={(ev) =>
                  setUserSettings({ formStyle: ev.target.value })
                }
              >
                <Radio value="linear">线性</Radio>
                <Radio value="fill">填充</Radio>
              </Radio.Group>
            </Form.Item>
          </Block>
          <Block
            title="内容区域"
            options={[
              {
                label: '导航菜单',
                value: 'navbar',
                type: 'switch',
              },
              {
                label: '面包屑',
                value: 'breadcrumb',
                type: 'switch',
              },
              {
                label: '侧边菜单',
                value: 'menu',
                type: 'switch',
              },
              {
                label: '底部',
                value: 'footer',
                type: 'switch',
              },
              {
                label: '菜单宽度',
                value: 'siderWidth',
                type: 'number',
              },
              {
                label: '底部文字',
                value: 'copyright',
                type: 'text',
              },
            ]}
          />
          <Alert description='配置之后仅是临时生效，要想真正作用于项目，点击下方的 "复制配置" 按钮，将配置替换到 settings.json 中即可。' />
        </Form>
        <div className="mt-6 space-x-3 flex">
          <Button block onClick={() => setCollapse(false)}>
            关闭
          </Button>
          <Button type="primary" block onClick={onCopySettings}>
            复制配置
          </Button>
        </div>
      </Drawer>
    </div>
  );
}
