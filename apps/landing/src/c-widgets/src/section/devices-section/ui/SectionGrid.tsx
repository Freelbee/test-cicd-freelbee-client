'use client';

import { PropsWithChildren } from 'react';
import styled from 'styled-components';

import { Breakpoint, mediaBreakpointDown, vw } from '@freelbee/shared/ui-kit';

export const SectionGrid = ({children}: PropsWithChildren) => (
    <Grid>{children}</Grid>
);

const Grid = styled.div`
  display: grid;
  gap: 32px;
  grid-template-columns: 500px auto;

  ${mediaBreakpointDown(Breakpoint.Large)} {
    grid-template-columns: ${vw(500, Breakpoint.Large)} auto;
  }

  ${mediaBreakpointDown(Breakpoint.Tablet)} {
    grid-template-columns: 1fr;
    place-items: center;
    text-align: center;
  }
`;
