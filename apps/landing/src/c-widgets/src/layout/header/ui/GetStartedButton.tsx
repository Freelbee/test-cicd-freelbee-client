'use client';

import { SquareButton } from "@freelbee/shared/ui-kit";
import { Breakpoint, SquareButtonStyle } from "@freelbee/shared/ui-kit";
import {ReactComponent as StartIcon} from '@freelbee/assets/icons/alert-icons/flash.svg';
import { useQueryParamsNavigation } from "@freelbee/shared/hooks";
import { ModalQueryValue } from "@landing/entities";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLButtonElement> {};

export const GetStartedButton = (props: Props) => {

    const [, navigateWithParam] = useQueryParamsNavigation();
    
  return (
    <SquareButton 
        Icon={<StartIcon />}
        wideOnBreakPoint={Breakpoint.xMobile}
        strokeIcon
        styleType={SquareButtonStyle.GREEN}
        as='button'
        {...props}
        onClick={() => navigateWithParam('modal', ModalQueryValue.START)}
        data-crmid={`header_start`}>Get started</SquareButton>   
  )
}