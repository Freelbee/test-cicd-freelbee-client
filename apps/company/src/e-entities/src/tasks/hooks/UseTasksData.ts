'use client'

import { TaskCounterpartyDataDto} from "@freelbee/entities";
import { QueryStatus, skipToken } from "@reduxjs/toolkit/query";
import { useGetCompanyTasksPageQuery } from "../query/taskApi";
import { useGetCompanyCounterpartyQuery } from "../../company/query/companyApi";

export const useTasksData = (): [Array<TaskCounterpartyDataDto>, QueryStatus] => {
    const {data: company} = useGetCompanyCounterpartyQuery();
    const {data, status} = useGetCompanyTasksPageQuery(company?.id ?? skipToken);

    return [(data || []), status];
}
