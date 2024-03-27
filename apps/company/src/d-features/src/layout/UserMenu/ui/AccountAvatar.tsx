import { ReactComponent as VerificationIcon} from "@freelbee/assets/icons/user/verification.svg";
import { ReactComponent as WaitingIcon} from "@freelbee/assets/icons/user/waiting.svg";
import { BORDER_RADIUS, Color } from "@freelbee/shared/ui-kit";
import { HTMLAttributes } from "react";
import styled from "styled-components";

interface Props extends HTMLAttributes<HTMLDivElement> {
    // To-DO interface
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user: any;
}


export const AccountAvatar = ({user, ...rest}: Props) => {

    const getStatusIcon = (status: string) => {
        switch (status) {
          case 'approved':
            return <VerificationIcon fill={Color.EMERALD} />;
          case 'waiting':
            return <WaitingIcon fill={Color.YELLOW} />;
        
        }
      }

  return (
    <NameWrapper {...rest}>
        <Avatar>
            {user.firstname[0]}
        </Avatar>         
        {getStatusIcon(user.status)}             
    </NameWrapper>
  )
}


const NameWrapper = styled.div`
    position: relative;

    svg {
      width: 16px;
      height: 16px;
      position: absolute;
      bottom: -2px;
      right: -4px;
    }
`

const Avatar = styled.div`
  cursor: pointer;
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
`;
