import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NODE_ENV === `development` ? `http://localhost:8080/api/v1/` : '/api/v1/',
  credentials: 'include',
  prepareHeaders: (headers) => {
    // headers.set('Content-Type', 'application/json;charset=UTF-8');

    return headers;
  },
});
