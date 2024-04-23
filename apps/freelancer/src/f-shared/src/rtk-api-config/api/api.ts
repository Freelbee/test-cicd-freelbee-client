import { FetchBaseQueryError, createApi } from '@reduxjs/toolkit/query/react';
import { SerializedError } from '@reduxjs/toolkit';
import { baseQueryWithAuth } from '@freelancer/shared';
import { ErrorResponse } from '@freelbee/shared/error';


export const API = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithAuth,
  tagTypes: [
    'zoho-crm',
    'user',
    'counterparty',
    'payment-data',
    'tasks'
  ],
  endpoints: () => ({}),
});

export type MutationResponse<T> = Promise<
  { data: T } | { error: FetchBaseQueryError | ErrorResponse | SerializedError }
>;
