'use client';

import Image from "next/image";
import styled from "styled-components";

import personImage from "@landing/assets/images/thanks-for-booking/freelman.svg";

import { SectionTitle } from "@landing/shared";
import { Breakpoint, ButtonStyleEnum, Text, Title1, mediaBreakpointDown, vw, Button } from "@freelbee/shared/ui-kit";

export const TextWithAction = () => (
    <Container>
        <TextContainer>
            <SectionTitle>
                <Title1>Thank you for&nbsp;booking</Title1>
                <div>
                    <Text font='body' as='p'>Our manager will contact you shortly!</Text>
                    <Text font='body' as='p'>You also can choose a time for a call on Calendly</Text>                
                </div>
            </SectionTitle>

            <ButtonsContainer>
                <a href="https://calendly.com/freelbee/30min" target="_blank">
                    <Button 
                        wideOnBreakPoint={Breakpoint.xMobile}
                        styleType={ButtonStyleEnum.GREEN}>
                        Choose a&nbsp;time
                    </Button>
                </a>

                <a href={process.env.NEXT_PUBLIC_PERSONAL_URL ?? '/'} target="_blank" aria-label='To the personal account'>
                    <Button
                        wideOnBreakPoint={Breakpoint.xMobile}
                        styleType={ButtonStyleEnum.STROKE_WHITE}>
                        Free sign&nbsp;up
                    </Button>
                </a>

            </ButtonsContainer>
        </TextContainer>  

        <ImageWrapper>
            <Image src={personImage} alt='freelancer image' fill />
        </ImageWrapper>  
    </Container>
);

const Container = styled.div`
    display: flex;
    gap: 16px;
    justify-content: center;
    align-items: center;

    ${mediaBreakpointDown(Breakpoint.Medium)} {
        gap: 0px;
        justify-content: space-around;
    }

    ${mediaBreakpointDown(Breakpoint.xMobile)} {
        flex-direction: column;
        justify-content: center;
        padding-top: 32px;
    }
`;

const TextContainer = styled.div`
    min-width: 355px;

    ${mediaBreakpointDown(Breakpoint.Medium)} {
        min-width: ${vw(270, Breakpoint.Tablet)};
    }

    ${mediaBreakpointDown(Breakpoint.xMobile)} {
        min-width: unset;
    }
`;

const ButtonsContainer = styled.div`
    display: flex;
    gap: 16px;

    ${mediaBreakpointDown(Breakpoint.Tablet)} {
        flex-direction: column;
    }
`;

const ImageWrapper = styled.div`
    position: relative;
    width: 506px;
    height: 416px;

    ${mediaBreakpointDown(Breakpoint.Medium)} {
        margin-right: -${vw(100, Breakpoint.Medium)};
    }

    ${mediaBreakpointDown(Breakpoint.xMobile)} {
        margin-right: 0px;
        width: 434px;
        height: 374px;
    }
`;