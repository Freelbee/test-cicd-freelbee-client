'use client';

import {ReactComponent as ArrowIcon} from '@freelbee/assets/icons/arrow-icons/arrow_down.svg';
import { useSelectKeyboardNavigation } from './useSelectKeyboardNavigation';
import { ReactNode, useEffect, useId, useRef, useState } from 'react';
import styled, { RuleSet } from 'styled-components';
import { useOnClickOutside } from '@freelbee/shared/hooks';
import { Color } from '../../style-base/enums/enums';
import { Label } from '../../inputs/self-utils/label';
import { DOMHelper } from '@freelbee/shared/helpers';
import { typography } from '../../style-base/typography/golos/typography';

type Props<T> = {
    defaultValue?: T | null,
    listRender: (item: T) => ReactNode,
    selectedRender?: (item: T) => ReactNode,
    placeholder: string,
    onSelect: (item: T) => void,
    error?: boolean,
    items: T[],
    needUpdateItems?: boolean,
    searcher?: (t: T, value: string) => boolean,
    watchValue?: T,
    background?: BackgroundSelect
    isDisabled?: boolean,
    height?: HeightSelect,
    label?: string,
    isRequired?: boolean
    styles?: RuleSet<object>,
    isValid?: boolean,
    noBorder?: boolean,
    checkIfFieldIsDisabled?: (item: T) => boolean;
};

export enum HeightSelect {
    VERY_SMALL = '40px',
    SMALL = '44px',
    MEDIUM = '48px',
    DEFAULT = '50px',
    AUTO = 'fit-content',
    BY_PARENT = '100%'
}

export enum BackgroundSelect {
    WHITE = 'white',
    TRANSPARENT = 'transparent'
}

