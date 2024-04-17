import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NODE_ENV === `development` ? `http://localhost:8080/` : process.env.NEXT_PUBLIC_URL ?? '',
  credentials: 'include',
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json;charset=UTF-8');
    // headers.set('Authorization', 'Bearer eyJ0eXAiOiJBQ0NFU1MiLCJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ0ZXN0b3YyQG1haWwucnUiLCJ1c2VySWQiOjIsImlhdCI6MTcxMzM0OTAyNCwiZXhwIjoxNzE1MTQ5MDI0fQ.PskBG7nBoNBLXpwTUfBmzkNvOg_kM6YQeu_5mbObHG4M-Z4UxtEetuC9i1Oyg6ae')
    return headers;
  },
});
