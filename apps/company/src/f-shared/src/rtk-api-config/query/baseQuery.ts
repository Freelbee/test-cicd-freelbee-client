import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NODE_ENV === `development` ? `http://localhost:8080/` : process.env.NEXT_PUBLIC_URL ?? '',
  credentials: 'include',
  prepareHeaders: (headers) => {
    headers.set('Authorization', 'Bearer eyJ0eXAiOiJBQ0NFU1MiLCJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJjb21wQG1haWwucnUiLCJ1c2VySWQiOjEsImlhdCI6MTcxNDAzNDQ5NCwiZXhwIjoxNzE0MjE0NDk0fQ.YJbGds8EbtnZzSf-uSBDMgsXSPyFoFAF4fAWSJbYpc8Rz5Bx9mRlliL2TZTki0sr')
    return headers;
  },
});
