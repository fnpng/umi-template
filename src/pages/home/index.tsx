import { getGradientColor } from '@/utils/useColor';
import { Button, Card, Divider, Input, Segmented, Spin } from 'antd';
import ReactECharts from 'echarts-for-react';
import React, { useEffect } from 'react';
import { AiFillFire, AiFillStar } from 'react-icons/ai';
import { BiSolidChart } from 'react-icons/bi';
import { CiCircleMore } from 'react-icons/ci';
import { FaEye } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { PiListNumbersFill } from 'react-icons/pi';

const getTrendChartData = async () => {
  try {
    const response = await fetch(`${process.env.API_URL}/trendChart`);
    const data = await response.json();
    return data;
  } catch (error) {
    return [];
  }
};

export default function Metadata() {
  const [trendChartData, setTrendChartData] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    setLoading(true);
    getTrendChartData().then((res) => {
      setTrendChartData(res);
    });
    setLoading(false);
  }, []);

  const lineOptions = {
    grid: { top: 8, right: 0, bottom: 24, left: 40 },
    xAxis: {
      type: 'category',
      data: trendChartData?.map((item) => item.date),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: trendChartData?.map((item) => item.count),
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

  const list = [
    {
      key: '1',
      name: '销售额 (sales_revenue)',
      time: '2024-03-01',
      count: 689,
    },
    {
      key: '2',
      name: '客单价 (average_order_value)',
      time: '2024-09-03',
      count: 560,
    },
    {
      key: '3',
      name: '订单量 (order_count)',
      time: '2024-08-03',
      count: 517,
    },
    {
      key: '4',
      name: '订单金额 (order_amount)',
      time: '2024-07-03',
      count: 479,
    },
    {
      key: '5',
      name: '页面浏览量 (page_view)',
      time: '2024-06-03',
      count: 457,
    },
    {
      key: '6',
      name: '用户访问量 (user_visits)',
      time: '2024-05-03',
      count: 374,
    },
  ];

  return (
    <div className="-mt-[16px] -mx-[24px]">
      <div className="relative h-[240px] space_center">
        <img
          src={require('@/assets/search_bg.jpg')}
          alt="home_bg"
          className="absolute top-0 left-0 w-full h-full object-cover opacity-70"
        />
        <div className="z-10 flex_center flex-col">
          <Input
            placeholder="请输入指标搜索"
            size="large"
            style={{
              width: '600px',
              backgroundColor: 'rgba(255, 255, 255, 1)',
            }}
            prefix={<FiSearch />}
            suffix={<Button type="primary">搜索</Button>}
          />
          <div className="flex items-center gap-2 mt-4 text-slate-600">
            <span>所有指标：998个</span>
            <Divider type="vertical" />
            <span>原子指标：775个</span>
            <Divider type="vertical" />
            <span>派生指标：123个</span>
            <Divider type="vertical" />
            <span>复合指标：100个</span>
          </div>
        </div>
      </div>
      <div className="p-4 -mt-[56px] grid grid-cols-12 gap-4">
        <Card
          className="custom_card col-span-4"
          title={
            <div className="flex items-center gap-1">
              <AiFillFire className="text-red-500 text-[20px]" /> 热门指标
            </div>
          }
          extra={
            <a className="flex_center gap-1">
              <CiCircleMore size={18} /> 更多
            </a>
          }
        >
          <div className="grid grid-cols-2 gap-4">
            {new Array(8).fill(0).map((item, index) => (
              <div key={index} className="bg-slate-100 p-2 rounded-md"></div>
            ))}
          </div>
        </Card>
        <Card
          className="custom_card col-span-4"
          title={
            <div className="flex items-center gap-1">
              <FaEye className="text-indigo-500 text-[20px]" /> 我浏览的
            </div>
          }
          extra={
            <a className="flex_center gap-1">
              <CiCircleMore size={18} /> 更多
            </a>
          }
        >
          <div className="grid grid-cols-2 gap-4">
            {new Array(7).fill(0).map((item, index) => (
              <div key={index} className="bg-slate-100 p-2 rounded-md"></div>
            ))}
          </div>
        </Card>
        <Card
          className="custom_card col-span-4"
          title={
            <div className="flex items-center gap-1">
              <AiFillStar className="text-orange-500 text-[20px]" /> 我收藏的
            </div>
          }
          extra={
            <a className="flex_center gap-1">
              <CiCircleMore size={18} /> 更多
            </a>
          }
        >
          <div className="grid grid-cols-2 gap-4">
            {new Array(7).fill(0).map((item, index) => (
              <div key={index} className="bg-slate-100 p-2 rounded-md"></div>
            ))}
          </div>
        </Card>

        <Card
          className="custom_card col-span-8"
          title={
            <div className="flex items-center gap-1">
              <BiSolidChart size={20} className="text-blue-500" />
              指标访问量趋势
            </div>
          }
          extra={<Segmented options={['最近一年', '最近30天', '最近7天']} />}
        >
          <Spin spinning={loading} style={{ width: '100%' }}>
            <ReactECharts option={lineOptions} style={{ height: 300 }} />
          </Spin>
        </Card>
        <Card
          className="custom_card col-span-4"
          title={
            <div className="flex items-center gap-1">
              <PiListNumbersFill size={20} className="text-red-500" />
              指标动态
            </div>
          }
          extra={
            <a className="flex_center gap-1">
              <CiCircleMore size={18} /> 更多
            </a>
          }
        >
          <div className="flex flex-col gap-2 -mt-1">
            {list.map((item, index) => (
              <div
                key={index}
                className={`p-3 rounded-md ${
                  index % 2 === 0 ? 'bg-slate-100' : ''
                }`}
              >
                <div className="space_between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-5 h-5 space_center rounded-full text-white ${
                        index === 0
                          ? 'bg-red-500'
                          : index === 1
                          ? 'bg-orange-500'
                          : index === 2
                          ? 'bg-indigo-500'
                          : 'bg-slate-500'
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span className="text-indigo-500 font-bold">
                      {item.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-gray-600">
                    <span>发布时间: {item.time}</span>
                    <span>访问量: {item.count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
