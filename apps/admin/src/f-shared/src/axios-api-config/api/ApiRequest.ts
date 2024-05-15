import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ErrorResponse } from '@freelbee/shared/error';
import { ApiResponse, Endpoint_Enum, Request, Token_Enum, TokenPairDto } from '@admin/shared';

export class ApiRequest {
  private readonly axiosApi: AxiosInstance;
  private setError: (title: string, error: ErrorResponse, method: string) => void;

  constructor(setError: (title: string, error: ErrorResponse, method: Endpoint_Enum | string) => void, url?: string) {
    this.axiosApi = axios.create({
      baseURL: process.env.NODE_ENV === `development` ? `http://localhost:8082/api/v1` : '/api/v1',
      withCredentials: true
    });
    this.setError = setError;
  }

  public async sendPost<RequestT, ResponseT>(request: Request<RequestT>): Promise<ApiResponse<ResponseT>> {
    return this.sendRequest<ResponseT>(() => this.sendPostRequest(request.getConfig()));
  }

  public async sendPut<RequestT, ResponseT>(request: Request<RequestT>): Promise<ApiResponse<ResponseT>> {
    return this.sendRequest<ResponseT>(() => this.sendPutRequest(request.getConfig()));
  }

  public async sendPath<RequestT, ResponseT>(request: Request<RequestT>): Promise<ApiResponse<ResponseT>> {
    return this.sendRequest<ResponseT>(() => this.sendPathRequest(request.getConfig()));
  }

  public async sendGet<RequestT, ResponseT>(request: Request<RequestT>): Promise<ApiResponse<ResponseT>> {
    return this.sendRequest<ResponseT>(() => this.sendGetRequest(request.getConfig()));
  }

  private async sendRequest<ResponseT>(callback: () => Promise<AxiosResponse<any>>): Promise<ApiResponse<ResponseT>> {
    try {
      const response = await callback();
      return new ApiResponse<ResponseT>(response);
    } catch (e: AxiosError | any) {
      return this.tryRefreshTokenOrReturnError<ResponseT>(e, callback);
    }
  }

  private async tryRefreshTokenOrReturnError<ResponseT>(error: AxiosError<ErrorResponse> | any, callback: () => Promise<AxiosResponse<ResponseT>>) {
    const hasTokens = localStorage.getItem(Token_Enum.REFRESH_TOKEN) && localStorage.getItem(Token_Enum.ACCESS_TOKEN) && localStorage.getItem(Token_Enum.REFRESH_TOKEN) !== 'undefined' && localStorage.getItem(Token_Enum.ACCESS_TOKEN) !== 'undefined';
    if (error.response?.status == 401 && hasTokens) {
      return this.refreshTokens<ResponseT>(callback);
    }
    this.setError('Ошибка', error.response?.data, error.config?.url ?? '');
    return new ApiResponse<ResponseT>(error.response);
  }

  private async refreshTokens<ResponseT>(callback: () => Promise<AxiosResponse<ResponseT>>): Promise<ApiResponse<ResponseT>> {
    const refreshResponse = await this.refreshToken();

    if (!refreshResponse.isSuccess()) {
      localStorage.removeItem(Token_Enum.REFRESH_TOKEN);
      localStorage.removeItem(Token_Enum.ACCESS_TOKEN);
      // this.setError('Аунтатификация', 'Токен протух', 'refreshToken');
      window.location.href = '/';
      return new ApiResponse<ResponseT>(refreshResponse.getResponse() as AxiosResponse, refreshResponse.getErrorResponse() as AxiosError<ErrorResponse>);
    }

    localStorage.setItem(Token_Enum.REFRESH_TOKEN, refreshResponse.getData()!.refreshToken);
    localStorage.setItem(Token_Enum.ACCESS_TOKEN, refreshResponse.getData()!.accessToken);
    const response = await callback();
    return new ApiResponse<ResponseT>(response);
  }

  private async refreshToken(): Promise<ApiResponse<TokenPairDto>> {
    const data = {
      refreshToken: localStorage.getItem(Token_Enum.REFRESH_TOKEN)!,
      accessToken: localStorage.getItem(Token_Enum.ACCESS_TOKEN)!
    };
    const request = new Request<TokenPairDto>({
      url: Endpoint_Enum.REFRESH_TOKEN_PAIR,
      body: data
    });

    return await this.sendPost<TokenPairDto, TokenPairDto>(request);
  }

  private async sendGetRequest(config: AxiosRequestConfig): Promise<AxiosResponse<any>> {
    return this.axiosApi.get(config.url!, config);
  }

  private async sendPostRequest(config: AxiosRequestConfig) {
    return this.axiosApi.post(config.url!, config.data, config);
  }

  private async sendPutRequest(config: AxiosRequestConfig) {
    return this.axiosApi.put(config.url!, config.data, config);
  }

  private async sendPathRequest(config: AxiosRequestConfig) {
    return this.axiosApi.patch(config.url!, config.data, config);
  }
}
