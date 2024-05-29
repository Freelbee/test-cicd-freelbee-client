'use client';

import { CloseBtnSize, CloseButton, ModalWindow, Text } from "@freelbee/shared/ui-kit";
import { useQueryParamsNavigation } from "@freelbee/shared/hooks";
import { ModalQueryValue } from "@landing/entities";
import { Roles } from "./ui/Roles";
import { BORDER_RADIUS, Breakpoint, Color, Title2, mediaBreakpointDown } from "@freelbee/shared/ui-kit";
import styled from "styled-components";
import { useEffect, useState } from "react";

export const RoleSelectionModal = () => {
    const [searchParams, navigateWithParam] = useQueryParamsNavigation();

    const getOpened = () => {
        return !!(searchParams.get('modal')?.includes(ModalQueryValue.LOGIN) ||
        searchParams.get('modal')?.includes(ModalQueryValue.START));
    };

    const [headerValue, setHeaderValue] = useState('');

    useEffect(() => {
        if (searchParams.get('modal')?.includes(ModalQueryValue.LOGIN)) {
            setHeaderValue(`Sign in `);
        } else if (searchParams.get('modal')?.includes(ModalQueryValue.START)) {
            setHeaderValue(`Sign up `);
        }
    }, [searchParams])

    return (
        <ModalWindow
            isOpen={getOpened()}
            onClose={() => navigateWithParam('modal', '')}>
                <Container>
                    <MainHeader>
                        <Header>
                            <Title2>
                                {headerValue}
                            </Title2>
                            <CloseButton 
                            size={CloseBtnSize.L}
                            clickHandler={() => navigateWithParam('modal', '')} />
                        </Header>
                        <Text font="body">Select your role</Text>
                    </MainHeader>
                    <Roles modal={searchParams.get('modal') as ModalQueryValue} />
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

const MainHeader = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;