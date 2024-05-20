'use client';

import React from 'react';
import { AnyError, ColorType, Paragraph, Title } from '@admin/shared';
import { useConnectTelegramMutation } from '@admin/entities';
import styled from 'styled-components';
import { TelegramOauth } from './ui/TelegramOauth';
import { TelegramUser } from '@admin/entities';

export function SignUp() {

  const [connectTelegram, { error }] = useConnectTelegramMutation();

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

  return (
    <Container>
      <Title color={ColorType.BLACK_COLOR}>Hello</Title>
      <Paragraph color={ColorType.GREY_COLOR}>To continue, please connect your Telegram account</Paragraph>
      <AnyError error={error} exceptFields={[]} />
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
