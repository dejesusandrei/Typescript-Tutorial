export type ApiResponse<T> = {
  data: T;
  status: string;
  message?: string;
}

export type ApiError = {
  status: number;
  message: string;
  code?: string;
};

export type ApiResult<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: ApiError;
    };