'use client';

import { MutableRefObject, useCallback, useEffect, useRef } from 'react';

const FOCUSABLE_ELEMENTS =
    "a[href], area[href], input:not([disabled]):not([type=hidden]), selector:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, *[tabindex], *[contenteditable]";

export const useFocusTrap = <T extends Element>(): MutableRefObject<T | null> => {
    const trapRef = useRef<T | null>(null);

    const selectNextFocus = useCallback((focusableElements: HTMLElement[], isShiftTab: boolean, skipped: number, currentActiveIdx?: number) => {

        if(focusableElements.length) {
            if(skipped >= focusableElements.length) return;

            const active = document.activeElement;
            const maxIdx = focusableElements.length - 1;

            if(!currentActiveIdx) {
                currentActiveIdx = focusableElements.indexOf(active as HTMLElement) || 0;
            }
            
            let nextIdx = isShiftTab ? currentActiveIdx - 1 : currentActiveIdx + 1;

            if(nextIdx > maxIdx) {
                nextIdx = 0;
            }

            if(nextIdx < 0) {
                nextIdx = maxIdx;
            }

            const nextFocusElement = focusableElements[nextIdx];

            if(nextFocusElement) {
                nextFocusElement.focus();
            }

            if (document.activeElement !== nextFocusElement) {
                selectNextFocus(
                    focusableElements,
                    isShiftTab,
                    skipped + 1,
                    nextIdx
                );
            }
        }
    }, []);

    const trapFunction = useCallback((e: KeyboardEvent) => {
        if(!trapRef.current) return;

        if (e.key === 'Tab' || e.keyCode === 9) {
            e.preventDefault();
            const isShiftTab = e.shiftKey;
            let focusableElements = Array.from(trapRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_ELEMENTS));

            focusableElements = focusableElements.filter(el => {
                const tabIdxString = el.getAttribute('tabindex');
                if(tabIdxString) {
                    return parseInt(tabIdxString) >= 0;
                } else {
                    return true;
                }
            });
            
            if (e.target instanceof Element) {
                selectNextFocus(focusableElements, isShiftTab, 0); 
            }     
        }
    }, [selectNextFocus]);

    useEffect(() => {
        window.addEventListener("keydown", trapFunction);

        return () => {
            window.removeEventListener("keydown", trapFunction);
        };
    }, [trapFunction]);

    return trapRef; 
};