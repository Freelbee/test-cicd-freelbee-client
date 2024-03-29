'use client';

import { Color, typography } from "@freelbee/shared/ui-kit";
import styled from "styled-components";
import { ReactComponent as CopyIcon} from "@freelbee/assets/icons/copy/copy.svg";
import { toast } from "react-toastify";

interface Props {
    // To-DO interface
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user: any;
}

export const CopyUser = ({user}: Props) => {

    const copyToClipboard = () => {
        if(!user) return;
        window.navigator.clipboard.writeText(`user id: ${user.id};\nemail: ${user.email};\ncompany id: ${user.currentCompany.id};`);
        toast('Your ID has been copied to the clipboard!')
    };

  return (
    <AccountId onClick={() => copyToClipboard()}>
        Copy my ID
        <CopyIcon/>
    </AccountId>
  )
}

const AccountId = styled.button`
  ${typography.body};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  position: relative;
  color: ${Color.GRAY_900};
  background: ${Color.GRAY_200};
  border-radius: 10px;
  cursor: pointer;

  svg {
    stroke: ${Color.GRAY_600};
    width: 18px;
    height: 18px;
  }
`;