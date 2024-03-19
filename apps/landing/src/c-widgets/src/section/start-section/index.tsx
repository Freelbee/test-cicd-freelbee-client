import { Suspense } from "react";

import { ActionButton } from "./ui/ActionButton";
import { BannerImage } from "./ui/BannerImage";
import { BannerRow } from "./ui/BannerRow";
import { Heading } from "./ui/Heading";
import { SectionId } from "@landing/entities";
import { BaseSectionBlock } from "@landing/shared";

export const StartSection = () => (
    <BaseSectionBlock style={{overflow: "hidden", paddingTop: '80px'}} id={SectionId.MAIN_BANNER}>
        <BannerRow>
            <div>
                <Heading />
                <Suspense fallback={<></>}>
                    <ActionButton />     
                </Suspense>         
            </div>
            <BannerImage />
        </BannerRow>        
    </BaseSectionBlock>
);