import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { Token_Enum } from '../enums/Token_Enum';


export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NODE_ENV === `development` ? `http://localhost:8080/` : process.env.NEXT_PUBLIC_URL ?? '',
  credentials: 'include',
  prepareHeaders: (headers) => {

//     headers.set('Content-Type', 'application/json;charset=UTF-8');
    // headers.set('Authorization', 'Bearer eyJ0eXAiOiJBQ0NFU1MiLCJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ0ZXN0b3YzQG1haWwucnUiLCJ1c2VySWQiOjMsImlhdCI6MTcxMzQyODcxMSwiZXhwIjoxNzE1MjI4NzExfQ.l9E5GlEV8QY34j5nR9h8wlHyZD1NrXlN9RhoNT6GkJJbqt5dcFdfwt6j26C1anK6')
    headers.set('Content-Type', 'application/json;charset=UTF-8');

    return headers;
  },
  responseHandler: async (response) => {
    if (response.headers.get('Authorization')) {
      const tokenBearer = response.headers.get('Authorization') ?? '';
      const token = tokenBearer?.replace('Bearer ', '');
      localStorage.setItem(Token_Enum.ACCESS_TOKEN, token);
    }
    try {
      return await response.json();
    } catch (error) {
      return response;
    }
  }
});
