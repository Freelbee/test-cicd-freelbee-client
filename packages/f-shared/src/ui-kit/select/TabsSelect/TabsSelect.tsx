import React, { ReactNode, useEffect, useId, useState} from 'react';
import styled from 'styled-components';
import { motion } from "framer-motion";
import { Color, mediaBreakpointDown } from '@freelbee/shared/ui-kit';
import {Draggable} from '../../hoc/Draggable';

const UNDERLINE_SPACE = 16;

type Props<T> = {
    defaultValue: T,
    listItemRender: (item: T) => ReactNode,
    onSelect: (item: T) => void,
    items: Array<T>,
    selectedColor?: Color,
    tabTextColor?: Color,
    underlineColor?: Color,
};

export function TabsSelect<T> (props: Props<T>) {
    const {
        defaultValue,
        listItemRender,
        onSelect,
        items,
        tabTextColor = Color.GRAY_600,
        selectedColor = Color.SWAMPY,
        underlineColor = Color.SWAMPY,
    } = props;

    const [selected, setSelected] = useState<T>(defaultValue);

    const layoutId = useId();

    useEffect(() => {
        onSelect(selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected]);

    useEffect(() => {
        setSelected(defaultValue);
    }, [defaultValue]);

    const handleSelectItem = (item: T) => {
        setSelected(item);
    };

    return (
        <Draggable>
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
        </Draggable>
    );
}

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