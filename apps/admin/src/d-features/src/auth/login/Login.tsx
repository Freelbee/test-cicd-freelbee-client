'use client';

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AuthApiService, SessionStatusType } from '@admin/entities';
import styled from 'styled-components';
import {
  ActionButton, usePaApiService, StateUpdater, ColorType, Title, Paragraph, ParagraphSizeMods, AnyError,
  ApiResponseError
} from '@admin/shared';
import { ErrorBlock } from './ui/ErrorBlock';
import { Document } from './ui/Document';
import { DocumentField } from './ui/DocumentField';
import { Input } from './ui/Input/Input';
import { LoginData } from '../../../../e-entities/src/auth/dto/LoginData';
import { setSessionData } from '@admin/entities';

export function Login() {
  const dispatch = useDispatch();
  const [data, setData] = useState<LoginData>({
    email: ``,
    password: ``
  });
  const [errorMessage, setErrorMessage] = useState<string>(``);
  const [errorRes, setErrorRes] = useState<ApiResponseError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const apiService = usePaApiService(AuthApiService);

  const setFieldValue = StateUpdater
    .builder<LoginData, LoginData>(setData)
    .build()
    .get();

  const send = async () => {
    if (!data.email) {
      setErrorMessage(`E-mail field is required`);
      return;
    }
    if (!data.password) {
      setErrorMessage(`Password is required`);
      return;
    }
    setLoading(true);

    const response = await apiService.login({
      email: data.email,
      password: data.password
    });

    if (response.getCode() == 401) {
      setErrorMessage('Неверный логин или пароль');
      setLoading(false);
      return;
    }

    const statusRes = await apiService.getSessionData();

    if (statusRes.isSuccess()) {
      if (statusRes.getData().authStatus === SessionStatusType.NOT_LOGGED_IN) {
        setErrorMessage('Authorization failed, please try again');
      }
      dispatch(setSessionData(statusRes.getData()));
    } else {
      setErrorRes(response.getError());
    }
    setLoading(false);
    console.log(statusRes.getData());
  };

  return (
    <Container>
      <ContainerBody>
        <Title color={ColorType.BLACK_COLOR}>Sign In</Title>
        {!!errorMessage && <>
          <ContainerErrorHolder>
            <ErrorBlock>
              <Paragraph sizeMod={ParagraphSizeMods.DEFAULT} color={ColorType.BLACK_COLOR}>{errorMessage}</Paragraph>
            </ErrorBlock>
          </ContainerErrorHolder>
        </>}
        <ContainerForm>
          <Document>
            <DocumentField label={`E-mail address`}>
              <Input
                name={`email`}
                type={`text`}
                placeholder={`Enter e-mail address`}
                value={data.email}
                onChange={(e) => setFieldValue(`email`, e.target.value)}
              />
            </DocumentField>
            <DocumentField label={`Password`}>
              <Input
                name={`password`}
                type={`password`}
                placeholder={`Enter password`}
                value={data.password}
                onChange={(e) => setFieldValue(`password`, e.target.value)}
              />
            </DocumentField>
          </Document>
        </ContainerForm>
        <ActionButton onClick={() => send()} fullWidth={true} loading={loading} background={ColorType.BLACK_COLOR}>
          Submit
        </ActionButton>
        <AnyError error={errorRes} exceptFields={[]} />
      </ContainerBody>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  padding: 30px;
  justify-content: center;
`;

const ContainerBody = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  flex-direction: column;
`;

const ContainerForm = styled.div`
  display: flex;
  width: 100%;
  font-weight: 600;
  font-size: 22px;
`;

const ContainerErrorHolder = styled.div`
  display: flex;
  width: 100%;
  font-weight: 600;
  font-size: 22px;
`;
