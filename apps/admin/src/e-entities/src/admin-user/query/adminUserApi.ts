import { API, Endpoint_Enum } from '@admin/shared';
import { AdminCreationDto } from '../dto/AdminCreationDto';
import { SessionDataResponse } from '../../auth/dto/SessionDataResponse';
import { TelegramUser } from '../../auth/dto/TelegramUser';
import { ConnectTelegramRequest } from '../../auth/dto/ConnectTelegramRequest';
import { LoginData } from '../../auth/dto/LoginData';
import { SessionStatusType } from '../../auth/dto/SessionStatusType';
import { Token_Enum } from '@landing/shared';

export const adminUserAPI = API.injectEndpoints({
  endpoints: (builder) => ({
    getSessionData: builder.query<SessionDataResponse, void>({
      query: () => Endpoint_Enum.SESSION_DATA,
      providesTags: ['sessionData'],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.tokenPair) {
            localStorage.setItem(Token_Enum.ACCESS_TOKEN, data.tokenPair.accessToken);
            localStorage.setItem(Token_Enum.REFRESH_TOKEN, data.tokenPair.refreshToken);
          }
        } catch (error) {
          console.error('Error storing token in localStorage:', error);
        }
      },
    }),
    getAdminUser: builder.query<TelegramUser, null>({
      query: () => Endpoint_Enum.GET_ADMIN
    }),
    signIn: builder.mutation<void, LoginData>({
      query: (body) => ({
        url: Endpoint_Enum.SIGN_IN,
        method: 'POST',
        body
      }),
      invalidatesTags: ['sessionData']
    }),
    saveNewAdmin: builder.mutation<void, AdminCreationDto>({
      query: (body) => ({
        url: Endpoint_Enum.SAVE_NEW_ADMIN,
        method: 'POST',
        body
      })
    }),
    connectTelegram: builder.mutation<void, ConnectTelegramRequest>({
      query: (body) => ({
        url: Endpoint_Enum.CONNECT_TELEGRAM,
        method: 'POST',
        body
      }),
      invalidatesTags: ['sessionData']
    }),
    sendConfirmation: builder.mutation<void, void>({
      query: () => ({
        url: Endpoint_Enum.SEND_CONFIRMATION,
        method: 'POST',
        body: '' //TODO::: maybe remove
      }),
      invalidatesTags: ['sessionData'],
      onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          dispatch(adminUserAPI.util?.updateQueryData('getSessionData', undefined, (draft) => {
            draft.authStatus = SessionStatusType.CONFIRMATION_SENT;
            draft.adminUser = null;
          })); //TODO::: triple-check
        } catch (error) {
          console.log(error);
        }
      },
    }),
  })
});

export const {
  useGetSessionDataQuery,
  useGetAdminUserQuery,
  useSignInMutation,
  useSaveNewAdminMutation,
  useConnectTelegramMutation,
  useSendConfirmationMutation,
} = adminUserAPI;
