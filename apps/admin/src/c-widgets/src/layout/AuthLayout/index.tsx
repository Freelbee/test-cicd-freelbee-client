'use client';

import { PropsWithChildren } from 'react';
import styled from 'styled-components';

export const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <Container>
      <LoginContainer>
        <LoginContent>
          <MainBlock>
            {children}
          </MainBlock>
        </LoginContent>
      </LoginContainer>
    </Container>
  );
};

const Container = styled.main`
  position: relative;
  height: auto;
  width: fit-content;
  min-width: 100%;
  padding: 24px;
  background: #f2f9fb;
  min-height: 1000px;
`;

const LoginContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding-top: 50px;
`;

const LoginContent = styled.div`
  display: flex;
  width: 100%;
  max-width: 450px;
  max-height: 500px;
  min-height: 215px;
`;

const MainBlock = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 4px 40px rgba(0, 0, 0, 0.05);
  position: relative;
`;
