import { API, Endpoint_Enum, Token_Enum } from '@admin/shared';
import { AuthStatus } from '@admin/entities';
import { AuthInfoDto } from '@admin/entities';
import { AuthenticationDto } from '@freelbee/entities';

/**
 * @see AdminAuthController
 */

export const adminAuthAPI = API.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<void, AuthenticationDto>({
      query: (body) => ({
        url: Endpoint_Enum.SIGN_IN,
        method: 'POST',
        body
      }),
      invalidatesTags: ['auth-info']
    }),
    sendConfirmation: builder.mutation<void, void>({
      query: () => ({
        url: Endpoint_Enum.SEND_CONFIRMATION,
        method: 'POST'
      }),
      invalidatesTags: ['auth-info'],
      onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          dispatch(adminAuthAPI.util?.updateQueryData('getAuthInfo', undefined, (draft) => {
            draft.authStatus = AuthStatus.CONFIRMATION_SENT;
            draft.adminUser = null;
          }));
        } catch (error) {
          console.log(error);
        }
      }
    }),
    getAuthInfo: builder.query<AuthInfoDto, void>({
      query: () => Endpoint_Enum.GET_AUTH_INFO,
      providesTags: ['auth-info']
    }),
    logout: builder.mutation<void, void>({
      query: () => {
        const token = localStorage.getItem(Token_Enum.ACCESS_TOKEN);
        localStorage.removeItem(Token_Enum.ACCESS_TOKEN);
        return {
          url: Endpoint_Enum.LOGOUT,
          method: 'POST',
          headers: new Headers({ 'Authorization': `Bearer ${token}` })
        };
      },
      extraOptions: { notAuthorized: true },
      invalidatesTags: ['auth-info']
    })
  })
});

export const {
  useGetAuthInfoQuery,
  useSignInMutation,
  useSendConfirmationMutation,
  useLogoutMutation
} = adminAuthAPI;
