import { GlobalStyle, StoreProvider, StyledComponentsRegistry } from '@admin/app';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
    <body>

    <StyledComponentsRegistry>
      <GlobalStyle />
      <StoreProvider>
        {children}
        <ToastContainer position="bottom-right" />
      </StoreProvider>
    </StyledComponentsRegistry>

    </body>
    </html>
  );
}
