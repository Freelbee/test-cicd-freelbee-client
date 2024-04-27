'use client';

import { Currency } from "@freelbee/entities";
import { Color, Text } from "@freelbee/shared/ui-kit";
import Image from "next/image";
import styled from "styled-components";

interface Props {
    currency: Currency;
}

export const CurrencySelectItem = ({currency}: Props) => {
  return (
    <CurrencyContainer>
        <NameContainer>
            {currency.iconUrl && <Image src={currency.iconUrl} alt={currency?.name ?? ''} width={18} height={18} />}
            <Text font='body'>
            {currency?.code?.toUpperCase() ?? ''}
            </Text>        
        </NameContainer>
        {currency.blockchainNetwork &&
        <NetworkContainer>
        <Text font='body' color={Color.GRAY_600}>
        {currency.blockchainNetwork}
        </Text>                
        </NetworkContainer>}                
    </CurrencyContainer> 
  )
}


const CurrencyContainer = styled.div`
width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const NetworkContainer = styled.span`
  display: inline-block;
  padding: 2px 6px;
  background-color: ${Color.GRAY_300};
  border-radius: 10px;
`;

const NameContainer = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
`;