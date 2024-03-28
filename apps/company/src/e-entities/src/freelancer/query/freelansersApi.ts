import { API, Endpoint_Enum } from '@company/shared';

export const freelansersApi = API.injectEndpoints({
  endpoints: (builder) => ({
    getCompanyFreelancers: builder.query({
      query: () => Endpoint_Enum.COMPANY_FREELANCERS,
    }),
  }),
});
