
import { BaseSectionBlock, GroupWithGap } from "@landing/shared";
import { CurrenciesSlider } from "./ui/CurrenciesSlider";
import { MethodsSlider } from "./ui/MethodsSlider";

export const CurrenciesAndMethodsSection = () => (
    <BaseSectionBlock style={{
        overflow: 'hidden'}}>
        <GroupWithGap>
            <CurrenciesSlider />
            <MethodsSlider />            
        </GroupWithGap>
    </BaseSectionBlock>
);
