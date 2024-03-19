import Script from "next/script";

export const GoogleTag = () => process.env.NODE_ENV === 'production' && (
    <>
        <Script
            strategy='afterInteractive'
            async src="https://www.googletagmanager.com/gtag/js?id=AW-11470654223"/>
        <Script
            id='gtag-init'
            strategy='afterInteractive'
            dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'AW-11470654223');
                `
            }}/>
    </>
);
