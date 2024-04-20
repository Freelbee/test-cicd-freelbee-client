'use client';
import styled from 'styled-components';
import { links } from './data/links';
import { Breakpoint,mediaBreakpointDown} from '@freelbee/shared/ui-kit';
import { usePathname } from 'next/navigation';
import { NavigationLink } from "@freelbee/shared/ui-kit";

export function SettingsMenu () {
  const pathName = usePathname();

  const isRouteActive = (link: string) => pathName.endsWith(link);
  
    return (
        <NavigationWrapper>
            <NavigationContent>
                <Links>
                  {links.map((link) => (
                      <NavigationLink 
                        key={link.title} 
                        isActive={isRouteActive(link.link)}
                        {...link} />
                  ))}
                </Links>
            </NavigationContent>
        </NavigationWrapper>
    );
}

const NavigationWrapper = styled.div`
  position: relative;
  overflow-x: hidden;
  width: 100%;

  ${mediaBreakpointDown(Breakpoint.Medium)} {
    display: none;
  }
`;

const NavigationContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 220px;
`;

const Links = styled.nav`
  height: 100%;
  width: 100%;
  background: #ffffff;
  border-radius: 14px;
  padding: 24px 8px;
`;