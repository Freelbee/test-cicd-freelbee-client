import { API, Endpoint_Enum } from '@admin/shared';
import { ConfirmationCode } from '@freelbee/entities';

/**
 * @see AdminConfirmationCodeController
 */

export const confirmationCodeApi = API.injectEndpoints({
  endpoints: (builder) => ({
    getAllConfirmationCodes: builder.query<ConfirmationCode[], void>({
      query: () => Endpoint_Enum.GET_ALL_CONFIRMATION_CODES,
      providesTags: ['confirmation-codes']
    })
  })
});

export const {
  useGetAllConfirmationCodesQuery
} = confirmationCodeApi;
