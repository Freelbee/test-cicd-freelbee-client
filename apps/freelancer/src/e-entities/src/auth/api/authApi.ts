import { API, Endpoint_Enum, Token_Enum } from '@freelancer/shared';
import {AuthDto, RegistrationDto, SessionDto} from "@freelbee/entities";


export const authApi = API.injectEndpoints({
  endpoints: (builder) => ({
    isAuthenticated: builder.query<boolean, void>({
      query: () => ({
        url: Endpoint_Enum.AUTH__FREELANCER__IS_AUTHENTICATED
      }),
      providesTags: ['is-authenticated']
    }),
    registerFreelancer: builder.mutation<void, RegistrationDto>({
      query: (body) => ({
        url: Endpoint_Enum.FREELANCER_SIGNUP,
        method: 'POST',
        body,
      }),
      extraOptions: {notAuthorized: true}
    }),
    getFreelancerRegSession: builder.mutation<SessionDto, void>({
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
      invalidatesTags: ['is-authenticated']
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
    getFreelancerAuthSession: builder.mutation<SessionDto, void>({
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
      invalidatesTags: ['is-authenticated']
    }),
    resendFreelancerAuthConfirmation: builder.mutation<void, void>({
      query: () => ({
        url: Endpoint_Enum.FREELANCER_AUTH_RESEND_SESSION,
        method: 'POST'
      }),
      extraOptions: {notAuthorized: true}
    }),
    logout: builder.mutation<string, void>({
      query: () => {
        const token  = localStorage.getItem(Token_Enum.ACCESS_TOKEN);
        localStorage.removeItem(Token_Enum.ACCESS_TOKEN);

        return {
          url: Endpoint_Enum.AUTH__FREELANCER__LOGOUT,
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
  useRegisterFreelancerMutation,
  useGetFreelancerRegSessionMutation,
  useGetFreelancerAuthSessionMutation,
  useSendFreelancerRegConfirmationMutation,
  useResendFreelancerConfirmationMutation,
  useSignInFreelancerMutation,
  useSendFreelancerAuthConfirmationMutation,
  useResendFreelancerAuthConfirmationMutation
} = authApi;
