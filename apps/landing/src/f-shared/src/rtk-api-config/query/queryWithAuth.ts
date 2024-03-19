'use client';

import { Mutex } from 'async-mutex';
import {
  BaseQueryApi,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { baseQuery } from './baseQuery';
import { Endpoint_Enum, Token_Enum, TokensDto } from '@landing/shared';
import { redirect } from 'next/navigation';
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';

const mutex = new Mutex();

export const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api) => {
  const getArgsConfig = () => getAuthorizedArgsConfig(args);
  const result = await baseQuery(getArgsConfig(), api, {});

  if (result.error?.status !== 401) return result;

  if (!mutex.isLocked()) {
    const release = await mutex.acquire();
    try {
      return refreshTokensQuery(args, api);
    } finally {
      release();
    }
  }
  await mutex.waitForUnlock();
  return baseQuery(getArgsConfig(), api, {});
};

const refreshTokensQuery = async (
  args: string | FetchArgs,
  api: BaseQueryApi
) => {
  const body = {
    refreshToken: localStorage.getItem(Token_Enum.REFRESH_TOKEN)!,
    accessToken: localStorage.getItem(Token_Enum.ACCESS_TOKEN)!,
  };

  const refreshResult = (await baseQuery(
    {
      url: Endpoint_Enum.REFRESH_TOKEN,
      method: 'POST',
      body,
    },
    api,
    {}
  )) as QueryReturnValue<TokensDto, FetchBaseQueryError>;

  if (refreshResult.data) {
    const refreshToken = refreshResult.data?.refreshToken;
    const accessToken = refreshResult.data?.accessToken;

    localStorage.setItem(Token_Enum.REFRESH_TOKEN, refreshToken);
    localStorage.setItem(Token_Enum.ACCESS_TOKEN, accessToken);

    return baseQueryWithAuth(getAuthorizedArgsConfig(args), api, {});
  }
  localStorage.removeItem(Token_Enum.REFRESH_TOKEN);
  localStorage.removeItem(Token_Enum.ACCESS_TOKEN);
  redirect('/sign-in');
};

/* For a request without authorization headers, you need to set for an endpoint definition -
    extraOptions: { notAuthorized: true}
    */
const getAuthorizedArgsConfig = (args: string | FetchArgs) => {
  const token = localStorage.getItem(Token_Enum.ACCESS_TOKEN);
  if (!token) {
    return args;
  }
  const argsConfig = typeof args === 'string' ? { url: args } : args;
  return {
    ...argsConfig,
    headers: {
      ...argsConfig?.headers,
      Authorization: `Bearer ${token}`,
    },
  };
};
