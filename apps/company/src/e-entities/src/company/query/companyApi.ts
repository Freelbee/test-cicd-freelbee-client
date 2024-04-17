import { API, Endpoint_Enum } from '@company/shared';
import { CompanyOnboardingStateDto } from '../dto/CompanyOnboardingStateDto';
import { CreateCounterpartyRequestDto } from '../dto/CreateCounterpatyRequestDto';
import { PaymentMethodDto } from '@freelbee/entities';
import { PropsHelper } from '@freelbee/shared/helpers';
import { CompanyData, CompanyResponse } from '../dto/CompanyResponse';

export const companyAPI = API.injectEndpoints({
  endpoints: (builder) => ({
    getCompany: builder.query<CompanyData, void>({
      query: () => Endpoint_Enum.COMPANY,
      transformResponse: (res: CompanyResponse) => {
        const mappedProps = PropsHelper.MapPropsToFields(res.counterpartyDetail.props);
        return {...res, counterpartyDetail: {...res.counterpartyDetail, props: mappedProps}};
      }
    }),
    getCompanyOnboardingState: builder.query<CompanyOnboardingStateDto, void>({
        query: () => Endpoint_Enum.COMPANY_ONBOARDING_STATUS,
    }),
    createCompany: builder.mutation<void, CreateCounterpartyRequestDto>({
      query: (body) => ({
          url: Endpoint_Enum.CREATE_COMPANY,
          method: 'POST',
          body
      }), 
    }),
    createPaymentData: builder.mutation<void, PaymentMethodDto>({
      query: (body) => ({
        url: Endpoint_Enum.CREATE_PAYMENT_METHODS,
        method: 'POST',
        body
    }), 
    }),
  })
});

export const {
    useGetCompanyQuery,
    useGetCompanyOnboardingStateQuery,
    useCreateCompanyMutation,
    useCreatePaymentDataMutation
} = companyAPI;
