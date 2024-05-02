'use client';

import { CompanyFreelancerDto, UserBadge } from "@company/entities";
import { LinkButton } from "@freelbee/shared/ui-kit";
import { Breakpoint, Color, mediaBreakpointDown } from "@freelbee/shared/ui-kit";
import styled, { css } from "styled-components";

interface Props {
    freelancer: CompanyFreelancerDto;
}

export const FreelancerRow = ({freelancer}: Props) => {
  return (
    <Container>
        <UserBadge 
            name={freelancer.firstName ? freelancer.firstName + ' ' + freelancer.lastName : 'Invited'}
            avatarContent={ freelancer.firstName && freelancer.firstName[0] + freelancer.lastName[0]}
            status={freelancer.status}        
            style={{cursor: 'default'}}
        />
        <LinkButton styles={css`max-width: fit-content;`} as='a' href={`mailto: ${freelancer.email}`}>{freelancer.email}</LinkButton>
        <LinkButton styles={css`max-width: fit-content;`} as='a' href={`tel: ${freelancer.phone}`}>{freelancer.phone}</LinkButton>
    </Container>
  )
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
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