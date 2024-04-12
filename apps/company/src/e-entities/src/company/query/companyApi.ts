import { API, Endpoint_Enum } from '@company/shared';
import { CompanyOnboardingStateDto } from '../dto/CompanyOnboardingStateDto';

export const companyAPI = API.injectEndpoints({
  endpoints: (builder) => ({
    getCompany: builder.query({
      query: () => `/company`,
    }),
    getCompanyOnboardingState: builder.query<CompanyOnboardingStateDto, void>({
        query: () => Endpoint_Enum.COMPANY_ONBOARDING_STATUS,
    }),
    createCompany: builder.mutation<CompanyOnboardingStateDto, void>({
        query: () => Endpoint_Enum.COMPANY_ONBOARDING_STATUS,
    }),
    createPaymentData: builder.mutation<CompanyOnboardingStateDto, void>({
        query: () => Endpoint_Enum.COMPANY_ONBOARDING_STATUS,
    }),
  })
});

export const {
    useGetCompanyQuery,
    useGetCompanyOnboardingStateQuery,
    useCreateCompanyMutation,
    useCreatePaymentDataMutation
} = companyAPI;
