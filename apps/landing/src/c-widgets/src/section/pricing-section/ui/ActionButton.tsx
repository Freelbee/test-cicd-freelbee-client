'use client';

import { ButtonStyleEnum, IconPosition } from '@freelbee/shared/ui-kit';
import { useQueryParamsNavigation} from "@freelbee/shared/hooks";
import { ModalQueryValue, SectionId } from '@landing/entities';
import { Button } from '@freelbee/features/common';
// import { ReactComponent as ArrIcon} from '@public/ui-kit/arrow-icons/long_arrow.svg';

export const ActionButton = () => {
    const [, navigateWithParam] = useQueryParamsNavigation();

    return (
        <Button
            onClick={() => navigateWithParam('modal', ModalQueryValue.APPLICATION + SectionId.PRICING)}
            isWide
            // Icon={<ArrIcon/>}
            iconPosition={IconPosition.RIGHT}
            styleType={ButtonStyleEnum.GREEN}
        >
                Try now
        </Button>
    );
};
