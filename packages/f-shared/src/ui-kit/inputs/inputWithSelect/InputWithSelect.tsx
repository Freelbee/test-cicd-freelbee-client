import React, {ReactNode, useId} from "react";
import styled from "styled-components";
import {AnimatePresence} from "framer-motion";
import { Color, SelectWithSearch, Text, typography } from '@freelbee/shared/ui-kit';
import { Label } from '../self-utils/label';
import { ErrorOutput } from '../self-utils/errorOutput';

interface Props<T> extends React.InputHTMLAttributes<HTMLInputElement> {
    items?: Array<T>;
    defaultItem?: T;
    setItem?: (value: T) => void;
    renderItem?: (value: T) => ReactNode;
    setValue: (value: string) => void;
    watchValue?: T;
    value: string | number,
    hasError?: boolean,
    isValid?: boolean,
    isRequired?: boolean,
    errorMessage?: ReactNode,
    tipsText?: ReactNode,
    label?: string,
    noMessageSpace?: boolean,
    tipsColor?: Color,
    renderButton?: () => JSX.Element;
    search?: (item: T, value: string) => boolean;
    searchStringValue: (item: T) => string;
};

export default function InputWithSelect<T> (props: Props<T>) {

    const {
        items = [],
        defaultItem,
        setItem = () => ({}),
        renderItem = () => <></>,
        setValue,
        watchValue,
        search,
        value,
        isRequired = false,
        isValid = false,
        hasError = false,
        disabled = false,
        label,
        errorMessage,
        tipsText,
        tipsColor,
        noMessageSpace,
        renderButton,
        searchStringValue,
        ...rest} = props;

    const id = useId();

    return (
        <InputWrapper>
            <InputContainer isDisabled={disabled}>
                {label && <Label isRequired={isRequired} label={label} forInput={id} />}

                <InputRow isError={hasError} isValid={isValid} hasAdditionalElement={!!renderButton}>
                    <Input
                        {...rest}
                        id={id}
                        type='number'
                        value={value}
                        onChange={(e)=>setValue(e.target.value)}
                        autoComplete='new-password'
                    />
                    {renderButton && renderButton()}
                    <SelectContainer isError={hasError} isValid={isValid}>
                        {items.length > 1 ?
                            // <SelectWithSearch<T>
                            //     searcher={search}
                            //     noBorder
                            //     items={items}
                            //     defaultValue={defaultItem}
                            //     listRender={renderItem}
                            //     placeholder=''
                            //     onSelect={setItem}
                            //     watchValue={watchValue}/>
                            <SelectWithSearch<T>
                              label=''
                              placeholder=''
                              searchPlaceholder='Find'
                              items={items}
                              value={defaultItem ?? null}
                              setValue={setItem}
                              getStringValue={searchStringValue}
                              renderOption={renderItem}
                              noBorder={true}
                            />
                          :
                            <CurrencyBlock>
                                <Text font='body'>
                                    {defaultItem && renderItem(defaultItem)}
                                </Text>
                            </CurrencyBlock>}
                    </SelectContainer>
                </InputRow>

                {tipsText &&
                    <Text as='p' font='bodySmall' color={tipsColor || Color.GRAY_600}>
                        {tipsText}
                    </Text>}
            </InputContainer>

            <AnimatePresence>
                {hasError && errorMessage &&
                  <ErrorOutput absolutePosition={noMessageSpace} message={errorMessage} />}
            </AnimatePresence>
        </InputWrapper>
    );
}


const InputWrapper = styled.div`
  position: relative;
  height: min-content;
`;

const InputRow = styled.div<{isError?: boolean, isValid?: boolean, hasAdditionalElement?: boolean}>`
    position: relative;
    height: 48px;
    display: grid;
    grid-template-columns: ${({hasAdditionalElement}) => hasAdditionalElement ? '1fr auto minmax(95px, 150px)' : '1fr minmax(95px, 150px)'};
    min-width: 180px;
    border-radius: 10px;
    border: 1px solid ${({isError, isValid}) => isError ? Color.DANGER
        : isValid ? Color.EMERALD : Color.GRAY_400};
    transition: 0.3s border;

    &::after {
        content: '';
        position: absolute;
        right: 150px;
        height: 100%;
        width: 1px;
        transition: 0.3s background-color;
        background-color: ${({isError, isValid}) => isError ? Color.DANGER
        : isValid ? Color.EMERALD : Color.GRAY_400};
    }

    &:hover {
        border: 1px solid ${({isError, isValid}) => isError ? Color.DANGER
        : isValid ? Color.EMERALD : Color.GRAY_600};

        &::after {
            background-color: ${({isError, isValid}) => isError ? Color.DANGER
        : isValid ? Color.EMERALD : Color.GRAY_600};
        }
    }

    &:has(input:focus) {
        outline: none;
        border: 1px solid ${({isError, isValid}) => isError ? Color.DANGER
        : isValid ? Color.EMERALD : Color.BLUE};

        &::after {
            background-color: ${({isError, isValid}) => isError ? Color.DANGER
        : isValid ? Color.EMERALD : Color.BLUE};
        }
    }

    &:has(input:disabled) {
        border: 1px solid ${Color.GRAY_400};

        &::after {
            background-color: ${Color.GRAY_400};
        }
    }
`;

const InputContainer = styled.div<{isDisabled: boolean}>`
  pointer-events: ${({isDisabled}) => isDisabled ? 'none' : 'all'};
  opacity: ${({isDisabled}) => isDisabled ? 0.8 : 1};
  display: grid;
  row-gap: 8px;
`;

const Input = styled.input`
  ${typography.body};
  width: 100%;
  color: ${Color.GRAY_800};
  border: none;
  outline: none;
  border-radius: 10px;
  height: 46px;
  padding: 8px 16px;

  &::placeholder{
    color: ${Color.GRAY_600};
  }
  &::-webkit-input-placeholder {
    color: ${Color.GRAY_600};
  }
`;

const SelectContainer = styled.div<{isError?: boolean, isValid?: boolean}>`

  justify-self: center;
  align-self: center;
  height: 100%;
  width: 150px;
  flex-shrink: 0;
`;

const CurrencyBlock = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
