'use client';

import React, { useState } from 'react';
import { AnyError, ApiResponseError, ColorType, Paragraph, Title, usePaApiService } from '@admin/shared';
import { useDispatch } from 'react-redux';
import { AuthApiService, SessionStatusType } from '@admin/entities';
import styled from 'styled-components';
import { TelegramOauth } from './ui/TelegramOauth';
import { TelegramUser } from '@admin/entities';
import { setSessionData } from '@admin/entities';

export function SignUp() {
  const dispatch = useDispatch();
  const apiService = usePaApiService(AuthApiService);
  const [errorMessage, setErrorMessage] = useState<ApiResponseError | null>(null);

  const connectTelegram = (user: TelegramUser) => {
    apiService.connectTelegram({
      id: user.id.toString(),
      firstName: user.first_name ?? '',
      lastName: user.last_name ?? '',
      username: user.username,
      photoUrl: user.photo_url,
      authDate: user.auth_date
    }).then((response) => {
      if (!response.isSuccess()) {
        setErrorMessage(response.getError());
        return;
      }
      dispatch(setSessionData({ authStatus: SessionStatusType.NEED_TO_CONFIRM, adminUser: null }));
    });
  };

  return (
    <Container>
      <Title color={ColorType.BLACK_COLOR}>Hello</Title>
      <Paragraph color={ColorType.GREY_COLOR}>To continue, please connect your Telegram account</Paragraph>
      <AnyError error={errorMessage} exceptFields={[]} />
      <TelegramOauth callback={(user) => connectTelegram(user)} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 30px;
`;
