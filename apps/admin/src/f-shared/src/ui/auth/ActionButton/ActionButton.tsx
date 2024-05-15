import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { LoadingIconWhite } from '../LoadingIcon/LoadingIconWhite';
import { LoadingIconBlack } from '../LoadingIcon/LoadingIconBlack';
import { ColorType } from '../../../utils/ColorType';

export enum ActionButtonType {
  Black,
  White
}

export enum ActionButtonSize {
  Large,
  Middle,
  Small
}

type Props = {
  onClick: () => void;
  className?: string,
  children: string | ReactNode,
  loading?: boolean,
  disabled?: boolean,
  type?: ActionButtonType,
  size?: ActionButtonSize,
  fullWidth?: boolean,

  background?: ColorType,

  padding?: number
} & React.HTMLAttributes<HTMLButtonElement>;

export function ActionButton(props: Props) {
  const {
    onClick,
    children,
    loading = false,
    disabled = false,
    type = ActionButtonType.Black,
    size = ActionButtonSize.Large,
    fullWidth = false,
    background = ColorType.BLACK_COLOR,
    padding = 15
  } = props;

  return (
    <Container
      padding={padding}
      background={background}
      fullWidth={fullWidth}
      onClick={onClick}
      tabIndex={7}
      disabled={loading || disabled}>
      <Text hide={loading}>
        {children}
      </Text>
      {loading && type !== ActionButtonType.White && <>
        <LoadingIconWhite className={`actionButton__loadingIcon`} />
      </>}
      {loading && type === ActionButtonType.White && <>
        <LoadingIconBlack className={`actionButton__loadingIcon`} />
      </>}
    </Container>
  );
}

const Container = styled.button<{ background: ColorType, fullWidth: boolean, padding: number }>`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  border: none;
  border-radius: 50px;
  width: ${({ fullWidth }) => fullWidth ? '100%' : 'auto'};
  background: ${({ background }) => background};

  padding: ${({ padding }) => padding}px;
  transition: background-color 0.3s, border 0.2s;
  font-weight: 400;
  appearance: none;

  &:hover {
    background: #737a92;
  }

  &:disabled {
    cursor: not-allowed !important;
  }
`;

const Text = styled.div<{ hide: boolean }>`
  font-family: 'Golos-Text', sans-serif;
  opacity: ${({ hide }) => hide ? '0' : '1'};
  color: #ffffff;
  font-size: 14px;
`;
