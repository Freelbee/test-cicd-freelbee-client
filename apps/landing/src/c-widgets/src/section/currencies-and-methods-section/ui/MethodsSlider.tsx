'use client';

import { styled } from "styled-components";

import { METHODS } from "../data/methodsData";
import { LoopSlider } from "@landing/entities";
import { Icon } from "../interface/Icon";


export const MethodsSlider = () => {

    const renderMethod = ({alt, Icon}: Icon) => (
        <IconContainer key={alt}>
            <Icon/>
        </IconContainer>
    );

    return (
        <LoopSlider<Icon> items={METHODS} renderSlide={renderMethod} direction='left' speed={22}/>
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

