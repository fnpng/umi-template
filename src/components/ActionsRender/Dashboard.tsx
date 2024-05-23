import { ChartPie } from '@icon-park/react';
import { useNavigate } from '@umijs/max';

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate('/dashboard/data-asset');
      }}
    >
      <ChartPie />
    </div>
  );
}
