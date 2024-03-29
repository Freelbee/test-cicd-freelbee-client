'use client';

import { useEffect, useRef } from "react";

import {ReactComponent as Logo} from '@freelbee/assets/icons/logo/freelbee-icon-monocolor.svg';

import './globalLoader.css';

export const Loader = () => {

    const loaderRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if(typeof window !== "undefined") {
            const loader = loaderRef.current;
            if(loader) {
                loader.classList.add('global-loader__hidden');
            }
        }
    }, []);

    return (
        <div ref={loaderRef} className='global-loader'>
            <div className='global-loader__content'>
                <Logo width={100} height={100} />   
                <div className='global-loader__progressbar'>
                    <div className='global-loader__progress'></div>                    
                </div>
            </div>
        </div>        
    );
};