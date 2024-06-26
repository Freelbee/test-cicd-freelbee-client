'use client';

import styled from 'styled-components';

import { ReactComponent as LogoutIcon} from '@freelbee/assets/icons/menu-icons/exit.svg';
import {  Color, Text, typography } from '@freelbee/shared/ui-kit';
import { useRouter } from 'next/navigation';
import { useLogoutMutation } from '@company/entities';

export const AccountActions = () => {
    const [logout] = useLogoutMutation();
    const router = useRouter();

    const onLogout = () =>{
        logout().unwrap().then(()=>{
          router.push('/');
        })
    };

  return (
    <AccountLinks>
        <AccountLink onClick={onLogout}>
            <LogoutIcon stroke={Color.GRAY_800} />
            <Text font='body'>
                Exit
            </Text>
        </AccountLink>
    </AccountLinks>
  )
}


const AccountLinks = styled.div`
  padding: 8px 0;
  border-bottom: 1px solid #d7d8de;
  border-top: 1px solid #d7d8de;
`;

const AccountLink = styled.div`
  cursor: pointer;
  ${typography.body};
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

