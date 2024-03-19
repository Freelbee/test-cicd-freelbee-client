import { API } from '@freelancer/shared';

export const companyAPI = API.injectEndpoints({
  endpoints: (builder) => ({
    getCompany: builder.query({
      query: () => `/company`,
      providesTags: ['Company'],
    }),
  }),
  overrideExisting: false,
});
