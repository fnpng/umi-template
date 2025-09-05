import { renderIcon } from '@/components/IconSelect';
import { Button, Card, Descriptions, DescriptionsProps, Empty } from 'antd';
import { useEffect, useState } from 'react';
import { MdAddCircle } from 'react-icons/md';
import AddEditModal from './components/add-edit-modal';
import MenuTree from './components/menu-tree';

const getMenus = async () => {
  const response = await fetch(`${process.env.API_URL}/menus`);
  const data = await response.json();
  return data;
};

export default function Index() {
  const [record, setRecord] = useState<any>({
    name: '系统管理',
  });
  const [visible, setVisible] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [allTreeData, setAllTreeData] = useState<AUTH.MenuDTO[]>([]);
  const [loading, setLoading] = useState(false);

  const items: DescriptionsProps['items'] = [
    {
      key: 'name',
      label: '菜单名称',
      children: record?.name,
    },
    {
      key: 'path',
      label: '菜单路径',
      children: record?.path,
    },
    {
      key: 'icon',
      label: 'icon',
      children: (
        <>
          {/* {getIconPark(record?.icon as IconType)}{' '} */}
          <span className="text-[15px]">{renderIcon(record?.icon)} </span>
          {record?.icon}
        </>
      ),
    },
    {
      key: 'parentId',
      label: '父级菜单',
      children: record?.parentId,
    },
    {
      key: 'order',
      label: '序号',
      children: record?.order,
    },
  ];

  const getList = async () => {
    const data = await getMenus();
    setAllTreeData(data);
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-3">
      <Card
        className="custom_card"
        title="菜单列表"
        extra={
          <Button
            type="primary"
            onClick={() => {
              setRecord(null);
              setVisible(true);
            }}
          >
            <MdAddCircle /> 新增
          </Button>
        }
      >
        <MenuTree
          allTreeData={allTreeData}
          loading={loading}
          record={record}
          onSelectInfo={setRecord}
        />
      </Card>
      <Card
        className="custom_card col-span-2"
        title="菜单详情"
        extra={
          <div className="space-x-2">
            <Button type="primary">绑定用户</Button>
            <Button type="primary" ghost>
              编辑
            </Button>
            <Button danger ghost>
              删除
            </Button>
          </div>
        }
      >
        {record ? (
          <Descriptions
            items={items}
            bordered
            column={1}
            styles={{
              label: {
                width: 160,
              },
            }}
          />
        ) : (
          <Empty description="请先选择菜单" />
        )}
      </Card>
      {visible && (
        <AddEditModal
          record={record}
          allTreeData={allTreeData}
          loading={modalLoading}
          onCancel={() => setVisible(false)}
          onOk={async (values) => {
            console.log(values);
            setVisible(false);
          }}
        />
      )}
    </div>
  );
}
