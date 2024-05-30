'use client';

import {ReactComponent as AttentionIcon} from "@freelbee/assets/icons/alert-icons/alert_icon.svg";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../../store";
import { setDetailsOpen, useGetTaskFilesQuery, useSetTaskStatusMutation, useUpdateTaskFilesMutation } from "@freelancer/entities";
import { Button, ButtonStyleEnum, Color, FileData, FileLoader, InfoWithIcon } from "@freelbee/shared/ui-kit";
import { FormGrid } from "../FormGrid";
import { ActionsContainer } from "./ActionsContainer";
import { TaskStatus } from "@freelbee/entities";
import { skipToken } from "@reduxjs/toolkit/query";
import { useState } from "react";
import { css } from "styled-components";

export default function TaskInProgressActions () {

    const dispatch = useDispatch();
    const {displayedTask} = useAppSelector(state => state.taskSliceReducer);
    const [setTaskStatus, {isLoading: statusLoading}] = useSetTaskStatusMutation();
    const [updateTaskFiles, {isLoading}] = useUpdateTaskFilesMutation();
    const [attachedFiles, setAttachedFiles] = useState<Array<FileData>>([]);
    const {refetch} = useGetTaskFilesQuery(displayedTask?.taskId ?? skipToken);

    const cancelActions = () => {
        setAttachedFiles([]);
    };

    const upLoadFiles = () => {
        if(!displayedTask) return;

        const formData = new FormData();
        attachedFiles.forEach(fileData => formData.append('addFiles', fileData.file));

        updateTaskFiles({
            taskId: displayedTask?.taskId,
            files: formData
        }).unwrap()
        .then(() => {
            setAttachedFiles([]);
            refetch();
        });
    };

    const hasActionsForUpload = () => {
        return attachedFiles.length !== 0;
    }

    const onSetStatus = () => {
        if(!displayedTask) return;

        setTaskStatus({
            taskId: displayedTask.taskId,
            status: TaskStatus.REVIEWING
        }).unwrap().then(()=>{
            dispatch(setDetailsOpen(false));
        });
    };

    return (
        <FormGrid>
            <FileLoader
                label={'Attach files'}
                files={attachedFiles ?? []}
                setFiles={setAttachedFiles}
                fileContainerStyles={[css`max-height: 250px;`]}
                text={'Attach a file'}
                maxSizeText={'Max. file size: 15 MB'}
                borderColor={attachedFiles.length === 0 ? undefined : attachedFiles.some(file => file.isError) ? Color.DANGER : Color.EMERALD}
            />
            <InfoWithIcon
                textColor={Color.BLUE}
                align='flex-start'
                Icon={AttentionIcon}>
                    Once you save your changes, you will not be able to delete the files you just added
                </InfoWithIcon>
            <ActionsContainer>
                {!hasActionsForUpload() && <Button
                        isLoading={statusLoading}
                        disabled={statusLoading}
                        onClick={onSetStatus}
                        isWide>
                        To check
                    </Button>}
                {hasActionsForUpload() && <Button
                        isLoading={isLoading}
                        disabled={isLoading}
                        onClick={upLoadFiles}
                        isWide>
                        Save
                    </Button>}

                {hasActionsForUpload() && <Button
                    disabled={isLoading}
                    onClick={cancelActions}
                    isWide styleType={ButtonStyleEnum.ROUND_STROKE_WHITE}>
                    Cancel actions
                </Button>}
            </ActionsContainer>
        </FormGrid>
    );
}
