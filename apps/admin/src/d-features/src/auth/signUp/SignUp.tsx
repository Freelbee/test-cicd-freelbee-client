'use client';

import React from 'react';
import styled from 'styled-components';
import { TelegramOauth } from './ui/TelegramOauth';
import { TelegramUser, useCreateTelegramUserMutation } from '@admin/entities';
import { Color, Heading1, Text } from '@freelbee/shared/ui-kit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

export function SignUp() {
  const [connectTelegram, { error }] = useCreateTelegramUserMutation();

  const callbackConnectTelegram = (user: TelegramUser) => {
    connectTelegram({
      id: user.id.toString(),
      firstName: user.first_name ?? '',
      lastName: user.last_name ?? '',
      username: user.username,
      photoUrl: user.photo_url,
      authDate: user.auth_date
    });
  };

  function isFetchBaseQueryError(error: FetchBaseQueryError | SerializedError): error is FetchBaseQueryError {
    return typeof error === 'object' && error !== null && 'data' in error;
  }
  function isErrorDataString(data: unknown): data is string {
    return typeof data === 'string';
  }

  return (
    <Container>
      <Heading1>Hello</Heading1>
      <Text color={Color.GRAY_600}>To continue, please connect your Telegram account</Text>
      {error && isFetchBaseQueryError(error) && isErrorDataString(error.data) && (
        <Text color={Color.DANGER}>{error.data}</Text>
      )}
      <TelegramOauth callback={(user) => callbackConnectTelegram(user)} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 30px;
`;
