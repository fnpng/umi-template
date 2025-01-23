import getIconPark from '@/utils/getIconPark';
import highlightText from '@/utils/highlightText';
import { Search } from '@icon-park/react';
import { IconType } from '@icon-park/react/es/all';
import { Empty, Input, Spin, Tree } from 'antd';
import { useEffect, useState } from 'react';

export function searchData(TreeData: AUTH.MenuDTO[], searchValue: string) {
  const loop = (data: AUTH.MenuDTO[]) => {
    const result: AUTH.MenuDTO[] = [];
    data.forEach((item) => {
      if (
        (item?.name as string)
          ?.toLowerCase()
          .indexOf(searchValue.toLowerCase()) > -1
      ) {
        result.push({ ...item });
      } else if (item.childMenuList) {
        const filterData = loop(item.childMenuList);

        if (filterData.length) {
          result.push({ ...item, childMenuList: filterData });
        }
      }
    });
    return result;
  };

  return loop(TreeData);
}

export function flattenTreeIds(tree: AUTH.MenuDTO[] | undefined): string[] {
  const ids: string[] = [];
  const traverse = (nodes: AUTH.MenuDTO[] | undefined) => {
    if (!nodes) return;
    nodes.forEach((node) => {
      ids.push(node.id as string);
      if (node.childMenuList && node.childMenuList.length > 0) {
        traverse(node.childMenuList);
      }
    });
  };
  traverse(tree);
  return ids;
}

export default function FileTree({
  loading,
  allTreeData,
  record,
  onSelectInfo,
}: {
  loading: boolean;
  allTreeData: AUTH.MenuDTO[];
  record: AUTH.MenuDTO | null;
  onSelectInfo: (data: AUTH.MenuDTO) => void;
}) {
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [data, setData] = useState<AUTH.MenuDTO[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);

  const onSelect = (
    selectedKeys: React.Key[],
    { node: data }: { node: AUTH.MenuDTO },
  ) => {
    onSelectInfo(data);
    setSelectedKeys(selectedKeys);
  };

  useEffect(() => {
    if (record?.id) {
      setSelectedKeys([record.id as React.Key]);
    }
  }, [record]);

  useEffect(() => {
    if (searchValue) {
      setData(searchData(allTreeData, searchValue));
      setExpandedKeys(flattenTreeIds(searchData(allTreeData, searchValue)));
    } else {
      setData(allTreeData);
      setExpandedKeys(allTreeData.map((item) => item.id as React.Key) || []);
    }
  }, [allTreeData, searchValue]);

  return (
    <>
      <div className="flex mb-4">
        <Input.Search
          className="flex-1"
          allowClear
          onSearch={(value) => setSearchValue(value)}
          onPressEnter={(e) => setSearchValue(e.currentTarget.value)}
          placeholder="请输入关键词搜索"
          enterButton={<Search />}
        />
      </div>
      {loading ? (
        <Spin />
      ) : allTreeData?.length === 0 ? (
        <Empty />
      ) : (
        <div className="h-[calc(100vh-370px)] overflow-auto">
          <Tree
            onSelect={onSelect}
            selectedKeys={selectedKeys}
            blockNode
            fieldNames={{
              title: 'name',
              key: 'id',
              children: 'childMenuList',
            }}
            autoExpandParent
            expandedKeys={expandedKeys}
            onExpand={(keys) => setExpandedKeys(keys)}
            treeData={data}
            titleRender={(nodeData) => {
              return (
                <span className="space-x-1 whitespace-nowrap">
                  {getIconPark(nodeData?.icon as IconType)}
                  <span>
                    {highlightText(nodeData?.name as string, searchValue)}
                  </span>
                </span>
              );
            }}
          />
        </div>
      )}
    </>
  );
}
