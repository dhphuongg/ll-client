export * from './auth.type';

export type ApiResponse<T = any> = {
  success: boolean;
  status: number;
  message: string;
  result: T;
};

export type ApiErrorResponse = {
  status: number;
  message: string | string[];
};
