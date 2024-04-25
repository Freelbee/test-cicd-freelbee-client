import {useId, useRef, useState} from "react";
import styled, { css } from "styled-components";
import {ReactComponent as ArrowIcon} from "@freelbee/assets/icons/arrow-icons/arrow_down.svg";
import { useOnClickOutside } from "@freelbee/shared/hooks";
import { Label } from "../../inputs/self-utils/label";
import { Input } from "../../inputs/input/input";
import { DOMHelper } from "@freelbee/shared/helpers";
import { Color, Text, typography } from "@freelbee/shared/ui-kit";

interface SelectWithInputProps<T> {
    placeholder?: string,
    searchPlaceholder?: string,
    items: Array<T>,
    value: T | null,
    setValue: (value: T) => void,
    renderOption: (item: T) => React.ReactNode,
    getStringValue: (item: T) => string,
    isRequired?: boolean,
    label: string;
    isError?: boolean;
    isDisabled?: boolean;
    hideSearch?: boolean;
    noBorder?: boolean;
}

export function SelectWithSearch<T> (props: SelectWithInputProps<T>) {

    const {
        renderOption,
        placeholder = '',
        searchPlaceholder = '',
        items,
        value,
        setValue,
        getStringValue,
        isError,
        isDisabled,
        hideSearch = false,
        noBorder = false,
        ...rest
    } = props;

    const ariaId = useId();
    const searchId = useId();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>('');
    const listboxRef = useRef<HTMLDivElement | null>(null);
    const modalRef = useRef(null);
    const buttonRef = useRef(null);

    useOnClickOutside(modalRef, () => {
        setIsOpen(false);
    }, buttonRef);


    const select = (item: T) => {
        setValue(item);
        setIsOpen(false);
    };

    const toggleOpen = () => setIsOpen(prev => !prev);

    const renderItems = () => {
      return items.filter(v => v !== value).filter(el => getStringValue(el).toLowerCase().includes(searchValue.toLowerCase()))
                  .map((item, idx) => (
                    <Item
                      role='option'
                      aria-selected={value === item}
                      tabIndex={isOpen ? 0 : -1}
                      key={idx}
                      $disabledField={false}
                      // disabledField={checkIfFieldIsDisabled ? checkIfFieldIsDisabled(item) : false}
                      onClick={() => select(item)}
                      onKeyDown={(e) => DOMHelper.handleEnterKeydown(e, () => select(item))}>
                      {renderOption(item)}
                  </Item>
                  ));
    }

    return (
        <Content ref={modalRef}>
            {rest.label && <Label {...rest} forInput={searchId}/>}
            <InputContainer onClick={toggleOpen} ref={buttonRef} $isError={isError} $isDisabled={isDisabled} $noBorder={noBorder}>
                {!value && <Text font='body' color={Color.GRAY_500} styles={placeholderStyled}>{placeholder}</Text>}
                {value && <Text styles={placeholderStyled}>{renderOption(value)}</Text>}
                <ArrowContainer isOpen={isOpen} isDisabled={false}>
                    <ArrowIcon/>
                </ArrowContainer>
            </InputContainer>

            <ListContainer show={isOpen}>
                {!hideSearch && (
                    <SearchContainer>
                      <Input
                          id={searchId}
                          placeholder={searchPlaceholder}
                          value={searchValue}
                          setValue={(v) => setSearchValue(v)}
                      />
                    </SearchContainer>
                )}
                <ListContent role='listbox' id={ariaId} ref={listboxRef}>
                    {renderItems()}
                </ListContent>

            </ListContainer>
        </Content>
    );
}

const placeholderStyled = css`
height: 100%;
padding: 15px;
display: flex;
align-items: center;
`

const Content = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SearchContainer = styled.div`
  margin: 6px;
`;

const InputContainer = styled.div<{
  $isError?: boolean,
  $isValid?: boolean,
  $isDisabled?: boolean,
  $noBorder: boolean,
}>`
  position: relative;
  ${typography.body};
  display: flex;
  align-items: center;
  height: 48px;
  width: 100%;
  border-radius: 10px;
  border: 1px solid ${({$isError, $isValid}) => $isError ? Color.DANGER
        : $isValid ? Color.EMERALD : Color.GRAY_400};
  border-color: ${({ $noBorder }) => $noBorder && 'transparent'};
  transition: 0.3s border;

  &::placeholder {
    color: ${Color.GRAY_500};
  }

  &:hover {
    border: 1px solid ${({$isError, $isValid}) => $isError ? Color.DANGER
        : $isValid ? Color.EMERALD : Color.GRAY_600};
    border-color: ${({ $noBorder }) => $noBorder && 'transparent'};
  }

  &:focus {
    outline: none;
    border: 1px solid ${({$isError, $isValid}) => $isError ? Color.DANGER
        : $isValid ? Color.EMERALD : Color.BLUE};
  }

  ${({ $isDisabled }) => $isDisabled && css`
    opacity: 0.8;
    pointer-events: none;
  `}
`;

const ListContainer = styled.div<{ show: boolean }>`
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
  visibility: ${({show}) => show ? 'visible' : 'hidden'};
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

const Item = styled.span<{ $disabledField: boolean }>`
  ${typography.body};
  color: ${({$disabledField}) => $disabledField ? Color.GRAY_500 : Color.GRAY_800};
  pointer-events: ${({$disabledField}) => $disabledField ? 'none' : 'all'};
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

const ArrowContainer = styled.div<{ isOpen: boolean, isDisabled: boolean }>`
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
