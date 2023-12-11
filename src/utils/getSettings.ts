import settings from '@/settings.json';
import getUrlParams from '@/utils/getUrlParams';
import { useRouteProps } from '@umijs/max';

const getSettings = () => {
  const routeProps = useRouteProps();
  const urlParams = getUrlParams();

  const hideNavbar =
    !settings.navbar ||
    urlParams.navbar === false ||
    routeProps?.headerRender === false;

  const hideMenu =
    !settings.menu ||
    urlParams.menu === false ||
    routeProps?.menuRender === false;

  const hideFooter =
    !settings.footer ||
    urlParams.footer === false ||
    routeProps?.footerRender === false;

  const hideInBreadcrumb =
    !settings.breadcrumb ||
    urlParams.breadcrumb === false ||
    routeProps?.hideInBreadcrumb === true;

  return {
    ...settings,
    hideNavbar,
    hideMenu,
    hideFooter,
    hideInBreadcrumb,
  };
};

export default getSettings;

export type Settings = ReturnType<typeof getSettings>;
