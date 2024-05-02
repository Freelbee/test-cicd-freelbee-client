import { API, Endpoint_Enum } from '@company/shared';
import { UserData, UserDataDto, UserResponse } from '@freelbee/entities';
import { PropsHelper } from '@freelbee/shared/helpers';

export const userAPI = API.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query<UserData, void>({
      query: () => Endpoint_Enum.USER,
      providesTags: ['user'],
      transformResponse: (res: UserResponse) => {
        console.log(res)
        const mappedProps = PropsHelper.MapPropsToFields(res.userData.props);
        return {...res, userData: {...(res?.userData ?? {}), props: mappedProps}};
      }
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
    useSaveUserDataMutation
} = userAPI;
