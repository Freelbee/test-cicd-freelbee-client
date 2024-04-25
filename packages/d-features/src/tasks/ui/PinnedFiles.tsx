'use client';

import { Color, Text } from "@freelbee/shared/ui-kit";
import styled from "styled-components";
import { TaskFileDto, UserRole } from "@freelbee/entities";
import { StaticFileBadge } from "@freelbee/features";

interface Props {
    userRole: UserRole
    files: Array<TaskFileDto>,
} 

export const PinnedFiles = ({files, userRole}: Props) => {

  return (
    <Container>
    {files.filter(f => f.userRole === UserRole.COMPANY).length !== 0 && (
        <Container>
            <Text font='bodyMedium'>
            {userRole === UserRole.COMPANY ? 'Files attached by you' :' Files attached by Contractor'}
            </Text>
            <PinedFiles>
                {files.filter(file => file.userRole === UserRole.COMPANY).map(file => (
                    <StaticFileBadge key={file.id} file={file} />
                ))}
            </PinedFiles>
        </Container>
    )}

    {files.filter(f => f.userRole === UserRole.FREELANCER).length !== 0 && (
        <Container>
            <Text font='heading3' color={Color.GRAY_800}>
                {userRole === UserRole.FREELANCER ? 'Files attached by you' :' Files attached by Freelancer'}
            </Text>
            <PinedFiles>
                {files.filter(file => file.userRole === UserRole.FREELANCER).map(file => (
                    <StaticFileBadge key={file.id} file={file} />
                ))}
            </PinedFiles>
        </Container>
    )}

</Container>
  )
}

const Container = styled.div`
    display: grid;
    gap: 16px;
`

const PinedFiles = styled.div<{isHide?: boolean}>`
  max-width: 100%;  
  display: ${({isHide}) => isHide ? 'none' : 'flex'};
  flex-wrap: wrap;
  gap: 5px;
  border: 1px solid #d7d8de;
  border-radius: 10px;
  padding: 4px 6px;
  overflow-y: scroll;
  max-height: 400px;
  -ms-overflow-style: none; /* IE 11 */
  scrollbar-width: none; /* Firefox 64 */

  &::-webkit-scrollbar {
    width: 10px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: ${Color.GRAY_400};
    background-position: center;
    background-repeat: no-repeat;
    height: 5px;
  }
`;