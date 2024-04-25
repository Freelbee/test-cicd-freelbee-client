'use client'
import React, { ReactNode, useEffect, useState } from 'react';
import styled from 'styled-components';
import {Breakpoint, Color, mediaBreakpointDown, typography} from "@freelbee/shared/ui-kit";

import CheckIcon from '@freelbee/assets/icons/check/roadmapCheck.svg';
import {RegistrationSteps} from "./registration/RegistrationSteps";
import {LoginSteps} from "./login/LoginSteps";



export enum AuthStepViewType {
    Mobile,
    Desktop
}

enum AuthStepState {
    Passed,
    Selected,
    NotPassed
}

type Props = {
    currentStep: RegistrationSteps | LoginSteps,
    // setCurrentStep: Dispatch<SetStateAction<RegistrationSteps>> | Dispatch<SetStateAction<LoginSteps>>,
    setCurrentStep: (step: RegistrationSteps | LoginSteps) => void,
    elementStep: RegistrationSteps | LoginSteps,
    text: string | ReactNode
    type: AuthStepViewType,
    disabled?: boolean
};

export default function AuthStepView (props: Props) {
    const { currentStep, setCurrentStep, elementStep, text, type, disabled = false } = props;

    const [state, setState] = useState<AuthStepState>(AuthStepState.NotPassed);

    useEffect(() => {
        if (currentStep === elementStep) {
            setState(AuthStepState.Selected);
        } else if (currentStep > elementStep) {
            setState(AuthStepState.Passed);
        } else {
            setState(AuthStepState.NotPassed);
        }
    }, [currentStep]);

    const classNamesByStateMobile = {
        [AuthStepState.NotPassed]: {
            step: ``,
            stepNum: ``,
            stepName: ``
        },
        [AuthStepState.Passed]: {
            step: `step_passedLevel`,
            stepNum: `stepNum_passedLevel`,
            stepName: `stepName_passedLevel`
        },
        [AuthStepState.Selected]: {
            step: `step_ourLevel`,
            stepNum: `stepNum_ourLevel`,
            stepName: `stepName_ourLevel`
        },
    };

    const classNamesByStateDesktop = {
        [AuthStepState.NotPassed]: `roadPoint_notPassed`,
        [AuthStepState.Passed]: `roadPoint_passed`,
        [AuthStepState.Selected]: ``,
    };

    const setStep = () => {
        if (!disabled && elementStep < currentStep) {
            setCurrentStep(elementStep);
        }
    };

    if (type === AuthStepViewType.Mobile) {
        return (
            <Step className={`${classNamesByStateMobile[state].step}`} onClick={setStep}>
                <StepNumber className={`${classNamesByStateMobile[state].stepNum}`}>
                    {elementStep + 1}
                </StepNumber>
                <StepName className={`${classNamesByStateMobile[state].stepName}`}>
                    {text}
                </StepName>
            </Step>
        );
    }
    return (
        <RoadPoint onClick={setStep}>
            <Circle className={`${classNamesByStateDesktop[state]}`}>
                {elementStep + 1}
            </Circle>
            <Paragraph className={`${classNamesByStateDesktop[state]}`}>
                {text}
            </Paragraph>
        </RoadPoint>
    );
}

const Step = styled.div`
    ${mediaBreakpointDown(Breakpoint.xMobile)} {
        height: 84px;
        width: calc(100% / 4);
        max-width: 68px;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        padding: 16px 4px 8px;
        gap: 8px;

        &.step_passedLevel {
            background: ${Color.WHITE};
        }

        &.step_ourLevel {
            background: ${Color.EMERALD};
        }
`;

const StepNumber = styled.div`
    ${typography.captions};
    background: ${Color.GRAY_300};
    color: ${Color.GRAY_900};

    width: 24px;
    height: 24px;
    border-radius: 20px;

    text-align: center;
    font-size: 12px;
    line-height: 24px;

    &.stepNum_ourLevel {
        background: ${Color.WHITE};
    }

    &.stepNum_passedLevel {
        position: relative;
        background-color: ${Color.EMERALD};
        color: ${Color.EMERALD};

        &:before {
            content: "";
            position: absolute;
            background: url(${CheckIcon}) center center no-repeat;
            height: 12px;
            width: 12px;
            margin: auto;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
        }
    }
`;

const StepName = styled.div`
    font-family: Golos Text, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 10px;
    line-height: 1.3;

    color: ${Color.GRAY_500};
    text-align: center;
    opacity: 0.5;

    &.stepName_ourLevel {
        color: ${Color.GRAY_900};
        opacity: 1;
    }

    &.stepName_passedLevel {
        color: ${Color.GRAY_600};
        opacity: 1;
    }
`;

const RoadPoint = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 16px;
`;

const Circle = styled.div`
    ${typography.captions};
    background: ${Color.GRAY_900};
    color: ${Color.WHITE};

    min-width: 40px;
    min-height: 40px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    ${mediaBreakpointDown(Breakpoint.xTablet)} {
        min-width: 36px;
        min-height: 36px;
    }

    &.roadPoint_passed {
        background: ${Color.WHITE};
        color: ${Color.WHITE};
        position: relative;

        &:before {
            content: "";
            position: absolute;
            background: url(${CheckIcon}) center center no-repeat;
            height: 12px;
            width: 12px;
            margin: auto;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
        }

    }

    &.roadPoint_notPassed {
        background: ${Color.WHITE};
        color: ${Color.GRAY_600};
    }
`;

const Paragraph = styled.div`
    ${typography.body};
    color: ${Color.WHITE};

    &.roadPoint_passed {
        opacity: 0.5;
    }

    &.roadPoint_notPassed {
        opacity: 0.5;
    }
`;
