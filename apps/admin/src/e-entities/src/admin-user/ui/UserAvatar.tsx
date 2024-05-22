'use client';

import { ReactComponent as UserIcon } from '@freelbee/assets/icons/user/person.svg';
import { BORDER_RADIUS, Color } from '@freelbee/shared/ui-kit';
import { HTMLAttributes } from 'react';
import styled from 'styled-components';

interface Props extends HTMLAttributes<HTMLDivElement> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  avatarContent?: string;
}

export const UserAvatar = ({ avatarContent, ...rest }: Props) => {
  return (
    <NameWrapper {...rest}>
      <Avatar>{avatarContent || <UserIcon />}</Avatar>
    </NameWrapper>
  );
};

const NameWrapper = styled.div`
  position: relative;

  svg {
    width: 16px;
    height: 16px;
    position: absolute;
    bottom: -2px;
    right: -4px;
  }
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${Color.GRAY_300};
  background-size: cover;
  border-radius: ${BORDER_RADIUS.S};
  line-height: 1.4;
  font-weight: 600;
  color: ${Color.GRAY_800};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    position: static;
    width: 18px;
    height: 18px;
    stroke: ${Color.GRAY_600};
  }
`;
