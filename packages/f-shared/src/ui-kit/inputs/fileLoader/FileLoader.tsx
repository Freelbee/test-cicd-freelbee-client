import React from 'react';
import styled, { css, RuleSet, keyframes } from 'styled-components';
import { Color, Text, typography } from '@freelbee/shared/ui-kit';

import { ReactComponent as PaperClipIcon } from '@freelbee/assets/icons/paper-clip/paper-clip.svg';
import { ReactComponent as CloseIcon } from '@freelbee/assets/icons/cross-icons/Cross8.svg';
import { ReactComponent as ExcelFileIcon } from '@freelbee/assets/icons/extention-icons/excel.svg';
import { ReactComponent as OtherFileIcon } from '@freelbee/assets/icons/extention-icons/other.svg';
import { ReactComponent as PdfFileIcon } from '@freelbee/assets/icons/extention-icons/pdf.svg';
import { ReactComponent as ImageIcon } from '@freelbee/assets/icons/extention-icons/image.svg';
import { ReactComponent as PptxFileIcon } from '@freelbee/assets/icons/extention-icons/pptx.svg';
import { ReactComponent as WordFileIcon } from '@freelbee/assets/icons/extention-icons/word.svg';
import { ReactComponent as SizeErrorIcon } from '@freelbee/assets/icons/file-loader/cargo.svg';
import { ReactComponent as ClockIcon } from '@freelbee/assets/icons/file-loader/clockIcon.svg';
import { ReactComponent as SymbolsErrorIcon } from '@freelbee/assets/icons/file-loader/symbols.svg';
import { RuleMessage } from '../../../validator/RuleMessage';

export interface FileData {
  id?: number,
  file: File,
  loading?: boolean,
  isError?: boolean,
  message?: RuleMessage,
  isLoaded?: boolean,
  errorType?:ErrorFileType
}

export enum ErrorFileType {
  FILE_SIZE = 'fileSize',
  FILE_NAME = 'name',
}

interface FileLoaderProps {
  text?: string;
  borderColor?: Color,
  maxSizeText?: string;
  fileContainerStyles?: Array<RuleSet<object>>,
  label?: string,
  isRequired?: boolean;
  files: FileData[];
  setFiles: React.Dispatch<React.SetStateAction<FileData[]>>;
  maxFileSize?: number;
  multiply?: boolean;
}

const errors = {
  fileIsTooBig: {
    en: 'File is too big',
  },
  fileHasInvalidSymbols: {
    en: 'Invalid file name',
  }
};

