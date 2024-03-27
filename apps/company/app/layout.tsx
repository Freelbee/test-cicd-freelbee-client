import { GlobalStyle, StoreProvider, StyledComponentsRegistry } from '@company/app';
import { PersonalLayout } from '@company/widgets';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <StyledComponentsRegistry>
          <GlobalStyle />

            <PersonalLayout>
              {children}              
            </PersonalLayout>

          </StyledComponentsRegistry>
        </StoreProvider>
      </body>
    </html>
  );
}
