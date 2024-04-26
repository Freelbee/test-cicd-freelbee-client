'use client'

import { TaskCounterpartyDataDto} from "@freelbee/entities";
import { QueryStatus, skipToken } from "@reduxjs/toolkit/query";
import { useGetFreelancerCounterpartyQuery, useGetUserQuery } from '../../user/query/userApi';
import { useGetFreelancerTasksPageQuery } from "../query/taskApi";

export const useTasksData = (): [Array<TaskCounterpartyDataDto>, QueryStatus] => {

    const {data: freelancer} = useGetFreelancerCounterpartyQuery();
    const {data, status} = useGetFreelancerTasksPageQuery(freelancer?.id ?? skipToken);

    return [(data || []), status];
}
