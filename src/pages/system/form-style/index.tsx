import { UploadOne } from '@icon-park/react';
import {
  Button,
  Card,
  Cascader,
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Rate,
  Select,
  Slider,
  Switch,
  TimePicker,
  Transfer,
  TreeSelect,
  Upload,
} from 'antd';

export default function Index() {
  const [form] = Form.useForm();
  return (
    <Card>
      <Form layout="vertical" form={form}>
        <div className="grid grid-cols-3 gap-4">
          <Form.Item label="输入框" name="input">
            <Input placeholder="请输入" />
          </Form.Item>
          <Form.Item label="数字输入" name="number">
            <InputNumber placeholder="请输入年龄" className="w-full" />
          </Form.Item>
          <Form.Item label="级联选择" name="cascader">
            <Cascader
              options={[
                {
                  value: 'zhejiang',
                  label: '浙江',
                  children: [
                    {
                      value: 'hangzhou',
                      label: '杭州',
                    },
                    {
                      value: 'ningbo',
                      label: '宁波',
                    },
                  ],
                },
              ]}
            />
          </Form.Item>
          <Form.Item label="下拉框" name="select">
            <Select placeholder="请选择">
              <Select.Option value="male">男</Select.Option>
              <Select.Option value="female">女</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="日期" name="datePicker">
            <DatePicker.RangePicker className="w-full" />
          </Form.Item>
          <Form.Item label="时间" name="timePicker">
            <TimePicker className="w-full" />
          </Form.Item>
          <Form.Item label="树选择" name="treeSelect">
            <TreeSelect />
          </Form.Item>
          <Form.Item label="文本域" name="remark">
            <Input.TextArea placeholder="请输入" />
          </Form.Item>
          <Form.Item label="滑块" name="slider">
            <Slider />
          </Form.Item>
          <Form.Item label="多选" name="select">
            <Checkbox.Group>
              <Checkbox value="1">选项1</Checkbox>
              <Checkbox value="2">选项2</Checkbox>
              <Checkbox value="3">选项3</Checkbox>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item label="单选" name="radio">
            <Radio.Group>
              <Radio value="1">选项1</Radio>
              <Radio value="2">选项2</Radio>
              <Radio value="3">选项3</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="评分" name="rate">
            <Rate />
          </Form.Item>

          <Form.Item label="开关" name="switch">
            <Switch />
          </Form.Item>
          <Form.Item label="穿梭框" name="transfer">
            <Transfer
              dataSource={new Array(10).fill(0).map((_, index) => ({
                key: index,
                title: `Item ${index + 1}`,
              }))}
              render={(item) => item.title}
            />
          </Form.Item>
          <Form.Item
            label="颜色选择器"
            name="colorPicker"
            initialValue="#722ed1"
          >
            <ColorPicker showText />
          </Form.Item>
          <Form.Item label="图片上传" name="upload">
            <Upload.Dragger fileList={[]}>
              <UploadOne className="text-gray-500 text-2xl" />
              <div className="text-center text-sm text-gray-500">
                点击或拖拽文件到此区域上传
              </div>
            </Upload.Dragger>
          </Form.Item>
          <div className="col-span-3">
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </div>
        </div>
      </Form>
    </Card>
  );
}
