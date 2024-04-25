'use client'

import { TaskCounterpartyDataDto} from "@freelbee/entities";
import { QueryStatus, skipToken } from "@reduxjs/toolkit/query";
import { useGetUserQuery } from '../../user/query/userApi';
import { useGetFreelancerTasksPageQuery } from "../query/taskApi";

export const useTasksData = (): [Array<TaskCounterpartyDataDto>, QueryStatus] => {

    // const {data: freelancer} = useGetFreelancerCounterpartyQuery();
    const {data: user} = useGetUserQuery(); //TODO::: not sure we need 'user' or 'freelancer'
    const {data, status} = useGetFreelancerTasksPageQuery(user?.id ?? skipToken); //TODO::: verify correct id

    return [(data || []), status];
}
