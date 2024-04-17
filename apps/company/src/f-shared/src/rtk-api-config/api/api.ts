import { FetchBaseQueryError, createApi } from '@reduxjs/toolkit/query/react';
import { SerializedError } from '@reduxjs/toolkit';
import { baseQueryWithAuth } from '@company/shared';

export const API = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithAuth,
  tagTypes: [
      'zoho-crm',
  ],
  endpoints: () => ({}),
});

export type MutationResponse<T> = Promise<
  { data: T } | { error: FetchBaseQueryError | SerializedError }
>;
