'use client';

import { css } from "styled-components";

import { Breakpoint, mediaBreakpointDown, vw, Text, Title1 } from "@freelbee/shared/ui-kit";
import { SectionTitle } from "@landing/shared";

export const Heading = () => (
    <SectionTitle>
        <Title1 $styles={titleStyles}>
            A budget-friendly way to automate payments to 10+ global contractors
        </Title1>
        <Text styles={subTitleStyles} font='body'>Contractor payment platform designed for CPA and marketing agencies</Text>
    </SectionTitle>

);

const titleStyles = css`
    max-width: 550px;

    ${mediaBreakpointDown(Breakpoint.xMedium)} {
        max-width: ${vw(543, Breakpoint.xMedium)};
    }

    ${mediaBreakpointDown(Breakpoint.Medium)} {
        max-width: ${vw(543, Breakpoint.Medium)};
    }

    ${mediaBreakpointDown(800)} {
        max-width: 100%;
    }
`;

const subTitleStyles = css`
    max-width: ${vw(373, Breakpoint.Large)};

    ${mediaBreakpointDown(Breakpoint.Medium)} {
        max-width: ${vw(343, Breakpoint.Medium)};
    }

    ${mediaBreakpointDown(800)} {
        max-width: 100%;
    }
`;
