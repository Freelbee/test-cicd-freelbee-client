import { FetchBaseQueryError, createApi } from '@reduxjs/toolkit/query/react';
import { SerializedError } from '@reduxjs/toolkit';
import { baseQueryWithAuth } from '../query/queryWithAuth';

export const API = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithAuth,
  tagTypes: [
    'auth-info',
    'company-counterparties',
    'company-counterparty',
    'confirmation-codes'
  ],
  endpoints: () => ({})
});

export type MutationResponse<T> = Promise<
  { data: T } | { error: FetchBaseQueryError | SerializedError }
>;
