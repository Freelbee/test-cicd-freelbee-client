import { SessionStatusType } from '@admin/entities';
import { TelegramUser } from './TelegramUser';

export interface SessionData {
  status: SessionStatusType | null,
  adminUser: TelegramUser | null,
}
