'use client';

import { Breakpoint, Color, Text, mediaBreakpointDown } from '@freelbee/shared/ui-kit';
import styled from 'styled-components';

export const FooterBottom = () => {
  return (
    <Container>
        <Text align='center' font='bodySmall' color={Color.GRAY_500}>
            {`Freelbee ©${new Date().getFullYear()}. All rights reserved`}
        </Text>
    </Container>
  )
}

const Container = styled.div`
  padding: 32px 0;
  background: ${Color.GRAY_900};
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;

  ${mediaBreakpointDown(Breakpoint.Medium)} {
    padding: 24px 0;
  }

  ${mediaBreakpointDown(Breakpoint.xMobile)} {
    padding: 16px 0;
  }
`;
