import { API, Endpoint_Enum } from '@admin/shared';
import { ConfirmationCode } from '../dto/ConfirmationCode';

export const confirmationCodesApi = API.injectEndpoints({
  endpoints: (builder) => ({
    getAllConfirmationCodes: builder.query<ConfirmationCode[], void>({
      query: () => Endpoint_Enum.GET_ALL_CONFIRMATION_CODES,
      providesTags: ['confirmationCodes'],
    }),
  })
});

export const {
  useGetAllConfirmationCodesQuery,
} = confirmationCodesApi;
