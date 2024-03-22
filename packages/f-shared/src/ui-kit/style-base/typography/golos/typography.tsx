'use client';

import { css} from 'styled-components';
import { Breakpoint } from "../../enums/enums";
import {mediaBreakpointDown} from "../../functions/functions";
import { Poppins } from 'next/font/google';

export const mainFont = Poppins({
    subsets: ['latin'],
    display: 'swap',
    weight: ['400', '500', '600']
});


export const typography = {
    default: css`
      ${mainFont.style};
      font-weight: 400;
    `,
    medium: css`
        ${mainFont.style};
        font-weight: 500;
    `,
    demiBold: css`
        ${mainFont.style};
        font-weight: 600;
    `,

    title1: css`
    ${mainFont.style};
    font-weight: 600;
    font-size: 42px;
    line-height: 1.3;

    ${mediaBreakpointDown(Breakpoint.FHD)} {
        font-size: 40px;
    }

    ${mediaBreakpointDown(Breakpoint.xMedium)} {
        font-size: 39px;
    }

    ${mediaBreakpointDown(Breakpoint.xTablet)} {
        font-size: 38px;
    }

    ${mediaBreakpointDown(Breakpoint.xMobile)} {
        font-size: 32px;
    }
    `,

    title2: css`
    ${mainFont.style};
    font-weight: 600;
    font-size: 34px;
    line-height: 1.3;

    ${mediaBreakpointDown(Breakpoint.FHD)} {
        font-size: 32px;
    }

    ${mediaBreakpointDown(Breakpoint.xMedium)} {
        font-size: 31px;
    }

    ${mediaBreakpointDown(Breakpoint.xTablet)} {
        font-size: 30px;
    }

    ${mediaBreakpointDown(Breakpoint.xMobile)} {
        font-size: 28px;
    }
    `,
    heading1: css`
        ${mainFont.style};
        font-weight: 600;
        font-size: 26px;
        line-height: 1.3;

        ${mediaBreakpointDown(Breakpoint.FHD)} {
            font-size: 24px;
        }

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
        ${mainFont.style};
        font-size: 22px;
        line-height: 1.4;

        ${mediaBreakpointDown(Breakpoint.FHD)} {
            font-size: 20px;
        }

        ${mediaBreakpointDown(Breakpoint.xMedium)} {
            font-size: 19px;
        }

        ${mediaBreakpointDown(Breakpoint.xTablet)} {
            font-size: 18px;
        }

        ${mediaBreakpointDown(Breakpoint.xMobile)} {
            font-size: 17px;
        }
    `,
    heading3: css`
        ${mainFont.style};
        font-weight: 500;
        font-size: 19px;
        line-height: 1.4;

        ${mediaBreakpointDown(Breakpoint.FHD)} {
            font-size: 17px;
        }

        ${mediaBreakpointDown(Breakpoint.xMedium)} {
            font-size: 16px;
        }

        ${mediaBreakpointDown(Breakpoint.xTablet)} {
            font-size: 15px;
        }

        ${mediaBreakpointDown(Breakpoint.xMobile)} {
            font-size: 14px;
        }
    `,
    bodyMedium: css`
        ${mainFont.style};
        font-weight: 500;
        font-size: 17px;
        line-height: 1.4;

        ${mediaBreakpointDown(Breakpoint.FHD)} {
            font-size: 16px;
        }

        ${mediaBreakpointDown(Breakpoint.xMedium)} {
            font-size: 15px;
        }

        ${mediaBreakpointDown(Breakpoint.xTablet)} {
            font-size: 14px;
        }

        ${mediaBreakpointDown(Breakpoint.xMobile)} {
            font-size: 13px;
        }
    `,
    body: css`
        ${mainFont.style};
        font-weight: 400;
        font-size: 17px;
        line-height: 1.4;

        ${mediaBreakpointDown(Breakpoint.FHD)} {
            font-size: 16px;
        }

        ${mediaBreakpointDown(Breakpoint.xMedium)} {
            font-size: 15px;
        }

        ${mediaBreakpointDown(Breakpoint.xTablet)} {
            font-size: 14px;
        }

        ${mediaBreakpointDown(Breakpoint.xMobile)} {
            font-size: 13px;
        }
    `,
    bodySmall: css`
        ${mainFont.style};
        font-weight: 400;
        font-size: 16px;
        line-height: 1.4;

        ${mediaBreakpointDown(Breakpoint.FHD)} {
            font-size: 15px;
        }

        ${mediaBreakpointDown(Breakpoint.xMedium)} {
            font-size: 13px;
        }

        ${mediaBreakpointDown(Breakpoint.xMobile)} {
            font-size: 12px;
        }
    `,
    bodySmallBorder: css`
        ${mainFont.style};
        font-weight: 400;
        font-size: 16px;
        line-height: 1.4;

        ${mediaBreakpointDown(Breakpoint.FHD)} {
            font-size: 14px;
        }

        ${mediaBreakpointDown(Breakpoint.xMedium)} {
            font-size: 13px;
        }

        ${mediaBreakpointDown(Breakpoint.xMobile)} {
            font-size: 12px;
        }
    `,
    captions: css`
        ${mainFont.style};
        font-weight: 400;
        font-size: 14px;
        line-height: 1.3;

        ${mediaBreakpointDown(Breakpoint.FHD)} {
            font-size: 12px;
        }

        ${mediaBreakpointDown(Breakpoint.xMedium)} {
            font-size: 11px;
        }
    `,
};

export type TypographyKeys = keyof typeof typography;
