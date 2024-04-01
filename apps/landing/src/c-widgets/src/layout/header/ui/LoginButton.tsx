'use client';

import styled from "styled-components";

import { ReactComponent as UserIcon} from '@freelbee/assets/icons/user/user.svg';
import { Breakpoint, Color, Text, mediaBreakpointDown } from "@freelbee/shared/ui-kit";
import { useQueryParamsNavigation } from "@freelbee/shared/hooks";
import { ModalQueryValue } from "@landing/entities";

export const LoginButton = ({...rest}: React.HTMLAttributes<HTMLButtonElement> ) => {

    const [, navigateWithParam] = useQueryParamsNavigation();

  return(<Button
      {...rest}
      onClick={() => navigateWithParam('modal', ModalQueryValue.LOGIN)}>
      <UserIcon />
      <Text font='body'>Log in</Text>
    </Button>
  );

}
const Button = styled.button`
    cursor: pointer;
    border-radius: 14px;
    border: 1px solid ${Color.GRAY_900};
    padding: 14px 16px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    transition: background-color 0.5s;

    svg {
        width: 20px;
        stroke: ${Color.GRAY_900};

        ${mediaBreakpointDown(Breakpoint.Tablet)} {
            width: 18px;
        }
    }

    &:hover {
        background-color: ${Color.WHITE};
    }
`;
