'use client';

import styled from "styled-components";

import { Breakpoint, mediaBreakpointDown, vw } from "@freelbee/shared/ui-kit";

export const BaseSectionBlock = styled.section`
    width: 100%;
    max-width: 1440px;
    margin: 0 auto;
    padding-top: 100px;
    padding-right: ${vw(76, Breakpoint.Large)};
    padding-left: ${vw(76, Breakpoint.Large)};

    &:last-child{
        padding-bottom: 100px;
    }

    ${mediaBreakpointDown(Breakpoint.Large)} {
        padding-top: ${vw(100, Breakpoint.Large)};

        &:last-child{
            padding-bottom: ${vw(100, Breakpoint.Large)};
        }
    }

    ${mediaBreakpointDown(Breakpoint.xMedium)} {
        padding-right: ${vw(76, Breakpoint.xMedium)};
        padding-left: ${vw(76, Breakpoint.xMedium)};
        padding-top: ${vw(90, Breakpoint.xMedium)};

        &:last-child{
            padding-bottom: ${vw(90, Breakpoint.xMedium)};
        }
    }

    ${mediaBreakpointDown(Breakpoint.Medium)} {
        padding-right: ${vw(40, Breakpoint.Medium)};
        padding-left: ${vw(40, Breakpoint.Medium)};
        padding-top: ${vw(70, Breakpoint.Medium)};

        &:last-child{
            padding-bottom: ${vw(70, Breakpoint.Medium)};
        }
    }

    ${mediaBreakpointDown(Breakpoint.xMobile)} {
        padding-right: ${vw(20, Breakpoint.xMobile)};
        padding-left: ${vw(20, Breakpoint.xMobile)};
        padding-top: ${vw(50, Breakpoint.xMobile)};

        &:last-child{
            padding-bottom: ${vw(50, Breakpoint.xMobile)};
        }
    }
`;
