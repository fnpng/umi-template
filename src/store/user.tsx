import { IBestAFSRoute } from '@/routes';
import settings from '@/settings.json';
import { proxy, subscribeKey } from '@umijs/max';

export interface UserDTO {
  id?: number;
  name?: string;
  email?: string;
}

const initialState: UserDTO = {
  id: undefined,
  name: undefined,
  email: undefined,
};

export const userStore = proxy({
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo') ?? '{}')
    : initialState,
  setUserInfo: (userInfo: UserDTO) => {
    userStore.userInfo = { ...userStore.userInfo, ...userInfo };
  },
  token: localStorage.getItem('token') ?? '',
  setToken: (token: string) => {
    userStore.token = token;
  },
  userSettings: localStorage.getItem('userSettings')
    ? JSON.parse(localStorage.getItem('userSettings') ?? '{}')
    : settings,
  setUserSettings: (
    userSettings: typeof settings | Record<string, unknown>,
  ) => {
    userStore.userSettings = { ...userStore.userSettings, ...userSettings };
  },
  userMenu: [] as IBestAFSRoute[],
  setUserMenu: (menu: IBestAFSRoute[]) => {
    userStore.userMenu = menu;
  },
});

subscribeKey(userStore, 'userInfo', () => {
  localStorage.setItem('userInfo', JSON.stringify(userStore.userInfo));
});

subscribeKey(userStore, 'token', () => {
  localStorage.setItem('token', userStore.token);
});

subscribeKey(userStore, 'userSettings', () => {
  localStorage.setItem('userSettings', JSON.stringify(userStore.userSettings));
});

export default userStore;
