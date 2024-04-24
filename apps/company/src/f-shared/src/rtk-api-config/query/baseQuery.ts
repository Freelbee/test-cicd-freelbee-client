import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NODE_ENV === `development` ? `http://localhost:8080/` : process.env.NEXT_PUBLIC_URL ?? '',
  credentials: 'include',
  prepareHeaders: (headers) => {
    // headers.set('Authorization', 'Bearer eyJ0eXAiOiJBQ0NFU1MiLCJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ0ZXN0b3YyQG1haWwucnUiLCJ1c2VySWQiOjEsImlhdCI6MTcxMzk1MzM2MSwiZXhwIjoxNzE1NzUzMzYxfQ.JiB_SQ0LeY1x45xmX1unDT0gAsXmeBm3JjHGTgYo4HORj-1bHk7y1pk4tapN76Nd')
    return headers;
  },
});
