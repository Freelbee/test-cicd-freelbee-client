import { SessionStatusType } from '@admin/entities';
import { TelegramUser } from './TelegramUser';

export interface SessionData {
  authStatus: SessionStatusType,
  adminUser: TelegramUser | null,
  tokenPair?: {
    accessToken: string,
    refreshToken: string
  }
}
