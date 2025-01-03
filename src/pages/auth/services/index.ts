import HttpRequest from '@/core/http';
import { useAuthStore } from '@/stores';
import type { LoginRequest, LoginResponse } from '@/types';

export class AuthService {
  static async login({ email, password }: LoginRequest) {
    const authStore = useAuthStore();
    const response = await HttpRequest.post<LoginResponse>('/auth/login', {
      email,
      password
    });
    authStore.logIn(response.data.result);
  }
}
