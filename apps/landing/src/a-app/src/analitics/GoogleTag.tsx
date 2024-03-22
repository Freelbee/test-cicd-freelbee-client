import Script from "next/script";

export const GoogleTag = () => (
    <>
        <Script
            id='gtag-manager'
            strategy='worker'
            defer
            dangerouslySetInnerHTML={{
                __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','GTM-MNDK36DH');
                `
            }}/>

        <noscript dangerouslySetInnerHTML={{
            __html: `
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-MNDK36DH"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>
                `
        }} />

        <Script
            strategy='worker'
            defer src="https://www.googletagmanager.com/gtag/js?id=AW-11470654223"/>
        <Script 
            id='gtag-init'
            strategy='worker'
            defer
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