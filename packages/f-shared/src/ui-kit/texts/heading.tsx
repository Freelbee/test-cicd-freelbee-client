'use client';

import styled, { css,RuleSet } from 'styled-components';

import { Color, typography } from "@freelbee/shared/ui-kit";

export const Title1 = styled.h1<{
    $color?: Color;
    $gradient?: Color;
    $align?: 'center' | 'right' | 'left';
    $styles?: RuleSet<object>;
}>`
    ${typography.title1};
    color: ${({$color}) => $color || Color.GRAY_800};
    margin: 0;
    padding: 0;
    text-align: ${({$align}) => $align || 'left'};
    ${({$gradient}) => $gradient && css`
        background: ${$gradient};
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    `}
    ${(props) => props.$styles || ''};
`;

export const Title2 = styled.h2<{
    $color?: Color;
    $gradient?: Color;
    $align?: 'center' | 'right' | 'left';
    $styles?: RuleSet<object>;
}>`
    ${typography.title2};
    color: ${({$color}) => $color || Color.GRAY_800};
    margin: 0;
    padding: 0;
    text-align: ${({$align}) => $align || 'left'};
    ${({$gradient}) => $gradient && css`
        background: ${$gradient};
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    `}
    ${(props) => props.$styles || ''};
`;

export const Heading1 = styled.h1<{
    $color?: Color;
    $gradient?: Color;
    $align?: 'center' | 'right' | 'left';
    $styles?: RuleSet<object>;
}>`
    ${typography.heading1};
    color: ${({$color}) => $color || Color.GRAY_800};
    margin: 0;
    padding: 0 !important;
    text-align: ${({$align}) => $align || 'left'};
    ${({$gradient}) => $gradient && css`
        background: ${$gradient};
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    `}
    ${(props) => props.$styles || ''};
`;

export const Heading2 = styled.h2<{
    $color?: Color;
    $gradient?: Color;
    $align?: 'center' | 'right' | 'left';
    $styles?: RuleSet<object>;
}>`
    ${typography.heading2};
    color: ${({$color}) => $color || Color.GRAY_800};
    margin: 0;
    padding: 0;
    text-align: ${({$align}) => $align || 'left'};
    ${({$gradient}) => $gradient && css`
        background: ${$gradient};
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    `}
    ${(props) => props.$styles || ''};
`;

export const Heading3 = styled.h3<{
    $color?: Color;
    $gradient?: Color;
    $align?: 'center' | 'right' | 'left';
    $styles?: RuleSet<object>;
}>`
    ${typography.heading3};
    color: ${({$color}) => $color || Color.GRAY_800};
    margin: 0;
    padding: 0;
    text-align: ${({$align}) => $align || 'left'};
    ${({$gradient}) => $gradient && css`
        background: ${$gradient};
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    `}
    ${(props) => props.$styles || ''};
`;
