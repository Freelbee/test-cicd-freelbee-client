import {AuthDto, RegistrationDto, SessionDto} from "@freelbee/entities";
import {API, Endpoint_Enum} from "@company/shared";

export const authApi = API.injectEndpoints({
  endpoints: (builder) => ({
    registerCompany: builder.mutation<void, RegistrationDto>({
      query: (body) => ({
        url: Endpoint_Enum.COMPANY_SIGNUP,
        method: 'POST',
        body
      }),
      extraOptions: { notAuthorized: true}
    }),
    getCompanyRegSession: builder.query<SessionDto, { timestamp: number; }>({
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
    }),
    resendCompanyConfirmation: builder.mutation<void, void>({
      query: () => ({
        url: Endpoint_Enum.COMPANY_REG_RESEND_SESSION,
        method: 'POST'
      }),
      extraOptions: { notAuthorized: true}
    }),
    signInCompany: builder.mutation<void, AuthDto>({
      query: (body) => ({
        url: Endpoint_Enum.COMPANY_SIGNIN,
        method: 'POST',
        body}),
      extraOptions: { notAuthorized: true}
    }),
    getCompanyAuthSession: builder.query<SessionDto, { timestamp: number; }>({
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
      extraOptions: { notAuthorized: true}
    }),
    resendCompanyAuthConfirmation: builder.mutation<void, void>({
      query: () => ({
        url: Endpoint_Enum.COMPANY_AUTH_RESEND_SESSION,
        method: 'POST'
      }),
      extraOptions: { notAuthorized: true}
    }),
  })
})

export const {
  useRegisterCompanyMutation,
  useGetCompanyRegSessionQuery,
  useSendCompanyRegConfirmationMutation,
  useResendCompanyConfirmationMutation,
  useSignInCompanyMutation,
  useGetCompanyAuthSessionQuery,
  useSendCompanyAuthConfirmationMutation,
  useResendCompanyAuthConfirmationMutation
} = authApi;
