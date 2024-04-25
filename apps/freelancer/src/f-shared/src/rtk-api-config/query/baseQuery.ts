import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NODE_ENV === `development` ? `http://localhost:8080/` : process.env.NEXT_PUBLIC_URL ?? '',
  credentials: 'include',
  prepareHeaders: (headers) => {

//     headers.set('Content-Type', 'application/json;charset=UTF-8');
    headers.set('Authorization', 'Bearer eyJ0eXAiOiJBQ0NFU1MiLCJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJmcmVlbEBtYWlsLnJ1IiwidXNlcklkIjoyLCJpYXQiOjE3MTQwMzQ2MjcsImV4cCI6MTcxNDIxNDYyN30.5C4Badl9RDcIHMgU8sdHEapVmQ7vN92N5US4lLF85g82bf3v023bfTTVVbGVLRMO')
    return headers;
  },
});
