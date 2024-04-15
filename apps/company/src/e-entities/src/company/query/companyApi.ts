import { API, Endpoint_Enum } from '@company/shared';
import { CompanyOnboardingStateDto } from '../dto/CompanyOnboardingStateDto';
import { CompanyDto } from '../dto/CompanyDto';
import { CreateCounterpartyRequestDto } from '../dto/CreateCounterpatyRequestDto';
import { PaymentMethodDto } from '@freelbee/entities';

export const companyAPI = API.injectEndpoints({
  endpoints: (builder) => ({
    // To-do: return type? args?
    getCompany: builder.query<CompanyDto, void>({
      query: () => Endpoint_Enum.COMPANY,
    }),
    getCompanyOnboardingState: builder.query<CompanyOnboardingStateDto, void>({
        query: () => Endpoint_Enum.COMPANY_ONBOARDING_STATUS,
        extraOptions: {
          notAuthorized: true
        }
    }),
    createCompany: builder.mutation<void, CreateCounterpartyRequestDto>({
      query: (body) => ({
          url: Endpoint_Enum.CREATE_COMPANY,
          method: 'POST',
          body: {
              data: body
          }
      }), 
    }),
    createPaymentData: builder.mutation<void, PaymentMethodDto>({
        query: () => Endpoint_Enum.CREATE_PAYMENT_METHODS,
    }),
  })
});

export const {
    useGetCompanyQuery,
    useGetCompanyOnboardingStateQuery,
    useCreateCompanyMutation,
    useCreatePaymentDataMutation
} = companyAPI;
