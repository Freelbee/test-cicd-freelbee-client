'use client';

import { useQueryParamsNavigation } from "@freelbee/shared/hooks";
import { ButtonStyleEnum, IconPosition, } from "@freelbee/shared/ui-kit";
import {Button} from "@freelbee/shared/ui-kit";
import { ModalQueryValue, SectionId } from "@landing/entities";

export const ActionButton = () => {
    const [, navigateWithParam] = useQueryParamsNavigation();

    return (
        <Button
            onClick={() => navigateWithParam('modal', ModalQueryValue.APPLICATION + SectionId.BENEFITS)}
            iconPosition={IconPosition.RIGHT}
            styleType={ButtonStyleEnum.GREEN}
        >
            Solve by one click
        </Button>
    );
};
