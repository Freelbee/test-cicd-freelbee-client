import { GlobalStyle, GoogleTagManagerPersonal, StoreProvider, StyledComponentsRegistry } from '@freelancer/app';
import { PersonalLayout } from '@freelancer/widgets';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <GoogleTagManagerPersonal />
   
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
