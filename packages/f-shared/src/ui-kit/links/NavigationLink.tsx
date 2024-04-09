'use client';

import Link from "next/link";
import styled from "styled-components";
import { BORDER_RADIUS, Color, typography } from "@freelbee/shared/ui-kit";
import { NavLink } from "./interface/NavLink";

interface Props extends NavLink {
  isActive: boolean;
}

export const NavigationLink = ({link, title, Icon, isActive}: Props) => {

  return (
    <Link href={link}>
        <LinkToPage $active={isActive}>
            <Icon stroke={isActive ? Color.GRAY_800 : Color.GRAY_600} />
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
