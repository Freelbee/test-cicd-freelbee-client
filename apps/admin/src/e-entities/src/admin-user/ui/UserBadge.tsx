'use client';

import { Text } from '@freelbee/shared/ui-kit';
import { ForwardedRef, HTMLAttributes, ReactNode, forwardRef } from 'react';
import styled, { css } from 'styled-components';
import { UserAvatar } from './UserAvatar';

interface Props extends HTMLAttributes<HTMLDivElement> {
  // To-DO interface
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  status: any;
  avatarContent?: string;
  name?: string;
  subInfo?: ReactNode;
}

export const UserBadge = forwardRef(
  function Badge({ status, avatarContent, name, subInfo, ...rest }: Props, ref: ForwardedRef<HTMLDivElement>) {
    return (
      <Container {...rest}>
        <UserAvatar status={status} avatarContent={avatarContent} />
        <AccountName ref={ref} {...ref}>
          <Text font="bodyMedium" styles={clampNameStyles}>{name}</Text>
          {subInfo}
        </AccountName>
      </Container>
    )
  });

const clampNameStyles = css`
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  box-orient: vertical;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AccountName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  gap: 8px;
  cursor: pointer;
`;
