import { API, Endpoint_Enum } from '@admin/shared';
import { CounterpartyDtoModified, CounterpartyDto } from '../dto/CounterpartyDto';
import { PropsHelper } from '@freelbee/shared/helpers';
import { CounterpartyStatus } from '@freelbee/entities';

export const companiesAPI = API.injectEndpoints({
  endpoints: (builder) => ({
    getPageOfCompanyCounterparties: builder.query<CounterpartyDto[], void>({
      query: () => Endpoint_Enum.GET_PAGE_OF_COMPANY_COUNTERPARTIES,
      providesTags: ['companyCounterparties'],
      transformResponse: (res: CounterpartyDto[]) => {
        return res.map((company: CounterpartyDto) => {
          const mappedCounterpartyDetailProps = PropsHelper.MapPropsToFields(company.counterpartyDetail.props);
          const mappedUserDataProps = PropsHelper.MapPropsToFields(company.user.userData.props);
          return {
            ...company,
            counterpartyDetail: { ...company.counterpartyDetail, props: mappedCounterpartyDetailProps },
            user: { ...company.user, userData: { ...company.user.userData, props: mappedUserDataProps } }
          };
        });
      }
    }),
    getCompanyCounterparty: builder.query<CounterpartyDtoModified, number>({
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
      invalidatesTags: ['companyCounterparty', 'companyCounterparties']
    }),
  })
});

export const {
  useGetPageOfCompanyCounterpartiesQuery,
  useGetCompanyCounterpartyQuery,
  useSetCompanyCounterpartyStatusMutation,
} = companiesAPI;
