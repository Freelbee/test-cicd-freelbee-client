'use client';

import { CloseBtnSize, CloseButton, ModalWindow } from "@freelbee/features/common"
import { useQueryParamsNavigation } from "@freelbee/shared/hooks";
import { ModalQueryValue } from "@landing/entities";
import { Roles } from "./ui/Roles";
import { BORDER_RADIUS, Breakpoint, Color, Title2, mediaBreakpointDown } from "@freelbee/shared/ui-kit";
import styled from "styled-components";

export const RoleSelectionModal = () => {
    const [searchParams, navigateWithParam] = useQueryParamsNavigation();

    return (
        <ModalWindow
            isOpen={!!searchParams.get('modal')?.includes(ModalQueryValue.LOGIN)}
            onClose={() => navigateWithParam('modal', '')}>
                <Container>
                    <Header>
                     <Title2>Select your role</Title2>   
                     <CloseButton 
                        size={CloseBtnSize.L}
                        clickHandler={() => navigateWithParam('modal', '')} />
                    </Header>
                    
                    <Roles />
                </Container>
        </ModalWindow>
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 32px;
    padding: 32px;
    border-radius: ${BORDER_RADIUS.L};
    background-color: ${Color.WHITE};

    ${mediaBreakpointDown(Breakpoint.Medium)} {
        padding: 24px;
        gap: 24px;
    }

    ${mediaBreakpointDown(Breakpoint.xMobile)} {
        padding: 16px;
        width: 100%;
        max-width: 400px;
    }
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 32px;
`;