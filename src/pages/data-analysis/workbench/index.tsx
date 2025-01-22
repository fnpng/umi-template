import { Analysis, Edit, Search, ShareOne, Slide } from '@icon-park/react';
import {
  Avatar,
  Button,
  Card,
  Input,
  Segmented,
  Select,
  Statistic,
  Table,
} from 'antd';

export default function Index() {
  const statisticList = [
    {
      title: '数据集',
      value: 367,
    },
    {
      title: '数据大屏',
      value: 15,
    },
    {
      title: '数据模版',
      value: 46,
    },
  ];
  return (
    <div className="grid grid-cols-12 gap-3">
      <div className="col-span-4 flex flex-col gap-3">
        <Card className="custom_card">
          <div className="flex items-center gap-3">
            <Avatar size={54} src={require('@/assets/avatar.png')} />
            <div>
              <div className="text-lg">admin</div>
              <span>ID: 1</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 mt-4">
            {statisticList?.map((item) => (
              <Statistic
                key={item.title}
                title={item.title}
                value={item.value}
              />
            ))}
          </div>
        </Card>
        <Card className="custom_card" title="快速创建">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex_center gap-3 hover:bg-slate-200 p-3 rounded-md pl-4 border border-solid border-slate-200 cursor-pointer">
              <div className="bg-blue-500 text-white px-2 py-1 rounded-md">
                <Analysis />
              </div>
              数据大屏
            </div>
            <div className="flex_center gap-3 hover:bg-slate-200 p-3 rounded-md pl-4 border border-solid border-slate-200 cursor-pointer">
              <div className="bg-red-500 text-white px-2 py-1 rounded-md">
                <Analysis />
              </div>
              数据模版
            </div>
            <div className="flex_center gap-3 hover:bg-slate-200 p-3 rounded-md pl-4 border border-solid border-slate-200 cursor-pointer">
              <div className="bg-green-500 text-white px-2 py-1 rounded-md">
                <Analysis />
              </div>
              数据集
            </div>
            <div className="flex_center gap-3 hover:bg-slate-200 p-3 rounded-md pl-4 border border-solid border-slate-200 cursor-pointer">
              <div className="bg-indigo-500 text-white px-2 py-1 rounded-md">
                <Analysis />
              </div>
              数据源
            </div>
          </div>
        </Card>
      </div>
      <div className="col-span-8 flex flex-col gap-3">
        <Card
          className="custom_card"
          title="模版中心"
          extra={
            <div>
              <Button>查看更多</Button>
            </div>
          }
        >
          <div className="flex gap-3 overflow-y-hidden overflow-x-auto">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="flex_center flex-col gap-3">
                <div className="w-[480px] h-[120px] bg-slate-200 rounded-md overflow-hidden">
                  <img
                    src={require(`@/assets/template_${index + 1}.jpg`)}
                    className="w-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="custom_card" title="">
          <Segmented options={['最近使用', '我的收藏', '我的分享']} />
          <div className="space_between my-4">
            <Select
              className="w-[160px]"
              defaultValue="全部类型"
              options={[
                '全部类型',
                '数据大屏',
                '数据模版',
                '数据集',
                '数据源',
              ]?.map((item) => ({
                label: item,
                value: item,
              }))}
            />
            <Input
              prefix={<Search />}
              placeholder="搜索关键词"
              className="w-[240px]"
            />
          </div>
          <Table
            dataSource={[
              {
                key: '1',
                name: '新建数据大屏',
                type: '数据大屏',
                created: 'admin',
                operation: 'admin',
                time: '2021-08-12 14:00',
              },
              {
                key: '2',
                name: '基础数据分析大屏',
                type: '数据大屏',
                created: 'admin',
                operation: 'admin',
                time: '2021-08-12 14:00',
              },
            ]}
            columns={[
              {
                title: '名称',
                dataIndex: 'name',
              },
              {
                title: '类型',
                dataIndex: 'type',
              },
              {
                title: '创建人',
                dataIndex: 'created',
              },
              {
                title: '最近编辑人',
                dataIndex: 'operation',
              },
              {
                title: '最近编辑时间',
                dataIndex: 'time',
              },
              {
                title: '操作',
                dataIndex: 'action',
                render: () => (
                  <div className="flex">
                    <div className="text-blue-500 cursor-pointer hover:bg-slate-200 p-1 px-2 rounded-md">
                      <Slide />
                    </div>
                    <div className="text-blue-500 cursor-pointer hover:bg-slate-200 p-1 px-2 rounded-md">
                      <Edit />
                    </div>
                    <div className="text-blue-500 cursor-pointer hover:bg-slate-200 p-1 px-2 rounded-md">
                      <ShareOne />
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </Card>
      </div>
    </div>
  );
}
