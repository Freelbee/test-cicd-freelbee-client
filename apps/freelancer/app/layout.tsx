import { GlobalStyle, StoreProvider, StyledComponentsRegistry } from '@freelancer/app';
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
   
          <StyledComponentsRegistry>
          <GlobalStyle />
          <StoreProvider>
            <PersonalLayout>
              {children}   
              <ToastContainer position='bottom-right' />                
            </PersonalLayout>
          </StoreProvider>
          </StyledComponentsRegistry>
       
      </body>
    </html>
  );
}
