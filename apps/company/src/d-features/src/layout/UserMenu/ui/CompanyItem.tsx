'use client';

import { BORDER_RADIUS, Color, Text } from "@freelbee/shared/ui-kit";
import styled, { css } from "styled-components";
import { LinkButton, LinkStyle } from "@freelbee/features/common";
import { HTMLAttributes } from "react";
import { ReactComponent as VerificationIcon} from "@freelbee/assets/icons/user/verification.svg";
import { ReactComponent as WaitingIcon} from "@freelbee/assets/icons/user/waiting.svg";

interface Props extends HTMLAttributes<HTMLDivElement> {
    selected: boolean;
    company: {
        id: number,
        name: string,
        status: string,
      }
}

export const CompanyItem = ({company, selected, ...rest}: Props) => {

      const getStatusIcon = (status: string) => {
        switch (status) {
          case 'approved':
            return <VerificationIcon fill={Color.EMERALD} />;
          case 'waiting':
            return <WaitingIcon fill={Color.YELLOW} />;
        
        }
      }

  return (
    <Container selected={selected} {...rest}>

        <NameWrapper>
        <CompanyAvatar>
            {company.name[0]}
        </CompanyAvatar>         
        {getStatusIcon(company.status)}             
        </NameWrapper>


        <CompanyInfo>
            <Text font='bodyMedium' color={Color.GRAY_700} styles={clampNameStyles}>
                {company.name}
            </Text>   
            {company.status === 'not approved' && 
            <LinkButton as='button' linkStyle={LinkStyle.BLUE} font='bodySmall'>
                Verify Company
            </LinkButton>}
        </CompanyInfo>
  </Container>
  )
}

const clampNameStyles = css`
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  box-orient: vertical;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Container = styled.span<{selected: boolean}>`
  display: flex;
  gap: 8px;
  border-radius: ${BORDER_RADIUS.S};
  box-shadow: ${({selected}) => selected && '0 2px 2px rgb(0 0 0 / 8%)'};
`;

const CompanyInfo = styled.span`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 2px;
`;

const NameWrapper = styled.div`
    position: relative;

    svg {
        width: 14px;
        height: 14px;
        position: absolute;
        bottom: -1px;
        right: -3px;
    }
`

const CompanyAvatar = styled.div`
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