
import { BaseSectionBlock } from "@landing/shared";
import { DeviceSlider } from "./ui/DeviceSlider";
import { SectionGrid } from "./ui/SectionGrid";
import { TextContent } from "./ui/TextContent";
import { SectionId } from "@landing/entities";

export const DevicesSection = () => (
    <BaseSectionBlock style={{overflow: 'hidden'}} id={SectionId.DEVICES}>
        <SectionGrid>
            <TextContent/>
            <DeviceSlider />
        </SectionGrid>
    </BaseSectionBlock>
);
