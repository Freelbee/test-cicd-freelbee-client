'use client';

import {useRef, useState} from 'react';
import styled from 'styled-components';

import { ReactComponent as ArrowIcon} from '@freelbee/assets/icons/arrow-icons/arrow_down.svg';
// import { ReactComponent as OpenIcon} from '@freelbee/assets/icons/cross-icons/plus.svg';
import { useOnClickOutside } from '@freelbee/shared/hooks';
import { DOMHelper } from '@freelbee/shared/helpers';
import { Breakpoint, Color, mediaBreakpointDown, mediaBreakpointUp } from '@freelbee/shared/ui-kit';
// import { ProfileVerificationLink } from './ui/ProfileVerificationLink';
// import { CompanySwitcher } from './ui/CompanySwitcher';
import { CopyUser } from './ui/CopyUser';
import { TechInfo } from './ui/TechInfo';
import { AccountActions } from './ui/AccountActions';
import { UserBadge, useUserData } from '@company/entities';

export function UserMenu () {

    const [profileMenuIsOpen, setProfileMenuIsOpen] = useState(false);
    // const [companiesIsOpen, setCompaniesIsOpen] = useState(false);
    const [{id, email, userData}] = useUserData();
    const modalRef = useRef(null);
    const buttonRef = useRef(null);


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
            avatarContent={userData.props?.FIRST_NAME && userData.props?.FIRST_NAME[0] }
            status={userData.status}
            name={`${userData.props?.FIRST_NAME} ${userData.props.LAST_NAME}`} />

          <OpenMenu $isOpened={profileMenuIsOpen} onClick={toggleMenu}>
              <ArrowIcon />
          </OpenMenu>

          <AccountPopup $isOpen={profileMenuIsOpen}>

              <AccountUserData>

                  <AccountUserNames>

                  <UserBadge 
                    onClick={toggleMenu}
                    avatarContent={userData.props?.FIRST_NAME && userData.props.FIRST_NAME[0]}
                    status={userData.status}
                    name={`${userData.props.FIRST_NAME} ${userData.props.LAST_NAME}`} />

                    {/* <CompaniesButton 
                      onClick={() => {
                        setCompaniesIsOpen(prev => !prev)
                      }}
                      $opened={companiesIsOpen}
                      aria-label={companiesIsOpen ? 'close companies menu' : 'open companies menu'}>
                      <OpenIcon />
                    </CompaniesButton> */}
                      
                  </AccountUserNames>

                  {/* <CompanySwitcher
                    style={{
                      height: companiesIsOpen ? '250px' : '0px'
                    }} 
                    isOpen={companiesIsOpen}
                    toggleOpen={() => setCompaniesIsOpen(prev => !prev)}
                    companies={user.companies} 
                    selectedCompany={user.currentCompany} /> */}
                  
                  <CopyUser id={id} email={email} />
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

// const CompaniesButton = styled.button<{$opened: boolean}>`
//   display: block;
//   cursor: pointer;
//   flex-shrink: 0;
//   width: 20px;
//   height: 20px;
//   align-self: center;
//   margin-left: auto;
//   transition: transform 0.5s;
//   transform: ${({$opened}) => $opened ? 'rotate(45deg)' : 'rotate(0deg)'};

//   svg {
//     fill: ${Color.GRAY_700};
//     width: 16px;
//     height: 16px;
//   }
// `;

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

const AccountUserNames = styled.span`
  display: flex;
  gap: 8px;
`;
