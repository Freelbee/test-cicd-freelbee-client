'use client';

import { Suspense } from "react";

import { ActionButtonTryForFree } from "./ui/ActionButtonTryForFree";
import { BannerImage } from "./ui/BannerImage";
import { BannerRow } from "./ui/BannerRow";
import { Heading } from "./ui/Heading";
import { SectionId } from "@landing/entities";
import { BaseSectionBlock } from "@landing/shared";
import { ActionButtonAskAQuestion } from './ui/ActionButtonAskAQuestion';
import { Breakpoint, mediaBreakpointDown } from '@freelbee/shared/ui-kit';
import styled from 'styled-components';

export const StartSection = () => (
    <BaseSectionBlock style={{overflow: "hidden", paddingTop: '80px'}} id={SectionId.MAIN_BANNER}>
        <BannerRow>
            <div>
                <Heading />
                <Suspense fallback={<></>}>
                  <ButtonsWrapper>
                    <ActionButtonTryForFree />
                    <ActionButtonAskAQuestion />
                  </ButtonsWrapper>
                </Suspense>
            </div>
            <BannerImage />
        </BannerRow>
    </BaseSectionBlock>
);

const ButtonsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    gap: 8px;

    ${mediaBreakpointDown(Breakpoint.xMobile)} {
        flex-direction: column;
    }
`;
