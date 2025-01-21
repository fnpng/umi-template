import PlatteSetting from '@/components/ActionsRender/PlatteSetting';
import { userStore } from '@/store';
import useSettings from '@/utils/useSettings';
import { PageContainer } from '@ant-design/pro-components';
import { Outlet } from '@umijs/max';
import { ConfigProvider } from 'antd';

export default function Layouts() {
  const settings = useSettings();
  const containerBg = '#f3f4f6';

  const themeStyle = {
    colorBgContainer: containerBg,
    colorBorder: containerBg,
  };
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: userStore.userSettings?.themeColor,
          colorLink: userStore.userSettings?.themeColor,
        },
        components: {
          Segmented: {
            itemSelectedColor: userStore.userSettings?.themeColor,
          },
          Button: themeStyle,
          DatePicker: themeStyle,
          Input: themeStyle,
          Select: themeStyle,
          InputNumber: themeStyle,
          Mentions: themeStyle,
          ColorPicker: themeStyle,
        },
      }}
    >
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
    </ConfigProvider>
  );
}
