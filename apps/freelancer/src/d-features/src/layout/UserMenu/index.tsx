'use client';

import {useRef, useState} from 'react';
import styled from 'styled-components';

import { ReactComponent as ArrowIcon} from '@freelbee/assets/icons/arrow-icons/arrow_down.svg';
import { useOnClickOutside } from '@freelbee/shared/hooks';
import { DOMHelper } from '@freelbee/shared/helpers';
import { Breakpoint, Color, mediaBreakpointDown, mediaBreakpointUp } from '@freelbee/shared/ui-kit';
import { ProfileVerificationLink } from './ui/ProfileVerificationLink';
import { CopyUser } from './ui/CopyUser';
import { TechInfo } from './ui/TechInfo';
import { AccountActions } from './ui/AccountActions';
import { UserBadge } from '@freelancer/entities';

export function UserMenu () {

    const [profileMenuIsOpen, setProfileMenuIsOpen] = useState(false);
    const modalRef = useRef(null);
    const buttonRef = useRef(null);

    // MOCK
    const user = {
      id: 1,
      firstname: 'Testov',
      lastname: 'Test',
      email: 'test@mail.com',
      status: 'not approved'
    }

    useOnClickOutside(modalRef, () => {
        setProfileMenuIsOpen(false);
    }, buttonRef);

    const toggleMenu = () => {
        setProfileMenuIsOpen((prevState) => !prevState);
    };

    return (
      <PersonalMenuAccount
          tabIndex={0}
          ref={modalRef}
          onKeyDown={(e) => DOMHelper.handleEnterKeydown(e, toggleMenu)}
          onClick={(e) => DOMHelper.isNotChildOfElem(e) && toggleMenu()}>

          <UserBadge 
            onClick={toggleMenu}
            status={user.status}
            name={`${user.firstname} ${user.lastname}`}
            subInfo={user.status === 'not approved' && <ProfileVerificationLink />} />

          <OpenMenu $isOpened={profileMenuIsOpen} onClick={toggleMenu}>
              <ArrowIcon />
          </OpenMenu>

          <AccountPopup $isOpen={profileMenuIsOpen}>

              <AccountUserData>

                  <UserBadge 
                    onClick={toggleMenu}
                    status={user.status}
                    name={`${user.firstname} ${user.lastname}`}
                    subInfo={user.status === 'not approved' && <ProfileVerificationLink />} />
                      
                  <CopyUser user={user} />
              </AccountUserData>

              <AccountActions />
              <TechInfo />

          </AccountPopup>
      </PersonalMenuAccount>
    );
}

const PersonalMenuAccount = styled.div`
  margin-left: auto;
  position: relative;
  display: grid;
  grid-gap: 8px;
  grid-template-columns: max-content max-content max-content;
  align-items: center;
`;

const OpenMenu = styled.div<{ $isOpened: boolean }>`
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
  box-shadow: 0px 4px 34px rgba(0, 0, 0, 0.15);
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

const AccountUserData = styled.div`
  display: grid;
  grid-gap: 16px;
  align-items: center;
`;