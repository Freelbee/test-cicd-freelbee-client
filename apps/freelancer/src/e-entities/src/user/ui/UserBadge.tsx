'use client';

import { Text } from "@freelbee/shared/ui-kit";
import { ForwardedRef, HTMLAttributes, ReactNode, forwardRef } from "react";
import styled from "styled-components";
import { UserAvatar } from "./UserAvatar";

interface Props extends HTMLAttributes<HTMLDivElement> {
    // To-DO interface
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    status: any;
    avatarContent?: string;
    name?: string;
    subInfo?: ReactNode;
}

export const UserBadge = forwardRef(function Badge ({status, avatarContent, name, subInfo, ...rest}: Props, ref: ForwardedRef<HTMLDivElement>) {
  return (
    <Container {...rest}>
        <UserAvatar status={status} avatarContent={avatarContent} />
        <AccountName
            ref={ref}
            {...ref}>
            <Text font='bodyMedium'>{name}
            </Text>   
            {subInfo}
        </AccountName>        
    </Container>

  )
});

const AccountName = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  gap: 8px;
`;