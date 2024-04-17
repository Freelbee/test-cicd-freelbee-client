'use client';
import React, { ReactNode, useId } from "react";
import styled, { RuleSet } from "styled-components";
import { AnimatePresence } from 'framer-motion';

import {Label} from "../self-utils/label";
import {ErrorOutput} from "../self-utils/errorOutput";

import { Text } from "@freelbee/shared/ui-kit";

import {typography, Color} from '@freelbee/shared/ui-kit'

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    placeholder: string,
    value: string,
    maxLength?: number,
    isError?: boolean,
    isValid?: boolean,
    isRequired?: boolean,
    errorMessage?: ReactNode,
    tipsText?: ReactNode,
    label?: string;
    styles?: RuleSet<object>;
    noMessageSpace?: boolean;
}

export function TextArea (props: TextAreaProps) {
    const {
        value,
        maxLength,
        isError,
        isValid,
        isRequired,
        errorMessage,
        tipsText,
        disabled,
        label,
        styles,
        noMessageSpace,
        ...rest
    } = props;

    const id = useId();

    return (
        <Wrapper styles={styles}>
            <Container>
                {(label || maxLength) &&
                <InputHeader>
                    {label && <Label forInput={id} isRequired={isRequired} label={label}/>}
                    {maxLength &&
                    <Text font='captions' color={Color.GRAY_600}>
                        {value?.length ?? 0} / {maxLength}
                    </Text>}
                </InputHeader>}
                <Content
                    $isDisabled={!!disabled}
                    $isError={!!isError}
                    $isValid={!!isValid}>
                    <TextAreaField
                        {...rest}
                        id={id}
                    />
                </Content>
                {tipsText &&
                <Text as='p' font='bodySmall' color={Color.GRAY_600}>
                    {tipsText}
                </Text>}
            </Container>
            <AnimatePresence>
                {isError && errorMessage &&
                <ErrorOutput absolutePosition={noMessageSpace} message={errorMessage} />}
            </AnimatePresence>
        </Wrapper>
    );
}

const Wrapper = styled.div<{styles?: RuleSet<object>}>`
  position: relative;
  ${({styles}) => styles};
`;

const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Content = styled.div<{$isDisabled: boolean, $isError: boolean, $isValid: boolean}>`
  background: ${Color.WHITE};
  border-radius: 16px;
  padding: 16px;
  padding-right: 4px;
  isolation: isolate;
  pointer-events: ${({$isDisabled}) => $isDisabled ? 'none' : 'all'};
  opacity: ${({$isDisabled}) => $isDisabled ? 0.8 : 1};
  display: flex;
  flex-direction: column;
  gap: 8px;
  height: 120px;
  border: 1px solid ${({$isError, $isValid}) => $isError ? Color.DANGER
        : $isValid ? Color.EMERALD : Color.GRAY_400};
  transition: 0.3s border;

  &:hover {
    border: 1px solid ${({$isError, $isValid}) => $isError ? Color.DANGER
        : $isValid ? Color.EMERALD : Color.GRAY_600};
  }

  &:has(textarea:focus) {
    outline: none;
    border: 1px solid ${({$isError, $isValid}) => $isError ? Color.DANGER
        : $isValid ? Color.EMERALD : Color.BLUE};
  }

  &:has(textarea:disabled) {
    border: 1px solid ${Color.GRAY_400};
  }
`;

const InputHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
`;

const TextAreaField = styled.textarea<{$isError?: boolean, $isValid?: boolean}>`
  ${typography.body};
  width: 100%;
  height: 100%;
  color: ${Color.GRAY_800};
  -ms-overflow-style: none; /* IE 11 */
  scrollbar-width: none; /* Firefox 64 */
  outline: none;
  border: none;
  resize: none;
  padding-right: 12px;

   &::placeholder {
    color: ${Color.GRAY_500};
  }

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${Color.GRAY_400};
    border-radius: 10px;
  }
`;
