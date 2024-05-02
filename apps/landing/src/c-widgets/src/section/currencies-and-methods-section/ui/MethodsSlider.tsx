'use client';

import { styled } from "styled-components";

import { METHODS } from "../data/methodsData";
import { LoopSlider } from "@landing/entities";
import { Icon } from "../interface/Icon";
import Image from "next/image";

export const MethodsSlider = () => {

    const renderMethod = ({alt, Icon}: Icon) => (
        <IconContainer key={alt}>
            <Image src={Icon} alt={alt} width={112} height={61}/>
        </IconContainer>
    );

    return (
        <LoopSlider<Icon> items={METHODS} renderSlide={renderMethod} direction='left' speed={50}/>
    );
};

export const IconContainer = styled.div`
    flex-shrink: 0;
    width: 112px;
    height: 61px;
    border-radius: 8px;
    overflow: hidden;
    margin-right: 20px;
    margin-left: 20px;

    svg {
        width: 100%;
    }
`;

