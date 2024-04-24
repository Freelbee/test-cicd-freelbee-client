import { API, Endpoint_Enum } from '@company/shared';
import { Currency, PaymentProviderName } from '../dto/Currency';
import { WorksCategory } from '../dto/WorksCategory';
import { FileAction, FileLink, TaskCounterpartyDataDto, TaskFileDto, TaskStatus} from '@freelbee/entities';

export const taskAPI = API.injectEndpoints({
  endpoints: (builder) => ({
    searchTasks: builder.query<Array<TaskCounterpartyDataDto>, number>({
      query: (counterpartyId) => Endpoint_Enum.SEARCH_TASKS.replace('{0}', counterpartyId.toString()),
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
    getContractLink: builder.query<FileLink, number>({
      query: (contractId) => Endpoint_Enum.GET_CONTRACT_LINK.replace('{0}', contractId.toString())
    }),
    getTaskFiles: builder.query<Array<TaskFileDto>, number>({
      query: (taskId) => Endpoint_Enum.GET_TASK_FILES.replace('{0}', taskId.toString()),
      transformResponse: (res: Array<TaskFileDto>) => {
        return res.map(f => ({...f, action: FileAction.NO_ACTION}));
      }
    }),
  })
});

export const {
    useSearchTasksQuery,
    useCreateTaskMutation,
    useSetTaskStatusMutation,
    useGetWorksCategoriesQuery,
    useGetCurrenciesQuery,
    useGetContractLinkQuery,
    useGetTaskFilesQuery
} = taskAPI;
