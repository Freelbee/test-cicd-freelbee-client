
import { BaseSectionBlock } from "@landing/shared";
import { Hands } from "./ui/Hands";
import { MeetFreelbee } from "./ui/MeetFreelbee";

export const MeetSection = () => (
    <BaseSectionBlock style={{
        position: 'relative', 
        overflow: 'hidden',
        maskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0), rgb(0, 0, 0) 10%, rgb(0, 0, 0) 90%, rgba(0, 0, 0, 0))'
    }}>
        <Hands />
        <MeetFreelbee />            
    </BaseSectionBlock>
);