'use client';

import Image from 'next/image';
import styled from 'styled-components';

import image from '@landing/assets/images/404.svg';

import { Breakpoint, mediaBreakpointDown, vw } from '@freelbee/shared/ui-kit';

export const NotFoundImage = () => (
    <ImageWrapper>
        <Image src={image} alt='404 picture' fill/>
    </ImageWrapper>  
);

const ImageWrapper = styled.div`
    position: relative;
    max-width: 458px;
    min-width: 280px;
    max-height: 384px;
    min-height: 235px;
    width: ${vw(458, Breakpoint.Large)};
    height: ${vw(384, Breakpoint.Large)};

    ${mediaBreakpointDown(Breakpoint.Medium)} {
        width: ${vw(400, Breakpoint.Large)};
        height: ${vw(366, Breakpoint.Large)};
    }

    ${mediaBreakpointDown(Breakpoint.xMobile)} {
        width: 100%;
        margin: auto;
    }
`;