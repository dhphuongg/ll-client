import type { ApiResponse } from '@/types';

export interface ITokenStore {
  accessToken?: string;
  refreshToken?: string;
}

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = ApiResponse<{
  accessToken: string;
  refreshToken: string;
}>;
