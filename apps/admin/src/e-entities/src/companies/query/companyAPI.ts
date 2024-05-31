import { API, Endpoint_Enum } from '@admin/shared';
import {
  CounterpartyDetailsStatus,
  CounterpartyDocumentLinkDto,
  CounterpartyDocumentType,
  CounterpartyDto,
  CounterpartyDtoModified
} from '@freelbee/entities';
import { PageResponse, Sort } from '@freelbee/shared';
import { CounterpartyHelper } from '../helpers/CounterpartyHelper';

/**
 * @see AdminCompanyController
 */

export const companyAPI = API.injectEndpoints({
  endpoints: (builder) => ({
    getCompanyCounterparty: builder.query<CounterpartyDtoModified, number>({
      query: (companyId) => Endpoint_Enum.GET_COMPANY_COUNTERPARTY.replace('{0}', companyId.toString()),
      providesTags: ['company-counterparty'],
      transformResponse: (company: CounterpartyDto) => CounterpartyHelper.ModifyCounterpartyDto(company)
    }),
    getCompanyCounterpartyDocuments: builder.query<Record<CounterpartyDocumentType, string>, number>({
      query: (companyId) => Endpoint_Enum.GET_COMPANY_COUNTERPARTY_DOCUMENTS.replace('{0}', companyId.toString()),
      transformResponse: (links: CounterpartyDocumentLinkDto[]) => CounterpartyHelper.MapCounterpartyDocumentLinks(links)
    }),
    getPageOfCompanyCounterparties: builder.query<PageResponse<CounterpartyDtoModified>, { page: number; size: number; sort?: Sort }>({
      query: ({ page, size, sort }) => {
        let url = Endpoint_Enum.GET_PAGE_OF_COMPANY_COUNTERPARTIES
          .replace('{0}', page.toString())
          .replace('{1}', size.toString());
        if (sort) {
          url = url.concat('&sort=' + sort);
        }
        return url;
      },
      providesTags: ['company-counterparties'],
      transformResponse: (res: PageResponse<CounterpartyDto>) => CounterpartyHelper.ModifyPageOfCounterpartyDto(res)
    }),
    setCompanyCounterpartyStatus: builder.mutation<void, { status: CounterpartyDetailsStatus, companyId: number }>({
      query: ({ status, companyId }) => ({
        url: Endpoint_Enum.SET_COMPANY_COUNTERPARTY_STATUS.replace('{0}', companyId.toString()),
        method: 'PUT',
        body: { status }
      }),
      invalidatesTags: ['company-counterparty', 'company-counterparties']
    }),
  })
});

export const {
  useGetCompanyCounterpartyQuery,
  useGetCompanyCounterpartyDocumentsQuery,
  useGetPageOfCompanyCounterpartiesQuery,
  useSetCompanyCounterpartyStatusMutation,
} = companyAPI;
