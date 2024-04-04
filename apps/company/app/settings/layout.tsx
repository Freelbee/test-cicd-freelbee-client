import { SettingsLayout } from "@company/widgets";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SettingsLayout>
        {children}       
    </SettingsLayout>   
  );
}
