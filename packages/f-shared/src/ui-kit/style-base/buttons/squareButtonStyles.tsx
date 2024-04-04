import { css,RuleSet } from "styled-components";
import { SquareButtonStyle } from "./styleEnum";
import { Color } from "../enums/enums";

export const squareButtonStyles: Record<SquareButtonStyle, RuleSet<object>> = {
    [SquareButtonStyle.GREEN]: css`
        background-color: ${Color.MINT};
        color: ${Color.GRAY_700};

        @media (hover: hover) {
            &:hover {
                color: ${Color.GRAY_900};
                background-color: ${Color.EMERALD};
            }
        }
    `,
    [SquareButtonStyle.WHITE]: css`
        background-color: ${Color.WHITE};
        color: ${Color.GRAY_900};

        @media (hover: hover) {
            &:hover {
                color: ${Color.WHITE};
                background-color: ${Color.GRAY_900};
            }
        }
    `,
    [SquareButtonStyle.STROKE_WHITE]: css`
        color: ${Color.WHITE};
        border: 1px solid ${Color.WHITE};

        @media (hover: hover) {
            &:hover {
                color: ${Color.GRAY_900};
                border: 1px solid ${Color.GRAY_900};
            }
        }
    `,
    [SquareButtonStyle.STROKE_BLACK]: css`
        color: ${Color.GRAY_700};
        border: 1px solid ${Color.GRAY_700};

        @media (hover: hover) {
            &:hover {
                color: ${Color.GRAY_900};
                border: 1px solid ${Color.GRAY_900};
            }
        }
    `,
};