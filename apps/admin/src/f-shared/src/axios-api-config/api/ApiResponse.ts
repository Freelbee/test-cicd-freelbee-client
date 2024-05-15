import { AxiosError, AxiosResponse } from 'axios';
import { ApiResponseError } from '@admin/shared';
import { ErrorResponse } from '@freelbee/shared/error';

export class ApiResponse<T> {
  private readonly status: boolean | null = null;
  private readonly code: number | null = null;
  private readonly error: ApiResponseError | null = null;
  private readonly data: T | null = null;
  private readonly headers: any;
  private readonly errorResponse: AxiosError<ErrorResponse> | null = null;
  private readonly response: AxiosResponse<T> | null = null;

  constructor(response: AxiosResponse<T> | null, error?: AxiosError<ErrorResponse>) {
    console.log(response, error);
    if (response) {
      this.status = response.status < 300;
      this.error = null;
      this.data = response?.data;
      this.headers = response?.headers;
      this.code = response.status;
      this.response = response;
      return;
    }
    if (error!) {
      this.status = false;
      this.data = null;
      this.headers = error.response?.headers;
      this.code = error.response?.status ?? 500;
      this.errorResponse = error;
      return;
    }
  }

  /**
   *
   * @return {boolean}
   */
  public isSuccess(): boolean {
    return this.status ?? false;
  }

  /**
   *
   * @return {T}
   */
  public getData(): T {
    if (this.data === null) {
      throw new Error(`Error, can't access response data. Server response with error`);
    }
    return this.data;
  }

  public getError(): ApiResponseError | null {
    return this.error;
  }

  public getHeaders() {
    return this.headers;
  }


  public getCode() {
    return this.code;
  }

  public getErrorResponse() {
    return this.errorResponse;
  }

  public getResponse() {
    return this.response;
  }
}
