import { ToastContainer } from 'react-toastify';
import type { Metadata } from 'next';

import { Loader } from './_loader';
import { GlobalStyle, GoogleTag, LinkedInScript, StyledComponentsRegistry } from '@landing/app';
import { Header, Footer, CookiesModal } from '@landing/widgets';

export const metadata: Metadata = {
    title: 'Global Payments, HR, IT to Freelancers and Distributed Teams | Freelbee',
    description: 'Streamline remote team management Freelbee: seamless HR, payroll, and compliance in one efficient platform for global workforces',
    metadataBase: new URL("https://freelbee.com/"),
    openGraph: {
        title: 'Global Payments, HR, IT to Freelancers and Distributed Teams | Freelbee',
        description: `Streamline remote team management Freelbee: seamless HR, payroll, and compliance in one efficient platform for global workforces`,
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
        <LinkedInScript />
        
        <Loader />
        <StyledComponentsRegistry>
          <GlobalStyle />
          <Header />

          {children}

          <ToastContainer position="bottom-right" />
          <Footer />

          <CookiesModal />
        </StyledComponentsRegistry>
        <div id="#portal"></div>
        </body>
        </html>
    );
}
