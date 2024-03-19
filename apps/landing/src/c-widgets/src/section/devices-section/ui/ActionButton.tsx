'use client';

import {  useQueryParamsNavigation } from "@freelbee/shared/hooks";
import {  Breakpoint, ButtonStyleEnum } from "@freelbee/shared/ui-kit";
import { ModalQueryValue, SectionId } from "@landing/entities";
import { Button } from '@freelbee/features/common';


export const ActionButton = () => {
    const [, navigateWithParam] = useQueryParamsNavigation();

    return (
        <Button
            wideOnBreakPoint={Breakpoint.Tablet}
            styleType={ButtonStyleEnum.GREEN}
            onClick={() => navigateWithParam('modal', ModalQueryValue.APPLICATION + SectionId.DEVICES)}
        >Join us now</Button>
    );
};
