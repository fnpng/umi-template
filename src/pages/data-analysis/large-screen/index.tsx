import highlightText from '@/utils/highlightText';
import {
  DownloadOne,
  Edit,
  FileAddition,
  FileCode,
  FolderClose,
  FolderOpen,
  FolderPlus,
  MoreOne,
  Redo,
  Search,
  ShareSys,
  ShareTwo,
  Star,
} from '@icon-park/react';
import { useNavigate } from '@umijs/max';
import {
  Button,
  Card,
  Divider,
  Dropdown,
  Input,
  Splitter,
  Tree,
  TreeDataNode,
  TreeProps,
} from 'antd';
import { useState } from 'react';

const x = 3;
const y = 2;
const z = 1;
const defaultData: TreeDataNode[] = [];

const generateData = (
  _level: number,
  _preKey?: React.Key,
  _tns?: TreeDataNode[],
) => {
  const preKey = _preKey || '0';
  const tns = _tns || defaultData;

  const children: React.Key[] = [];
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    tns.push({ title: `数据大屏-${key}`, key });
    if (i < y) {
      children.push(key);
    }
  }
  if (_level < 0) {
    return tns;
  }
  const level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(level, key, tns[index].children);
  });
};
generateData(z);

export default function Index() {
  const [gData, setGData] = useState(defaultData);
  const [expandedKeys, setExpandedKeys] = useState(['0-0', '0-0-0', '0-0-0-0']);
  const [searchValue, setSearchValue] = useState('');

  const onDragEnter: TreeProps['onDragEnter'] = (info) => {
    setExpandedKeys(info.expandedKeys as string[]);
  };

  const onDrop: TreeProps['onDrop'] = (info) => {
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]); // the drop position relative to the drop node, inside 0, top -1, bottom 1

    const loop = (
      data: TreeDataNode[],
      key: React.Key,
      callback: (node: TreeDataNode, i: number, data: TreeDataNode[]) => void,
    ) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children!, key, callback);
        }
      }
    };
    const data = [...gData];

    // Find dragObject
    let dragObj: TreeDataNode;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert. New item was inserted to the start of the array in this example, but can be anywhere
        item.children.unshift(dragObj);
      });
    } else {
      let ar: TreeDataNode[] = [];
      let i: number;
      loop(data, dropKey, (_item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        // Drop on the top of the drop node
        ar.splice(i!, 0, dragObj!);
      } else {
        // Drop on the bottom of the drop node
        ar.splice(i! + 1, 0, dragObj!);
      }
    }
    setGData(data);
  };

  const navigate = useNavigate();

  const onEdit = () => {
    navigate('/data-analysis/page-build');
  };

  return (
    <div className="h-[calc(100vh-160px)]">
      <Splitter className="gap-1">
        <Splitter.Panel defaultSize="20%" min="20%" max="40%">
          <Card
            className="custom_card h-full"
            title="数据大屏"
            extra={
              <div className="space-x-2">
                <Button size="small">
                  <FolderPlus />
                </Button>
                <Button size="small" onClick={onEdit}>
                  <FileAddition />
                </Button>
              </div>
            }
          >
            <Input
              prefix={<Search />}
              value={searchValue}
              onChange={(ev) => setSearchValue(ev.target.value)}
              placeholder="搜索关键词"
              className="w-full mb-3 -mt-2"
            />
            <Tree
              className="custom-list-tree"
              defaultExpandedKeys={expandedKeys}
              onExpand={(keys) => {
                setExpandedKeys(keys as string[]);
              }}
              draggable
              blockNode
              onDragEnter={onDragEnter}
              onDrop={onDrop}
              treeData={gData}
              titleRender={(nodeData) => {
                return (
                  <div className="flex justify-between items-center whitespace-nowrap">
                    <span className="space-x-1 w-[calc(100%-16px)]">
                      {!nodeData.children?.length ? (
                        <FileCode
                          theme="filled"
                          size="15"
                          fill="#62c7a3"
                          strokeWidth={3}
                        />
                      ) : expandedKeys.includes(nodeData?.key as string) ? (
                        <FolderOpen
                          theme="filled"
                          size="15"
                          fill="#fbbf24"
                          strokeWidth={3}
                        />
                      ) : (
                        <FolderClose
                          theme="filled"
                          size="15"
                          fill="#fbbf24"
                          strokeWidth={3}
                        />
                      )}
                      <span>
                        {highlightText(nodeData?.title as string, searchValue)}
                      </span>
                    </span>
                  </div>
                );
              }}
            />
          </Card>
        </Splitter.Panel>
        <Splitter.Panel>
          <Card
            className="custom_card h-full"
            title={
              <div className="space-x-2">
                <span>数据大屏-0-0</span> <Star /> <Divider type="vertical" />{' '}
                <span className="text-sm text-gray-500">创建人：admin</span>
              </div>
            }
            extra={
              <div className="flex gap-2">
                <Button>
                  <ShareSys /> 预览
                </Button>
                <Button>
                  <ShareTwo /> 分享
                </Button>
                <Button type="primary" onClick={onEdit}>
                  <Edit /> 编辑
                </Button>
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: '1',
                        label: '刷新',
                        icon: <Redo />,
                      },
                      {
                        key: '2',
                        label: '导出',
                        icon: <DownloadOne />,
                      },
                    ],
                  }}
                >
                  <div
                    className="space_center rounded px-1 hover:bg-slate-200 cursor-pointer"
                    onClick={(e) => e.preventDefault()}
                  >
                    <MoreOne size={20} />
                  </div>
                </Dropdown>
              </div>
            }
          >
            <img
              src={require('@/assets/example.jpg')}
              className="w-full rounded-md"
            />
          </Card>
        </Splitter.Panel>
      </Splitter>
    </div>
  );
}
