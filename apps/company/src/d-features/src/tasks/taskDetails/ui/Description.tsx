'use client';

import { TaskCounterpartyDataDto } from "@freelbee/entities";
import { Color, Text } from "@freelbee/shared/ui-kit";
import styled, {css} from "styled-components";
import { FormRowGrid } from "./FormGrid";

interface Props {
    task: TaskCounterpartyDataDto | null;
}

export function Description ({task}: Props) {
  
    return (
        <FormRowGrid>
            <Text font='bodyMedium'>
                Description: 
            </Text>
            <Container>
                <Content>
                    <Text font='body' styles={css`white-space: pre-line;`}>
                        {task?.description ?? '--'}
                    </Text>
                </Content>
            </Container>
        </FormRowGrid>

    );
}

const Container = styled.div`
  max-height: 300px;
  overflow: hidden;
  border-radius: 10px;
`;

const Content = styled.div`
  max-height: 300px;
  max-width: 100%;
  border-radius: 10px;
  padding: 15px;
  border: 1px solid #d7d8de; 
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE 11 */
  scrollbar-width: none; /* Firefox 64 */
  
  &::-webkit-scrollbar {
    width: 4px;
    height: 5px;
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