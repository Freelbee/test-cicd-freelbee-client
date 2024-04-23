'use client';

import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../../store";
import { setDetailsOpen, useGetCompanyQuery, useSetTaskStatusMutation } from "@company/entities";
import { CounterpartyStatus, TaskStatus } from "@freelbee/entities";
import { ActionsContainer } from "./ActionsContainer";
import { Button, ButtonStyleEnum } from "@freelbee/shared/ui-kit";

export default function TaskInReviewActions () {
    
    const dispatch = useDispatch();
    const {displayedTask} = useAppSelector(state => state.taskSliceReducer);
    const [setTaskStatus] = useSetTaskStatusMutation();
    const {data: company} = useGetCompanyQuery();

    const handleSetStatus = (status: TaskStatus) => {
        if(!displayedTask) return;

        setTaskStatus({
            taskId: displayedTask.id,
            status
        }).unwrap().then(()=>{
            dispatch(setDetailsOpen(false));
        });
    };

    return (
        <>
            <ActionsContainer>
                <Button
                    disabled={company?.status !== CounterpartyStatus.APPROVED}
                    isWide
                    styleType={ButtonStyleEnum.GREEN}
                    // to - DO - payment
                    onClick={() => {}}
                >
                    Approve and pay
                </Button>
                <Button
                    disabled={company?.status !== CounterpartyStatus.APPROVED}
                    onClick={()=> handleSetStatus(TaskStatus.IN_PROGRESS)}
                    isWide
                    styleType={ButtonStyleEnum.ROUND_STROKE_WHITE}>
                    To refine
                </Button>
            </ActionsContainer>
        </>
    );
}