export default function FileLoader(props: FileLoaderProps) {
  const {
    text,
    borderColor,
    maxSizeText,
    fileContainerStyles,
    label,
    isRequired,
    files,
    setFiles,
    maxFileSize = 5_242_880,
    multiply = true
  } = props;

  function getBase64(file: File, id: number) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      setFiles(prev => prev.map(fileData => {
        if (fileData.id === id) {
          return {
            ...fileData,
            file: fileData.file,
            loading: false,
            isLoaded: true
          };
        }
        return fileData;
      }));
    };
    reader.onerror = function(error) {
      console.log(error);
    };
  }

  const onDropHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const newFiles = e.target!.files!;
    for(let i = 0; i < newFiles.length; i++) {
      const filename = newFiles[i].name;
      const id = new Date().getTime() + i;
      const file = newFiles[i];
      if(newFiles[i].size > maxFileSize) {
        const newFile = {
          id: id,
          file: file,
          loading: false,
          isError: true,
          message: errors.fileIsTooBig,
          errorType: ErrorFileType.FILE_SIZE
        };
        if(multiply) {
          setFiles(prev => [...prev, newFile]);
        } else {
          setFiles([newFile]);
        }
      }
      // else if (Helper.hasNotInvalidSymbols(filename)) {
      else {
        const newFile = {
          id: id,
          file: file,
          loading: false,
        };
        if (multiply) {
          setFiles(prev => [...prev, newFile]);
          setTimeout(() => {
            setFiles(prev => prev.map(file => {
              if (file.id === id) return {...file, loading: true};
              return file;
            }));
          }, 0);
          setTimeout(() => {
            getBase64(newFiles[i], id);
          }, 1000);
        } else {
          setFiles([newFile]);
          setTimeout(() => {
            setFiles(prev => prev.map(file => {
              if (file.id === id) return {...file, loading: true};
              return file;
            }));
          }, 0);
          setTimeout(() => {
            getBase64(newFiles[i], id);
          }, 1000);
        }
      }
      // else {
      //     const newFile = {
      //         id: id,
      //         name: file.name,
      //         payload: '',
      //         loading: false,
      //         isError: true,
      //         message: errors.fileHasInvalidSymbols,
      //         errorType: ErrorFileType.FILE_NAME
      //     };
      //     if(multiply) setFiles(prev => [...prev, newFile]);
      //     else setFiles([newFile]);
      // }
    }

  };

  const removeFile = (id: number) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  };

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
    <Container>
      {label &&
        <Text font="bodyMedium">{isRequired ? label + '*' : label}</Text>}
      <Content borderColor={borderColor} styles={fileContainerStyles}>
        {
          files.map(fileData => (
            <FileContainer key={fileData.id} $isLoading={!!fileData.loading} $isError={!!fileData.isError} $isLoaded={!!fileData.isLoaded}>
              {!fileData.isError && getExtensionIcon(fileData.file.name)}
              {fileData.isError && getErrorIcon(fileData.errorType!)}
              <FileName $isError={!!fileData.isError} title={fileData.file.name}>
                {!fileData.isError ? getFileName(fileData.file.name) : (fileData?.message?.['en']) ?? getFileName(fileData.file.name)}
              </FileName>
              {fileData.loading && <ClockIconContainer><ClockIcon /></ClockIconContainer>}
              {!fileData.loading &&
                <CloseIconContainer onClick={() => removeFile(fileData!.id!)}><CloseIcon /></CloseIconContainer>}
            </FileContainer>
          ))
        }
      </Content>
      <InputFileContainer>
        <PaperClipIcon />
        <InputFile type="file" name="file" multiple={multiply} onChange={(e) => onDropHandler(e)} />
        <Placeholder>{text}</Placeholder>
        {
          maxSizeText && <MaxSize>{maxSizeText}</MaxSize>
        }
      </InputFileContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px
`;

const Content = styled.div<{ borderColor?: Color, styles?: Array<RuleSet<object>> }>`
  width: 100%;
  min-height: 48px;
  transition: max-height 0.4s cubic-bezier(0, 1, 0, 1);
  border: 1px solid ${p => p.borderColor ?? Color.GRAY_400};
  border-radius: 10px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 11px;
  padding: 4px 6px;

  overflow: auto;

  &::placeholder {
    color: ${Color.GRAY_500};
  }

  resize: none;

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: ${Color.GRAY_400};
    border-radius: 10px;
  }

  ${p => p.styles};
`;


const InputFileContainer = styled.label`
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Placeholder = styled.span`
  ${typography.body};
  font-weight: 400;
  font-size: 12px;
  line-height: 130%;
  color: ${Color.DEFAULT_BLUE};
`;

const InputFile = styled.input`
  position: absolute;
  z-index: -1;
  opacity: 0;
  display: block;
  width: 0;
  height: 0;
`;

const Loaded = keyframes`
  from {
    background: rgba(61, 107, 226, 0.2);
  }
  to {
    background: #EBEEF7;
  }
`;


const FileContainer = styled.div<{ $isLoading: boolean, $isError: boolean, $isLoaded: boolean }>`
  position: relative;
  overflow: hidden;
  display: flex;
  gap: 8px;
  justify-content: space-between;
  align-items: center;
  height: 36px;
  background: ${p => p.$isError ? '#F9E6E6' : '#EBEEF7'};
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
  `}

  ${props => props.$isLoaded && css`
    &:before {
      height: 100%;
      width: 100%;
      animation: ${Loaded} 1s ease-in-out;

      animation-fill-mode: forwards;
    }
  `}

  z-index: 1;
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

const ClockIconContainer = styled.div`
  cursor: pointer;
  display: flex;
  height: 13px;
  width: 13px;
`;

const MaxSize = styled.span`
  ${typography.default};
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  color: ${Color.GRAY_500};

  margin-left: auto;
`;
