/* eslint-disable @typescript-eslint/ban-types */
//Hook
'use client';

import React, { useEffect } from 'react';


export function useOnClickOutside (ref: React.RefObject<HTMLElement>, handler: Function, buttonRef?: React.RefObject<HTMLElement>) {
    useEffect(
        () => {
            const listener = (event: MouseEvent | TouchEvent | Event) => {

                if (!ref!.current ||
                  ref!.current!.contains((event as unknown as { target: Node }).target) ||
                  buttonRef?.current?.contains((event as unknown as { target: Node }).target)) {
                    return;
                }
                handler(event);
            };
            document.addEventListener('mousedown', listener);
            document.addEventListener('touchstart', listener);
            return () => {
                document.removeEventListener('mousedown', listener);
                document.removeEventListener('touchstart', listener);
            };
        },
        [ref, handler]
    );
}
