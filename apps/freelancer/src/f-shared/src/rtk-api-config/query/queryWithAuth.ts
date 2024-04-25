import { Mutex } from 'async-mutex';
import {
  BaseQueryApi,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { baseQuery } from './baseQuery';
import { Endpoint_Enum, Token_Enum, TokensDto } from '@freelancer/shared';
import { redirect } from 'next/navigation';
import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { ErrorResponse } from '@freelbee/shared/error';

const mutex = new Mutex();

interface ExtraOptions {
    notAuthorized?: boolean,
    crmQuery?: boolean
}

export const baseQueryWithAuth: BaseQueryFn<
string | FetchArgs,
unknown,
FetchBaseQueryError | ErrorResponse,
ExtraOptions
> = async (args, api, extraOptions) => {

    const notAuthorizedRequest = extraOptions?.notAuthorized;
    const crmQuery = extraOptions?.crmQuery;

    const getArgsConfig = () => notAuthorizedRequest ? args : getAuthorizedArgsConfig(args);

    let result = await baseQuery(
        getArgsConfig(),
        api,
        extraOptions);

    if (result?.error && result.error?.status === 401 && !crmQuery) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();

            try {
                const res = await refreshTokensQuery(args, api, extraOptions);
                result = res ? res : result;
            } finally {
                release();
            }
        } else {
            await mutex.waitForUnlock();
            result = await baseQuery(
                getArgsConfig(),
                api,
                extraOptions);
        }
    }

    return result;
};

const refreshTokensQuery = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: ExtraOptions) => {

    const refreshResult = (await baseQuery(
        {
            url: Endpoint_Enum.REFRESH_TOKEN,
            method: 'POST'
        },
        api,
        extraOptions,
    )) as QueryReturnValue<TokensDto, FetchBaseQueryError>;

    if (refreshResult) {
     /* const accessToken = refreshResult.meta.response.headers.get('Authorization').replace('Bearer ', '');

      localStorage.setItem(Token_Enum.ACCESS_TOKEN, accessToken);*/

        // retry the initial query
        return await baseQuery(
            getAuthorizedArgsConfig(args),
            api,
            extraOptions);
    } else {
        localStorage.removeItem(Token_Enum.ACCESS_TOKEN);
        redirect('/sign-in');
    }
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
            'Authorization': `Bearer ${token}`
        }
    };
};
