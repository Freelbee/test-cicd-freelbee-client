'use client';

import { Color, Text } from "@freelbee/shared/ui-kit";
import styled from "styled-components";
import {ReactComponent as DownloadIcon } from "@freelbee/assets/icons/download/download.svg";
import { useGetContractLinkQuery } from "@freelancer/entities";
import { skipToken } from "@reduxjs/toolkit/query";

interface Props {
    taskId: number
}
export const ContractDownload = ({taskId}: Props) => {

    const {data: link } = useGetContractLinkQuery(taskId ?? skipToken);

  return (
    <DownloadContainer>
        <Text font='bodyMedium'>Contract:</Text>
        {link && 
        <DownLoadContent href={link?.downloadLink}>
            <DownloadIcon/>
            <Text font={'body'} color={Color.BLUE}>Download agreement</Text>
        </DownLoadContent>
        }
    </DownloadContainer>
  )
}


const DownloadContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 8px;
    align-items: center;
`;

const DownLoadContent = styled.a`
    display: block;
    width: max-content;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 4px;
    cursor: pointer;

    svg {
        width: 18px;
        height: 18px;
        fill: ${Color.BLUE};
    }
`;