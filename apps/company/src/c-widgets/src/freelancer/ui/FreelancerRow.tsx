'use client';

import { CompanyFreelancerDto } from "@company/entities";
import { LinkButton } from "@freelbee/features/common";
import { Breakpoint, Color, Text, mediaBreakpointDown } from "@freelbee/shared/ui-kit";
import styled from "styled-components";

interface Props {
    freelancer: CompanyFreelancerDto;
}

export const FreelancerRow = ({freelancer}: Props) => {
  return (
    <Container>
        <Text font='bodyMedium'>{freelancer.firstName + ' ' + freelancer.lastName}</Text>
        <LinkButton as='a' href={`mailto: ${freelancer.email}`}>{freelancer.email}</LinkButton>
        <LinkButton as='a' href={`tel: ${freelancer.phone}`}>{freelancer.phone}</LinkButton>
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