export function Select<T> (props: Props<T>) {

    const {
        checkIfFieldIsDisabled,
        watchValue,
        onSelect,
        error,
        listRender,
        selectedRender = listRender,
        items,
        isDisabled = false,
        placeholder,
        defaultValue,
        needUpdateItems,
        background = BackgroundSelect.TRANSPARENT,
        height = HeightSelect.MEDIUM,
        styles,
        label,
        isRequired,
        isValid,
        noBorder
    } = props;
    

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const [selected, setSelected] = useState<T | undefined | null>(defaultValue);
    const listboxRef = useRef<HTMLDivElement | null>(null);
    const ariaId = useId();

    const modalRef = useRef(null);
    const buttonRef = useRef(null);
    useOnClickOutside(modalRef, () => {
        setIsOpen(false);
    }, buttonRef);

    const select = (item: T) => {
        setSelected(item);
        setIsOpen(false);
        onSelect(item);
    };

    useEffect(()=>{
        if(needUpdateItems) {
            setSelected(undefined);
        }
    }, [items]);

    const getBorderColor = () => {
        if (error) {
            return Color.DANGER;
        } else if (isValid) {
            return Color.EMERALD;
        }

        return Color.GRAY_400;
    };

    useEffect(()=>{
        setSelected(watchValue);
    }, [watchValue]);

    const {handleSpaceOpen, navigateOptions} = useSelectKeyboardNavigation({
        listboxRef, 
        isSelectOpened: isOpen,
        toggleOpenFn: () => setIsOpen(prev => !prev)
    });

    return (
        <Container>
            {label && <Label
                forInput={ariaId}
                label={label} 
                isRequired={isRequired} />}
            <SelectBody
                isDisabled={isDisabled}
                height={height} ref={modalRef} onKeyDown={navigateOptions} styles={styles}>
                <Field
                    disabledField={(checkIfFieldIsDisabled && selected) ? checkIfFieldIsDisabled(selected) : false}
                    isDisabled={isDisabled}
                    ref={buttonRef}
                    background={background}
                    hasError={!!error}
                    role='combobox'
                    aria-expanded={isOpen}
                    aria-controls={ariaId}
                    tabIndex={0}
                    borderColor={ noBorder ? 'transparent' : getBorderColor()}
                    onKeyDown={handleSpaceOpen}
                    onClick={() => setIsOpen(prev => !prev)}>
                    {(selected !== null && selected !== undefined) && selectedRender(selected)}
                    {(selected === null || selected === undefined) && !defaultValue && 
                    <PlaceHolder isDisabled={isDisabled}>{placeholder}</PlaceHolder>}
                    {!selected && defaultValue && selectedRender(defaultValue)}

                    <ArrowContainer isOpen={isOpen} isDisabled={!!isDisabled}>
                        <ArrowIcon />
                    </ArrowContainer>

                </Field>
                <ListContainer show={isOpen} >
                    <ListContent role='listbox' id={ariaId} ref={listboxRef}>
                        {items?.filter(item => item !== selected)
                            .map((item, index) => (
                                <Item 
                                    role='option'
                                    aria-selected={selected === item}
                                    tabIndex={isOpen ? 0 : -1}
                                    key={index} 
                                    disabledField={checkIfFieldIsDisabled ? checkIfFieldIsDisabled(item) : false}
                                    onClick={() => select(item)}
                                    onKeyDown={(e) => DOMHelper.handleEnterKeydown(e, () => select(item))}>
                                    {listRender(item)}
                                </Item>
                            ))
                        }
                    </ListContent>
                </ListContainer>
            </SelectBody>      
        </Container>
    );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SelectBody = styled.div<{height: string, isDisabled: boolean, styles?: RuleSet<object>}>`
  position: relative;
  width: 100%;
  height: ${({height}) => height};
  pointer-events: ${({isDisabled}) => isDisabled ? 'none' : 'all'};
  ${({styles}) => styles};
`;

const Field = styled.div<{ background: string, hasError: boolean, isDisabled: boolean, borderColor: string, disabledField: boolean}>`
  ${typography.body};
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
  color: ${({isDisabled, disabledField}) => (isDisabled || disabledField) ? Color.GRAY_500 : Color.GRAY_800};
  border-radius: 10px;
  border: 1px solid ${({borderColor}) => borderColor};
  background: ${({background}) => background};
  width: 100%;
  transition: 0.3s border;
  font-size: 14px;
  
  &::placeholder{
    color: ${Color.GRAY_600};
  }
  &::-webkit-input-placeholder {
    color: ${Color.GRAY_600};
  }
  &:hover{
    border: 1px solid ${({ borderColor }) => borderColor === 'transparent' ? 'transparent' : Color.GRAY_600};
  }
  &:focus {
    outline: none;
    border: 1px solid ${({ hasError, borderColor }) => hasError ? Color.DANGER : borderColor === 'transparent' ? 'transparent' : Color.GRAY_600};
  }
`;

const PlaceHolder = styled.div<{isDisabled: boolean}>`
  ${typography.body};
  color: ${({isDisabled}) => isDisabled ? Color.GRAY_400 : Color.GRAY_600};
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
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
  box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  border: 1px solid ${Color.GRAY_400};
  display: flex;
  flex-direction: column;
  gap: 8px;

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

const Item = styled.span<{disabledField: boolean}>`
 ${typography.body};
  color: ${({disabledField}) => disabledField ? Color.GRAY_500 : Color.GRAY_800};
  pointer-events: ${({disabledField}) => disabledField ? 'none' : 'all'};
  position: relative;
  cursor: pointer;
  width: 100%;
  display: flex;
  height: max-content;
  align-items: center;
  border-radius: 8px;
  padding: 10px;
  transition: background-color 0.3s;

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
        background-color: ${Color.GRAY_300}
    }
  }

  &:hover {
    background-color: ${Color.GRAY_100};
  }
`;

const ArrowContainer = styled.div<{isOpen: boolean, isDisabled: boolean}>`
  position: absolute;
  right: 15px;
  margin: auto;
  top: 0;
  bottom: 0;
  width: 16px;
  height: 16px;
   display: flex;
  align-items: center;
  justify-content: center;
  transform: scaleY(${({isOpen}) => isOpen ? -1 : 1});
  transition: transform 0.5s;

  svg {
    width: 100%;
    height: 100%;
    stroke: ${({isDisabled}) => isDisabled ? Color.GRAY_400 : Color.GRAY_800};
  }
`;