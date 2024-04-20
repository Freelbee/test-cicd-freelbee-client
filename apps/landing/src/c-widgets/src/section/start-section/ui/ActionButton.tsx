'use client';

import { ButtonStyleEnum, Button } from "@freelbee/shared/ui-kit";
import {useQueryParamsNavigation } from "@freelbee/shared/hooks";
import { ModalQueryValue, SectionId } from "@landing/entities";
import styled from "styled-components";


export const ActionButton = () => {
    const [, navigateWithParam] = useQueryParamsNavigation();

    return (
        <ButtonWrapper>
            <Button
                data-testid="main-banner-btn"
                styleType={ButtonStyleEnum.GREEN}
                onClick={() => navigateWithParam('modal', ModalQueryValue.APPLICATION + SectionId.MAIN_BANNER)}
            >Book a demo</Button>
        </ButtonWrapper>
    );
};

const ButtonWrapper = styled.div`
    position: relative;
    z-index: 3;
`;
