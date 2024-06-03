import { API, Endpoint_Enum } from '@company/shared';

export const notificationApi = API.injectEndpoints({
  endpoints: (builder) => ({
    sendNotificationAboutNewCompanyForApproval: builder.mutation<void, number>({
      query: (companyCounterpartyId) => ({
          url: Endpoint_Enum.SEND_NOTIFICATION_ABOUT_NEW_COMPANY_FOR_APPROVAL.replace('{0}', companyCounterpartyId.toString()),
          method: 'POST',
      }),
    }),
  })
});

export const {
  useSendNotificationAboutNewCompanyForApprovalMutation
} = notificationApi;
