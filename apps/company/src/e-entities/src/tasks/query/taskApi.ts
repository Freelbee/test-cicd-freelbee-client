import { API, Endpoint_Enum } from '@company/shared';
import { WorksCategory } from '../dto/WorksCategory';
import { TaskFreelancerData } from '../dto/TaskFreelancerData';
import { Currency, FileLink, PaymentProviderName, TaskCounterpartyDataDto, TaskFileDto, TaskStatus } from '@freelbee/entities';
import { ContractPreviewDto } from '../dto/ContractPreviewDto';
import { FileDownloadHelper } from 'packages/f-shared/src/helpers/FileDownloadHelper';

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
        method: 'GET',
      })
    }),
    getCurrencies: builder.query<Currency[], PaymentProviderName>({
      query: (paymentProviderName: PaymentProviderName) => ({
        url: Endpoint_Enum.GET_CURRENCIES,
        method: 'GET',
        params: { provider: paymentProviderName },
      }),
    }),
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
    getTaskFiles: builder.query<Array<TaskFileDto>, number>({
      query: (taskId) => Endpoint_Enum.GET_TASK_FILES.replace('{0}', taskId.toString())
    }),
  })
});

export const {
    useGetCompanyTasksPageQuery,
    useCreateTaskMutation,
    useFindFreelancersQuery,
    useSetTaskStatusMutation,
    useGetWorksCategoriesQuery,
    useGetCurrenciesQuery,
    useGenerateAndDownloadContractPreviewMutation,
    useGetContractLinkQuery,
    useGetTaskFilesQuery
} = taskAPI;