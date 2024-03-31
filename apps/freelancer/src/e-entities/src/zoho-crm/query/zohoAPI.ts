'use client'
import { ZohoLeadInfo } from "@freelbee/entities";
import { API, Endpoint_Enum } from "@freelancer/shared";

export const zohoAPI = API.injectEndpoints({
    endpoints: (builder) => ({
        sendRegisteredLead: builder.mutation<void, ZohoLeadInfo>({
            query: (body) => ({
                url: Endpoint_Enum.ZOHO_CREATE_LEAD,
                method: 'POST',
                body: {
                    data: [body]
                }
            }), 
            extraOptions: {
                notAuthorized: true,
                crmQuery: true
            }
        }
        )
    })
});

export const {
    useSendRegisteredLeadMutation
} = zohoAPI;