'use client';

import { Text } from '@freelbee/shared/ui-kit';
import { Breakpoint, mediaBreakpointDown } from '@freelbee/shared/ui-kit';
import { HTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  text: string;
}

export const PageTitle = (props: Props) => {
  const { children, text, ...rest } = props;

  return (
    <Container {...rest}>
      <Text font="heading1">{text}</Text>
      {children}
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${mediaBreakpointDown(Breakpoint.xMobile)} {
    margin-bottom: 16px;
  }
`;
