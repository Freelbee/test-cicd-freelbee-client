import { Breakpoint } from "../enums/enums";

/**
 * @param breakpoint - целевой Breakpoint
 * @example
 * ${mediaBreakpointUp(Breakpoint.XL)} {
 *     // styles
 * }
 */
export const mediaBreakpointUp: (breakpoint: Breakpoint | number) => string = (breakpoint) => `@media(min-width: ${breakpoint}px)`;
/**
 * @param breakpoint - целевой Breakpoint
 * @example
 * ${mediaBreakpointDown(Breakpoint.XL)} {
 *     // styles
 * }
 */
export const mediaBreakpointDown: (breakpoint: Breakpoint | number) => string = (breakpoint) => `@media(max-width: ${breakpoint - 1}px)`;

/**
 * @param value - Значение на целевом экране
 * @param screenWidth - Ширина целевого экрана (число или Breakpoint)
 * @returns Относительное значение в формате vw. Результат изменяется вместе с шириной экрана
 * @example
 * width: ${vw(480)};
 *
 * ${mediaBreakpointDown(Breakpoint.XL)} {
 *     width: ${vw(240, Breakpoint.XL)};
 * }
 */


export const vw: (value: number, screenWidth?: Breakpoint | number) => string = (value, screenWidth: Breakpoint | number = 1920) => `${(value / screenWidth) * 100}vw`;

/**
 * @param value - Значение на целевом экране
 * @param screenHeight - Высота целевого экрана
 * @returns Относительное значение в формате vh. Результат изменяется вместе с высотой экрана
 * @example
 * height: ${vh(480)};
 *
 * ${mediaBreakpointDown(Breakpoint.XL)} {
 *     height: ${vw(240, Breakpoint.XL)};
 * }
 */
export const vh: (value: number, screenHeight?: number) => string = (value, screenHeight = 1080) => `${(value / screenHeight) * 100}vh`;

export const rem: (size: number, rootFontSize?: number) => string = (size, rootFontSize = 16) => `${size / rootFontSize}rem`;
