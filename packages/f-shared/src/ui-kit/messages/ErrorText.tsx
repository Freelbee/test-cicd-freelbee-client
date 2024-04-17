'use client';
import { Text } from '../texts/text'
import { Color } from '../style-base/enums/enums'
import styled from 'styled-components';

interface Props {
    title: string,
    message?: string
}

export const ErrorText = ({title, message}: Props) => {
  return (
    <Container>
        <Text color={Color.ERROR} font="bodyMedium">{title}</Text>
        <Text font='bodySmall'>{message}</Text>
    </Container>

  )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`