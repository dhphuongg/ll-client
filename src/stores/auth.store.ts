import { AuthConstant } from '@/constants/auth.constant';
import type { ITokenStore, LoginResponse } from '@/types';

import CookieUtil from '@/utils/cookie';

export const useAuthStore = defineStore('auth', {
  state: (): ITokenStore => {
    return {
      accessToken: CookieUtil.getCookie(AuthConstant.ACCESS_TOKEN_KEY) || undefined,
      refreshToken: CookieUtil.getCookie(AuthConstant.REFRESH_TOKEN_KEY) || undefined
    };
  },
  getters: { loggedIn: ({ accessToken }): boolean => !!accessToken },
  actions: {
    logIn({ accessToken, refreshToken }: LoginResponse['result']) {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      CookieUtil.setCookie(AuthConstant.ACCESS_TOKEN_KEY, accessToken);
      CookieUtil.setCookie(AuthConstant.REFRESH_TOKEN_KEY, refreshToken);
    },
    logOut(): void {
      CookieUtil.removeCookie(AuthConstant.ACCESS_TOKEN_KEY);
      CookieUtil.removeCookie(AuthConstant.REFRESH_TOKEN_KEY);
      this.accessToken = undefined;
      this.refreshToken = undefined;
    }
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
