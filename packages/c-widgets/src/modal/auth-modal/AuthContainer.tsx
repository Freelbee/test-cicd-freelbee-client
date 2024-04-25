'use client'
import React from 'react';
import styled from 'styled-components';

type Props = {
    isOpen: boolean;
    children: React.ReactNode;
};

export default function AuthContainer (props: Props) {
    const {isOpen, children} = props;

    return (
        <Container $isOpen={isOpen}>
            {children}
        </Container>
    );
}

const Container = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => $isOpen ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
