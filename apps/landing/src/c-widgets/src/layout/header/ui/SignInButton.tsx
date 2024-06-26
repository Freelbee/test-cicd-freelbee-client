'use client';

import {ReactComponent as LoginIcon} from '@freelbee/assets/icons/user/login.svg';
import { SquareButton } from "@freelbee/shared/ui-kit";
import { useQueryParamsNavigation } from '@freelbee/shared/hooks';
import { Breakpoint, SquareButtonStyle } from '@freelbee/shared/ui-kit';
import { ModalQueryValue } from '@landing/entities';
import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLButtonElement> {};

export const SignInButton = (props: Props) => {

    const [, navigateWithParam] = useQueryParamsNavigation();
    
  return (
    <SquareButton 
        Icon={<LoginIcon />}
        styleType={SquareButtonStyle.STROKE_BLACK}
        wideOnBreakPoint={Breakpoint.xMobile}
        as='button'
        {...props}
        onClick={() => navigateWithParam('modal', ModalQueryValue.LOGIN)}
        data-crmid={`header_login`}>Sign in</SquareButton>      
  )
}
