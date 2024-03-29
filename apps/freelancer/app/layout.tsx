import { GlobalStyle, StoreProvider, StyledComponentsRegistry } from '@freelancer/app';
import { PersonalLayout } from '@freelancer/widgets';

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
