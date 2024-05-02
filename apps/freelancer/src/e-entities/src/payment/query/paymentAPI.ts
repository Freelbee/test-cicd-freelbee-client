import { API, Endpoint_Enum } from '@freelancer/shared';
import { Currency, CurrencyType, PaymentProviderName } from '@freelbee/entities';

export const paymentAPI = API.injectEndpoints({
  endpoints: (builder) => ({
    getCurrencies: builder.query<Array<Currency>, {
      provider: PaymentProviderName,
      type?: CurrencyType
    }>({
      query: (params) => {
        return {
          url: Endpoint_Enum.GET_CURRENCIES,
          params: params
        }
      },
    })
  })
});

export const {
    useGetCurrenciesQuery
} = paymentAPI;
