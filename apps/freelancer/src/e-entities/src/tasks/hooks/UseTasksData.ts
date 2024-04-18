'use client'

import { TaskCounterpartyDataDto} from "@freelbee/entities";
import { QueryStatus, skipToken } from "@reduxjs/toolkit/query";
import { useSearchTasksQuery } from "../query/taskApi";
import { useGetUserQuery } from "../../user/query/userApi";

export const useTasksData = (): [Array<TaskCounterpartyDataDto>, QueryStatus] => {

    // To - Do - контрагент у фрила??
    const {data: user} = useGetUserQuery();
    const {data, status} = useSearchTasksQuery(user?.id ?? skipToken);

    return [(data || []), status];
}