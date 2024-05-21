export type AdminUserDto = {
  email: string;
  authorities: string[];
  isBlocked: boolean;
  telegramUser: TelegramUserDto;
}

export interface TelegramUserDto {
  id: string,
  firstName: string,
  lastName: string,
  username: string,
  photoUrl: string,
  authDate: string
}
