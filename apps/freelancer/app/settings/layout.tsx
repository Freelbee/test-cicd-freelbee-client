import { SettingsLayout } from "@freelancer/widgets";

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
