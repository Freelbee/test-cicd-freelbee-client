import { ReactNode, useEffect, useRef, useState} from 'react';
import styled from 'styled-components';
import { motion } from "framer-motion";
import { Color, mediaBreakpointDown } from '@freelbee/shared/ui-kit';


type Props = {
    children: ReactNode;
};

export function Draggable ({children}: Props) {

    const [isOverflowing, setIsOverflowing] = useState<boolean>(false);
    const dragWrapperRef = useRef<HTMLDivElement | null>(null);
    const dragRowRef = useRef<HTMLDivElement | null>(null);

    const checkOverflow = () => {
        if(dragRowRef.current && dragWrapperRef.current) {
            if(dragRowRef.current.scrollWidth > dragWrapperRef.current.offsetWidth) {
                setIsOverflowing(true);
            } else {
                setIsOverflowing(false);
            }                
        }
    };

    useEffect(() => {
        if (dragWrapperRef.current && dragRowRef.current) {
            checkOverflow();
            window.addEventListener('resize', checkOverflow);
        }
        return () => {
            window.removeEventListener('resize', checkOverflow);
        };
    }, []);

    return (
        <Container>

            <OptionsWrapper ref={dragWrapperRef}>
                <OptionsRow
                    key={`${isOverflowing}`}
                    ref={dragRowRef}
                    drag={isOverflowing ? 'x' : false}
                    dragConstraints={isOverflowing ? dragWrapperRef : dragRowRef}>
                    {children}
                </OptionsRow>
            </OptionsWrapper>

        </Container>
    );
}

const Container = styled(motion.div)`
  position: relative;
  width: 100%;
`;

const OptionsWrapper = styled(motion.div)`
    overflow: hidden;
    position: relative;
    width: 100%;

    &::after {
        content: '';
        width: 100%;
        height: 1px;
        position: absolute;
        z-index: 0;
        background-color:${Color.GRAY_400};
        left: 0;
        right: 0;
        bottom: 1px;

        ${mediaBreakpointDown(800)} {
            bottom: 3px;
        }
    }
`;

const OptionsRow = styled(motion.div)`
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    width: max-content;
    cursor: ${props => props.drag ? 'grab' : 'unset'}!important;
`;