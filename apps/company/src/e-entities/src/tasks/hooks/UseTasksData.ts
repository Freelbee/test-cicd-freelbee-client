'use client'

import { useGetCompanyCounterpartyQuery, useGetCompanyTasksPageQuery } from '@company/entities';
import { TaskCounterpartyDataDto} from "@freelbee/entities";
import { QueryStatus, skipToken } from "@reduxjs/toolkit/query";

export const useTasksData = (): [Array<TaskCounterpartyDataDto>, QueryStatus] => {
    const {data: company} = useGetCompanyCounterpartyQuery();
    const {data, status} = useGetCompanyTasksPageQuery(company?.id ?? skipToken);

    return [(data || []), status];
}
