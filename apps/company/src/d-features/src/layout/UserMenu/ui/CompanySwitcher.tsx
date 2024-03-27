'use client'

import { DOMHelper } from '@freelbee/shared/helpers';
import { Color, Text } from '@freelbee/shared/ui-kit';
import {ForwardedRef, forwardRef, useState} from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as AddIcon} from '@freelbee/assets/icons/cross-icons/plus.svg';
import { IconButton } from '@freelbee/features/common';
import { CompanyItem } from './CompanyItem';
import { motion } from 'framer-motion';

interface Props {
    // To-DO интерфейс компании
    companies: Array<{
      id: number,
      name: string,
      status: string,
    }>
    selectedCompany: {
      id: number,
      name: string,
      status: string,
    }
}

// const appearence = {
//   initial: { opacity: 0, scaleY: 0 },
//   animate: { opacity: 1, scaleY: 1 },
//   exit: { opacity: 0, scaleY: 0},
//   transition: { bounce: 0 },
// }

export const CompanySwitcher = forwardRef(function Switcher({companies, selectedCompany}: Props, ref?: ForwardedRef<HTMLDivElement>) {

    const [isOpen, setIsOpen] = useState(false);

    const handleCompanySelect = (id: number) => {
        // To-Do
    };

    const toggleOpen = () => setIsOpen(prev => !prev);

    return (
        <Container 
            onKeyDown={(e) => DOMHelper.handleEnterKeydown(e, toggleOpen)}
            tabIndex={0}
            onClick={toggleOpen} 
            ref={ref}>
            
            <CompanyListContainer isOpen={isOpen}>
                <CompanyList role='listbox'>
                    {
                        companies
                            .map((company) => (
                              <CompanyItem
                                  tabIndex={isOpen ? 0 : -1}
                                  selected={company.id === selectedCompany.id}
                                  role='option'
                                  aria-selected={false}
                                  key={company.id} 
                                  onClick={() => handleCompanySelect(company.id)}
                                  onKeyDown={(e) => DOMHelper.handleEnterKeydown(e, () => handleCompanySelect(company.id))}
                                  company={company}
                                  />
                            ))
                    }
                </CompanyList>
                <AddSection>
                    <IconButton label={'Add new company'} Icon={<AddIcon />} isSmall 
                      styles={addButtonStyled} />
                    <Text font='bodyMedium' color={Color.GRAY_700}>Add company</Text>
                </AddSection>
            </CompanyListContainer>
        </Container>
    );
});

const addButtonStyled = css`
  max-width: 40px; 
  max-height: 40px;

  svg {
    max-width: 18px;
  }
`

const Container = styled(motion.div)`
  display: flex;
  align-items: center;
  z-index: 1;
  background: ${Color.GRAY_200};
  border-radius: 10px;
  padding: 16px;
  padding-right: 20px;
  transform-origin: top;
`;

const CompanyListContainer = styled.div<{isOpen: boolean}>`
  width: 100%;
  overflow: hidden;
  min-width: 100%;
`;

const AddSection = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  margin-top: 16px;
`;

const CompanyList = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
  flex-direction: column;
  max-height: 150px;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE 11 */
  scrollbar-width: none; /* Firefox 64 */

  &::-webkit-scrollbar-thumb {
    background-color: ${Color.GRAY_400};
    background-position: center;
    background-repeat: no-repeat;
    height: 5px;
    border-radius: 10px;
  }

  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    overflow: hidden;
  }
`;