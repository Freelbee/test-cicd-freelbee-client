import React from 'react';
import styled from 'styled-components';

type Props = {
  children: React.ReactNode
}

export function Document(props: Props) {
  const { children } = props;

  return (
    <Container>
      {children}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 25px;
`;
