'use client';

import { Button, ButtonStyleEnum, Color, Heading1, InfoWithIcon, Text } from "@freelbee/shared/ui-kit";
import styled from "styled-components";
import {ReactComponent as AlertIcon} from '@freelbee/assets/icons/alert-icons/alert_icon.svg';
import { ActionsContainer } from "@freelancer/features";

export const PaymentStep = () => {
  return (
    <div>
        <Header>
            <Heading1>Payment detail</Heading1>
            <Text font='body'>Select the payment method by which you want to receive a reward from the drop-down list below</Text>
        </Header>

        <Container>
            <InfoWithIcon
                Icon={AlertIcon}
                textColor={Color.BLUE}
                align='flex-start'
                font='body'
            >
                Fill all fields with * to continue.
            </InfoWithIcon>      
            <ActionsContainer>
                <Button
                    isWide
                    onClick={() => {}}
                    styleType={ButtonStyleEnum.GREEN}>
                    Next
                </Button>
                <Button
                    onClick={()=> {}}
                    isWide>
                    Back
                </Button>
            </ActionsContainer>      
        </Container>

    </div>
  )
}

const Container = styled.div`
    display: grid;
    gap: 16px;
`

const Header = styled.div`
    display: grid;
    gap: 8px;
`