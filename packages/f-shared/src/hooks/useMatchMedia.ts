'use client';

import { useLayoutEffect, useState } from 'react';

type UseMathMedia = (query: string) => boolean;

export const useMatchMedia: UseMathMedia = (query: string) => {

    const [match, setMath] = useState<boolean>(false);


    if (typeof window === 'undefined') return match;

    const matchObj = matchMedia(query);

    function handleMatch () {
      setMath(matchObj?.matches || false);
    }

  // eslint-disable-next-line react-hooks/rules-of-hooks
    useLayoutEffect(() => {
      handleMatch();
      matchObj?.addEventListener('change', handleMatch);
      return () => {
        matchObj?.removeEventListener('change', handleMatch);
      };
    }, [query]);


    return match;
};
