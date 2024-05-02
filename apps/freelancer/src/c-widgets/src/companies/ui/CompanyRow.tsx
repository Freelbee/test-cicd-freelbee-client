'use client';

import { FreelancerCompanyDto, UserBadge } from "@freelancer/entities";
import { Breakpoint, Color, mediaBreakpointDown, LinkButton } from "@freelbee/shared/ui-kit";
import styled, { css } from "styled-components";

interface Props {
    company: FreelancerCompanyDto;
}

export const CompanyRow = ({company}: Props) => {
  return (
    <Container>
        <UserBadge 
            name={company.name}
            avatarContent={company.name[0]}
            status={company.status}        
        />
        <LinkButton styles={css`max-width: fit-content;`} as='a' href={`mailto: ${company.email}`}>{company.email}</LinkButton>
    </Container>
  )
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 16px;
    gap: 16px;

    ${mediaBreakpointDown(Breakpoint.xMobile)} {
        gap: 8px;
        grid-template-columns: 1fr;
        border: 1px solid ${Color.GRAY_400};
        border-radius: 16px;

        &:not(:last-child) {
            margin-bottom: 16px;
        }
    }
`;