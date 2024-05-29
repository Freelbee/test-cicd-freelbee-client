import { css, RuleSet } from "styled-components";


import { Color } from "../enums/enums";

export enum IconPosition {
  RIGHT = 'right',
  LEFT = 'left'
}


export enum ButtonStyleEnum {
  GREEN = 'green',
  BLACK = 'black',
  TRANSPARENT_WHITE = 'transparentWhite',
  STROKE_WHITE = 'strokeWhite',
  ROUND_STROKE_WHITE = 'roundStrokeWhite',
  RED = 'red',
}

export const activeButtonStyles: Record<ButtonStyleEnum, RuleSet<object>> = {
    [ButtonStyleEnum.GREEN]: css`
        background-color: ${Color.EMERALD};
    `,
    [ButtonStyleEnum.BLACK]: css`
        background-color: ${Color.GRAY_900};
    `,
    [ButtonStyleEnum.TRANSPARENT_WHITE]: css`
        border: 1px solid ${Color.WHITE};
        color: ${Color.WHITE};
    `,
    [ButtonStyleEnum.STROKE_WHITE]: css`
        border: 1px solid ${Color.GRAY_600};
        background-color: ${Color.GRAY_100};
    `,
    [ButtonStyleEnum.ROUND_STROKE_WHITE]: css`
        border: 1px solid ${Color.GRAY_200};
        background-color: ${Color.GRAY_100};
    `,
    [ButtonStyleEnum.RED]: css`
        background-color: ${Color.BG_RED};
    `,
};

export const buttonStyles: Record<ButtonStyleEnum, RuleSet<object>> = {
    [ButtonStyleEnum.GREEN]: css`
        --pulse-gradient: radial-gradient(ellipse at center, rgba(199, 255, 230, 0.4),rgba(146, 255, 206, 0.4),rgba(114, 255, 192, 0.6),rgba(184, 255, 223, 0.8));
        --bg: ${Color.MINT};
        --icon: ${Color.GRAY_900};

        background-color: var(--bg);
        color: ${Color.GRAY_900};
        transition: background-color 0.5s;

        @media (hover: hover) {
            &:hover {
               ${activeButtonStyles.green};
            }
        }

        @media (pointer:coarse) {
            --pulse-gradient: radial-gradient(ellipse at center, rgba(0, 100, 62, 0.4) 0%,rgba(0, 100, 62, 0.4) 1%,rgba(0, 100, 62, 0.6) 33%,rgba(0,0,0,0) 100%);
        }
    `,
    [ButtonStyleEnum.BLACK]: css`
        --pulse-gradient: radial-gradient(ellipse at center, rgba(244, 244, 244, 0.3) 0%,rgba(244, 244, 244, 0.3) 1%,rgba(244, 244, 244, 0.4) 33%,rgba(0,0,0,0) 100%);
        --bg: ${Color.GRAY_700};
        --icon: ${Color.WHITE};

        background-color: var(--bg);
        color: ${Color.WHITE};
        transition: background-color 0.5s;

        @media (hover: hover) {
            &:hover {
                ${activeButtonStyles.black};
            }
        }
    `,
    [ButtonStyleEnum.STROKE_WHITE]: css`
        --pulse-gradient: radial-gradient(ellipse at center, rgba(28, 28, 28, 0.3) 0%,rgba(28, 28, 28, 0.3) 1%,rgba(28, 28, 28, 0.4) 33%,rgba(0,0,0,0) 100%);
        --bg: ${Color.WHITE};
        --icon: ${Color.GRAY_900};

        background-color: var(--bg);
        color: ${Color.GRAY_900};
        border: 1px solid ${Color.GRAY_400};
        transition: border 0.5s, background-color 0.5s, color 0.5s;

        @media (hover: hover) {
            &:hover {
                ${activeButtonStyles.strokeWhite};
            }
        }
    `,
    [ButtonStyleEnum.TRANSPARENT_WHITE]: css`
         --pulse-gradient: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.4) 0%,rgba(255, 255, 255, 0.4) 1%,rgba(255, 255, 255, 0.6) 33%,rgba(0,0,0,0) 100%);
         --bg: 'transparent';
         --icon: ${Color.GRAY_500};

        color: ${Color.GRAY_500};
        border: 1px solid ${Color.GRAY_500};
        transition: border 0.5s, color 0.5s;
        background-color: var(--bg);

        @media (hover: hover) {
            &:hover {
                ${activeButtonStyles.transparentWhite};
            }
        }
    `,
    [ButtonStyleEnum.ROUND_STROKE_WHITE]: css`
        background-color: ${Color.WHITE};
        color: ${Color.GRAY_900};
        border: 1px solid ${Color.GRAY_400};
        transition: border 0.5s, background-color 0.5s, color 0.5s;

        @media (hover: hover) {
            &:hover {
                ${activeButtonStyles.roundStrokeWhite};
            }
        }
    `,
    [ButtonStyleEnum.RED]: css`
        background-color: ${Color.BG_RED};
        color: ${Color.DANGER};

        @media (hover: hover) {
            &:hover {
                ${activeButtonStyles.red};
            }
        }
    `,
};
