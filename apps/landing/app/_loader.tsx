'use client';

import { useEffect } from "react";

// import { ReactComponent as Logo } from '@landing/assets/icons/logo/freelbee-icon-monocolor.svg';

import './globalLoader.css';

export const Loader = () => {
    useEffect(() => {
        if(typeof window !== "undefined") {
            const loader = document.getElementById('loader');
            if(loader) {
                loader.classList.add('global-loader__hidden');
            }
        }
    }, []);

    return (
        <div id='loader' className='global-loader'>
            <div className='global-loader__content'>
                {/* <Logo stroke='black' width={100} height={100} />    */}
                <div className="global-loader__progressbar">
                    <div className="global-loader__progress"></div>                    
                </div>
            </div>
        </div>
    );
};