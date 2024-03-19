'use client';

import Image from "next/image";
import styled from "styled-components";

import { Breakpoint, mediaBreakpointDown } from "@freelbee/shared/ui-kit";

import mapSrc from "@landing/assets/images/main/countries/map.png"

export const Map = () => (
    <ImageWrapper>
      <Image src={mapSrc} alt="map image" fill/>
    </ImageWrapper>
);

const ImageWrapper = styled.div`
  position: relative;
  width: 821px;
  height: 427px;

  ${mediaBreakpointDown(Breakpoint.xMedium)} {
    width: 801px;
    height: 407px;
  }

  ${mediaBreakpointDown(Breakpoint.Tablet)} {
    grid-column: 1/3;
  }

  ${mediaBreakpointDown(Breakpoint.xMobile)} {
    left: -10%;
  }

  ${mediaBreakpointDown(440)} {
    left: -25%;
  }
`;


