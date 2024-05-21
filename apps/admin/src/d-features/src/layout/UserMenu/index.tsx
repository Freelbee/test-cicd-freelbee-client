'use client';

import { useRef, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as ArrowIcon } from '@freelbee/assets/icons/arrow-icons/arrow_down.svg';
import { useOnClickOutside } from '@freelbee/shared/hooks';
import { Breakpoint, Color, mediaBreakpointDown, mediaBreakpointUp, Text, typography } from '@freelbee/shared/ui-kit';
import { useGetAdminUserQuery, UserBadge } from '@admin/entities';
import { Token_Enum } from '@admin/shared';
import { useRouter } from 'next/navigation';
import { ReactComponent as LogoutIcon } from '@freelbee/assets/icons/menu-icons/exit.svg';

export function UserMenu() {
  const router = useRouter();
  const modalRef = useRef(null);
  const buttonRef = useRef(null);
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);

  const { data: adminUser, status } = useGetAdminUserQuery();

  useOnClickOutside(modalRef, () => {
    setProfileMenuOpen(false);
  }, buttonRef);

  const toggleProfileMenu = () => setProfileMenuOpen(!isProfileMenuOpen);

  const logout = () => {
    localStorage.removeItem(Token_Enum.ACCESS_TOKEN);
    localStorage.removeItem(Token_Enum.REFRESH_TOKEN);
    router.push('/');
  };

  if (!adminUser) return <></>;

  return (
    <PersonalMenuAccount ref={modalRef}>
      <UserBadge
        onClick={toggleProfileMenu}
        avatarContent={adminUser.telegramUser.photoUrl}
        status={null}
        name={`${adminUser.telegramUser.firstName ?? ''} ${adminUser.telegramUser.lastName ?? ''}`}
        subInfo={<Text>{adminUser.email}</Text>}
      />
      <OpenProfileMenuButton $isOpened={isProfileMenuOpen} onClick={toggleProfileMenu}>
        <ArrowIcon />
      </OpenProfileMenuButton>
      <AccountPopup $isOpen={isProfileMenuOpen}>
        <LogoutButton onClick={logout}>
          <LogoutIcon stroke={Color.GRAY_800} />
          <Text>Log out</Text>
        </LogoutButton>
      </AccountPopup>
    </PersonalMenuAccount>
  )
}

const PersonalMenuAccount = styled.div`
  margin-left: auto;
  position: relative;
  display: grid;
  grid-gap: 8px;
  grid-template-columns: max-content max-content max-content;
  align-items: center;
`;

const LogoutButton = styled.div`
  ${typography.body};
  cursor: pointer;
  color: ${Color.GRAY_900};
  display: flex;
  justify-content: flex-start;
  gap: 8px;
  align-items: center;
  padding: 10px 16px;
  transition: background 0.5s;
  border-radius: 10px;

  &:hover {
    background: ${Color.GRAY_200};
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const OpenProfileMenuButton = styled.div<{ $isOpened: boolean }>`
  cursor: pointer;
  width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 500ms;
  transform: ${({ $isOpened }) => $isOpened ? 'scaleY(-1)' : 'scaleY(1)'};

  svg {
    stroke: ${Color.GRAY_800};
    width: 100%;
    height: 100%;
  }
`;

const AccountPopup = styled.div<{ $isOpen: boolean }>`
  z-index: 10;
  padding: 16px;
  position: absolute;
  top: ${({ $isOpen }) => $isOpen ? 'calc(100% + 20px)' : '100%'};
  right: -16px;
  width: 258px;
  background: #ffffff;
  box-shadow: 0 4px 34px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  display: grid;
  grid-auto-rows: auto;
  grid-gap: 16px;
  visibility: ${({ $isOpen }) => $isOpen ? 'visible' : 'hidden'};
  opacity: ${({ $isOpen }) => $isOpen ? 1 : 0};;
  transition: visibility .5s, opacity .5s, top .5s;
  pointer-events: ${({ $isOpen }) => $isOpen ? 'unset' : 'none'};

  ${mediaBreakpointUp(Breakpoint.Large)} {
    width: 320px;
  }

  ${mediaBreakpointDown(Breakpoint.xMobile)} {
    position: fixed;
    top: 80px;
    left: 10px;
    right: 10px;
    width: inherit;
  }
`;
