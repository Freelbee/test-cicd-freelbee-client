import Script from "next/script";

export const ZohoScript = () => process.env.NODE_ENV === 'production' && (
    <>
        <Script
            id='zoho'
            strategy='lazyOnload'
            src="https://cdn-eu.pagesense.io/js/freelprimeportalllc/ee7cf5c02b4a4a4c8f0775bb0fa06e47.js" />
    </>
);