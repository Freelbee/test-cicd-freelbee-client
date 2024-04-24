import { API, Endpoint_Enum } from '@freelancer/shared';
import { FileAction, FileLink, TaskCounterpartyDataDto, TaskFileDto, TaskStatus} from '@freelbee/entities';
import { PaymentReceiverDto } from '../../payment/interface/PaymentReceiverDto';

export const taskAPI = API.injectEndpoints({
  endpoints: (builder) => ({
    getFreelancerTasksPage: builder.query<Array<TaskCounterpartyDataDto>, number>({
      query: (counterpartyId) => Endpoint_Enum.GET_FREELANCER_TASKS_PAGE.replace('{0}', counterpartyId.toString()),
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
    acceptTask: builder.mutation<void, {taskId: number, body: PaymentReceiverDto}>({
      query: ({taskId, body}) => ({
          url: Endpoint_Enum.ACCEPT_TASK.replace('{0}', taskId.toString()),
          method: 'POST',
          body
      }),
      invalidatesTags: ['tasks']
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
    useGetFreelancerTasksPageQuery,
    useAcceptTaskMutation,
    useSetTaskStatusMutation,
    useGetContractLinkQuery,
    useGetTaskFilesQuery
} = taskAPI;
