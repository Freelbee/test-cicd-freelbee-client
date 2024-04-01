'use client';

import styled from "styled-components";
import { RoleCard } from "./RoleCard";
import companyImage from '@landing/assets/icons/roles/company.svg';
import freelancerImage from '@landing/assets/icons/roles/freelancer.svg';
import { Breakpoint, Color, mediaBreakpointDown } from "@freelbee/shared/ui-kit";

export const Roles = () => {
    return (
        <Container>
            <RoleCard 
                data-testid='company-login'
                url={process.env.NEXT_PUBLIC_COMPANY_URL ?? '/'} 
                icon={companyImage} 
                name={"Company"} />
            <RoleCard 
                data-testid='freelancer-login'
                color={Color.BLUE}
                url={process.env.NEXT_PUBLIC_FREELANCER_URL ?? '/'} 
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