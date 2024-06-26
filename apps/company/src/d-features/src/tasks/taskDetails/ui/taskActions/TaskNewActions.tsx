'use client';

import { setDetailsOpen, useGetCompanyCounterpartyQuery, useSetTaskStatusMutation } from "@company/entities";
import { CounterpartyDetailsStatus, TaskStatus } from "@freelbee/entities";
import { useAppSelector } from "../../../../store";
import { useDispatch } from "react-redux";
import { ActionsContainer } from "./ActionsContainer";
import { Button, ButtonStyleEnum } from "@freelbee/shared/ui-kit";

export default function TaskNewActions () {

    const dispatch = useDispatch();
    const {displayedTask} = useAppSelector(state => state.taskSliceReducer);
    const [setTaskStatus] = useSetTaskStatusMutation();
    const {data: company} = useGetCompanyCounterpartyQuery();

    const handleSetStatus = (status: TaskStatus) => {
        if(!displayedTask) return;

        setTaskStatus({
            taskId: displayedTask.taskId,
            status
        }).unwrap().then(()=>{
            dispatch(setDetailsOpen(false));
        });
    };

    return (
        <>
            <ActionsContainer>
                <Button
                    disabled={company?.counterpartyDetail.status !== CounterpartyDetailsStatus.APPROVED}
                    isWide
                    onClick={()=> handleSetStatus(TaskStatus.ASSIGNED)}
                >
                    Assign
                </Button>
                <Button
                    onClick={()=> handleSetStatus(TaskStatus.CANCELLED)}
                    isWide
                    styleType={ButtonStyleEnum.ROUND_STROKE_WHITE}>
                    Cancel
                </Button>
            </ActionsContainer>
        </>
    );
}
