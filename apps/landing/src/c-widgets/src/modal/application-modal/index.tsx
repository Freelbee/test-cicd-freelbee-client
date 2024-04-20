'use client';

import { ModalWindow } from "@freelbee/shared/ui-kit";
import { useQueryParamsNavigation } from "@freelbee/shared/hooks";
import { FormBlock } from "./ui/FormBlock";
import { ModalQueryValue } from "@landing/entities";

export const ApplicationModal = () => {
    const [searchParams, navigateWithParam] = useQueryParamsNavigation();

    return (
        <ModalWindow
            isOpen={!!searchParams.get('modal')?.includes(ModalQueryValue.APPLICATION)}
            onClose={() => navigateWithParam('modal', '')}>
            <FormBlock  />
        </ModalWindow>
    );
};
