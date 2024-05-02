import { API, Endpoint_Enum } from '@company/shared';
import {FreelancerInvitationDto} from "../dto/FreelancerInvitationDto";

export const freelansersApi = API.injectEndpoints({
  endpoints: (builder) => ({
    getCompanyFreelancers: builder.query({
      query: () => Endpoint_Enum.COMPANY_FREELANCERS,
    }),

    inviteFreelancer: builder.mutation<void, FreelancerInvitationDto>({
      query: (body) => ({
        url: Endpoint_Enum.FREELANCER_INVITATION,
        method: 'POST',
        body
      })
    })
  }),
});

export const {
  useInviteFreelancerMutation
} = freelansersApi;
