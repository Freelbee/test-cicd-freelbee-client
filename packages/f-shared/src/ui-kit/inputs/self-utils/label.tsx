'use client';

import { Text } from "@freelbee/shared/ui-kit";

export interface InputLabelProps {
    isRequired?: boolean,
    label: string;
    forInput: string;
}

export const Label = ({label, isRequired, forInput}: InputLabelProps) => (
    <label htmlFor={forInput}>
        <Text font='bodyMedium'>{isRequired ? label+ '*' :label}</Text>
    </label>
);
