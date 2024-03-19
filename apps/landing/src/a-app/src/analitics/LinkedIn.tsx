import Script from "next/script";

export const LinkedInScript = () => process.env.NODE_ENV === 'production' && (
    <>
        <Script
            id='linkedin_partner_id'
            dangerouslySetInnerHTML={{
                __html: `
                _linkedin_partner_id = "5607010";
                window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
                window._linkedin_data_partner_ids.push(_linkedin_partner_id);
                `
            }}/>

        <Script
            id='linkedin_script'
            dangerouslySetInnerHTML={{
                __html: `
                (function(l) {
                    if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
                    window.lintrk.q=[]}
                    var s = document.getElementsByTagName("script")[0];
                    var b = document.createElement("script");
                    b.type = "text/javascript";b.async = true;
                    b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
                    s.parentNode.insertBefore(b, s);})(window.lintrk);
                `
            }}/>

        <noscript dangerouslySetInnerHTML={{
            __html: `
                <img height="1" width="1" style="display: 'none'" alt="" src="https://px.ads.linkedin.com/collect/?pid=5607010&fmt=gif" />
                `
        }} />

        {/*
        <script type="text/javascript" dangerouslySetInnerHTML={{
            __html: `_linkedin_partner_id = "5607010";
        window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
        window._linkedin_data_partner_ids.push(_linkedin_partner_id);`
        }}>

        </script>

        <script type="text/javascript" dangerouslySetInnerHTML={{
            __html: `(function(l) {
        if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
        window.lintrk.q=[]}
        var s = document.getElementsByTagName("script")[0];
        var b = document.createElement("script");
        b.type = "text/javascript";b.async = true;
        b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
        s.parentNode.insertBefore(b, s);})(window.lintrk);`
        }}>

        </script>
            <noscript>
                <img height="1" width="1" style="display:none;" alt="" src="https://px.ads.linkedin.com/collect/?pid=5607010&fmt=gif" />
            </noscript>*/}
    </>
);
