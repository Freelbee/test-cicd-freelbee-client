'use client';

import Image from 'next/image';
import styled from 'styled-components';

import { TextContent } from './ui/TextContent';
import { SectionId } from '@landing/entities';
import { BaseSectionBlock } from '@landing/shared';
import { Breakpoint, Color, mediaBreakpointDown, vw } from '@freelbee/shared/ui-kit';


import personSrc from "@landing/assets/images/main/inside/person.svg"

export const InsideSection = () => (
    <BaseSectionBlock id={SectionId.INSIDE}>
        <Container>
            <TextContent />

            <ImageWrapper>
                <Image src={personSrc} alt='person image' fill />
            </ImageWrapper>
        </Container>
    </BaseSectionBlock>
);

const Container = styled.div`
  padding: 54px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  max-height: 468px;
  background-color: ${Color.WHITE};

  ${mediaBreakpointDown(Breakpoint.Tablet)} {
    flex-direction: column;
    gap: ${vw(60, Breakpoint.Tablet)};
    padding: 48px;
    padding-bottom: 32px;
    max-height: unset;
  }

  ${mediaBreakpointDown(Breakpoint.xMobile)} {
    padding: 16px;
    padding-bottom: 8px;
  }
`;


const ImageWrapper = styled.div`
    position: relative;
    top: -10%;
    max-width: 502px;
    max-height: 568px;
    flex-shrink: 0;
    width: ${vw(492, Breakpoint.Large)};
    height: ${vw(568, Breakpoint.Large)};

    ${mediaBreakpointDown(Breakpoint.Tablet)} {
      width: ${vw(472, Breakpoint.Tablet)};
      height: ${vw(538, Breakpoint.Tablet)};
    }
`;
