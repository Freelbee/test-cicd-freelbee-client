'use client';

import styled, { css } from "styled-components";
import { ErrorFileType, FileData } from "./FileLoader";

import { ReactComponent as CloseIcon } from '@freelbee/assets/icons/cross-icons/Cross8.svg';
import { ReactComponent as ExcelFileIcon } from '@freelbee/assets/icons/extention-icons/excel.svg';
import { ReactComponent as OtherFileIcon } from '@freelbee/assets/icons/extention-icons/other.svg';
import { ReactComponent as PdfFileIcon } from '@freelbee/assets/icons/extention-icons/pdf.svg';
import { ReactComponent as ImageIcon } from '@freelbee/assets/icons/extention-icons/image.svg';
import { ReactComponent as PptxFileIcon } from '@freelbee/assets/icons/extention-icons/pptx.svg';
import { ReactComponent as WordFileIcon } from '@freelbee/assets/icons/extention-icons/Word.svg';
import { ReactComponent as SizeErrorIcon } from '@freelbee/assets/icons/file-loader/cargo.svg';
import { ReactComponent as ClockIcon } from '@freelbee/assets/icons/file-loader/clockIcon.svg';
import { ReactComponent as SymbolsErrorIcon } from '@freelbee/assets/icons/file-loader/symbols.svg';
import { Color } from "../../style-base/enums/enums";
import { typography } from "../../style-base/typography/golos/typography";

interface Props {
    fileData: FileData;
    removeFile?: (id: number) => void;
}

export const FileBadge = ({fileData, removeFile}: Props) => {

  const getErrorIcon = (errorType: ErrorFileType) => {
    if (errorType === ErrorFileType.FILE_NAME) {
      return <SymbolsErrorIcon />;
    }
    return <SizeErrorIcon />;
  };

  const getExtensionIcon = (name: string) => {
    if (/\.(excel|csv|xlsx)/i.test(name)) {
      return <ExcelFileIcon />;
    }
    if (/\.(word|docx|RTF)/i.test(name)) {
      return <WordFileIcon />;
    }
    if (/\.pdf/i.test(name)) {
      return <PdfFileIcon />;
    }
    if (/\.pptx/.test(name)) {
      return <PptxFileIcon />;
    }
    if (/\.(png|jpeg|gif|svg|jpg|ico|tiff|WebP|eps)/i.test(name)) {
      return <ImageIcon />;
    }

    return <OtherFileIcon />;
  };

  const getFileName = (name: string) => {
    if (name.length > 10) {
      return name.slice(0, 5) + '...' + name.slice(-8);
    }
    return name;
  };


  return (
    <FileContainer 
        $isLoading={!!fileData.loading} 
        $isError={!!fileData.isError} 
        $isLoaded={!!fileData.isLoaded}>
        {!fileData.isError && getExtensionIcon(fileData.file.name)}
        {fileData.isError && getErrorIcon(fileData.errorType!)}
        <FileName $isError={!!fileData.isError} title={fileData.file.name}>
        {!fileData.isError ? getFileName(fileData.file.name) : (fileData?.message?.['en']) ?? getFileName(fileData.file.name)}
        </FileName>
        {fileData.loading && <ClockIconContainer><ClockIcon /></ClockIconContainer>}
        {!fileData.loading && removeFile &&
        <CloseIconContainer onClick={() => removeFile(fileData!.id!)}>
            <CloseIcon />
        </CloseIconContainer>}
  </FileContainer>
  )
}

const FileContainer = styled.div<{ $isLoading: boolean, $isError: boolean, $isLoaded: boolean }>`
  position: relative;
  overflow: hidden;
  display: flex;
  gap: 8px;
  justify-content: space-between;
  align-items: center;
  height: 36px;
  background: ${p => p.$isError ? '#F9E6E6' : Color.BG_REPORTS_BLUE};
  border-radius: 6px;
  max-width: 211px;
  padding: 4px 8px;

  &:before {
    position: absolute;
    content: '';
    z-index: -1;
    left: 0;
    top: 0;
    height: 100%;
    width: 0;
    transition: 1s ease-in-out;
  }

  ${props => props.$isLoading && css`
    &:before {
      height: 100%;
      width: 50%;
      background: linear-gradient(90deg, rgba(61, 107, 226, 0.2) 0%, rgba(40, 87, 179, 0.198853) 0.01%, rgba(61, 107, 226, 0.2) 54.48%);
    }
  `}`;


const CloseIconContainer = styled.div`

cursor: pointer;
display: flex;
height: 13px;
width: 13px;

svg {
  path {
    fill: ${Color.GRAY_500};
  }
}

&:hover {
  svg {
    path {
      fill: ${Color.GRAY_600};
    }
  }
}
`;

const FileName = styled.span<{ $isError: boolean }>`
  ${typography.default};
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 130%;
  color: ${(p) => p.$isError ? Color.DANGER : '#000000'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  max-width: 136px;
`;


const ClockIconContainer = styled.div`
  cursor: pointer;
  display: flex;
  height: 13px;
  width: 13px;
`;