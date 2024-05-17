import { FetchBaseQueryError, createApi } from '@reduxjs/toolkit/query/react';
import { SerializedError } from '@reduxjs/toolkit';
import { ErrorResponse } from '@freelbee/shared/error';
import { baseQueryWithAuth } from '../query/queryWithAuth';

export const API = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithAuth,
  tagTypes: [
    'companyCounterparties',
    'companyCounterparty',
    'confirmationCodes',
  ],
  endpoints: () => ({}),
});

export type MutationResponse<T> = Promise<
  { data: T } | { error: FetchBaseQueryError | ErrorResponse | SerializedError }
>;
