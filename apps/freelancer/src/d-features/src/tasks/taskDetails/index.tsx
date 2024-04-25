'use client';

import { FormGrid } from "./ui/FormGrid";
import { Heading2 } from "@freelbee/shared/ui-kit";
import TaskHeadInfo from "./ui/TaskHeadInfo";
import Description from "./ui/Description";
import { useAppSelector } from "../../store";
import { PinnedFiles, TaskStatus, UserRole } from "@freelbee/entities";
import AssignedTaskActions from "./ui/taskActions/AssignedTaskActions";
import TaskInProgressActions from "./ui/taskActions/TaskInProgressActions";
import { ContractDownload } from "./ui/taskActions/ContractDownload";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetTaskFilesQuery } from "@freelancer/entities";

const ACTIONS_BY_STATUS: Record<TaskStatus, JSX.Element> = {
    [TaskStatus.ASSIGNED]: <AssignedTaskActions />,
    [TaskStatus.IN_PROGRESS]: <TaskInProgressActions />,
    [TaskStatus.NEW]: <></>,
    [TaskStatus.CANCELLED]: <></>,
    [TaskStatus.REVIEWING]: <></>,
    [TaskStatus.PAYMENT_IN_PROGRESS]: <></>,
    [TaskStatus.PAYMENT_ERROR]: <></>,
    [TaskStatus.PAID]: <></>
}

export const TaskDetails = () => {

    const {displayedTask} = useAppSelector(state => state.taskSliceReducer);
    const {data: files} = useGetTaskFilesQuery(displayedTask?.taskId ?? skipToken);

    return (
        <FormGrid>
            <Heading2 style={{maxWidth: '90%'}}>
                {displayedTask?.title}
            </Heading2>
            <TaskHeadInfo task={displayedTask}/>
            <Description task={displayedTask}/>
            {displayedTask && <ContractDownload taskId={displayedTask.taskId} />}
            <PinnedFiles 
                userRole={UserRole.FREELANCER}
                files={files ?? []} />
            {displayedTask && ACTIONS_BY_STATUS[displayedTask?.status]}
        </FormGrid>
    );
}