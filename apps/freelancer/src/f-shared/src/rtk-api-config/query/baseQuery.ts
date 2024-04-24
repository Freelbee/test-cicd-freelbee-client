import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NODE_ENV === `development` ? `http://localhost:8080/` : process.env.NEXT_PUBLIC_URL ?? '',
  credentials: 'include',
  prepareHeaders: (headers) => {
    // headers.set('Content-Type', 'application/json;charset=UTF-8');
    // headers.set('Authorization', 'Bearer eyJ0eXAiOiJBQ0NFU1MiLCJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJmcmVlbEBtYWlsLnJ1IiwidXNlcklkIjoyLCJpYXQiOjE3MTM5NTM1MjgsImV4cCI6MTcxNTc1MzUyOH0.DxrYCuicNSGWj_iG_Ilt_jkiRDvmUj1Jz2o4fy5mo16pOjQECUg3HmBuef7NNL8G')
    return headers;
  },
});
