import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { Token_Enum } from '../enums/Token_Enum';

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NODE_ENV === `development` ? `http://localhost:8080/` : process.env.NEXT_PUBLIC_URL ?? '',
  credentials: 'include',
  prepareHeaders: (headers) => {
    // headers.set('Content-Type', 'application/json;charset=UTF-8');
    headers.set('Authorization', 'Bearer eyJ0eXAiOiJBQ0NFU1MiLCJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJ0ZXN0b3YyQG1haWwucnUiLCJ1c2VySWQiOjEsImlhdCI6MTcxMzg2Mzc2OCwiZXhwIjozNTEzODYzNzY4fQ.3wLkWt9xlmCliqM4t8oHzwE4X9P7O4pHUcpgPk0e18TXH3Uu7vQJY3WASLS0ZdQl')
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
