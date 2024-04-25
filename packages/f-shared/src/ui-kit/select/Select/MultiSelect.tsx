import { ReactNode, useEffect, useId, useRef, useState} from 'react';
import styled from 'styled-components';
import { motion } from "framer-motion";

import { useSelectKeyboardNavigation } from './useSelectKeyboardNavigation';
import { useOnClickOutside } from '@freelbee/shared/hooks';
import { Color } from '../../style-base/enums/enums';
import { DOMHelper } from '@freelbee/shared/helpers';
import { typography } from '../../style-base/typography/golos/typography';

import {ReactComponent as ArrIcon} from '@freelbee/assets/icons/arrow-icons/arrow_down.svg';
import {ReactComponent as ClearIcon} from '@freelbee/assets/icons/cross-icons/clear.svg';

import { BackgroundSelect, HeightSelect } from './Select';
import { Checkbox } from '../../inputs/checkbox/checkbox';
import { ScrollDrag } from '../../hoc/ScrollDrag';

type Props<T> = {
    defaultValue?: Array<T>,
    listItemRender: (item?: T) => ReactNode,
    selectedItemRender?: (item?: T) => ReactNode,
    onSelect: (items: Array<T>) => void,
    withAllSelect?: boolean,
    placeholder: string,
    error?: boolean,
    items: Array<T>,
    openToTop?: boolean,
    needUpdateItems?: boolean,
    withCheckBox?: boolean,
    height?: HeightSelect,
    background?: BackgroundSelect,
    selectedBackground?: string,
    deleteBtnColor?: string,
    deleteBtnBackground?: string,
    isDisabled?: boolean,
    isValid?: boolean
};

export default function MultiSelect<T> (props: Props<T>) {

    const {
        onSelect,
        listItemRender,
        selectedItemRender = listItemRender,
        withAllSelect = true,
        items,
        error,
        placeholder,
        defaultValue,
        openToTop,
        withCheckBox = true,
        background = BackgroundSelect.TRANSPARENT,
        selectedBackground = Color.GRAY_100,
        height = HeightSelect.DEFAULT,
        deleteBtnBackground = Color.GRAY_600,
        deleteBtnColor = Color.WHITE,
        isDisabled = false,
        isValid
    } = props;

    const [isOpened, setIsOpened] = useState<boolean>(false);
    const [selected, setSelected] = useState<Array<T>>(defaultValue || []);
    const [allSelected, setAllSelected] = useState<boolean>(defaultValue?.length === items.length);

    const ariaId = useId();
    const listboxRef = useRef<HTMLDivElement | null>(null);
    const modalRef = useRef(null);
    const buttonRef = useRef<HTMLDivElement | null>(null);

    useOnClickOutside(modalRef, () => {
        setIsOpened(false);
    }, buttonRef);

    useEffect(() => {
        onSelect(selected);
        setAllSelected(selected.length === items.length);
    }, [items.length, selected]);

    const { handleSpaceOpen, navigateOptions } = useSelectKeyboardNavigation({
        listboxRef,
        isSelectOpened: isOpened,
        toggleOpenFn: () => setIsOpened(prev => !prev)
    });

    const handleSelectItem = (item: T) => {
        if (selected.includes(item)) {
            setSelected(prev => prev.filter(el => el !== item));
        } else {
            setSelected(prev => [...prev, item]);
        }
    };

    const deselectItem = (item: T) => {
        setSelected(prev => prev.filter(el => el !== item));
        setIsOpened(false);
    };

    const handleSelectAll = () => {
        if (allSelected) {
            setSelected([]);
        } else {
            setSelected(items);
        }
    };

    const getBorderColor = () => {
        if (error) {
            return Color.DANGER;
        } else if (isValid) {
            return Color.EMERALD;
        }

        return Color.GRAY_400;
    };

    const renderSelectedList = (items: Array<T>) => (
        <ScrollDrag>
            <SelectedRow>

                {items.length === 0 ? 
                    <PlaceHolder isDisabled={isDisabled}>{placeholder}</PlaceHolder>
                    :
                    <>
                        {items?.map((item, index) => (
                            <SelectedItem
                                onClick={(e) => e.stopPropagation()}
                                background={selectedBackground}
                                key={index}>
                                {selectedItemRender(item)}
                                <DeleteButton 
                                    background={deleteBtnBackground}
                                    iconColor={deleteBtnColor}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deselectItem(item);
                                    }}>
                                    <ClearIcon />
                                </DeleteButton>
                            </SelectedItem>
                        ))}
                    </>}

            </SelectedRow>                        
        </ScrollDrag>
    );

    const renderOptionsList = (items: Array<T>) => items?.map((item, index) => {
        const isSelected = selected.includes(item);

        return (
            <Item
                role='option'
                aria-selected={isSelected}
                tabIndex={(isOpened && !withCheckBox) ? 0 : -1}
                key={index + 1}
                markSelected={!withCheckBox && isSelected}
                background={selectedBackground}
                onClick={() => handleSelectItem(item)}
                onKeyDown={(e) => DOMHelper.handleEnterKeydown(e, () => handleSelectItem(item))}>

                {withCheckBox &&
                        <Checkbox
                            onClick={(e) => e.stopPropagation()}
                            isCheck={isSelected}
                            onChange={() => handleSelectItem(item)} />}

                {listItemRender(item)}
            </Item>
        );
    });

    return (
        <Container 
            isDisabled={isDisabled}
            height={height} 
            ref={modalRef} 
            onKeyDown={navigateOptions}>
            <Field
                ref={buttonRef}
                background={background}
                borderColor={getBorderColor()}
                role='combobox'
                aria-expanded={isOpened}
                aria-controls={ariaId}
                tabIndex={0}
                onKeyDown={handleSpaceOpen}
                onClick={() => setIsOpened(prev => !prev)}>

                {renderSelectedList(selected)}

                <ArrowContainer 
                    isDisabled={isDisabled} 
                    isOpen={isOpened}
                    startPosition={openToTop ? -1 : 1}>
                    <ArrIcon />
                </ArrowContainer>

            </Field>
            <ListContainer show={isOpened} >

                <ListContent role='listbox' id={ariaId} ref={listboxRef}>
                    {withAllSelect &&
                        <Item
                            role='option'
                            aria-selected={allSelected}
                            tabIndex={(isOpened && !withCheckBox) ? 0 : -1}
                            key={0}
                            markSelected={!withCheckBox && allSelected}
                            background={selectedBackground}
                            onClick={handleSelectAll}
                            onKeyDown={(e) => DOMHelper.handleEnterKeydown(e, () => handleSelectAll())}>

                            {withCheckBox &&
                                <Checkbox
                                    onClick={(e) => e.stopPropagation()}
                                    isCheck={allSelected}
                                    onChange={handleSelectAll} />}

                            {listItemRender()}
                        </Item>}

                    {renderOptionsList(items)}
                </ListContent>
            </ListContainer>
        </Container>
    );
}


