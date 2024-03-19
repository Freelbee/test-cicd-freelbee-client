import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const baseQuery = fetchBaseQuery({
  baseUrl: '',
  credentials: 'include',
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json;charset=UTF-8');

    return headers;
  },
});
