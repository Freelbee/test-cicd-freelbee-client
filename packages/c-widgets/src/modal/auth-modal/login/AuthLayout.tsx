'use client'
import React, {useContext} from 'react';
import styled from 'styled-components';


import AuthStepView, {AuthStepViewType} from '../AuthStepView';
import {Breakpoint, Color, mediaBreakpointDown, typography} from "@freelbee/shared/ui-kit";
import sidebarBg from '@freelbee/assets/images/authSidebar.png'
import {LoginContext} from "./LoginContext";
import {RegistrationSteps} from "../registration/RegistrationSteps";
import {LoginSteps} from "./LoginSteps";

type Props = {
    data: { sidebarTitle: string, sidebarText: string, sidebarLinkText: string };
    onClick: React.MouseEventHandler<HTMLDivElement>
    steps?: { step: RegistrationSteps | LoginSteps, text: string }[];
    children?: React.ReactNode;
};

export default function AuthLayout (props: Props) {
    const { data, onClick, steps, children } = props;

    const { step, setStep } = useContext(LoginContext);

    return (
        <>
            <MapContainer>
                <Map>
                    <MapText>
                        <MapTitle>
                            {data.sidebarTitle}
                        </MapTitle>
                        <MapParagraph>
                            {data.sidebarText} <br />
                            <MapButtonSwitchAuth onClick={onClick}>
                                {data.sidebarLinkText}
                            </MapButtonSwitchAuth>
                        </MapParagraph>
                    </MapText>
                    <RoadMapDesktop>
                        {steps?.map((oneStep, index) =>
                            <AuthStepView
                                key={index}
                                currentStep={step}
                                setCurrentStep={(step) =>{
                                  setStep(step as LoginSteps);
                                }}
                                elementStep={oneStep.step}
                                text={oneStep.text}
                                type={AuthStepViewType.Desktop}
                            />
                        )}
                    </RoadMapDesktop>
                </Map>
            </MapContainer>
            {steps && children &&
                <Auth>
                    <Container>
                        <Menu>
                            <HeadingParagraph>
                                {data.sidebarText} <br />
                                <MapButtonSwitchAuth onClick={onClick}>
                                    {data.sidebarLinkText}
                                </MapButtonSwitchAuth>
                            </HeadingParagraph>
                        </Menu>
                        <RoadMapMobile>
                            {steps?.map((oneStep, index) =>
                                <AuthStepView
                                    key={index}
                                    currentStep={step}
                                    setCurrentStep={(step) => {
                                      setStep(step as LoginSteps);
                                    }}
                                    elementStep={oneStep.step}
                                    text={oneStep.text}
                                    type={AuthStepViewType.Mobile}
                                />
                            )}
                        </RoadMapMobile>
                        <>
                            {children}
                        </>
                    </Container>
                </Auth>
            }
        </>
    );
}

const MapContainer = styled.div`
    height: 100%;
    width: 100%;
    padding: 15px;
    max-width: 370px;

    ${mediaBreakpointDown(Breakpoint.xTablet)} {
        padding: 8px;
        max-width: 265px;
    }

    ${mediaBreakpointDown(Breakpoint.xMobile)} {
        display: none;
    }
`;

const Map = styled.div`
    position: relative;
    border-radius: 14px;
    height: 100%;
    width: 100%;
    padding: 48px;
    background: rgba(40, 44, 56, 0.4) url(${(sidebarBg as unknown as {src: string}).src});
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    ${mediaBreakpointDown(Breakpoint.xTablet)} {
        padding: 24.5px;
    }
`;

const MapText = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const MapTitle = styled.div`
    ${typography.title2};
    color: ${Color.WHITE};
`;

const MapParagraph = styled.div`
    ${typography.bodySmall};
    color: ${Color.WHITE};
`;

const MapButtonSwitchAuth = styled.div`
    ${typography.bodySmall};
    color: ${Color.GRAY_500};

    cursor: pointer;
`;

const RoadMapDesktop = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: end;
    gap: 16px;
`;

const Auth = styled.div`
    width: 100%;
    height: 100%;
    padding: 20px;
    padding-top: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    ${mediaBreakpointDown(Breakpoint.xMobile)} {
        justify-content: space-between;
        overflow: auto;
        padding: 0;
    }
`;

const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    ${mediaBreakpointDown(Breakpoint.xMedium)} {
        overflow-y: scroll;
        &::-webkit-scrollbar {
            width: 0;
        }
    }

    ${mediaBreakpointDown(Breakpoint.xMobile)} {
        width: 260px;
        justify-content: flex-start;
    }
`;

const Menu = styled.div`
    display: none;

    ${mediaBreakpointDown(Breakpoint.xMobile)} {
        max-width: 416px;
        width: 100%;
        height: 34px;
        display: flex;
        flex-direction: column;
    }
`;

const HeadingParagraph = styled.div`
    ${typography.body};
    color: ${Color.GRAY_900};
`;

const RoadMapMobile = styled.div`
    display: none;

    ${mediaBreakpointDown(Breakpoint.xMobile)} {
        width: 100%;
        padding: 30px 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
`;
