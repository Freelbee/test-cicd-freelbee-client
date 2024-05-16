'use client';

import { FormGrid } from './ui/FormGrid';
import {  Heading2 } from '@freelbee/shared/ui-kit';
import TaskHeadInfo from './ui/TaskHeadInfo';
import { Description } from './ui/Description';
import { useAppSelector } from '../../store';
import { skipToken } from '@reduxjs/toolkit/query';
import { TaskStatus, UserRole } from '@freelbee/entities';
import { useGetTaskFilesQuery } from '@company/entities';
import AssignedTaskActions from './ui/taskActions/AssignedTaskActions';
import TaskNewActions from './ui/taskActions/TaskNewActions';
import TaskInReviewActions from './ui/taskActions/TaskInReviewActions';
import TaskWaitingForPaymentActions from './ui/taskActions/TaskWaitingForPaymentActions';
import { PinnedFiles } from "@freelbee/entities";
import { DownloadTaskDocuments } from './ui/taskActions/DownloadTaskDocuments';
import styled from 'styled-components';


export const TaskDetails = () => {

  const { displayedTask } = useAppSelector(state => state.taskSliceReducer);

  const { data: files } = useGetTaskFilesQuery(displayedTask?.taskId ?? skipToken);

  const ACTIONS_BY_STATUS: Record<TaskStatus, JSX.Element> = {
    [TaskStatus.NEW]: <TaskNewActions />,
    [TaskStatus.ASSIGNED]: <AssignedTaskActions />,
    [TaskStatus.CANCELLED]: <></>,
    [TaskStatus.IN_PROGRESS]: <></>,
    [TaskStatus.REVIEWING]: <TaskInReviewActions />,
    [TaskStatus.WAITING_FOR_PAYMENT]: <TaskWaitingForPaymentActions />,
    [TaskStatus.PAYMENT_IN_PROGRESS]: <></>,
    [TaskStatus.PAYMENT_ERROR]: <></>,
    [TaskStatus.PAID]: <></>
  };

  return (
    <FormGrid>
      <HeadingContainer>
        <Heading2>{displayedTask?.title}</Heading2>
      </HeadingContainer>
      <TaskHeadInfo task={displayedTask} />
      <Description task={displayedTask} />
      {displayedTask && <DownloadTaskDocuments task={displayedTask} />}
      <PinnedFiles userRole={UserRole.COMPANY} files={files ?? []} />
      {displayedTask && ACTIONS_BY_STATUS[displayedTask?.status]}
    </FormGrid>
  );
};

const HeadingContainer = styled.div`
  overflow: hidden;
  max-width: 90%;
`;
