'use client';

import Image from "next/image";
import styled from "styled-components";

import { Breakpoint, mediaBreakpointDown, vw, Color, Heading1 } from "@freelbee/shared/ui-kit";

interface Props {
    image: string,
    title: string | JSX.Element
}

export const Card = ({image, title}:Props) => (
    <CardContainer>
        <Heading1 as='span'>{title}</Heading1>
        <ImageWrapper>
            <Image fill src={image} alt='industry image' />
        </ImageWrapper>
    </CardContainer>
);

const CardContainer = styled.div`
    padding: 50px;
    border-radius: 20px;
    background-color: ${Color.WHITE};
    position: relative;
    min-height: 220px;
    overflow: hidden;

    ${mediaBreakpointDown(Breakpoint.Large)} {
        padding: ${vw(50, Breakpoint.Large)};
    }

    ${mediaBreakpointDown(Breakpoint.Tablet)} {
        padding: 32px;
        min-height: ${vw(302, Breakpoint.Tablet)};
    }

    ${mediaBreakpointDown(Breakpoint.Tablet)} {
        padding: 24px;
        min-height: 302px;
    }

    span {
        position: relative;
        z-index: 2;
        background-color: ${Color.GRAY_200};
        border-radius: 0.4em;
        padding: 0.2em;
    }
`;

const ImageWrapper = styled.div`
    position: absolute;
    inset: 0;
    margin: auto;

    img {
        object-fit: contain;
        object-position: right bottom;
    }

    ${mediaBreakpointDown(Breakpoint.xMobile)} {
        img {
            object-fit: cover;
            top: auto !important;
            left: auto !important;
        }
    }
`;
