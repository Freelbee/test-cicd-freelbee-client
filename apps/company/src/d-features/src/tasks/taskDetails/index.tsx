'use client';

import styled from "styled-components";
import {ReactComponent as DownloadIcon } from "@freelbee/assets/icons/download/download.svg";
import { FormGrid } from "./ui/FormGrid";
import { Color, Heading2, Text } from "@freelbee/shared/ui-kit";
import TaskHeadInfo from "./ui/TaskHeadInfo";
import {Description} from "./ui/Description";
import { useAppSelector } from "../../store";
import { skipToken } from "@reduxjs/toolkit/query";
import { TaskStatus } from "@freelbee/entities";
import { useGetContractLinkQuery } from "@company/entities";
import AssignedTaskActions from "./ui/taskActions/AssignedTaskActions";
import TaskNewActions from "./ui/taskActions/TaskNewActions";
import TaskInReviewActions from "./ui/taskActions/TaskInReviewActions";

const ACTIONS_BY_STATUS: Record<TaskStatus, JSX.Element> = {
    [TaskStatus.ASSIGNED]: <AssignedTaskActions />,
    [TaskStatus.IN_PROGRESS]: <></>,
    [TaskStatus.NEW]: <TaskNewActions />,
    [TaskStatus.CANCELLED]: <></>,
    [TaskStatus.REVIEWING]: <TaskInReviewActions />,
    [TaskStatus.PAYMENT_IN_PROGRESS]: <></>,
    [TaskStatus.PAYMENT_ERROR]: <></>,
    [TaskStatus.PAID]: <></>
}

export const TaskDetails = () => {

    const {displayedTask} = useAppSelector(state => state.taskSliceReducer);
    const {data: link } = useGetContractLinkQuery(displayedTask?.contractId ?? skipToken);

    return (
        <FormGrid>
            <Heading2 style={{maxWidth: '90%'}}>
                {displayedTask?.title}
            </Heading2>
            <TaskHeadInfo task={displayedTask}/>
            <Description task={displayedTask}/>
            <DownloadContainer>
                <Text font='bodyMedium'>Contract:</Text>
                {link && 
                <DownLoadContent href={link?.downloadLink}>
                    <DownloadIcon/>
                    <Text font={'body'} color={Color.BLUE}>Download</Text>
                </DownLoadContent>
                }
            </DownloadContainer>
            {displayedTask && ACTIONS_BY_STATUS[displayedTask?.status]}
        </FormGrid>
    );
}

const DownloadContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    gap: 16px;
    align-items: center;
`;
const DownLoadContent = styled.a`
    display: block;
    width: max-content;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 4px;
    cursor: pointer;

    svg {
        width: 18px;
        height: 18px;
        fill: ${Color.BLUE};
    }
`;