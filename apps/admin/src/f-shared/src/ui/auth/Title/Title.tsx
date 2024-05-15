import { ReactNode } from 'react';
import styled from 'styled-components';
import { ColorType } from '../../../utils/ColorType';

type Props = {
  children: ReactNode,
  sizeMod?: TitleSizeMods,
  color?: ColorType,
  weight?: TitleWeightMod
}

export enum TitleSizeMods {
  DEFAULT = 18, // 18, 16, 14
  BIGGER = 20, // 20, 18, 16
  BIG = 28, // 16, 14, 12
  VARY_BIG = 32, // 32, 30, 28
  SMALL = 16, // 12, 10, 8
  VARY_SMALL = 14, // 10, 8, 6
}

export enum TitleWeightMod {
  LIGHT = 400,
  BOLD = 500,
  BOLDER = 600,
}

export function Title(props: Props) {
  const {
    children,
    sizeMod = TitleSizeMods.DEFAULT,
    color = ColorType.BLACK_COLOR,
    weight = TitleWeightMod.BOLDER
  } = props;

  const getSize = (displaySizeMod: number) => `${sizeMod - displaySizeMod}px`;

  return (
    <Container color={color} getSize={getSize} weight={weight}>
      {children}
    </Container>
  );
}

const Container = styled.span<{ color: ColorType, getSize: (dsm: number) => string, weight: number }>`
  font-family: 'Golos-Text', sans-serif;
  font-style: normal;
  color: ${({ color }) => color};
  font-size: ${({ getSize }) => getSize(0)};
  font-weight: ${({ weight }) => weight};
`;
