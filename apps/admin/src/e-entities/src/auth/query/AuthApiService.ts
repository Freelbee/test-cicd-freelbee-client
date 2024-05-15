import {
  ApiResponse, ApiService, LoginRequest, SessionDataResponse, TelegramUser, Token_Enum, Request,
  Endpoint_Enum
} from '@admin/shared';
import { ConnectTelegramRequest } from '../dto/ConnectTelegramRequest';

export class AuthApiService extends ApiService {
  constructor(props: any) {
    super(props);
  }

  /**
   * Получение данных о сессии
   */
  public async getSessionData(): Promise<ApiResponse<SessionDataResponse>> {
    const request = new Request<null>({
      url: Endpoint_Enum.SESSION_DATA
    });

    return await this.apiRequest.sendGet<null, SessionDataResponse>(
      request
    );
  }

  public async getAdminUser(): Promise<ApiResponse<TelegramUser>> {
    const request = new Request<null>({
      url: Endpoint_Enum.ADMIN_USER
    });

    return await this.apiRequest.sendGet<null, TelegramUser>(
      request
    );
  }

  /**
   * Вход в систему
   * @param loginData
   */
  public async login(loginData: LoginRequest): Promise<ApiResponse<SessionDataResponse>> {
    const request = new Request<LoginRequest>({
      url: Endpoint_Enum.LOGIN,
      body: loginData
    });

    return await this.apiRequest.sendPost<LoginRequest, SessionDataResponse>(
      request
    );
  }

  /**
   * Вход в систему
   * @param loginData
   */

  /**
   * Выход из системы
   */
  public async logout(): Promise<ApiResponse<any>> {
    const request = new Request<{ accessToken: string, refreshToken: string }>({
      url: Endpoint_Enum.LOGOUT,
      body: {
        accessToken: localStorage.getItem(Token_Enum.ACCESS_TOKEN) ?? '',
        refreshToken: localStorage.getItem(Token_Enum.REFRESH_TOKEN) ?? ''
      }
    });

    localStorage.removeItem(Token_Enum.ACCESS_TOKEN);
    localStorage.removeItem(Token_Enum.REFRESH_TOKEN);
    return await this.apiRequest.sendPost<any, any>(
      request
    );
  }

  /**
   * Привязка телеграмм-аккаунта к профилю
   * @param telegramUser
   */
  public async connectTelegram(telegramUser: ConnectTelegramRequest): Promise<ApiResponse<SessionDataResponse>> {
    const request = new Request<ConnectTelegramRequest>({
      url: Endpoint_Enum.CONNECT_TELEGRAM,
      body: telegramUser
    });

    return await this.apiRequest.sendPost<ConnectTelegramRequest, SessionDataResponse>(
      request
    );
  }

  /**
   *
   */
  public async sendConfirmation(): Promise<ApiResponse<SessionDataResponse>> {
    const request = new Request<null>({
      url: Endpoint_Enum.SEND_CONFIRMATION
    });

    return await this.apiRequest.sendPost<null, SessionDataResponse>(
      request
    );
  }

  // /**
  //  * Получение списка кодов подтверждения
  //  */
  // public async getCodes(body: FiltersOfPage): Promise<ApiResponse<ConfirmationCodesPageResponse>> {
  //   const request = new Request<FiltersOfPage>({
  //     url: Endpoint_Enum.CONFIRMATION_CODES,
  //     body
  //   });
  //   return await this.apiRequest.sendPost<FiltersOfPage, ConfirmationCodesPageResponse>(
  //     request
  //   );
  // }
  //
  // public async getRoles(): Promise<ApiResponse<Array<Role>>> {
  //   const request = new Request<null>({
  //     url: Endpoint_Enum.ROLES
  //   });
  //   return await this.apiRequest.sendGet<null, Array<Role>>(
  //     request
  //   );
  // }
  //
  // public async createAdmin(body: AdminRequest): Promise<ApiResponse<any>> {
  //   const request = new Request<AdminRequest>({
  //     url: Endpoint_Enum.ADMIN,
  //     body
  //   });
  //   return await this.apiRequest.sendPost<AdminRequest, any>(
  //     request
  //   );
  // }
}
