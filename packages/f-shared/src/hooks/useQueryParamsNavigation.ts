'use client';

import { ReadonlyURLSearchParams, usePathname, useRouter, useSearchParams } from "next/navigation";

type UseQueryParamsNavigationType = () => [ReadonlyURLSearchParams, (key: string, value: string) => void];

export const useQueryParamsNavigation: UseQueryParamsNavigationType = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
  
    const navigateWithParam = (key: string, value: string) => {
        const params = new URLSearchParams(Array.from(searchParams.entries()));

        if (!value) {
            params.delete(key);
        } else {
            params.set(key, value);
        }
    
        const paramsString = params.toString();
        const query = paramsString ? `?${paramsString}` : '';

        router.push(`${pathname}${query}`, {scroll: false});
    };

    return [searchParams, navigateWithParam];
};