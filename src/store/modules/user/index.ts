import { defineStore } from 'pinia';
import {
  login as userLogin,
  logout as userLogout,
  getUserInfo,
  LoginParams,
} from '@/api/user';
import { setToken, clearToken } from '@/utils/auth';
import { removeRouteListener } from '@/utils/route-listener';
import { UserRole, UserStatus, UserView } from './types';
import useAppStore from '../app';

const useUserStore = defineStore('user', {
  state: (): UserView => ({
    id: -1,
    username: '',
    nickname: '',
    role: UserRole.NONE,
    email: '',
    avatar: '',
    createTime: +new Date(),
    status: UserStatus.ENABLE,
  }),

  getters: {
    userInfo(state: UserView): UserView {
      return { ...state };
    },
  },

  actions: {
    switchRoles() {
      return new Promise((resolve) => {
        this.role =
          this.role === UserRole.USER ? UserRole.ADMIN : UserRole.USER;
        resolve(this.role);
      });
    },
    // Set user's information
    setInfo(partial: Partial<UserView>) {
      this.$patch(partial);
    },

    // Reset user's information
    resetInfo() {
      this.$reset();
    },

    // Get user's information
    async info() {
      const userinfo = await getUserInfo();
      this.setInfo(userinfo);
    },

    // Login
    async login(loginForm: LoginParams) {
      try {
        const { id } = await userLogin(loginForm);
        setToken(id.toString());
      } catch (err) {
        clearToken();
        throw err;
      }
    },
    logoutCallBack() {
      const appStore = useAppStore();
      this.resetInfo();
      clearToken();
      removeRouteListener();
      appStore.clearServerMenu();
    },
    // Logout
    async logout() {
      try {
        await userLogout();
      } finally {
        this.logoutCallBack();
      }
    },
  },
});

export default useUserStore;
