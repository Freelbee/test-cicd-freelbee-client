import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NODE_ENV === `development` ? `http://localhost:8080/` : process.env.NEXT_PUBLIC_URL ?? '',
  credentials: 'include',
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json;charset=UTF-8');
    headers.set('Authorization', 'Bearer eyJ0eXAiOiJBQ0NFU1MiLCJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ0ZXN0b3YzQG1haWwucnUiLCJ1c2VySWQiOjMsImlhdCI6MTcxMzM1MTM3NCwiZXhwIjoxNzE1MTUxMzc0fQ.F0HqcwsyDKNwSF_MKpurW6EG80jgNO-nDLo96Y15S6TebxZ6_D0gtr10p-vgIwVp')
    return headers;
  },
});
