import { API, Endpoint_Enum } from '@freelancer/shared';
import { TaskCounterpartyDataDto, TaskStatus} from '@freelbee/entities';
import { PaymentReceiverDto } from '../../payment/interface/PaymentReceiverDto';

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
    acceptTask: builder.mutation<void, {taskId: number, body: PaymentReceiverDto}>({
      query: ({taskId, body}) => ({
          url: Endpoint_Enum.ACCEPT_TASK.replace('{0}', taskId.toString()),
          method: 'POST',
          body
      }), 
      invalidatesTags: ['tasks']
    })
  })
});

export const {
    useSearchTasksQuery,
    useAcceptTaskMutation,
    useSetTaskStatusMutation
} = taskAPI;
