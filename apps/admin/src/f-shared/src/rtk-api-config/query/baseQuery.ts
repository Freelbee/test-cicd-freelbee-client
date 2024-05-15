import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { Token_Enum } from '@admin/shared';

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NODE_ENV === `development` ? `http://localhost:8082/api/v1/` : '/api/v1/',
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
