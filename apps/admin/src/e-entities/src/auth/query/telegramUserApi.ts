import { TelegramUserDto } from '@admin/entities';
import { API, Endpoint_Enum } from '@admin/shared';

/**
 * @see TelegramUserController
 */

export const telegramUserAPI = API.injectEndpoints({
  endpoints: (builder) => ({
    createTelegramUser: builder.mutation<void, TelegramUserDto>({
      query: (body) => ({
        url: Endpoint_Enum.CREATE_TELEGRAM_USER,
        method: 'POST',
        body
      }),
      invalidatesTags: ['auth-info']
    })
  })
});

export const {
  useCreateTelegramUserMutation
} = telegramUserAPI;
