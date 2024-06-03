import { GlobalStyle, StoreProvider, StyledComponentsRegistry } from '@freelancer/app';
import { PersonalLayout } from '@freelancer/widgets';
import { ToastContainer } from 'react-toastify';
import { GoogleTagManager } from '@next/third-parties/google'
import 'react-toastify/dist/ReactToastify.min.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
          <GoogleTagManager gtmId='GTM-MNDK36DH'/>
      <body>
          <StyledComponentsRegistry>
          <GlobalStyle />
          <StoreProvider>
            <PersonalLayout>
              {children}
            </PersonalLayout>
            <ToastContainer position='bottom-right' />
          </StoreProvider>
          </StyledComponentsRegistry>

      </body>
    </html>
  );
}
