import { TaskAcceptanceStep, setAcceptanceStep, setDetailsOpen, useSetTaskStatusMutation, useUserData } from "@freelancer/entities";
import { useAppSelector } from "../../../../store";
import { TaskStatus, UserStatus } from "@freelbee/entities";
import { useDispatch } from "react-redux";
import { ActionsContainer } from "./ActionsContainer";
import { Button, ButtonStyleEnum } from "@freelbee/shared/ui-kit";

export default function AssignedTaskActions () {

    const dispatch = useDispatch();
    const {displayedTask} = useAppSelector(state => state.taskSliceReducer);
    const [setTaskStatus] = useSetTaskStatusMutation();
    const [{userData}] = useUserData();

    const handleSetStatus = (status: TaskStatus) => {
        setTaskStatus({
            taskId: displayedTask!.id!,
            status
        }).unwrap().then(()=>{
            dispatch(setDetailsOpen(false));
        });
    };

    return (
        <ActionsContainer>
            <Button
                disabled={userData.status !== UserStatus.APPROVED}
                isWide
                onClick={() => {
                    dispatch(setAcceptanceStep(TaskAcceptanceStep.CONTRACT))
                }}>
                Next
            </Button>
            <Button
                disabled={userData.status !== UserStatus.APPROVED}
                onClick={()=> handleSetStatus(TaskStatus.CANCELLED)}
                isWide
                styleType={ButtonStyleEnum.ROUND_STROKE_WHITE}>
                Decline
            </Button>
        </ActionsContainer>
    );
}


