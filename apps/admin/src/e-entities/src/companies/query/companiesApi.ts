import { API, Endpoint_Enum } from '@admin/shared';
import { CompanyData, CounterpartyDto } from '../dto/CounterpartyDto';
import { PropsHelper } from '@freelbee/shared/helpers';
import { CounterpartyStatus } from '@freelbee/entities';

export const companiesAPI = API.injectEndpoints({
  endpoints: (builder) => ({
    getPageOfCompanyCounterparties: builder.query<CounterpartyDto[], void>({
      query: () => Endpoint_Enum.GET_PAGE_OF_COMPANY_COUNTERPARTIES,
      providesTags: ['companyCounterparties'],
      transformResponse: (res: CounterpartyDto[]) => {
        return res.map((company: CounterpartyDto) => {
          const mappedProps = PropsHelper.MapPropsToFields(company.counterpartyDetail.props);
          return { ...company, counterpartyDetail: { ...company.counterpartyDetail, props: mappedProps } };
        });
      }
    }),
    getCompanyCounterparty: builder.query<CompanyData, number>({
      query: (companyId) => Endpoint_Enum.GET_COMPANY_COUNTERPARTY.replace('{0}', companyId.toString()),
      providesTags: ['companyCounterparty'],
      transformResponse: (res: CounterpartyDto) => {
        const mappedProps = PropsHelper.MapPropsToFields(res.counterpartyDetail.props);
        return {...res, counterpartyDetail: {...res.counterpartyDetail, props: mappedProps}};
      }
    }),
    setCompanyCounterpartyStatus: builder.mutation<void, { status: CounterpartyStatus, companyId: number }>({
      query: ({ status, companyId }) => ({
        url: Endpoint_Enum.SET_COMPANY_COUNTERPARTY_STATUS.replace('{0}', companyId.toString()),
        method: 'PUT',
        body: { status }
      }),
      invalidatesTags: ['companyCounterparty']
    }),
  })
});

export const {
  useGetPageOfCompanyCounterpartiesQuery,
  useGetCompanyCounterpartyQuery,
  useSetCompanyCounterpartyStatusMutation,
} = companiesAPI;
