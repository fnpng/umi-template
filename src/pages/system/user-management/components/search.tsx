import SearchCard from '@/components/SearchCard';
import { Form, Input, Select } from 'antd';

export default function Search({
  onSearch,
}: {
  onSearch: (value: Record<string, unknown>) => void;
}) {
  return (
    <SearchCard onSearch={onSearch} labelWidth={60}>
      <Form.Item label="用户ID" name="userId">
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item label="用户名" name="userName">
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item label="昵称" name="displayName">
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item label="手机" name="phone">
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item label="邮箱" name="email">
        <Input placeholder="请输入" />
      </Form.Item>
      <Form.Item label="状态" name="status">
        <Select
          placeholder="请输入"
          options={[
            { label: '启用', value: 1 },
            { label: '禁用', value: -1 },
          ]}
        />
      </Form.Item>
    </SearchCard>
  );
}
