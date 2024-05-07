'use client';

import React from 'react';
import { FormGrid } from "./ui/FormGrid";
import { Heading2 } from "@freelbee/shared/ui-kit";
import TaskHeadInfo from "./ui/TaskHeadInfo";
import Description from "./ui/Description";
import { useAppSelector } from "../../store";
import { PinnedFiles, TaskStatus, UserRole } from "@freelbee/entities";
import AssignedTaskActions from "./ui/taskActions/AssignedTaskActions";
import TaskInProgressActions from "./ui/taskActions/TaskInProgressActions";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetTaskFilesQuery } from "@freelancer/entities";
import { DownloadTaskDocuments } from './ui/taskActions/DownloadTaskDocuments';
import styled from 'styled-components';

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
    const {data: files} = useGetTaskFilesQuery(displayedTask?.taskId ?? skipToken);

    return (
        <FormGrid>
            <HeadingContainer>
              <Heading2>{displayedTask?.title}</Heading2>
            </HeadingContainer>
            <TaskHeadInfo task={displayedTask}/>
            <Description task={displayedTask}/>
            {displayedTask && <DownloadTaskDocuments task={displayedTask} />}
            <PinnedFiles
                userRole={UserRole.FREELANCER}
                files={files ?? []} />
            {displayedTask && ACTIONS_BY_STATUS[displayedTask?.status]}
        </FormGrid>
    );
}

const HeadingContainer = styled.div`
  max-width: 90%;
  overflow: hidden;
`;
