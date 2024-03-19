'use client';

import { Text } from "@freelbee/shared/ui-kit";

interface Props {
    isRequired?: boolean,
    text: string;
    forInput: string;
}

export const Label = ({text, isRequired, forInput}: Props) => (
    <label htmlFor={forInput}>
        <Text font='bodyMedium'>{isRequired ? text + '*' : text}</Text>
    </label>
);
