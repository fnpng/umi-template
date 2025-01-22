import { getGradientColor } from '@/utils/useColor';
import ReactECharts from 'echarts-for-react';
import { BaseBoxShapeUtil, TLBaseShape } from 'tldraw';
import 'tldraw/tldraw.css';

export type ChartShape = TLBaseShape<
  'chart',
  { w: number; h: number; data: any[] }
>;

export default class ChartShapeUtil extends BaseBoxShapeUtil<ChartShape> {
  static override type = 'chart';

  override canScroll(): boolean {
    return true;
  }

  override canEdit(): boolean {
    return true;
  }

  override getDefaultProps() {
    return {
      w: 300,
      h: 200,
      data: new Array(12).fill(0).map((_item, index) => ({
        x: `${index + 1}`,
        y: Math.floor(Math.random() * 100),
      })),
    };
  }

  override component(shape: ChartShape) {
    const isEditing = this.editor.getEditingShapeId() === shape.id;

    const lineOption = {
      grid: { top: 8, right: 8, bottom: 24, left: 50 },
      xAxis: {
        type: 'category',
        data: shape.props.data?.map((item) => item.x),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: shape.props.data?.map((item) => item.y),
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

    const barOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999',
          },
        },
      },
      grid: { top: 8, right: 8, bottom: 30, left: 36 },
      xAxis: {
        type: 'category',
        axisLabel: { interval: 0 },
        data: shape.props.data?.map((item) => item.x),
      },
      yAxis: {
        type: 'value',
      },
      series: {
        type: 'bar',
        data: shape.props.data?.map((item) => item.y),
        datasetIndex: 1,
        itemStyle: {
          color: getGradientColor(['#7dd3fc', '#3b82f6']),
        },
      },
    };

    const pieOption = {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        top: '5%',
        left: 'center',
      },
      series: [
        {
          type: 'pie',
          center: ['50%', '55%'],
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          padAngle: 2,
          itemStyle: {
            borderRadius: 10,
          },
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: shape.props.data?.slice(4)?.map((item) => ({
            name: item.x,
            value: item.y,
          })),
        },
      ],
    };

    const multiOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999',
          },
        },
      },
      grid: { top: 8, right: 8, bottom: 30, left: 36 },
      xAxis: {
        type: 'category',
        axisLabel: { interval: 0 },
        data: shape.props.data?.map((item) => item.x),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          type: 'bar',
          data: shape.props.data?.map((item) => item.y),
          datasetIndex: 1,
          itemStyle: {
            color: getGradientColor(['#7dd3fc', '#3b82f6']),
          },
        },
        {
          type: 'line',
          data: shape.props.data?.map((item) => item.y + Math.random() * 10),
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
    };

    return (
      <div
        style={{
          width: shape.props.w,
          height: shape.props.h,
          pointerEvents: isEditing ? 'all' : undefined,
          overflow: 'hidden',
        }}
      >
        <ReactECharts
          option={
            shape.meta?.type === 'bar-chart'
              ? barOption
              : shape.meta?.type === 'pie-chart'
              ? pieOption
              : shape.meta?.type === 'more-chart'
              ? multiOption
              : lineOption
          }
          style={{ height: shape.props.h }}
        />
      </div>
    );
  }

  override indicator(shape: ChartShape) {
    return <rect width={shape.props.w} height={shape.props.h} rx={8} ry={8} />;
  }
}
