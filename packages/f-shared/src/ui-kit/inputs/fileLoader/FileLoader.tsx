import React from 'react';
import styled, { RuleSet } from 'styled-components';
import { Color, Text, typography } from '@freelbee/shared/ui-kit';

import { ReactComponent as PaperClipIcon } from '@freelbee/assets/icons/paper-clip/paper-clip.svg';
import { RuleMessage } from '../../../validator/RuleMessage';
import { FileBadge } from './FileBadge';

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
      // const filename = newFiles[i].name;
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

  return (
    <Container>
      {label &&
        <Text font="bodyMedium">{isRequired ? label + '*' : label}</Text>}
      <Content borderColor={borderColor} styles={fileContainerStyles}>
        {
          files.map(fileData => (
            <FileBadge key={fileData.id} fileData={fileData} removeFile={removeFile} />
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

const MaxSize = styled.span`
  ${typography.default};
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  color: ${Color.GRAY_500};

  margin-left: auto;
`;
