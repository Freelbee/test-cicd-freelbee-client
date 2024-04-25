import {API, Endpoint_Enum} from "@freelancer/shared";
import {AuthDto, RegistrationDto, SessionDto} from "@freelbee/entities";


export const authApi = API.injectEndpoints({
  endpoints: (builder) => ({
    registerFreelancer: builder.mutation<void, RegistrationDto>({
      query: (body) => ({
        url: Endpoint_Enum.FREELANCER_SIGNUP,
        method: 'POST',
        body,
      }),
      extraOptions: {notAuthorized: true}
    }),
    getFreelancerRegSession: builder.query<SessionDto, { timestamp: number; }>({
      query: () => ({
        url: Endpoint_Enum.FREELANCER_REG_SESSION
      }),
      extraOptions: {notAuthorized: true}
    }),
    sendFreelancerRegConfirmation: builder.mutation<void, string>({
      query: (code) => ({
        url: Endpoint_Enum.FREELANCER_REG_CONFIRM.replace('{0}', code),
        method: 'POST'
      }),
      extraOptions: {notAuthorized: true},
    }),
    resendFreelancerConfirmation: builder.mutation<void, void>({
      query: () => ({
        url: Endpoint_Enum.FREELANCER_REG_RESEND_SESSION,
        method: 'POST'
      }),
      extraOptions: {notAuthorized: true}
    }),
    signInFreelancer: builder.mutation<void, AuthDto>({
      query: (body) => ({
        url: Endpoint_Enum.FREELANCER_SIGNIN,
        method: 'POST',
        body
      }),
      extraOptions: {notAuthorized: true}
    }),
    getFreelancerAuthSession: builder.query<SessionDto, { timestamp: number; }>({
      query: () => ({
        url: Endpoint_Enum.FREELANCER_AUTH_SESSION
      }),
      extraOptions: {notAuthorized: true}
    }),

    sendFreelancerAuthConfirmation: builder.mutation<void, string>({
      query: (code) => ({
        url: Endpoint_Enum.FREELANCER_AUTH_CONFIRM.replace('{0}', code),
        method: 'POST'
      }),
      extraOptions: {notAuthorized: true},
    }),
    resendFreelancerAuthConfirmation: builder.mutation<void, void>({
      query: () => ({
        url: Endpoint_Enum.FREELANCER_AUTH_RESEND_SESSION,
        method: 'POST'
      }),
      extraOptions: {notAuthorized: true}
    }),
  })
})

export const {
  useRegisterFreelancerMutation,
  useGetFreelancerRegSessionQuery,
  useSendFreelancerRegConfirmationMutation,
  useResendFreelancerConfirmationMutation,
  useSignInFreelancerMutation,
  useGetFreelancerAuthSessionQuery,
  useSendFreelancerAuthConfirmationMutation,
  useResendFreelancerAuthConfirmationMutation
} = authApi;
