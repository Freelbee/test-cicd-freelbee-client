'use client';

import {ReactComponent as AttentionIcon} from "@freelbee/assets/icons/alert-icons/alert_icon.svg";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../../store";
import { setDetailsOpen, useGetTaskFilesQuery, useSetTaskStatusMutation } from "@freelancer/entities";
import { Button, ButtonStyleEnum, InfoWithIcon } from "@freelbee/shared/ui-kit";
import { FormGrid } from "../FormGrid";
import { ActionsContainer } from "./ActionsContainer";
import { FileAction, NewFile, TaskStatus } from "@freelbee/entities";
import { skipToken } from "@reduxjs/toolkit/query";
import { useState } from "react";

export default function TaskInProgressActions () {

    const dispatch = useDispatch();
    const {displayedTask} = useAppSelector(state => state.taskSliceReducer);
    const [setTaskStatus] = useSetTaskStatusMutation();

    const [newFiles, setNewFiles] = useState<Array<NewFile>>([]);
    const {data: files, refetch} = useGetTaskFilesQuery(displayedTask?.id ?? skipToken);
    const [loading, setLoading] = useState<boolean>(false);

    const cancelActions = () => {
        setNewFiles([]);
        refetch();
    };

    const upLoadFiles = () => {
        // if(!displayedTask || loading) {
        //     return;
        // }
        setLoading(true);
        // const body: UploadTaskFilesRequest = {
        //     addFiles: newFiles.map(file => ({
        //         name: file.name,
        //         payload: file.payload.replace(/^[^,]*,/, ''),
        //     })),
        //     deleteFileIds: files.filter(file => file.action === FileAction.DELETE && file.canRemove).map(file => file.file.id),
        // };

        // taskApiService.putFilesByTaskId(displayedTask.id, body)
        //     .then((response) => {
        //         if(response.isSuccess()) {
        //             setFiles(prev => [...prev, ...response.getData()].filter(file => !body.deleteFileIds.includes(file.file.id)));
        //             setNewFiles([]);
        //         }
        //     })
        //     .finally(() => setLoading(false));

        refetch();
    };

    const hasActionsForUpload = () => {
        return newFiles.length !== 0 
            || files?.filter(file => file?.action === FileAction.DELETE 
            && file.canRemove).map(file => file?.id).length !== 0
    } 

    const onSetStatus = () => {
        setTaskStatus({
            taskId: displayedTask!.id!,
            status: TaskStatus.REVIEWING
        }).unwrap().then(()=>{
            dispatch(setDetailsOpen(false));
        });
    };

    return (
        <FormGrid>
            <InfoWithIcon
                align='flex-start'
                Icon={AttentionIcon}>
                    After you submit the task for review, you will not be able to delete the newly added files
                </InfoWithIcon>
            <ActionsContainer>
                {
                    !hasActionsForUpload() && <Button
                        isLoading={loading}
                        disabled={loading}
                        onClick={onSetStatus}
                        isWide>
                        To check
                    </Button>
                }
                {
                    hasActionsForUpload() && <Button
                        isLoading={loading}
                        disabled={loading}
                        onClick={upLoadFiles}
                        isWide
                    >
                        Save
                    </Button>
                }

                { hasActionsForUpload() && <Button
                    isLoading={loading}
                    disabled={loading}
                    onClick={cancelActions}
                    isWide styleType={ButtonStyleEnum.ROUND_STROKE_WHITE}>
                    Cancel actions
                </Button>}
            </ActionsContainer>
        </FormGrid>
    );
}