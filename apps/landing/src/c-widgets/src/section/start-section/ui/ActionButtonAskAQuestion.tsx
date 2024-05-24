'use client';

import { ButtonStyleEnum, Button } from '@freelbee/shared/ui-kit';
import { useQueryParamsNavigation } from '@freelbee/shared/hooks';
import { ModalQueryValue, SectionId } from '@landing/entities';
import styled from 'styled-components';

export const ActionButtonAskAQuestion = () => {
  const [, navigateWithParam] = useQueryParamsNavigation();

  return (
    <ButtonWrapper>
      <Button
        data-testid="main-banner-btn"
        styleType={ButtonStyleEnum.GREEN}
        onClick={() => navigateWithParam('modal', ModalQueryValue.APPLICATION + SectionId.MAIN_BANNER)}
      >Ask a Question</Button>
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.div`
  position: relative;
  z-index: 3;
`;
