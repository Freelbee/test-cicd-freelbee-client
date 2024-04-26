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

const invoiceAllowedStatuses = [
  TaskStatus.WAITING_FOR_PAYMENT,
  TaskStatus.PAYMENT_IN_PROGRESS,
  TaskStatus.PAYMENT_ERROR,
  TaskStatus.PAID
]

export const TaskDetails = () => {

  const { displayedTask } = useAppSelector(state => state.taskSliceReducer);

  const shouldDisplayContractDownload = displayedTask?.status &&  displayedTask.status !== TaskStatus.NEW;
  const shouldDisplayInvoiceDownload = displayedTask?.status && invoiceAllowedStatuses.includes(displayedTask.status);

  const { data: files } = useGetTaskFilesQuery(displayedTask?.taskId ?? skipToken);
  const { data: linkContract } = useGetContractLinkQuery(displayedTask?.contractId ?? skipToken, { skip: !shouldDisplayContractDownload });
  const { data: linkInvoice } = useGetInvoiceLinkQuery(displayedTask?.contractId ?? skipToken, { skip: !shouldDisplayInvoiceDownload });

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
      <Heading2 style={{ maxWidth: '90%' }}>{displayedTask?.title}</Heading2>
      <TaskHeadInfo task={displayedTask} />
      <Description task={displayedTask} />
      {shouldDisplayContractDownload && <FileDownload text='Contract:' link={linkContract?.downloadLink} />}
      {shouldDisplayInvoiceDownload && <FileDownload text='Invoice:' link={linkInvoice?.downloadLink} />}
      <PinnedFiles userRole={UserRole.COMPANY} files={files ?? []} />
      {displayedTask && ACTIONS_BY_STATUS[displayedTask?.status]}
    </FormGrid>
  );
};
