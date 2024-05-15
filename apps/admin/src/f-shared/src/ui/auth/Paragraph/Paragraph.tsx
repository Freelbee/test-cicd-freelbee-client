import React, { ReactNode } from 'react';
import styled, { RuleSet } from 'styled-components';
import { ColorType } from '../../../utils/ColorType';

interface Props extends React.HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode,
  sizeMod?: ParagraphSizeMods,
  color?: ColorType,
  lightingHover?: ColorType,
  textAlign?: TextAlign,
  lineHeight?: number,
  styles?: RuleSet<object>,
}

export enum TextAlign {
  CENTER = 'center',
  LEFT = 'left',
  RIGHT = 'right',
}

export enum ParagraphSizeMods {
  DEFAULT = 14, // 14, 12, 10
  BIG = 16, // 16, 14, 12
  VARY_BIG = 20, // 20, 18, 16
  SMALL = 13, // 12, 10, 8
  TOO_SMALL = 12, // 12, 10, 8
  VARY_SMALL = 10, // 10, 8, 6
}

export function Paragraph(props: Props) {
  const {
    children,
    sizeMod = ParagraphSizeMods.DEFAULT,
    color = ColorType.BLACK_COLOR,
    lightingHover,
    textAlign = TextAlign.LEFT,
    lineHeight,
    styles,
    ...rest
  } = props;

  const getSize = (displaySizeMod: number) => `${sizeMod - displaySizeMod}px`;

  return (
    <Container
      styles={styles}
      lineHeight={lineHeight}
      color={color}
      getSize={getSize}
      lightingHover={lightingHover ?? 'transparent'}
      textAlign={textAlign}
      {...rest}
    >
      {children}
    </Container>
  );
}

const Container = styled.span<{
  color: ColorType,
  lightingHover: string,
  getSize: (dsm: number) => string,
  textAlign: TextAlign,
  lineHeight?: number,
  styles?: RuleSet<object>,
}>`
  font-family: 'Golos-Text', sans-serif;
  color: ${({ color }) => color};
  font-size: ${({ getSize }) => getSize(0)};
  font-style: normal;
  text-align: ${({ textAlign }) => textAlign};
  line-height: ${({ lineHeight }) => lineHeight ?? 'unset'};
  transition: .5s;

  &:hover {
    text-shadow: 0 0 7px ${({ lightingHover }) => lightingHover},
    0 0 10px ${({ lightingHover }) => lightingHover},
    0 0 21px ${({ lightingHover }) => lightingHover};
  }

  ${({ styles }) => styles};
`;
