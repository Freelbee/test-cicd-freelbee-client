'use client';
 
import { useEffect } from 'react';
import { Error500Page } from '@landing/pages';
 
export default function Error ({error,reset,}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // To-Do: Add Sentry?
        console.error(error);
    }, [error]);
 
    return (
        <Error500Page />
    );
}