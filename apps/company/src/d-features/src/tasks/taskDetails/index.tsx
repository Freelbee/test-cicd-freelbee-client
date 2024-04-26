'use client';

import styled from 'styled-components';
import { FormGrid } from './ui/FormGrid';
import { Checkbox, Heading2, Text } from '@freelbee/shared/ui-kit';
import TaskHeadInfo from './ui/TaskHeadInfo';
import { Description } from './ui/Description';
import { useAppSelector } from '../../store';
import { skipToken } from '@reduxjs/toolkit/query';
import { TaskStatus, UserRole } from '@freelbee/entities';
import { useGetContractLinkQuery, useGetInvoiceLinkQuery, useGetTaskFilesQuery } from '@company/entities';
import AssignedTaskActions from './ui/taskActions/AssignedTaskActions';
import TaskNewActions from './ui/taskActions/TaskNewActions';
import TaskInReviewActions from './ui/taskActions/TaskInReviewActions';
import TaskWaitingForPaymentActions from './ui/taskActions/TaskWaitingForPaymentActions';
import React, { useState } from 'react';
import { PinnedFiles } from "@freelbee/entities";
import { FileDownload } from './ui/FileDownload';
import { DownloadTaskDocuments } from './ui/taskActions/DownloadTaskDocuments';


export const TaskDetails = () => {

  const { displayedTask } = useAppSelector(state => state.taskSliceReducer);
  const [isBoxChecked, setBoxChecked] = useState(false);

  const { data: files } = useGetTaskFilesQuery(displayedTask?.taskId ?? skipToken);

  const ACTIONS_BY_STATUS: Record<TaskStatus, JSX.Element> = {
    [TaskStatus.NEW]: <TaskNewActions />,
    [TaskStatus.ASSIGNED]: <AssignedTaskActions />,
    [TaskStatus.CANCELLED]: <></>,
    [TaskStatus.IN_PROGRESS]: <></>,
    [TaskStatus.REVIEWING]: <TaskInReviewActions isBoxChecked={isBoxChecked} />,
    [TaskStatus.WAITING_FOR_PAYMENT]: <TaskWaitingForPaymentActions />,
    [TaskStatus.PAYMENT_IN_PROGRESS]: <></>,
    [TaskStatus.PAYMENT_ERROR]: <></>,
    [TaskStatus.PAID]: <></>
  };

  return (
    <FormGrid>
      <Heading2 style={{ maxWidth: '90%' }}>{displayedTask?.title}</Heading2>
      <TaskHeadInfo task={displayedTask} />
      <Description task={displayedTask} />
      {displayedTask && <DownloadTaskDocuments task={displayedTask} />}
      <PinnedFiles userRole={UserRole.COMPANY} files={files ?? []} />
      {displayedTask?.status === TaskStatus.REVIEWING && (
        <TermsAgreementContainer>
          <Checkbox isCheck={isBoxChecked} onChange={() => setBoxChecked((isBoxChecked) => !isBoxChecked)} />
          <Text font="body">{`By checking the box, I agree with the terms and conditions of the Contract. All the data I've provided is correct. I understand that when I click the "I agree" button, I am entering into a Contract with Contractor as a Client on the terms and conditions described`}</Text>
        </TermsAgreementContainer>
      )}
      {displayedTask && ACTIONS_BY_STATUS[displayedTask?.status]}
    </FormGrid>
  );
};

const TermsAgreementContainer = styled.div`
  display: flex;
  gap: 8px;
`;
