'use client';

import { Color, typography } from "@freelbee/shared/ui-kit";
import styled from "styled-components";
import { ReactComponent as CopyIcon} from "@freelbee/assets/icons/copy/copy.svg";
import { toast } from "react-toastify";

interface Props {
    id: number,
    email: string
}

export const CopyUser = ({id, email}: Props) => {

    const copyToClipboard = () => {
        if(!id || !email) return;
        window.navigator.clipboard.writeText(`user id: ${id};\nemail: ${email};`);
        toast('Your ID has been copied to the clipboard!', {
          theme: 'dark',
          type: 'success',
          position: 'top-right'
        })
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