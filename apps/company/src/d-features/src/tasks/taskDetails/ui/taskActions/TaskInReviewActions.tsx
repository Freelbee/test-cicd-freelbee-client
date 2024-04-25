'use client';

import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../../store";
import { setDetailsOpen, useGetCompanyCounterpartyQuery, useSetTaskStatusMutation } from "@company/entities";
import { CounterpartyStatus, TaskStatus } from "@freelbee/entities";
import { ActionsContainer } from "./ActionsContainer";
import { Button, ButtonStyleEnum } from "@freelbee/shared/ui-kit";

interface Props {
  isBoxChecked: boolean,
}

export default function TaskInReviewActions (props: Props) {
    const { isBoxChecked } = props;

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

    const isButtonApproveDisabled = !isBoxChecked || company?.counterpartyDetail.status !== CounterpartyStatus.APPROVED;
    const isButtonRefineDisabled = company?.counterpartyDetail.status !== CounterpartyStatus.APPROVED;

    return (
        <>
            <ActionsContainer>
                <Button
                    disabled={isButtonApproveDisabled}
                    isWide
                    styleType={ButtonStyleEnum.GREEN}
                    onClick={()=> handleSetStatus(TaskStatus.WAITING_FOR_PAYMENT)}
                >
                    Approve
                </Button>
                <Button
                    disabled={isButtonRefineDisabled}
                    onClick={()=> handleSetStatus(TaskStatus.IN_PROGRESS)}
                    isWide
                    styleType={ButtonStyleEnum.ROUND_STROKE_WHITE}
                >
                    To refine
                </Button>
            </ActionsContainer>
        </>
    );
}
