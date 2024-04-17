'use client';

import { BORDER_RADIUS, Breakpoint, Button, ButtonStyleEnum, Color, Text, Title1, mediaBreakpointDown } from "@freelbee/shared/ui-kit";
import Image, { StaticImageData } from "next/image";
import { HTMLAttributes, MouseEventHandler } from "react";
import styled, { css } from "styled-components";

interface Props extends HTMLAttributes<HTMLDivElement> {
    background?: Color | string,
    textColor?: Color,
    header: JSX.Element | string,
    message: JSX.Element | string,
    imageSrc?: string |  StaticImageData,
    action?: MouseEventHandler<HTMLButtonElement>,
    buttonType?: ButtonStyleEnum,
    buttonText?: string
}

export const InfoBadge = (props: Props) => {

    const {
        background = Color.YELLOW, 
        header, 
        message, 
        imageSrc, 
        textColor = Color.GRAY_900, 
        action,
        buttonType = ButtonStyleEnum.BLACK,
        buttonText,
        ...rest} = props;

  return (
    <Container
    $background={background}
    {...rest}>
        <TextContent>
            <Title1 $color={textColor}>{header}</Title1>
            <Text font='body' color={textColor}>{message}</Text>                
            {action && buttonText &&
            <Button 
                styles={buttonStyle}
                onClick={action} 
                isSmallHeight
                styleType={buttonType}
                wideOnBreakPoint={375}
            >{buttonText}</Button>}
            
        </TextContent>
        {imageSrc &&
        <ImageWrapper>
            <Image src={imageSrc} fill alt="notification image" />
        </ImageWrapper>}
    </Container>
  )
}

const Container = styled.div<{$background: Color | string}>`
    position: relative;
    display: flex;
    align-items: center;
    border-radius: ${BORDER_RADIUS.L};
    background: ${({$background}) => $background};
    padding: 32px;
    overflow: hidden;

    ${mediaBreakpointDown(Breakpoint.Tablet)} {
        padding: 24px;
    }
`

const TextContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-width: 60%;

    ${mediaBreakpointDown(Breakpoint.xMobile)} {
        max-width: 100%;
    }
`

const ImageWrapper = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 40%;

    img {
        object-fit: contain;
        object-position: right;
    }

    ${mediaBreakpointDown(Breakpoint.xMobile)} {
        display: none;
    }
`

const buttonStyle = css`
    margin-top: 24px;

    ${mediaBreakpointDown(Breakpoint.Medium)} {
        margin-top: 8px;
    }
`