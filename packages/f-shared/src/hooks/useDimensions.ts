'use client';

import { useEffect, useRef } from "react";

export const useDimensions = (ref: React.MutableRefObject<HTMLDivElement | null>) => {
    const dimensions = useRef({ width: 0, height: 0 });

    useEffect(() => {
        if(!ref.current) return;
        dimensions.current.width = ref.current.offsetWidth;
        dimensions.current.height = ref.current.scrollHeight;
    }, [ref]);

    return dimensions.current;
};