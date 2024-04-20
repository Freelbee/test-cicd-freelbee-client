
import {AuthDto, SessionDto} from "@freelbee/entities";
import {API} from "@company/shared";

export const authApi = API.injectEndpoints({
  endpoints: (builder) => ({
    registerCompany: builder.mutation<void, AuthDto>({
      query: (body) => ({
        url: `registration/company`,
        method: 'POST',
        body
      }),
      extraOptions: { notAuthorized: true}
    }),
    getCompanyRegSession: builder.query<SessionDto, { timestamp: number; }>({
      query: () => ({
        url: `registration/company/session`
      }),
      extraOptions: { notAuthorized: true}
    }),
    sendCompanyRegConfirmation: builder.mutation<void, string>({
      query: (code) => ({
        url: `registration/company/email/confirm/${code}`,
        method: 'POST'
      }),
      extraOptions: { notAuthorized: true}
    }),
    resendCompanyConfirmation: builder.mutation<void, void>({
      query: () => ({
        url: `registration/company/email/send`,
        method: 'POST'
      }),
      extraOptions: { notAuthorized: true}
    }),
    signInCompany: builder.mutation<void, AuthDto>({
      query: (body) => ({
        url: `auth/company`,
        method: 'POST',
        body}),
      extraOptions: { notAuthorized: true}
    }),
    getCompanyAuthSession: builder.query<SessionDto, { timestamp: number; }>({
      query: () => ({
        url: `auth/company/session`
      }),
      extraOptions: { notAuthorized: true}
    }),
    sendCompanyAuthConfirmation: builder.mutation<string, string>({
      query: (code) => ({
        url: `auth/company/confirm/${code}`,
        method: 'POST'
      }),
      transformResponse: (apiResponse, meta) => {
        return meta.response.headers.get('Authorization').replace('Bearer ', '')
      },
      extraOptions: { notAuthorized: true}
    }),
    resendCompanyAuthConfirmation: builder.mutation<void, void>({
      query: () => ({
        url: `auth/company/send`,
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
