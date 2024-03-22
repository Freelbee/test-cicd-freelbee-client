'use client';

import { styled } from "styled-components";

import { CURRENCIES } from "../data/currenciesData";
import { Icon } from "../interface/Icon";
import { LoopSlider } from "@landing/entities";
import Image from "next/image";

export const CurrenciesSlider = () => {

    const renderCurrency = ({alt, Icon}: Icon) => (
        <IconContainer key={alt}>
            <Image src={Icon} alt={alt} width={60} height={60}/>
        </IconContainer>
    );

    return (
        <LoopSlider<Icon> items={CURRENCIES} renderSlide={renderCurrency} speed={65}/>
    );
};
export const IconContainer = styled.div`
    flex-shrink: 0;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 30px;
    margin-left: 35px;
`;

