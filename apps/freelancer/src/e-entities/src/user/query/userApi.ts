import { API, Endpoint_Enum } from '@freelancer/shared';
import { UserDataDto } from '@freelbee/entities';

export const userAPI = API.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ``,
    }),
    
    saveUserData: builder.mutation<void, UserDataDto>({
      query: (body) => ({
          url: Endpoint_Enum.SET_USER_DATA,
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
    useSaveUserDataMutation
} = userAPI;
