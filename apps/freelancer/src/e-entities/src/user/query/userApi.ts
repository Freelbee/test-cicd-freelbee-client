import { API, Endpoint_Enum } from '@freelancer/shared';
import { UserDataDto, UserData, UserResponse } from '@freelbee/entities';
import { PropsHelper } from '@freelbee/shared/helpers';
import { FreelancerDataDto } from '../interface/FreelancerDataDto';

export const userAPI = API.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<UserData, void>({
      query: () => Endpoint_Enum.USER,
      providesTags: ['user'],
      transformResponse: (res: UserResponse) => {
        const mappedProps = PropsHelper.MapPropsToFields(res.userData.props);
        return {...res, userData: {...res.userData, props: mappedProps}};
      }
    }),
    getFreelancer: builder.query<FreelancerDataDto, void>({
      query: () => Endpoint_Enum.FREELANCER,
      providesTags: ['user'],
    }),
    saveUserData: builder.mutation<void, UserDataDto>({
      query: (body) => ({
          url: Endpoint_Enum.SET_USER_DATA,
          method: 'POST',
          body
      }), 
      invalidatesTags: ['user']
    })
  })
});

export const {
    useGetUserQuery,
    useSaveUserDataMutation,
    useGetFreelancerQuery
} = userAPI;
