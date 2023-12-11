import getSettings from '@/utils/getSettings';
import { useNavigate } from '@umijs/max';
import { Button, Card, Empty } from 'antd';

export default function NotFound() {
  const { hideNavbar, hideFooter, hideInBreadcrumb, hideMenu } = getSettings();
  const navigate = useNavigate();

  // hideNavbar = 56px, hideFooter = 32px, hideInBreadcrumb = 48px,padding = 32px

  const getHeight = () => {
    if (hideFooter && hideNavbar && hideInBreadcrumb) {
      return 'h-[calc(100vh-32px)]';
    } else if (hideInBreadcrumb && hideNavbar) {
      return 'h-[calc(100vh-64px)]';
    } else if (hideFooter && hideNavbar) {
      return 'h-[calc(100vh-72px)]';
    } else if (hideInBreadcrumb && hideFooter) {
      return 'h-[calc(100vh-88px)]';
    } else if (hideInBreadcrumb) {
      return 'h-[calc(100vh-120px)]';
    } else if (hideFooter) {
      return 'h-[calc(100vh-128px)]';
    } else if (hideNavbar) {
      return 'h-[calc(100vh-96px)]';
    } else {
      return 'h-[calc(100vh-144px)]';
    }
  };

  return (
    <Card className={`${getHeight()} space-center`}>
      <Empty description="没有找到页面">
        <Button type="primary" onClick={() => navigate(-1)}>
          返回
        </Button>
      </Empty>
    </Card>
  );
}
