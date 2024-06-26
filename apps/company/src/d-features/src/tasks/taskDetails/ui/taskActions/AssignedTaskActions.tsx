'use client';

import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../../store";
import { setDetailsOpen, useGetCompanyCounterpartyQuery, useSetTaskStatusMutation } from "@company/entities";
import { CounterpartyDetailsStatus, TaskStatus } from "@freelbee/entities";
import { ActionsContainer } from "./ActionsContainer";
import { Button, ButtonStyleEnum } from "@freelbee/shared/ui-kit";

export default function AssignedTaskActions () {

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
        <ActionsContainer>
            <Button
                disabled={company?.counterpartyDetail.status !== CounterpartyDetailsStatus.APPROVED}
                onClick={()=> handleSetStatus(TaskStatus.CANCELLED)}
                isWide styleType={ButtonStyleEnum.ROUND_STROKE_WHITE}>
                Cancel task
            </Button>
        </ActionsContainer>
    );
}
