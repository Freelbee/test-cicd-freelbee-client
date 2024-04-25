'use client';

import { FormGrid } from "./ui/FormGrid";
import { Heading2 } from "@freelbee/shared/ui-kit";
import TaskHeadInfo from "./ui/TaskHeadInfo";
import Description from "./ui/Description";
import { useAppSelector } from "../../store";
import { TaskStatus } from "@freelbee/entities";
import AssignedTaskActions from "./ui/taskActions/AssignedTaskActions";
import TaskInProgressActions from "./ui/taskActions/TaskInProgressActions";
import { ContractDownload } from "./ui/taskActions/ContractDownload";
import React from 'react';

const ACTIONS_BY_STATUS: Record<TaskStatus, JSX.Element> = {
    [TaskStatus.NEW]: <></>,
    [TaskStatus.ASSIGNED]: <AssignedTaskActions />,
    [TaskStatus.CANCELLED]: <></>,
    [TaskStatus.IN_PROGRESS]: <TaskInProgressActions />,
    [TaskStatus.REVIEWING]: <></>,
    [TaskStatus.WAITING_FOR_PAYMENT]: <></>,
    [TaskStatus.PAYMENT_IN_PROGRESS]: <></>,
    [TaskStatus.PAYMENT_ERROR]: <></>,
    [TaskStatus.PAID]: <></>
}

export const TaskDetails = () => {

    const {displayedTask} = useAppSelector(state => state.taskSliceReducer);

    return (
        <FormGrid>
            <Heading2 style={{maxWidth: '90%'}}>
                {displayedTask?.title}
            </Heading2>
            <TaskHeadInfo task={displayedTask}/>
            <Description task={displayedTask}/>
            {displayedTask && <ContractDownload taskId={displayedTask.taskId} />}
            {displayedTask && ACTIONS_BY_STATUS[displayedTask?.status]}
        </FormGrid>
    );
}
