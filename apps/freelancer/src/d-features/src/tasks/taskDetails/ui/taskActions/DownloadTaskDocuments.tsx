'use client';

import { useGetContractLinkQuery, useGetInvoiceLinkQuery } from "@freelancer/entities";
import { TaskCounterpartyDataDto, TaskStatus } from "@freelbee/entities";
import { skipToken } from "@reduxjs/toolkit/query";
import { FileDownload } from "./FileDownload";

const invoiceAllowedStatuses = [
    TaskStatus.WAITING_FOR_PAYMENT,
    TaskStatus.PAYMENT_IN_PROGRESS,
    TaskStatus.PAYMENT_ERROR,
    TaskStatus.PAID
  ]
  
interface Props {
    task: TaskCounterpartyDataDto,
}

export const DownloadTaskDocuments = ({task}: Props) => {

    const shouldDisplayContractDownload = task?.status &&  task.status !== TaskStatus.NEW;
    const shouldDisplayInvoiceDownload = task?.status && invoiceAllowedStatuses.includes(task.status);

    const { data: linkContract } = useGetContractLinkQuery(task?.contractId ?? skipToken, { skip: !shouldDisplayContractDownload });
    const { data: linkInvoice } = useGetInvoiceLinkQuery(task?.taskId ?? skipToken, { skip: !shouldDisplayInvoiceDownload });

  return (
    <>
        {shouldDisplayContractDownload && <FileDownload text='Contract:' link={linkContract?.downloadLink} />}
        {shouldDisplayInvoiceDownload && <FileDownload text='Invoice:' link={linkInvoice?.downloadLink} />}
    </>
  )
}
