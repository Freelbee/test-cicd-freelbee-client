import { API, Endpoint_Enum } from '@company/shared';
import { TaskCounterpartyDataDto, TaskStatus} from '@freelbee/entities';

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
    // To- Do
    createTask: builder.mutation<void, object>({
      query: (body) => ({
          url: Endpoint_Enum.ADD_TASK,
          method: 'POST',
          body
      }), 
      invalidatesTags: ['tasks']
    })
  })
});

export const {
    useSearchTasksQuery,
    useCreateTaskMutation,
    useSetTaskStatusMutation
} = taskAPI;
