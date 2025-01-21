import { ColorList, getGradientColor } from '@/utils/useColor';
import {
  Announcement,
  Avatar,
  Bookshelf,
  Config,
  FileWord,
  FontSearch,
  IdCard,
  Me,
  Message,
  MessageOne,
  UpTwo,
  WaterfallsV,
} from '@icon-park/react';
import { Card, List, Skeleton, Spin, Statistic } from 'antd';
import ReactECharts from 'echarts-for-react';
import Mock from 'mockjs';
import React, { useEffect } from 'react';

const year = new Date().getFullYear();
const getLineData = () => {
  return new Array(12).fill(0).map((_item, index) => ({
    date: `${year}-${index + 1}`,
    count: Mock.Random.natural(20000, 75000),
  }));
};

export default function Metadata() {
  const [data, setData] = React.useState({
    allContents: '2735',
    increaseComments: '1874',
    liveContents: '88',
    growthRate: '2.8%',
    chartData: getLineData(),
  });
  const [loading, setLoading] = React.useState(false);

  const getOverviewData = async () => {
    setLoading(true);
    // const res = await API.overview({});
    // setData(res.data);
    setLoading(false);
  };

  useEffect(() => {
    getOverviewData();
  }, []);

  const lineOptions = {
    grid: { top: 8, right: 8, bottom: 24, left: 50 },
    xAxis: {
      type: 'category',
      data: data?.chartData?.map((item) => item.date),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: data?.chartData?.map((item) => item.count),
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: {
          width: 3,
          color: getGradientColor(['#6F42FB', '#1EE7FF']),
        },
        areaStyle: {
          color: getGradientColor([
            'rgb(17, 126, 255, 0.2)',
            'rgb(17, 128, 255, 0)',
          ]),
        },
      },
    ],
    tooltip: {
      trigger: 'axis',
      className: 'echart-tooltip',
    },
  };

  const StatisticItem = ({
    title,
    value,
    icon,
    suffix,
    loading,
  }: {
    title: string;
    value: string;
    icon: React.ReactNode;
    suffix: React.ReactNode;
    loading: boolean;
  }) => {
    return (
      <div className="flex items-center">
        <div className="h-16 w-16 flex justify-center items-center bg-slate-50 rounded-full mr-6">
          {icon}
        </div>
        <Skeleton loading={loading}>
          <Statistic title={title} value={value} suffix={suffix} />
        </Skeleton>
      </div>
    );
  };

  const statisticItemList = [
    {
      title: '指标总数',
      value: data.allContents,
      icon: <WaterfallsV theme="filled" size="32" fill={ColorList[0][5]} />,
      suffix: '个',
    },
    {
      title: '质量监控',
      value: data.increaseComments,
      icon: <Announcement theme="filled" size="32" fill={ColorList[1][5]} />,
      suffix: '个',
    },
    {
      title: '增长速率',
      value: data.growthRate,
      icon: <Bookshelf theme="filled" size="32" fill={ColorList[4][5]} />,
      suffix: <UpTwo theme="filled" size="24" fill="#0fbf60" />,
    },
    {
      title: '总体评分',
      value: data.liveContents,
      icon: <FileWord theme="filled" size="32" fill={ColorList[3][5]} />,
      suffix: '分',
    },
  ];

  const leftBarOptions = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999',
        },
      },
    },
    dataset: [
      {
        dimensions: ['name', 'score', 'date'],
        source: [
          ['RAW', 101, '2011-02-12'],
          ['RFN', 83, '2011-03-01'],
          ['AST', 154, '2011-02-14'],
          ['SRV', 25, '2011-04-02'],
          ['OTHER', 69, '2011-04-02'],
        ],
      },
      {
        transform: {
          type: 'sort',
          config: { dimension: 'score', order: 'desc' },
        },
      },
    ],
    grid: {
      top: 8,
      right: 8,
      bottom: 30,
      left: 36,
    },
    xAxis: {
      type: 'category',
      axisLabel: { interval: 0 },
    },
    yAxis: {},
    series: {
      type: 'bar',
      encode: { x: 'name', y: 'score' },
      datasetIndex: 1,
      barWidth: 30,
      itemStyle: {
        color: getGradientColor(['#3b82f6', '#7dd3fc30']),
      },
    },
  };

  const rightBarOptions = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999',
        },
      },
    },
    dataset: [
      {
        dimensions: ['name', 'score', 'date'],
        source: [
          ['ACCOUNT', 40, '2011-02-12'],
          ['PRODUCT', 30, '2011-03-01'],
          ['SELL', 95, '2011-02-14'],
          ['STORE', 30, '2011-04-02'],
          ['OTHER', 69, '2011-04-02'],
        ],
      },
      {
        transform: {
          type: 'sort',
          config: { dimension: 'score', order: 'desc' },
        },
      },
    ],
    grid: {
      top: 8,
      right: 8,
      bottom: 30,
      left: 36,
    },
    xAxis: {
      type: 'category',
      axisLabel: { interval: 0 },
    },
    yAxis: {},
    series: {
      type: 'bar',
      encode: { x: 'name', y: 'score' },
      datasetIndex: 1,
      barWidth: 30,
      itemStyle: {
        color: getGradientColor(['#f87171', '#fed7aa30']),
      },
    },
  };

  const quickList = [
    {
      icon: <Me />,
      title: '用户管理',
    },
    {
      icon: <Avatar />,
      title: '角色管理',
    },
    {
      icon: <Message />,
      title: '消息通知',
    },
    {
      icon: <IdCard />,
      title: '部门管理',
    },
    {
      icon: <FontSearch />,
      title: '字典管理',
    },
    {
      icon: <Config />,
      title: '配置中心',
    },
  ];

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="grid grid-cols-4 gap-4 col-span-9">
        {statisticItemList.map((item) => {
          return (
            <Card key={item.title}>
              <StatisticItem
                title={item.title}
                value={item.value}
                icon={item.icon}
                suffix={item.suffix}
                loading={loading}
              />
            </Card>
          );
        })}
        <Card className="custom_card col-span-2" title="数仓分层统计">
          <ReactECharts option={leftBarOptions} style={{ height: 250 }} />
        </Card>
        <Card className="custom_card col-span-2" title="业务域分层统计">
          <ReactECharts option={rightBarOptions} style={{ height: 250 }} />
        </Card>
        <Card className="custom_card col-span-4" title="访问统计热度">
          <Spin spinning={loading} style={{ width: '100%' }}>
            <ReactECharts option={lineOptions} style={{ height: 300 }} />
          </Spin>
        </Card>
      </div>
      <div className="flex flex-col gap-4 col-span-3">
        <Card className="custom_card" title="快捷入口">
          <div className="grid grid-cols-2 gap-3 whitespace-nowrap">
            {quickList?.map((item, index) => (
              <div
                key={item.title}
                className="flex_center gap-1 bg-slate-100 p-2 rounded-md"
              >
                <div
                  className="text-[16px] px-1"
                  style={{ color: ColorList[index]?.[5] }}
                >
                  {item.icon}
                </div>
                <div>{item.title}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="custom_card" title="通知公告">
          <List
            itemLayout="horizontal"
            dataSource={new Array(6).fill(0)}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <div className="w-8 h-8 space_center bg-slate-100 rounded-full">
                      <MessageOne />
                    </div>
                  }
                  title={<a href="">消息通知 {index}</a>}
                  description="A design language for background applications, is refined by UED Team"
                />
              </List.Item>
            )}
          />
        </Card>
      </div>
    </div>
  );
}
