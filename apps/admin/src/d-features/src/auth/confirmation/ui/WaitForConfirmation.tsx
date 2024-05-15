import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import * as process from 'process';
import {
  ActionButton, AnyError, ApiResponseError, ColorType, LoadingIconBlack, Paragraph, Title, usePaApiService
} from '@admin/shared';
import { AuthApiService, setSessionData } from '@admin/entities';
import { useAppSelector } from '@admin/features';

export function WaitForConfirmation() {
  const dispatch = useDispatch();
  const apiService = usePaApiService(AuthApiService);
  const session = useAppSelector((state) => state.sessionReducer);
  const [error, setError] = useState<ApiResponseError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getStatus = async () => {
    setIsLoading(true);
    const res = await apiService.getSessionData();
    if (res.isSuccess() && session.data.status !== res.getData().authStatus) {
      dispatch(setSessionData(res.getData()));
    } else {
      setError(res.getError());
    }
    setIsLoading(false);
  };

  return (
    <Container>
      <Title>Sign In Confirmation</Title>
      <Paragraph color={ColorType.GREY_COLOR}>
        Accept authorization in your Telegram account: &nbsp;
        <a href={`https://t.me/${process.env.NEXT_PUBLIC_BOT_URL ?? 'FreelbeeAdminBot1'}`} target={`_blank`}>{/*TODO:::*/}
          <Paragraph color={ColorType.LINK}>@{process.env.NEXT_PUBLIC_BOT_URL ?? 'FreelbeeAdminBot1'}</Paragraph>
        </a>
        &nbsp;and click the button
      </Paragraph>
      {!isLoading && <LoadingContainer><ActionButton onClick={() => getStatus()}>Check status</ActionButton></LoadingContainer>}
      {isLoading && <LoadingContainer><LoadingIconBlack /></LoadingContainer>}
      {error && <LoadingContainer><AnyError error={error} exceptFields={[]} /></LoadingContainer>}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px;
`;

const LoadingContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 20px;
`;
