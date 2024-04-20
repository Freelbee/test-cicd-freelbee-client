'use client';

import { useQueryParamsNavigation } from "@freelbee/shared/hooks";
import { CloseBtnSize, CloseButton,  } from "@freelbee/shared/ui-kit";

export const CloseModalButton = () => {
    const [ , navigateWithParam] = useQueryParamsNavigation();

    return (
        <CloseButton
            clickHandler={() => navigateWithParam('modal', '')}
            size={CloseBtnSize.L}
            style={{
                position: 'absolute',
                top: '16px',
                right: '16px'
            }} />
    );
};
