import { SessionStatusType, TelegramUser } from '@admin/entities';

export interface SessionDataResponse {
  authStatus: SessionStatusType,
  adminUser: TelegramUser | null,
  tokenPair?: {
    accessToken: string,
    refreshToken: string
  }
}
