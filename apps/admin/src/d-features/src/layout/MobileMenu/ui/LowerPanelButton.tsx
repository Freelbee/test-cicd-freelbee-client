'use client';

import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import { Color, typography } from '@freelbee/shared/ui-kit';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon: any;
  text: string;
  isActive?: boolean;
}

export const LowerPanelButton = ({ Icon, text, isActive = false, ...rest }: Props) => {
  return (
    <PanelButton {...rest}>
      <ControlPanelIcon $isActive={isActive}><Icon /></ControlPanelIcon>
      <LowerPanelText $isSelected={isActive}>{text}</LowerPanelText>
    </PanelButton>
  );
};

const PanelButton = styled.button`
  display: grid;
  grid-template-rows: 26px max-content;
  align-content: center;
  align-items: center;
  justify-content: center;
  justify-items: center;
  grid-gap: 2px;
`;

const LowerPanelText = styled.div<{ $isSelected: boolean }>`
  ${typography.default};
  font-size: 10px;
  line-height: 140%;
  text-align: center;
  color: ${({ $isSelected }) => $isSelected ? Color.GRAY_900 : Color.GRAY_700};
`;

const ControlPanelIcon = styled.span<{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 26px;
    height: 26px;
    stroke: ${({ $isActive }) => $isActive ? Color.GRAY_800 : Color.GRAY_600};
  }
`;
