'use client';

import { createApi, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { baseQueryWithAuth } from '@landing/shared';


export const API = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['User', 'Company', 'Freelancer'],
  endpoints: () => ({}),
});

// ErrorResponse?
export type MutationResponse<T> = Promise<
  { data: T } | { error: FetchBaseQueryError | SerializedError }
>;
