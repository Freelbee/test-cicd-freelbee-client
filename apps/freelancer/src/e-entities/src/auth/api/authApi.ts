import {API} from "@freelancer/shared";
import {AuthDto, SessionDto} from "@freelbee/entities";

export const authApi = API.injectEndpoints({
  endpoints: (builder) => ({
    registerFreelancer: builder.mutation<void, AuthDto>({
      query: (body) => ({
        url: `registration/freelancer`,
        method: 'POST',
        body,
        extraOptions: { notAuthorized: true}
      }),
    }),
    getFreelancerRegSession: builder.query<SessionDto, { timestamp: number; }>({
      query: () => ({
        url: `registration/freelancer/session`
      }),
      extraOptions: { notAuthorized: true}
    }),
    sendFreelancerRegConfirmation: builder.mutation<void, string>({
      query: (code) => ({
        url: `registration/freelancer/email/confirm/${code}`,
        method: 'POST'
      }),
      extraOptions: { notAuthorized: true}
    }),
    resendFreelancerConfirmation: builder.mutation<void, void>({
      query: () => ({
        url: `registration/freelancer/email/send`,
        method: 'POST'
      }),
      extraOptions: { notAuthorized: true}
    }),
    signInFreelancer: builder.mutation<void, AuthDto>({
      query: (body) => ({
        url: `auth/freelancer`,
        method: 'POST',
        body}),
      extraOptions: { notAuthorized: true}
    }),
    getFreelancerAuthSession: builder.query<SessionDto, { timestamp: number; }>({
      query: () => ({
        url: `auth/freelancer/session`
      }),
      extraOptions: { notAuthorized: true}
    }),
    sendFreelancerAuthConfirmation: builder.mutation<string, string>({
      query: (code) => ({
        url: `auth/freelancer/confirm/${code}`,
        method: 'POST'
      }),
      extraOptions: { notAuthorized: true},
      transformResponse: (apiResponse, meta) => {
        return meta.response.headers.get('Authorization').replace('Bearer ', '')
      }
    }),
    resendFreelancerAuthConfirmation: builder.mutation<void, void>({
      query: () => ({
        url: `auth/freelancer/send`,
        method: 'POST'
      }),
      extraOptions: { notAuthorized: true}
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
