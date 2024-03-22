import { StoreProvider, StyledComponentsRegistry } from '@freelancer/app';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>          
        </StoreProvider>
      </body>
    </html>
  );
}