const Container = styled.div<{height: string, isDisabled: boolean}>`
  position: relative;
  width: 100%;
  height: ${({height}) => height};
  pointer-events: ${({isDisabled}) => isDisabled ? 'none' : 'all'};
`;

const SelectedRow = styled(motion.div)`
    display: flex;
    align-items: center;
    width: max-content;
    cursor: ${props => props.drag ? 'grab' : 'unset'}!important;
    transition: transform 100ms;
`;

const SelectedItem = styled(motion.div)<{ background: string }>`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    gap: 0.5rem;
    border-radius: 6px;
    padding: 0 10px;
    background: ${props => props.background};

    &:not(:last-child) {
      margin-right: 0.35rem;
    }
`;

const DeleteButton = styled.button<{background: string, iconColor: string}>`
    cursor: pointer;
    flex-shrink: 0;
    width: 12px;
    height: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: ${props => props.background};

    svg {
        flex-shrink: 0;
        width: 100%;
        height: 100%;
    path{
      fill: ${props => props.iconColor};
    }
    }
`;

const Field = styled.div<{borderColor: string, background: string}>`
  ${typography.body};
  font-weight: 400;
  height: 100%;
  padding-right: 4px;
  padding-left: 15px;
  overflow: hidden;
  cursor: pointer;
  display: grid;
  grid-template-columns: 1fr 32px;
  align-items: center;
  justify-content: space-between;
  grid-gap: 5px;
  position: relative;
  color: ${Color.GRAY_800};
  border-radius: 10px;
  border: 1px solid ${({borderColor}) => borderColor};
  background: ${({background}) => background};
  width: 100%;
  transition: 0.2s border;
  
  &::placeholder{
    color: ${Color.GRAY_400};
    font-size: 13px;
  }
  &::-webkit-input-placeholder {
    color: ${Color.GRAY_400};
    font-size: 13px;
  }
  &:hover{
    border: 1px solid ${({ color }) => color === 'transparent' ? 'transparent' : Color.GRAY_600};
  }
  &:focus {
    outline: none;
    border: 1px solid ${({ color }) => color === 'transparent' ? 'transparent' : Color.GRAY_600};
  }
`;

const PlaceHolder = styled.div<{isDisabled: boolean}>`
    ${typography.body}
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    color: ${({isDisabled}) => isDisabled ? Color.GRAY_400 : Color.GRAY_600};
    padding-right: 20px;

  @media screen and (max-width: 480px) {
      max-width: 180px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
  }
`;

const ListContainer = styled.div<{show: boolean}>`
  z-index: 10;
  position: absolute;
  top: calc(100% + 10px);
  width: 100%;
  right: 0;
  background: #ffffff;
  border: 1px solid ${Color.GRAY_400};
  box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  transition: opacity .5s, visibility .5s, top .5s;
  pointer-events: ${({show}) => show ? 'unset' : 'none'};
  visibility: ${({show}) => show ? 'visible' : 'hidden' };
  opacity: ${({show}) => show ? '1' : '0'};
`;

const ListContent = styled.div`
  width: 100%;
  height: 100%;
  max-height: 226px;
  overflow-y: auto;
  scrollbar-width: none;
    -ms-overflow-style: none; /* IE 11 */

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: ${Color.GRAY_400};
    background-position: center;
    background-repeat: no-repeat;
    height: 5px;
  }

  &::-webkit-scrollbar {
    width: 4px;
    height: 5px;
  }
`;

const Item = styled.span<{ markSelected: boolean, background: string }>`
  cursor: pointer;
  position: relative;
  width: 100%;
  display: flex;
  gap: 0.5rem;
  height: max-content;
  align-items: center;
  border-radius: 6px;
  padding: 10px;
  transition: background-color 0.5s;
  background: ${props => props.markSelected ? props.background : 'transparent'};

  &:hover {
    background: ${Color.GRAY_100};
  }

  &:not(:last-child) {
    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        width: calc(100% - 16px);
        height: 1px;
        background-color: ${Color.GRAY_300};
    }
  }
`;

const ArrowContainer = styled.div<{isDisabled: boolean, startPosition: number, isOpen: boolean}>`
  position: absolute;
  margin: auto;
  right: 15px;
  margin: auto;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: scaleY(${({isOpen, startPosition}) => isOpen ? startPosition * -1 : startPosition});
  width: 14px;
  height: 14px;
  transition: transform 0.5s;
  
    svg {
        width: 100%;
        height: 100%;
        stroke: ${({isDisabled}) => isDisabled ? Color.GRAY_400 : Color.GRAY_800};
    }
`;