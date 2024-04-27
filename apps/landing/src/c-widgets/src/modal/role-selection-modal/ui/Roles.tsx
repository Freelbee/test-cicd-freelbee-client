'use client';

import styled from "styled-components";
import { RoleCard } from "./RoleCard";
import companyImage from '@landing/assets/icons/roles/company.svg';
import freelancerImage from '@landing/assets/icons/roles/freelancer.svg';
import { Breakpoint, Color, mediaBreakpointDown } from "@freelbee/shared/ui-kit";
import { ModalQueryValue } from "@landing/entities";
import { useEffect } from 'react';

interface Props {
    modal: ModalQueryValue;
}

export const Roles = ({modal}: Props) => {

    const getPath = () => modal === ModalQueryValue.START ? '/?authState=start' : '/';

  useEffect(() => {
    console.log("process.env.NEXT_PUBLIC_FREELANCER_URL, process.env.NEXT_PUBLIC_COMPANY_URL")
    console.log(process.env.NEXT_PUBLIC_FREELANCER_URL, process.env.NEXT_PUBLIC_COMPANY_URL)
  }, []);

    return (
        <Container>
            <RoleCard
                data-testid='company-login'
                url={process.env.NEXT_PUBLIC_COMPANY_URL + getPath()}
                icon={companyImage}
                name={"Company"} />
            <RoleCard
                data-testid='freelancer-login'
                color={Color.BLUE}
                url={process.env.NEXT_PUBLIC_FREELANCER_URL + getPath()}
                icon={freelancerImage}
                name={"Freelancer"} />
        </Container>
        )
}

const Container = styled.div`
    display: flex;
    gap: 32px;

    ${mediaBreakpointDown(Breakpoint.Medium)} {
        gap: 24px;
    }

    ${mediaBreakpointDown(Breakpoint.xMobile)} {
        gap: 16px;
        flex-direction: column;
    }
`;
