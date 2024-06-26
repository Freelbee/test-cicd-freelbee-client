import { ToastContainer } from 'react-toastify';
import type { Metadata } from 'next';

import 'react-toastify/dist/ReactToastify.min.css';
import { Loader } from './_loader';
import { CookiesModal, Footer, Header } from '@landing/widgets';
import { GlobalStyle, GooglePixel, GoogleTag, LinkedInScript, StyledComponentsRegistry, ZohoScript } from '@landing/app';
import {StoreProvider} from '@landing/app';


export const metadata: Metadata = {
    title: 'Freelancer Management & Global Payments for Freelancers and Distributed Teams | Freelbee',
    description: 'Organize your work with global freelancers and contractors. All-in-one platform for contractor management, payouts, and compliance. Low rates. Any currencies.',
    metadataBase: new URL("https://freelbee.com/"),
    openGraph: {
        title: 'Freelancer Management & Global Payments for Freelancers and Distributed Teams | Freelbee',
        description: `Organize your work with global freelancers and contractors. All-in-one platform for contractor management, payouts, and compliance. Low rates. Any currencies.`,
        url: 'https://freelbee.com',
        siteName: 'freelbee.com',
        locale: 'en_US',
        type: 'website',
        images: [
            {
                url: './landing/icons/logo/og-image.png',
                width: 1200,
                height: 630
            }
        ]
    },

    other: {
        "google-site-verification": "TJIWzkk5-ka7sMxJLF4pL-VZtCiNT4LaTwlaWqYyA78"
    }
};

export default function RootLayout ({
    children,
}: {
    children: React.ReactNode
}) {

    return (
        <html lang="en">
            <body>
                <GoogleTag />
                <GooglePixel />
                <LinkedInScript />
                <ZohoScript />

                <div id="#portal"></div>
                <Loader />
                <StyledComponentsRegistry>
                    <GlobalStyle/>
                    <Header/>

                    <StoreProvider>
                        <main style={{flex: '1 0 auto'}}>
                            {children}                        
                        </main>                        
                    </StoreProvider>


                    <ToastContainer position='bottom-right' />
                    <Footer/>
             
                    <CookiesModal /> 
                </StyledComponentsRegistry>
            </body>
        </html>
    );
}
