import { Message } from '@/components/AntdFeedback';
import {
  Button,
  Card,
  Divider,
  PaginationProps,
  Popconfirm,
  Table,
  Tag,
} from 'antd';
import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import AddEditModal from './components/add-edit-modal';
import Search from './components/search';

const getUsers = async () => {
  const response = await fetch(`${process.env.API_URL}/users`);
  const data = await response.json();
  return data;
};

export default function UsersList() {
  const [list, setList] = useState<[]>([]);
  const [pagination, setPagination] = useState<PaginationProps>({
    total: 0,
    pageSize: 10,
    current: 1,
  });
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    mode: 'add' as 'add' | 'edit',
    record: {
      id: '',
    },
  });

  const columns: ColumnsType<Record<string, unknown>> = [
    {
      title: '序号',
      dataIndex: 'key',
      align: 'center',
      width: 72,
      render: (text, record, index) => {
        const { current, pageSize } = pagination;
        return ((current as number) - 1) * (pageSize as number) + index + 1;
      },
    },
    {
      title: '用户名',
      dataIndex: 'name',
    },
    {
      title: '昵称',
      dataIndex: 'displayName',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 80,
      align: 'center',
      render: (text) => {
        return text === 'ACTIVE' ? (
          <Tag color="success">启用中</Tag>
        ) : (
          <Tag color="error">禁用中</Tag>
        );
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createdTime',
      width: 180,
      render: (text) => {
        return dayjs(text).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: '更新时间',
      dataIndex: 'updatedTime',
      width: 180,
      render: (text) => {
        return dayjs(text).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      align: 'center',
      width: 200,
      render: (text, record) => {
        const { status } = record;
        return (
          <div className="space-x-2">
            <a onClick={() => onEdit(record)}>编辑</a>
            <Divider type="vertical" />
            <Popconfirm
              title="确定启用吗？"
              placement="topRight"
              onConfirm={() => onStatus(record)}
            >
              <a
                className={
                  status === 'ACTIVE' ? 'text-red-500' : 'text-green-500'
                }
              >
                {status === 'ACTIVE' ? '禁用' : '启用'}
              </a>
            </Popconfirm>
            <Divider type="vertical" />
            <Popconfirm
              title="确定删除吗？"
              placement="topRight"
              onConfirm={() => onDelete(record)}
            >
              <a className="text-red-500">删除</a>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const getList = async (params = {}) => {
    setLoading(true);
    try {
      const data = await getUsers();
      setList(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getList();
  }, [pagination.current, pagination.pageSize]);

  const onAdd = () => {
    setModalInfo({
      mode: 'add',
      record: {
        id: '',
      },
    });
    setVisible(true);
  };

  const onEdit = (record: any) => {
    setModalInfo({
      mode: 'edit',
      record,
    });
    setVisible(true);
  };

  const onDelete = async ({ id }: any) => {
    const res = await fetch(`${process.env.API_URL}/users/${id}`, {
      method: 'DELETE',
    });
    Message.success('删除成功');
    getList();
  };

  const onSearch = (values: Record<string, unknown>) => {
    getList(values);
  };

  const onChangeTable = (pagination: TablePaginationConfig) => {
    const { current, pageSize } = pagination;
    setPagination({ ...pagination, current, pageSize });
  };

  const paginationProps = {
    ...pagination,
    showTotal: (totalNum: number) => {
      const { current, total, pageSize } = pagination;
      return `共 ${totalNum} 条记录  第 ${current} / ${
        Math.floor((total as number) / (pageSize as number)) + 1
      } 页`;
    },
    showSizeChanger: true,
    showQuickJumper: true,
    pageSizeOptions: ['10', '20', '50', '100'],
    onShowSizeChange: (current: number, pageSize: number) => {
      setPagination({ ...pagination, current, pageSize });
    },
    onChange: (current: number, pageSize: number) => {
      setPagination({ ...pagination, current, pageSize });
    },
  };

  const handleOk = async (values: Record<string, unknown>) => {
    if (modalInfo.mode === 'add') {
      await fetch(`${process.env.API_URL}/users`, {
        method: 'POST',
        body: JSON.stringify({ ...values, status: 'ACTIVE' }),
      });
    } else {
      await fetch(`${process.env.API_URL}/users/${modalInfo.record?.id}`, {
        method: 'PUT',
        body: JSON.stringify({ ...values, id: modalInfo.record?.id }),
      });
    }
    Message.success('操作成功');
    setVisible(false);
    getList();
  };

  const onStatus = async (record: any) => {
    await fetch(`${process.env.API_URL}/users/${record?.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        ...record,
        status: record.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE',
      }),
    });
    Message.success('操作成功');
    getList();
  };

  return (
    <div className="">
      <Search onSearch={onSearch} />
      <Card
        className="mt-4 custom_card"
        variant="borderless"
        title="用户列表"
        extra={
          <Button type="primary" onClick={() => onAdd()}>
            + 新增
          </Button>
        }
      >
        <Table
          rowKey="id"
          columns={columns}
          dataSource={list}
          bordered
          pagination={paginationProps}
          onChange={onChangeTable}
          loading={loading}
        />
      </Card>
      {visible && (
        <AddEditModal
          modalInfo={modalInfo}
          onOk={handleOk}
          onCancel={() => setVisible(false)}
        />
      )}
    </div>
  );
}
