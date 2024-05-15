import React from 'react';
import styled from 'styled-components';
import { Paragraph } from '@admin/shared';
import { ColorType } from '@admin/shared';

type Props = {
  label?: string,
  underLabel?: string,
  children: React.ReactNode
}

export function DocumentField(props: Props) {
  const { label, underLabel, children } = props;

  return (
    <Container>
      {label && <Paragraph color={ColorType.GREY_COLOR}>{label}</Paragraph>}
      <Content>{children}</Content>
      {underLabel && <Paragraph color={ColorType.GREY_COLOR}>{underLabel}</Paragraph>}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
`;
