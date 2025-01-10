import { userStore } from '@/store';
import getUrlParams from '@/utils/getUrlParams';
import { useRouteProps, useSnapshot } from '@umijs/max';

const useSettings = () => {
  const routeProps = useRouteProps();
  const urlParams = getUrlParams();
  const { userSettings } = useSnapshot(userStore);

  const hideNavbar =
    !userSettings.navbar ||
    urlParams.navbar === false ||
    routeProps?.headerRender === false;

  const hideMenu =
    !userSettings.menu ||
    urlParams.menu === false ||
    routeProps?.menuRender === false;

  const hideFooter =
    !userSettings.footer ||
    urlParams.footer === false ||
    routeProps?.footerRender === false;

  const hideInBreadcrumb =
    !userSettings.breadcrumb ||
    urlParams.breadcrumb === false ||
    routeProps?.hideInBreadcrumb === true;

  return {
    ...userSettings,
    hideNavbar,
    hideMenu,
    hideFooter,
    hideInBreadcrumb,
  };
};

export default useSettings;

export type Settings = ReturnType<typeof useSettings>;
