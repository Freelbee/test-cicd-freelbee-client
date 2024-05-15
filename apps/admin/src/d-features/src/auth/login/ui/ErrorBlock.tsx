import { ReactNode } from 'react';
import styled from 'styled-components';
import { ColorType, Paragraph } from '@admin/shared';

type Props = {
  children: ReactNode
}

export function ErrorBlock(props: Props) {
  const { children } = props;

  return (
    <Container>
      <Paragraph color={ColorType.ERROR_COLOR}>{children}</Paragraph>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 15px;
  border-radius: 10px;
  background: #fff1f1;
  border: 1px solid #fad2d6;
`;
