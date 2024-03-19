'use client';

import localFont from 'next/font/local';
import { css} from 'styled-components';
import { Breakpoint } from "../../enums/enums";
import {mediaBreakpointDown} from "../../functions/functions";

const golosText = localFont({
  src: [
    {
      path: './fonts/GolosText-VariableFont_wght.ttf',
    },
  ],
});

export const typography = {
    default: css`
      ${golosText.style};
      font-weight: 400;
    `,
    golosMedium: css`
        ${golosText.style};
        font-weight: 500;
    `,
    demiBold: css`
        ${golosText.style};
        font-weight: 600;
    `,
    bold: css`
        ${golosText.style};
        font-weight: 700;
    `,

    title1: css`
        ${golosText.style};
        font-weight: 600;
        font-size: 40px;
        line-height: 1.3;

        ${mediaBreakpointDown(Breakpoint.xMedium)} {
            font-size: 39px;
        }

        ${mediaBreakpointDown(Breakpoint.xTablet)} {
            font-size: 38px;
        }

        ${mediaBreakpointDown(Breakpoint.xMobile)} {
            font-size: 37px;
        }
    `,
    title2: css`
        ${golosText.style};
        font-weight: 600;
        font-size: 32px;
        line-height: 1.3;

        ${mediaBreakpointDown(Breakpoint.xMedium)} {
            font-size: 31px;
        }

        ${mediaBreakpointDown(Breakpoint.xTablet)} {
            font-size: 30px;
        }

        ${mediaBreakpointDown(Breakpoint.xMobile)} {
            font-size: 29px;
        }
    `,
    heading1: css`
        ${golosText.style};
        font-weight: 600;
        font-size: 24px;
        line-height: 1.3;

        ${mediaBreakpointDown(Breakpoint.xMedium)} {
            font-size: 23px;
        }

        ${mediaBreakpointDown(Breakpoint.xTablet)} {
            font-size: 22px;
        }

        ${mediaBreakpointDown(Breakpoint.xMobile)} {
            font-size: 21px;
        }
    `,
    heading2: css`
        font-family: 'GolosText-DemiBold', sans-serif;
        font-size: 20px;
        line-height: 1.4;

        ${mediaBreakpointDown(Breakpoint.xMedium)} {
            font-size: 19px;
        }

        ${mediaBreakpointDown(Breakpoint.xTablet)} {
            font-size: 18px;
        }

        ${mediaBreakpointDown(Breakpoint.Tablet)} {
            font-size: 17px;
        }
    `,
    heading3: css`
        ${golosText.style};
        font-weight: 500;
        font-size: 17px;
        line-height: 1.4;

        ${mediaBreakpointDown(Breakpoint.xMedium)} {
            font-size: 16px;
        }

        ${mediaBreakpointDown(Breakpoint.xTablet)} {
            font-size: 15px;
        }

        ${mediaBreakpointDown(Breakpoint.Tablet)} {
            font-size: 14px;
        }
    `,
    documentation: css`
        ${golosText.style};
        font-weight: 400;
        font-size: 13px;
        line-height: 1.4;

        ${mediaBreakpointDown(1280)} {
            line-height: 1.3;
        }

        ${mediaBreakpointDown(768)} {
            font-size: 12px;
            line-height: 1.2;
        }
    `,
    bodyMedium: css`
        ${golosText.style};
        font-weight: 500;
        font-size: 16px;
        line-height: 1.4;

        ${mediaBreakpointDown(Breakpoint.xMedium)} {
            font-size: 15px;
        }

        ${mediaBreakpointDown(Breakpoint.xTablet)} {
            font-size: 14px;
        }

        ${mediaBreakpointDown(Breakpoint.Tablet)} {
            font-size: 13px;
        }
    `,
    body: css`
        ${golosText.style};
        font-weight: 400;
        font-size: 16px;
        line-height: 1.4;

        ${mediaBreakpointDown(Breakpoint.xMedium)} {
            font-size: 15px;
        }

        ${mediaBreakpointDown(Breakpoint.xTablet)} {
            font-size: 14px;
        }

        ${mediaBreakpointDown(Breakpoint.Tablet)} {
            font-size: 13px;
        }
    `,
    bodySmall: css`
        ${golosText.style};
        font-weight: 400;
        font-size: 15px;
        line-height: 1.4;

        ${mediaBreakpointDown(Breakpoint.xMedium)} {
            font-size: 13px;
        }

        ${mediaBreakpointDown(Breakpoint.xMobile)} {
            font-size: 12px;
        }
    `,
    captions: css`
        ${golosText.style};
        font-weight: 400;
        font-size: 12px;
        line-height: 1.3;

        ${mediaBreakpointDown(Breakpoint.xMedium)} {
            font-size: 11px;
        }
    `,
};

export type TypographyKeys = keyof typeof typography;
