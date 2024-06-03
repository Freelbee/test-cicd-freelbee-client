'use client';

import Link from "next/link";
import { NavLink } from "../interface/NavLink";
import styled from "styled-components";
import { BORDER_RADIUS, Color, typography } from "@freelbee/shared/ui-kit";
import { usePathname } from "next/navigation";

export const NavigationLink = ({link, title, Icon}: NavLink) => {

    const pathName = usePathname();

    const isRouteActive = (link: string) => {
      if(link === '/') return pathName === link;
      return pathName.includes(link);
    };

  return (
    <Link href={link}>
        <LinkToPage $active={isRouteActive(link)}>
            <Icon stroke={isRouteActive(link) ? Color.GRAY_800 : Color.GRAY_600} />
            {title}
        </LinkToPage>
    </Link>
  )
}

const LinkToPage = styled.div<{$active: boolean}>`
  ${typography.body};
  color: ${Color.GRAY_800};
  position: relative;
  cursor: pointer;
  height: 40px;
  padding: 10px 15px;
  display: grid;
  grid-gap: 8px;
  grid-template-columns: 20px 1fr;
  border-top-right-radius: ${BORDER_RADIUS.S};
  border-bottom-right-radius: ${BORDER_RADIUS.S};
  border-bottom-left-radius: ${BORDER_RADIUS.XXS};
  border-top-left-radius: ${BORDER_RADIUS.XXS};
  transition: background 0.5s;

  svg {
    width: 20px;
    height: 20px;
    stroke: ${Color.GRAY_800};
  }

  &:hover {
    background: ${Color.GRAY_200};
  }
  
  ${({$active})=> $active && (`
  background: ${Color.GRAY_200};

  &:before {
    content: "";
    position: absolute;
    left: 0;
    width: 4px;
    height: 100%;
    background: ${Color.EMERALD};
    border-radius: 2px;
  }`)}
`;
