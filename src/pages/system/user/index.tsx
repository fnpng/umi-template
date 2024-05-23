import { Message } from '@/components/AntdFeedback';
import {
  Button,
  Card,
  PaginationProps,
  Popconfirm,
  Table,
  Tag,
  Typography,
} from 'antd';
import { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import AddEditModal from './components/add-edit-modal';
import Search from './components/search';

const { Link } = Typography;

export default function WorkFlow() {
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
    record: null,
  });

  const columns: ColumnsType<Record<string, unknown>> = [
    {
      title: '序号',
      dataIndex: 'key',
      align: 'center',
      width: 64,
      render: (text, record, index) => {
        const { current, pageSize } = pagination;
        return ((current as number) - 1) * (pageSize as number) + index + 1;
      },
    },
    {
      title: '用户ID',
      dataIndex: 'userId',
    },
    {
      title: '用户名',
      dataIndex: 'userName',
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
        return text === 1 ? (
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
      width: 160,
      render: (text, record) => {
        const { status, userId } = record;
        return (
          <div className="space-x-3">
            <Link onClick={() => onEdit(record)}>编辑</Link>
            <Link
              onClick={() => {
                const newList = [...list];
                Message.success('操作成功');
              }}
            >
              {status === 1 ? '启用' : '禁用'}
            </Link>
            <Popconfirm
              title="确定删除吗？"
              placement="topRight"
              onConfirm={() => onDelete(record)}
            >
              <Link type="danger">删除</Link>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const getList = async (params = {}) => {
    setLoading(true);
    try {
      // const {
      //   data: { total, current, pageSize, list },
      // } = await API.getUserList({
      //   ...pagination,
      //   ...params,
      // });
      setList(list || []);
      // setPagination({ ...pagination, total, current, pageSize });
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
      record: null,
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

  const onDelete = async ({ userId }: any) => {
    // const res = await API.deleteUserById({ userId });
    // if (res.code === 200) {
    //   Message.success('删除成功');
    //   getList();
    // }
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

  return (
    <div className="">
      <Search onSearch={onSearch} />
      <Card
        className="mt-4 custom_card"
        bordered={false}
        title="用户列表"
        extra={
          <Button type="primary" onClick={() => onAdd()}>
            + 新增
          </Button>
        }
      >
        <Table
          rowKey="userId"
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
          onOk={(values) => {
            setVisible(false);
            Message.success('操作成功');
            getList();
          }}
          onCancel={() => setVisible(false)}
        />
      )}
    </div>
  );
}
