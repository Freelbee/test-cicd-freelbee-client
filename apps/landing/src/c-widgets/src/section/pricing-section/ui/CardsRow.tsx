'use client';

import { styled } from "styled-components";

import { Breakpoint, Color, Heading3, Text, Title1, mediaBreakpointDown, vw } from "@freelbee/shared/ui-kit";

export const CardsRow = () => (
    <Rows>
        <Card>
            <Title1 as='span'>2.99%</Title1>
            <Heading3 as='span' $color={Color.BLUE}>1 EUR<br/>minimum</Heading3>
            <CardText><Text font='body'>SEPA Instant Bank&nbsp;Transfer</Text></CardText>
        </Card>

        <Card>
            <Title1 as='span'>2.99%</Title1>
            <Heading3 as='span' $color={Color.BLUE}>1 GBP<br/>minimum</Heading3>
            <CardText><Text font='body'>Faster Payment Bank&nbsp;Transfer</Text></CardText>
        </Card>

        <Card>
            <Title1 as='span'>3.49%</Title1>
            <CardText><Text font='body'>
                Open Banking</Text></CardText>
        </Card>

        <Card>
            <SubRow>
                <SubCard>
                    <Title1 as='span'>5.5%</Title1>
                    <Heading3 as='span' $color={Color.BLUE}>for<br/>EUR </Heading3>
                    <MobileText><Text font='body'>Card payments<br/>(credit and debit)</Text></MobileText>
                </SubCard>
                <SubCard>
                    <Title1 as='span'>6%</Title1>
                    <Heading3 as='span' $color={Color.BLUE}>for<br/>USD </Heading3>
                    <MobileText><Text font='body'>Card payments<br/>(credit and debit)</Text></MobileText>
                </SubCard>
                <SubCard>
                    <Title1 as='span'>7.5%</Title1>
                    <Heading3 as='span' $color={Color.BLUE}>from&nbsp;for&nbsp;other<br/>currencies</Heading3>
                    <MobileBottomText><Text font='body'>Card payments (credit and debit)</Text></MobileBottomText>
                </SubCard>
            </SubRow>

            <DesktopText><Text font='body'>Card payments (credit and debit)</Text></DesktopText>
        </Card>

        <Card>
            <Title1 as='span'>0%</Title1>
            <CardText><Text font='body'>Contractors fee</Text></CardText>
        </Card>

        <Card>
            <Title1 as='span'>0%</Title1>
            <CardText><Text font='body'>Monthly fee per contractor</Text></CardText>
        </Card>
    </Rows>
);

const Rows = styled.div`
    display: grid;
    grid-template-rows: 211px 211px;
    grid-template-columns: repeat(9, 1fr);
    gap: 32px;

    grid-template-areas: 
            "a a a b b b c c c"
            "d d d d d e e f f";

    ${mediaBreakpointDown(Breakpoint.xMedium)} {
        gap: 24px;
        grid-template-columns: repeat(6, 1fr);
        grid-template-rows: auto auto;
        grid-template-areas: 
            "a a a b b b"
            "c c e e f f"
            "d d d d d d";
    }

    ${mediaBreakpointDown(Breakpoint.xMobile)} {
        gap: 16px;
        grid-template-columns: repeat(2, 1fr);
        grid-template-areas: 
            "a a"
            "b b"
            "c c"
            "e f"
            "d d";
    }
`;

const Card = styled.div`
    background-color: ${Color.WHITE};
    border-radius: 24px;
    padding: 46px;
    display: grid;
    row-gap: 12px;
    column-gap: 16px;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 0.8fr 1fr 1fr;

    ${mediaBreakpointDown(Breakpoint.xMedium)} {
        padding: ${vw(32, Breakpoint.xMedium)};
    }

    ${mediaBreakpointDown(Breakpoint.Tablet)} {
        padding: 16px;
        border-radius: 16px;
    }

    ${mediaBreakpointDown(Breakpoint.xMobile)} {
        grid-template-columns: minmax(90px, 102px) auto;
        row-gap: 8px;

        &:nth-child(4) {
            grid-template-rows: 1fr;
            background-color: transparent;
            padding: 0;
        }
    }

    &:nth-child(1) {
        grid-area: a;
    }
    &:nth-child(2) {
        grid-area: b;
    }
    &:nth-child(3) {
        grid-area: c;
    }
    &:nth-child(4) {
        grid-area: d;
    }
    &:nth-child(5) {
        grid-area: e;
    }
    &:nth-child(6) {
        grid-area: f;
    }
`;

const SubCard = styled.div`
    display: flex;
    gap: 20px;

    ${mediaBreakpointDown(Breakpoint.xMobile)} {
        display: grid;
        grid-template-columns: 80px auto 1fr;
        gap: 16px;
        border-radius: 16px;
        background-color: ${Color.WHITE};
        padding: 16px;
    }
`;

const CardText = styled.div`
    grid-row: 2;
    grid-column: span 2;
    ${mediaBreakpointDown(Breakpoint.xMedium)} {
        grid-column: span 3;
    }

    ${mediaBreakpointDown(Breakpoint.xMobile)} {
        grid-column: span 2;
        grid-row: auto;
    }
`;


const SubRow = styled.div`
    display: flex;
    gap: 32px;
    grid-column: span 2;

    ${mediaBreakpointDown(Breakpoint.xMobile)} {
        flex-direction: column;
        gap: 16px;
    }
`;

const MobileText = styled.div`
    display: none;

    ${mediaBreakpointDown(Breakpoint.xMobile)} {
        display: block;
        margin-left: auto;
    }
`;

const MobileBottomText = styled(MobileText)`
    grid-row: 2;
    grid-column: span 3;
    margin-left: unset;
`;

const DesktopText = styled(CardText)`
    ${mediaBreakpointDown(Breakpoint.xMobile)} {
        display: none
    }
`;