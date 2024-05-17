import { API, Endpoint_Enum } from '@admin/shared';
import { ConfirmationCode } from '../dto/ConfirmationCode';

export const confirmationCodesApi = API.injectEndpoints({
  endpoints: (builder) => ({
    getPageOfConfirmationCodes: builder.query<ConfirmationCode[], void>({
      query: () => Endpoint_Enum.GET_PAGE_OF_CONFIRMATION_CODES,
      providesTags: ['confirmationCodes'],
    }),
  })
});

export const {
  useGetPageOfConfirmationCodesQuery,
} = confirmationCodesApi;
