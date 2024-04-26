import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { Token_Enum } from '../enums/Token_Enum';

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NODE_ENV === `development` ? `http://localhost:8080/` : process.env.NEXT_PUBLIC_URL ?? '',
  credentials: 'include',
  prepareHeaders: (headers) => {
    // headers.set('Content-Type', 'application/json;charset=UTF-8');
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
