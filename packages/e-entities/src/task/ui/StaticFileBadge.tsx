'use client';

import styled from "styled-components";
import { ReactComponent as ExcelFileIcon } from '@freelbee/assets/icons/extention-icons/excel.svg';
import { ReactComponent as OtherFileIcon } from '@freelbee/assets/icons/extention-icons/other.svg';
import { ReactComponent as PdfFileIcon } from '@freelbee/assets/icons/extention-icons/pdf.svg';
import { ReactComponent as ImageIcon } from '@freelbee/assets/icons/extention-icons/image.svg';
import { ReactComponent as PptxFileIcon } from '@freelbee/assets/icons/extention-icons/pptx.svg';
import { ReactComponent as WordFileIcon } from '@freelbee/assets/icons/extention-icons/Word.svg';
import { ReactComponent as LoadIcon } from '@freelbee/assets/icons/download/download_stroke.svg';
import { TaskFileDto } from "@freelbee/entities";
import { Color, typography } from "@freelbee/shared/ui-kit";

interface Props {
    file: TaskFileDto;
}

export const StaticFileBadge = ({file}: Props) => {

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
    <FileContainer href={file.fileLink.downloadLink}>
        {getExtensionIcon(file.fileName)}
        <FileName title={file.fileName}>
        {getFileName(file.fileName)}
        </FileName>
        <IconContainer>
            <LoadIcon />
        </IconContainer>
  </FileContainer>
  )
}

const FileContainer = styled.a`
  cursor: pointer;
  position: relative;
  overflow: hidden;
  display: flex;
  gap: 8px;
  justify-content: space-between;
  align-items: center;
  height: 36px;
  border-radius: 6px;
  max-width: 211px;
  padding: 4px 8px;
  background-color: ${Color.BG_REPORTS_BLUE};

  &:before {
    position: absolute;
    content: '';
    z-index: -1;
    left: 0;
    top: 0;
    height: 100%;
    width: 0;
    transition: 1s ease-in-out;
  }`;


const IconContainer = styled.span`
cursor: pointer;
display: flex;
height: 13px;
width: 13px;

svg {
    stroke: ${Color.GRAY_600};
}
`;

const FileName = styled.span`
  ${typography.default};
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 130%;
  color: '#000000';
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  max-width: 136px;
`;