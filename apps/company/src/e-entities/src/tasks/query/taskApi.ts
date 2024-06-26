import { API, Endpoint_Enum } from '@company/shared';
import { WorksCategory } from '../dto/WorksCategory';
import { TaskFreelancerData } from '../dto/TaskFreelancerData';
import { FileLink, TaskCounterpartyDataDto, TaskFileDto, TaskStatus } from '@freelbee/entities';
import { ContractPreviewDto } from '../dto/ContractPreviewDto';
import { FileDownloadHelper } from 'packages/f-shared/src/helpers/FileDownloadHelper';
import { PaymentDataResponseDto, PaymentDataResponseDtoModified } from '../dto/PaymentDataDto';
import { PaymentResponseDto } from '../dto/PaymentDto';
import { PropsHelper } from '@freelbee/shared/helpers';

export const taskAPI = API.injectEndpoints({
  endpoints: (builder) => ({
    getCompanyTasksPage: builder.query<Array<TaskCounterpartyDataDto>, number>({
      query: (counterpartyId) => Endpoint_Enum.GET_COMPANY_TASKS_PAGE.replace('{0}', counterpartyId.toString()),
      providesTags: ['tasks']
    }),
    setTaskStatus: builder.mutation<void, {status: TaskStatus, taskId: number}>({
      query: (body) => ({
        url: Endpoint_Enum.SET_STATUS.replace('{0}', body.taskId.toString()),
        method: 'POST',
        body: {
          status: body.status
        }
      }),
      invalidatesTags: ['tasks']
    }),
    findFreelancers: builder.query<TaskFreelancerData[], {email: string}>({
      query: (body) => ({
        url: Endpoint_Enum.FIND_FREELANCERS,
        method: 'GET',
        params: { email: body.email },
      })
    }),
    createTask: builder.mutation<void, FormData>({
      query: (body) => ({
        url: Endpoint_Enum.ADD_TASK,
        method: 'POST',
        body
      }),
      invalidatesTags: ['tasks']
    }),
    getWorksCategories: builder.query<WorksCategory[], void>({
      query: () => ({
        url: Endpoint_Enum.GET_WORKS_CATEGORIES,
        method: 'GET'
      })
    }),
    // getCurrencies: builder.query<Currency[], PaymentProviderName>({
    //   query: (paymentProviderName: PaymentProviderName) => ({
    //     url: Endpoint_Enum.GET_CURRENCIES,
    //     method: 'GET',
    //     params: { provider: paymentProviderName }
    //   })
    // }),
    generateAndDownloadContractPreview: builder.mutation<string, ContractPreviewDto>({
      query: (body) => ({
        url: Endpoint_Enum.GENERATE_AND_DOWNLOAD_CONTRACT_PREVIEW,
        method: 'POST',
        body,
        responseHandler: async (response) => FileDownloadHelper.downloadFileFromOctetStreamByRtkQuery(response)
      })
    }),
    getContractLink: builder.query<FileLink, number>({
      query: (contractId) => Endpoint_Enum.GET_CONTRACT_LINK.replace('{0}', contractId.toString())
    }),
    getInvoiceLink: builder.query<FileLink, number>({
      query: (contractId) => Endpoint_Enum.GET_INVOICE_LINK.replace('{0}', contractId.toString())
    }),
    getTaskFiles: builder.query<Array<TaskFileDto>, number>({
      query: (taskId) => Endpoint_Enum.GET_TASK_FILES.replace('{0}', taskId.toString())
    }),
    getPaymentData: builder.query<PaymentDataResponseDto, { taskId: number }>({
      query: ({ taskId }) => ({
        url: Endpoint_Enum.GET_PAYMENT_DATA.replace('{0}', taskId.toString()),
        method: 'GET',
      }),
      providesTags: ["payment-data"],
      transformResponse: (res: PaymentDataResponseDtoModified) => {
        const mappedPayerPaymentMethodProps = PropsHelper.MapPropsToFields(res.payerPaymentMethod.props);
        const mappedReceiverPaymentMethodProps = PropsHelper.MapPropsToFields(res.receiverPaymentMethod.props);
        return {
          ...res,
          payerPaymentMethod: { ...res.payerPaymentMethod, props: mappedPayerPaymentMethodProps },
          receiverPaymentMethod: { ...res.receiverPaymentMethod, props: mappedReceiverPaymentMethodProps },
        }
      }
    }),
    createPaymentData: builder.mutation<PaymentResponseDto, { paymentDataId: number }>({
      query: ({ paymentDataId }) => ({
        url: Endpoint_Enum.CREATE_PAYMENT_DATA.replace('{0}', paymentDataId.toString()),
        method: 'POST',
      }),
      invalidatesTags: ['payment-data']
    }),
    eventTransakTaskStatus: builder.mutation<void, string>({
      query: (body) => ({
        url: Endpoint_Enum.WEBHOOK_TRANSAK_EVENT,
        method: 'POST',
        body
      })
      // invalidatesTags: ['CompanyTasks'],
    })
  })
});

export const {
  useGetCompanyTasksPageQuery,
  useCreateTaskMutation,
  useFindFreelancersQuery,
  useSetTaskStatusMutation,
  useGetWorksCategoriesQuery,
  // useGetCurrenciesQuery,
  useGenerateAndDownloadContractPreviewMutation,
  useGetContractLinkQuery,
  useGetInvoiceLinkQuery,
  useGetTaskFilesQuery,

  useGetPaymentDataQuery,
  useCreatePaymentDataMutation,
  useEventTransakTaskStatusMutation,
} = taskAPI;
