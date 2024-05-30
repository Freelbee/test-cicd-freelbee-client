import React, { ReactNode, useEffect, useId, useRef, useState} from 'react';
import styled from 'styled-components';
import { motion } from "framer-motion";
import { Color, mediaBreakpointDown } from '@freelbee/shared/ui-kit';

const UNDERLINE_SPACE = 16;

type Props<T> = {
    defaultValue: T,
    listItemRender: (item: T) => ReactNode,
    onSelect: (item: T) => void,
    items: Array<T>,
    selectedColor?: Color,
    tabTextColor?: Color,
    underlineColor?: Color,
    reset?: boolean;
};

export default function TabsSelect<T> (props: Props<T>) {
    const {
        defaultValue,
        listItemRender,
        onSelect,
        items,
        tabTextColor = Color.GRAY_600,
        selectedColor = Color.SWAMPY,
        underlineColor = Color.SWAMPY,
        reset
    } = props;

    const [isOverflowing, setIsOverflowing] = useState<boolean>(false);
    const [selected, setSelected] = useState<T>(defaultValue);

    const dragWrapperRef = useRef<HTMLDivElement | null>(null);
    const dragRowRef = useRef<HTMLDivElement | null>(null);

    const layoutId = useId();

    useEffect(() => {
        if(reset) {
            setSelected(defaultValue);
        }
    }, [reset]);

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
        onSelect(selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected]);

    useEffect(() => {
        setSelected(defaultValue);
    }, [defaultValue]);

    // useEffect(() => {
    //     checkOverflow();
    // });

    useEffect(() => {
        if (dragWrapperRef.current && dragRowRef.current) {
            checkOverflow();
            window.addEventListener('resize', checkOverflow);
        }
        return () => {
            window.removeEventListener('resize', checkOverflow);
        };
    }, []);

    const handleSelectItem = (item: T) => {
        setSelected(item);
    };

    return (
        <Container>

            <OptionsWrapper ref={dragWrapperRef}>
                <OptionsRow
                    key={`${isOverflowing}`}
                    ref={dragRowRef}
                    drag={isOverflowing ? 'x' : false}
                    dragConstraints={isOverflowing ? dragWrapperRef : dragRowRef}>

                    {items.length !== 0 && items?.map((item, index) => (
                                <SelectItem
                                    onClick={() => handleSelectItem(item)}
                                    color={item === selected ? selectedColor : tabTextColor}
                                    key={index}>
                                    {listItemRender(item)}
                                    
                                    {item === selected && 
                                    <SelectedUnderLine
                                        transition={{ 
                                            type: "spring", 
                                            bounce: 0.2,
                                            duration: 0.9 }}
                                        background={underlineColor}
                                        layoutId={layoutId} />}
                                </SelectItem>
                            ))}

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

const SelectItem = styled(motion.button) <{ color?: Color }>`
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    padding-bottom: ${UNDERLINE_SPACE + 1}px;
    transition: color 300ms;
    color: ${props => props.color};

    &:not(:last-child) {
      margin-right: 2rem;
    }

    ${mediaBreakpointDown(800)} {
        padding-bottom: ${UNDERLINE_SPACE + 2}px;
    }
`;

const SelectedUnderLine = styled(motion.span) <{ background: Color }>`
    width: 100%;
    height: 1px;
    position: absolute;
    z-index: 1;
    bottom: 1px;
    left: 0;
    background: ${props => props.background};

    ${mediaBreakpointDown(800)} {
        bottom: 3px;
    }
`;