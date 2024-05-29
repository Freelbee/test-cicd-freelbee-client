import { AuthenticationDto, RegistrationDto, UserAuthSessionDto } from '@freelbee/entities';
import { API, Endpoint_Enum, Token_Enum } from '@company/shared';

export const authApi = API.injectEndpoints({
  endpoints: (builder) => ({
    isAuthenticated: builder.query<boolean, void>({
      query: () => ({
        url: Endpoint_Enum.AUTH__COMPANY__IS_AUTHENTICATED
      }),
      providesTags: ['is-authenticated']
    }),
    registerCompany: builder.mutation<void, RegistrationDto>({
      query: (body) => ({
        url: Endpoint_Enum.COMPANY_SIGNUP,
        method: 'POST',
        body
      }),
      extraOptions: { notAuthorized: true}
    }),
    getCompanyRegSession: builder.mutation<UserAuthSessionDto, void>({
      query: () => ({
        url: Endpoint_Enum.COMPANY_REG_SESSION
      }),
      extraOptions: { notAuthorized: true}
    }),
    sendCompanyRegConfirmation: builder.mutation<void, string>({
      query: (code) => ({
        url: Endpoint_Enum.COMPANY_REG_CONFIRM.replace('{0}', code),
        method: 'POST'
      }),
      extraOptions: { notAuthorized: true},
      invalidatesTags: ['is-authenticated', 'user', 'counterparty', 'company-onboarding-state']
    }),
    resendCompanyRegistrationConfirmation: builder.mutation<void, void>({
      query: () => ({
        url: Endpoint_Enum.COMPANY_REG_RESEND_SESSION,
        method: 'POST'
      }),
      extraOptions: { notAuthorized: true }
    }),
    signInCompany: builder.mutation<void, AuthenticationDto>({
      query: (body) => ({
          url: Endpoint_Enum.COMPANY_SIGNIN,
          method: 'POST',
          body
      }),
      extraOptions: { notAuthorized: true}
    }),
    getCompanyAuthSession: builder.mutation<UserAuthSessionDto, void>({
      query: () => ({
        url: Endpoint_Enum.COMPANY_AUTH_SESSION
      }),
      extraOptions: { notAuthorized: true}
    }),
    sendCompanyAuthConfirmation: builder.mutation<void, string>({
      query: (code) => ({
        url: Endpoint_Enum.COMPANY_AUTH_CONFIRM.replace('{0}', code),
        method: 'POST'
      }),
      extraOptions: { notAuthorized: true},
      invalidatesTags: ['is-authenticated', 'user', 'counterparty', 'company-onboarding-state']
    }),
    resendCompanyAuthConfirmation: builder.mutation<void, void>({
      query: () => ({
        url: Endpoint_Enum.COMPANY_AUTH_RESEND_SESSION,
        method: 'POST'
      }),
      extraOptions: { notAuthorized: true}
    }),
    logout: builder.mutation<string, void>({
      query: () => {
        const token  = localStorage.getItem(Token_Enum.ACCESS_TOKEN);
        localStorage.removeItem(Token_Enum.ACCESS_TOKEN);

        return {
          url: Endpoint_Enum.AUTH__COMPANY__LOGOUT,
          method: 'POST',
          headers: new Headers({
            'Authorization': `Bearer ${token}`
          }),}

      },
      extraOptions: { notAuthorized: true },
      invalidatesTags: ['is-authenticated']
    }),
  })
})

export const {
  useLogoutMutation,
  useIsAuthenticatedQuery,
  useRegisterCompanyMutation,
  useGetCompanyRegSessionMutation,
  useGetCompanyAuthSessionMutation,
  useSendCompanyRegConfirmationMutation,
  useResendCompanyRegistrationConfirmationMutation,
  useSignInCompanyMutation,
  useSendCompanyAuthConfirmationMutation,
  useResendCompanyAuthConfirmationMutation
} = authApi;
