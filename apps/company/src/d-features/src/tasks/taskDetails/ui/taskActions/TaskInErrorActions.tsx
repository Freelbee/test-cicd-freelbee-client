'use client';

import { Button, ButtonStyleEnum } from "@freelbee/shared/ui-kit";
import { ActionsContainer } from "./ActionsContainer";

export default function TaskInErrorActions () {

    return (
        <ActionsContainer>
            <Button
                // To - DO ???
                disabled
                isWide
                styleType={ButtonStyleEnum.GREEN}
                // isLoading={isLoading}
                // disabled={isLoading}
                // onClick={() => setTaskForPay(task)}
            >
                Repeat payment
            </Button>
            <Button 
                // To - DO ???
                disabled
                isWide 
                styleType={ButtonStyleEnum.ROUND_STROKE_WHITE}>
                Reject
            </Button>
        </ActionsContainer>
    );
}