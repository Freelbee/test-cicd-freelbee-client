'use client';

import Image from "next/image";
import styled from "styled-components";

import { Breakpoint, mediaBreakpointDown, vw } from "@freelbee/shared/ui-kit";
import personSrc from "@landing/assets/images/main/start-section/person.svg";

export const BannerImage = () => (
    <ImageContainer>
        <Image priority src={personSrc} alt='person image' fill/>
    </ImageContainer>
);

const ImageContainer = styled.div`
    position: relative;
    flex-shrink: 0;
    width: ${vw(640, Breakpoint.Large)};
    width: 665px;
    height: 477px;

    ${mediaBreakpointDown(Breakpoint.Large)} {
        width: ${vw(665, Breakpoint.Large)};
        height: ${vw(477, Breakpoint.Large)};
        margin-right: -${vw(64, Breakpoint.xMedium)};
    }

    ${mediaBreakpointDown(Breakpoint.xMedium)} {
        width: ${vw(665, Breakpoint.xMedium)};
        height: ${vw(477, Breakpoint.xMedium)};
        margin-right: -${vw(84, Breakpoint.xMedium)};
    }

    ${mediaBreakpointDown(Breakpoint.Medium)} {
        width: ${vw(636, Breakpoint.Medium)};
        height: ${vw(456, Breakpoint.Medium)};
        margin-right: -${vw(114, Breakpoint.Medium)};
    }

    ${mediaBreakpointDown(800)} {
        width: 665px;
        height: 477px;
        margin-right: -80px;
        margin-top: 10px;
    }

    ${mediaBreakpointDown(Breakpoint.xMobile)} {
        width: 550px;
        height: 394px;
        margin-right: 0;
    }
`;