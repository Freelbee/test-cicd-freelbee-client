'use client'

import { useGetCompanyQuery, useSearchTasksQuery } from "@company/entities";
import { TaskCounterpartyDataDto} from "@freelbee/entities";
import { QueryStatus, skipToken } from "@reduxjs/toolkit/query";

export const useTasksData = (): [Array<TaskCounterpartyDataDto>, QueryStatus] => {
    const {data: company} = useGetCompanyQuery();
    const {data, status} = useSearchTasksQuery(company?.id ?? skipToken);

    return [(data || []), status];
}