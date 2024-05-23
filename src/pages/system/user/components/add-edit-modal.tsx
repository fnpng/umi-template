import { Form, Input, Modal } from 'antd';
import { Store } from 'antd/es/form/interface';

export default function AddEditModal({
  modalInfo: { mode, record },
  onOk,
  onCancel,
}: {
  modalInfo: {
    mode: 'add' | 'edit';
    record: any;
  };
  onOk: (value: Record<string, unknown>) => void;
  onCancel: () => void;
}) {
  const [form] = Form.useForm();
  const handleOk = () => {
    form.validateFields().then((values) => {
      onOk(values);
    });
  };

  return (
    <Modal
      title={mode === 'add' ? '新增' : '编辑'}
      open={true}
      onOk={() => handleOk()}
      onCancel={onCancel}
    >
      <Form
        form={form}
        labelCol={{
          style: { width: 70, textAlign: 'right' },
        }}
        style={{ marginTop: 20 }}
        initialValues={record as Store}
        autoComplete="off"
      >
        <Form.Item label="用户名" name="userName" rules={[{ required: true }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="昵称" name="displayName">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="手机号" name="phone">
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="邮箱" name="email">
          <Input placeholder="请输入" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
