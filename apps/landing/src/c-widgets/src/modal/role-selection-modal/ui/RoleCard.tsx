'use client';

import { Color, Text } from "@freelbee/shared/ui-kit";
import Image from "next/image";
import { HTMLAttributes } from "react";
import styled from "styled-components";

interface Props extends HTMLAttributes<HTMLAnchorElement>{
    icon: string;
    name: string;
    url: string;
    color?: Color;
}

export const RoleCard = ({icon, name, url, color = Color.EMERALD, ...rest}: Props) => {
  return (
    <Container {...rest} $roleColor={color} href={url} target='_blank'>
        <Image src={icon} width={95} height={104} alt="Role image" />
        <Text font='body' color={Color.GRAY_700}>{name}</Text>
    </Container>
  )
}

const Container = styled.a<{$roleColor: Color}>`
    width: 100%;
    min-width: 222px;
    min-height: 222px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    border: 1px solid ${Color.GRAY_400};
    padding: 16px;
    cursor: pointer;
    transition: border 0.5s;

    &:hover {
        border: 1px solid ${({$roleColor}) => $roleColor};
    }
`;