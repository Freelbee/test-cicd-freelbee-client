import { API, Endpoint_Enum } from '@company/shared';
import { Currency, PaymentMethod, PaymentMethodResponse, PaymentProviderName } from '@freelbee/entities';
import { PropsHelper } from '@freelbee/shared/helpers';

export const paymentAPI = API.injectEndpoints({
  endpoints: (builder) => ({
    getCurrencies: builder.query<Currency[], PaymentProviderName>({
      query: (paymentProviderName: PaymentProviderName) => ({
        url: Endpoint_Enum.GET_CURRENCIES,
        method: 'GET',
        params: { provider: paymentProviderName }
      })
    }),
    getPaymentMethods: builder.query<PaymentMethod, number>({
      query: (counterpartyId) => {
        return {
          url: Endpoint_Enum.GET_PAYMENT_METHODS.replace('{0}', counterpartyId.toString()),
        }
      },
      transformResponse: (res: PaymentMethodResponse) => {
        const mappedProps = PropsHelper.MapPropsToFields(res.props);
        return {
          ...res,
          props: mappedProps
        }
      }
    }),
  })
});

export const {
    useGetCurrenciesQuery,
    useGetPaymentMethodsQuery
} = paymentAPI;
