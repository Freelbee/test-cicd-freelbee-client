'use client';
import {ReactNode} from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

import { ReactComponent as ErrIcon} from '@freelbee/assets/icons/alert-icons/warning.svg';

import { Text } from "@freelbee/shared/ui-kit";
import { Color } from "@freelbee/shared/ui-kit";

const appearenceConfig = {
    initial: { opacity: 0, y: '-10px', height: '0px', marginTop: '0px' },
    animate: { opacity: 1, y: '0px', height: 'auto', marginTop: '6px' },
    exit: { opacity: 0, y: '-10px', height: '0px', marginTop: '0px' },
    transition: { bounce: 0 },
};

interface Props {
    message: ReactNode,
    absolutePosition?: boolean
}

export const ErrorOutput = ({message, absolutePosition}: Props) => (
    <ErrorMessage
        $absolutePosition={!!absolutePosition}
        {...appearenceConfig}>
        <ErrIcon />
        <Text as='p' font='bodySmall' color={Color.DANGER}>
            {message}
        </Text>
    </ErrorMessage>
);

const ErrorMessage = styled(motion.div)<{$absolutePosition: boolean}>`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 8px;

  ${({$absolutePosition}) => $absolutePosition && css`
    position: absolute;
    top: 100%;
  `}

  svg {
    width: 16px;
    height: 16px;
    stroke: ${Color.DANGER};
  }
`;
