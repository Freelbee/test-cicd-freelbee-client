'use client';

import { useQueryParamsNavigation } from "@freelbee/shared/hooks";
import {  ButtonStyleEnum, IconPosition, } from "@freelbee/shared/ui-kit";
import { ModalQueryValue, SectionId } from "@landing/entities";
import { Button } from "@freelbee/shared/ui-kit";

export const ActionButton = () => {
    const [, navigateWithParam] = useQueryParamsNavigation();

    return (
        <Button
            onClick={() => navigateWithParam('modal', ModalQueryValue.APPLICATION + SectionId.TABLE)}
            iconPosition={IconPosition.RIGHT}
            styleType={ButtonStyleEnum.GREEN}
        >
            Book a demo
        </Button>
    );
};
