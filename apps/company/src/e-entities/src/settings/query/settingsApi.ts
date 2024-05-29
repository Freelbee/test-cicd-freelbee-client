'use client'

import { API, Endpoint_Enum } from "@company/shared";
import { PasswordUpdateDto } from "@freelbee/entities";

export const settingsAPI = API.injectEndpoints({
    endpoints: (builder) => ({
        updateUserPassword: builder.mutation<void, PasswordUpdateDto>({
            query: (body) => ({
              url: Endpoint_Enum.UPDATE_PASSWORD,
              method: 'PUT',
              body
          }),
        //   invalidatesTags: []
          })
    })
});

export const {
    useUpdateUserPasswordMutation
} = settingsAPI;