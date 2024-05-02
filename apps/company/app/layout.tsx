import { GlobalStyle, StoreProvider, StyledComponentsRegistry } from '@company/app';
import { PersonalLayout } from '@company/widgets';
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
            </PersonalLayout>
            <ToastContainer position='bottom-right' />  
          </StoreProvider>

        </StyledComponentsRegistry>
        
      </body>
    </html>
  );
}
