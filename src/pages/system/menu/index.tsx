import getIconPark from '@/utils/getIconPark';
import { Api, Delete, Edit } from '@icon-park/react';
import { IconType } from '@icon-park/react/es/all';
import { Button, Card, Descriptions, DescriptionsProps, Empty } from 'antd';
import { useState } from 'react';
import AddEditModal from './components/add-edit-modal';
import MenuTree from './components/menu-tree';

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
          {getIconPark(record?.icon as IconType)} {record?.icon}
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
      label: '排序号',
      children: record?.order,
    },
    {
      key: 'canSearch',
      label: '允许搜索',
      children: record?.canSearch ? '开启' : '关闭',
    },
    {
      key: 'canCollect',
      label: '允许收藏',
      children: record?.canCollect ? '开启' : '关闭',
    },
    {
      key: 'collectTargetMenuName',
      label: '收藏目录菜单',
      children: record?.collectTargetMenuName,
    },
  ];

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
            + 新增
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
            <Button type="primary">
              <Api /> 绑定接口
            </Button>
            <Button>
              <Edit /> 编辑
            </Button>
            <Button>
              <Delete /> 删除
            </Button>
          </div>
        }
      >
        {record ? (
          <Descriptions
            items={items}
            bordered
            column={1}
            labelStyle={{ width: 160 }}
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
