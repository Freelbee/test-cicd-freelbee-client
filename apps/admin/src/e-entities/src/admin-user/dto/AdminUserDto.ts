import { TelegramUserDto } from '@admin/entities';

export interface AdminUserDto {
  email: string;
  authorities: string[];
  isBlocked: boolean;
  telegramUser: TelegramUserDto;
}
