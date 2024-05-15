'use client';

import { Color, Text } from '@freelbee/shared/ui-kit';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon: any;
  text: string;
  link: string;
}

export const LowerPanelLink = ({ Icon, link, text }: Props) => {
  const pathName = usePathname();
  const isRouteActive = (link: string) => pathName.endsWith(link);

  return (
    <Link href={link}>
      <PanelLink $isActive={isRouteActive(link)}>
        <LowerPanelIcon><Icon /></LowerPanelIcon>
        <Text font="body">{text}</Text>
      </PanelLink>
    </Link>
  );
};

const PanelLink = styled.div<{ $isActive: boolean }>`
  width: 100%;
  padding: 10px 16px;
  display: grid;
  grid-template-columns: max-content max-content;
  align-items: center;
  grid-gap: 16px;
  background-color: ${({ $isActive }) => $isActive ? Color.GRAY_100 : 'transparent'};
  border-radius: 10px;
`;

const LowerPanelIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 20px;
    height: 20px;
    stroke: ${Color.GRAY_800};
  }
`;
