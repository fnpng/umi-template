import getSettings from '@/utils/getSettings';
import { PageContainer } from '@ant-design/pro-components';
import { Outlet } from '@umijs/max';

export default function Layouts() {
  const settings = getSettings();

  return (
    <PageContainer
      ghost
      header={{
        title: false,
        breadcrumbRender: (props, dom) => {
          return settings?.hideInBreadcrumb ? false : dom;
        },
      }}
    >
      <Outlet />
      {!settings?.hideFooter && (
        <div className="w-full text-center h-[16px] mt-[8px] text-slate-500">
          {settings.copyright}
        </div>
      )}
    </PageContainer>
  );
}
