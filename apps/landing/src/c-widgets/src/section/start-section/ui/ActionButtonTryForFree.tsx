'use client';

import { ButtonStyleEnum, Button } from "@freelbee/shared/ui-kit";
import {useQueryParamsNavigation } from "@freelbee/shared/hooks";
import { ModalQueryValue } from "@landing/entities";
import styled from "styled-components";


export const ActionButtonTryForFree = () => {
    const [, navigateWithParam] = useQueryParamsNavigation();

    return (
        <ButtonWrapper>
            <Button
                data-testid="main-banner-btn-try-for-free"
                styleType={ButtonStyleEnum.ROUND_STROKE_WHITE}
                onClick={() => navigateWithParam('modal', ModalQueryValue.START)}
            >Try for Free</Button>
        </ButtonWrapper>
    );
};

const ButtonWrapper = styled.div`
    position: relative;
    z-index: 3;
`;
