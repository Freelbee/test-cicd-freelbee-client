import { API, Endpoint_Enum } from '@company/shared';
import { UserDataDto } from '@freelbee/entities';

export const userAPI = API.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ``,
    }),
    
    createUser: builder.mutation<void, UserDataDto>({
      query: (body) => ({
          url: Endpoint_Enum.USER,
          method: 'POST',
          body: {
              data: body
          }
      }), 
    })
  })
});

export const {
    useGetUserQuery,
    useCreateUserMutation
} = userAPI;
