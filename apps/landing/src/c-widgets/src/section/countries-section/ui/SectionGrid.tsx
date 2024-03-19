'use client';

import { PropsWithChildren } from 'react';
import styled from 'styled-components';

import { Breakpoint, mediaBreakpointDown } from '@freelbee/shared/ui-kit';

export const SectionGrid = ({children}: PropsWithChildren) => (
    <Grid>{children}</Grid>
);

const Grid = styled.div`
  display: grid;
  gap: 32px;
  grid-template-columns: 300px 0.75fr;

  ${mediaBreakpointDown(Breakpoint.xMedium)} {
    grid-template-columns: 220px 0.75fr;
  }

  ${mediaBreakpointDown(Breakpoint.Medium)} {
    gap: 16px;
  }

  ${mediaBreakpointDown(Breakpoint.Tablet)} {
    grid-template-columns: 100% 0.75fr;
  }
`;
