import { Color, Text } from '@freelbee/shared/ui-kit';
import React from 'react';
import styled from 'styled-components';
import { ReactComponent as DownloadIcon } from '@freelbee/assets/icons/download/download.svg';

interface Props {
  text: string;
  link: string;
}

export const FileDownload = (props: Props) => {
  const { text, link } = props;

  return (
    <DownloadContainer>
      <Text font="bodyMedium">{text}</Text>
      <DownLoadContent href={link}>
        <DownloadIcon /><Text font={'body'} color={Color.BLUE}>Download</Text>
      </DownLoadContent>
    </DownloadContainer>
  )
}

const DownloadContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 16px;
  align-items: center;
`;
const DownLoadContent = styled.a`
  width: max-content;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 4px;
  cursor: pointer;

  svg {
    width: 25px;
    height: 25px;
    fill: ${Color.BLUE};
  }
`;
