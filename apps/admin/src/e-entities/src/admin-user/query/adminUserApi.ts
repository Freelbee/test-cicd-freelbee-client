import { API, Endpoint_Enum } from '@admin/shared';
import { AdminCreationDto, AdminRoleDto } from '../dto/AdminCreationDto';
import { AdminUserDto } from '../dto/AdminUserDto';

/**
 * @see AdminUserController
 */

export const adminUserAPI = API.injectEndpoints({
  endpoints: (builder) => ({
    getAdminRoles: builder.query<AdminRoleDto[], void>({
      query: () => Endpoint_Enum.GET_ADMIN_ROLES
    }),
    createAdminUser: builder.mutation<void, AdminCreationDto>({
      query: (body) => ({
        url: Endpoint_Enum.CREATE_ADMIN_USER,
        method: 'POST',
        body
      })
    }),
    getAdminUser: builder.query<AdminUserDto, void>({
      query: () => Endpoint_Enum.GET_ADMIN_USER
    })
  })
});

export const {
  useGetAdminRolesQuery,
  useGetAdminUserQuery,
  useCreateAdminUserMutation
} = adminUserAPI;
