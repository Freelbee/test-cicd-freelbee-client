import { LinkButton, LinkStyle } from "@freelbee/features/common";
import { Color, Text } from "@freelbee/shared/ui-kit";

import { ReactComponent as HelpIcon} from '@freelbee/assets/icons/menu-icons/help.svg';
import styled from "styled-components";

export const TechInfo = () => {
  return (
    <AccountManagerData>
        <MenuTitle>
        <HelpIcon stroke={Color.GRAY_800} width={18} height={18} />
        <Text color={Color.GRAY_900} font='bodyMedium'>
            Tech support
        </Text>                  
        </MenuTitle>

        <LinkButton 
            linkStyle={LinkStyle.GRAY}
            as='a'
            href='mailto:hello@freelbee.com'>
            hello@freelbee.com
        </LinkButton>
    </AccountManagerData>
  )
}

const MenuTitle = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 8px;
`

const AccountManagerData = styled.span`
  display: grid;
  grid-auto-rows: 30px;
  justify-items: flex-start;
`;
