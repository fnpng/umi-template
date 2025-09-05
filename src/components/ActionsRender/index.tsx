import { useNavigate } from '@umijs/max';
import { Tooltip } from 'antd';
import { TbChartDonutFilled } from 'react-icons/tb';

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate('/dashboard/data-asset');
      }}
      className="flex_center"
    >
      <TbChartDonutFilled />
    </div>
  );
}

export function ActionsRender() {
  const actions: Record<string, any>[] = [
    // { label: '数据看板', component: Dashboard },
    // { label: '页面风格配置', component: PlatteSetting },
  ];
  return actions?.map((item) => {
    const Component = item.component;
    return (
      <Tooltip title={item.label} key={item.label}>
        <div
          className={`h-[32px] w-[32px] space_center bg-slate-100 rounded-[99px] text-slate-400 ml-3`}
        >
          <Component />
        </div>
      </Tooltip>
    );
  });
}
