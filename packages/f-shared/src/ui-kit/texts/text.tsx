'use client';

import { ReactNode } from 'react';
import styled, { RuleSet } from 'styled-components';

import { Color } from "../style-base/enums/enums";
import { typography, TypographyKeys } from "../style-base/typography/golos/typography";

type TextColor = Color | 'inherit';
type TextAlign = 'center' | 'right' | 'left';

interface Props extends React.HTMLAttributes<HTMLElement> {
    children: ReactNode;
    color?: TextColor;
    align?: TextAlign;
    as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4';
    styles?: RuleSet<object>;
    font?: TypographyKeys;
};

export const Text = ({children, color = Color.GRAY_800, font, align = 'left', styles, ...rest}: Props) => (
    <TextContent $color={color} $font={font} $styles={styles} $align={align} {...rest}>
        {children}
    </TextContent>
);

export const TextContent = styled.span<{
    $color?: TextColor;
    $font?: TypographyKeys;
    $align?: TextAlign;
    $styles?: RuleSet<object>;
}>`
    ${({$font}) => $font ? typography[$font] : typography.default};
    color: ${({$color}) => $color};
    text-align: ${({$align}) => $align};
    margin: 0;
    padding: 0;
    transition: color 0.5s;
    ${(props) => props.$styles || ''};
`;
