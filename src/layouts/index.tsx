import PlatteSetting from '@/components/ActionsRender/PlatteSetting';
import CustomConfigProvider from '@/CustomConfigProvider';
import useSettings from '@/utils/useSettings';
import { PageContainer } from '@ant-design/pro-components';
import { Outlet } from '@umijs/max';

export default function Layouts() {
  const settings = useSettings();

  return (
    <CustomConfigProvider>
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
        <PlatteSetting
          color={settings?.themeColor}
          className={`fixed space_center right-0 top-1/3 z-50 text-white text-[24px] cursor-pointer rounded-l-lg`}
        />
      </PageContainer>
    </CustomConfigProvider>
  );
}
