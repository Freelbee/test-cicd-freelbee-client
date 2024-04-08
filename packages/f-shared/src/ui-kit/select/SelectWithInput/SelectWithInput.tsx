import {useId, useRef, useState} from "react";
import styled from "styled-components";
import {ReactComponent as ArrowIcon} from "@freelbee/assets/icons/arrow-icons/arrow_down.svg";
import { useOnClickOutside } from "@freelbee/shared/hooks";
import { InputLabelProps, Label } from "../../inputs/self-utils/label";
import { Input } from "../../inputs/input/input";
import { DOMHelper } from "@freelbee/shared/helpers";
import { Color, typography } from "@freelbee/shared/ui-kit";


interface SelectWithInputProps<T> extends InputLabelProps {
    placeholder?: string,
    items?: Array<T>,
    value?: T,
    setValue?: React.Dispatch<React.SetStateAction<T>>,
    listRender: (item: T) => React.ReactNode,
    getStringValue?: (item: T) => string,
}

export function SelectWithInput<T> (props: SelectWithInputProps<T>) {

    const {
        getStringValue = () => '',
        listRender,
        placeholder = '',
        items = [],
        value = '',
        setValue = (v) => ({}),
        ...rest
    } = props;
    
    const ariaId = useId();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const listboxRef = useRef<HTMLDivElement | null>(null);
    const modalRef = useRef(null);
    const buttonRef = useRef(null);

    useOnClickOutside(modalRef, () => {
        setIsOpen(false);
    }, buttonRef);


    const select = (item: T) => {
        setValue(getStringValue(item));
        setIsOpen(false);
    };

    console.log('ITEMS', items)

    return (
        <Content>
            {rest.label && <Label {...rest}/>}
            <InputContainer>
                <Input
                    onFocus={() => setIsOpen(true)}
                    onBlur={() => setIsOpen(false)}
                    placeholder={placeholder}
                    value={value}
                    setValue={setValue}
                />
                    <ArrowContainer isOpen={isOpen} isDisabled={false}>
                        <ArrowIcon/>
                    </ArrowContainer>
            </InputContainer>
            <ListContainer show={isOpen && items?.filter(item => item !== value).length > 0}>
                <ListContent role='listbox' id={ariaId} ref={listboxRef}>
                    {
                        items.map((item, index) => (
                                <Item
                                    role='option'
                                    aria-selected={value === getStringValue(item)}
                                    tabIndex={isOpen ? 0 : -1}
                                    key={index}
                                    disabledField={false}
                                    // disabledField={checkIfFieldIsDisabled ? checkIfFieldIsDisabled(item) : false}
                                    onClick={() => select(item)}
                                    onKeyDown={(e) => DOMHelper.handleEnterKeydown(e, () => select(item))}>
                                    {listRender(item)}
                                </Item>
                            ))
                    }
                </ListContent>
            </ListContainer>
        </Content>
    );
}


const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const InputContainer = styled.div`
  position: relative;
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

const Item = styled.span<{ disabledField: boolean }>`
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