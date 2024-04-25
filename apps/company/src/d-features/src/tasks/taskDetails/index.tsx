'use client';

import styled from 'styled-components';
import { FormGrid } from './ui/FormGrid';
import { Checkbox, Heading2, Text } from '@freelbee/shared/ui-kit';
import TaskHeadInfo from './ui/TaskHeadInfo';
import { Description } from './ui/Description';
import { useAppSelector } from '../../store';
import { skipToken } from '@reduxjs/toolkit/query';
import { TaskStatus } from '@freelbee/entities';
import { useGetContractLinkQuery, useGetInvoiceLinkQuery } from '@company/entities';
import AssignedTaskActions from './ui/taskActions/AssignedTaskActions';
import TaskNewActions from './ui/taskActions/TaskNewActions';
import TaskInReviewActions from './ui/taskActions/TaskInReviewActions';
import TaskWaitingForPaymentActions from './ui/taskActions/TaskWaitingForPaymentActions';
import React, { useState } from 'react';
import { FileDownload } from '../../../../c-widgets/src/tasks/TaskDetails/ui/FileDownload';

const invoiceAllowedStatuses = [
  TaskStatus.WAITING_FOR_PAYMENT,
  TaskStatus.PAYMENT_IN_PROGRESS,
  TaskStatus.PAYMENT_ERROR,
  TaskStatus.PAID
]

export const TaskDetails = () => {

  const { displayedTask } = useAppSelector(state => state.taskSliceReducer);
  const [isBoxChecked, setBoxChecked] = useState(false);

  const shouldDisplayContractDownload = displayedTask?.status &&  displayedTask.status !== TaskStatus.NEW;
  const shouldDisplayInvoiceDownload = displayedTask?.status && invoiceAllowedStatuses.includes(displayedTask.status);

  const { data: linkContract } = shouldDisplayContractDownload
    ? useGetContractLinkQuery(displayedTask?.contractId ?? skipToken)
    : { data: undefined };
  const { data: linkInvoice } = shouldDisplayInvoiceDownload
    ? useGetInvoiceLinkQuery(displayedTask?.taskId ?? skipToken)
    : { data: undefined };

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
      {shouldDisplayContractDownload && <FileDownload text='Contract:' link={linkContract?.downloadLink!} />}
      {shouldDisplayInvoiceDownload && <FileDownload text='Invoice:' link={linkInvoice?.downloadLink!} />}
      {displayedTask?.status === TaskStatus.REVIEWING && (
        <TermsAgreementContainer>
          <Checkbox isCheck={isBoxChecked} onChange={() => setBoxChecked((isBoxChecked) => !isBoxChecked)} />
          <Text font="body">By checking the box, I agree with the terms and conditions of the Contract. All the data I've provided is correct. I understand that when I click the "I agree" button, I am entering into a Contract with Contractor as a Client on the terms and conditions described</Text>
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
