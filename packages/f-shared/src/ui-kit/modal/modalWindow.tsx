'use client';

import { useFocusTrap } from '@freelbee/shared/hooks';
import { Breakpoint, Z_INDEX, mediaBreakpointDown, Portal } from '@freelbee/shared/ui-kit';
import { DOMHelper } from '@freelbee/shared/helpers';
import {ReactNode, useCallback, useEffect} from 'react';
import styled from 'styled-components';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode,
    isOpen: boolean,
    onClose: () => void
};

export const ModalWindow = ({children, isOpen, onClose, ...rest}: Props) => {

    const focusTrapRef = useFocusTrap<HTMLDivElement>();

    const handleEsc = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape' && isOpen) {
            onClose();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onClose]);

    useEffect(() => {
        window.addEventListener('keydown', handleEsc);
        const handleScroll = (e: Event) => {
            e.preventDefault();
            e.stopPropagation();
        };

        if (isOpen) {
            document.body.addEventListener('scroll', handleScroll);
            document.body.setAttribute('style', 'touch-action:none;');
        }

        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.removeAttribute('style');
            document.body.removeEventListener('scroll', handleScroll);
        };
    }, [onClose, isOpen, handleEsc]);

    return (
        <Portal>
            <Container
                {...rest}
                $isOpen={isOpen}
                onClick={(e)=> DOMHelper.isNotChildOfElem(e) && onClose()}
                ref={isOpen ? focusTrapRef : null}>
                {children}
            </Container>
        </Portal>
    );
}

const Container = styled.div<{$isOpen: boolean}>`
  z-index: ${Z_INDEX.modal};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: auto;
  padding: 20px;
  display: grid;
  justify-items: center;
  align-items: center;
  overflow-y: scroll;

  transition: background 0.5s, visibility 0.5s, opacity 0.5s;
  background: ${({$isOpen}) => $isOpen ? '#00000091' : 'transparent'};
  visibility: ${({$isOpen}) => $isOpen ? 'visible' : 'hidden'};
  opacity: ${({$isOpen}) => $isOpen ? 1 : 0};

  pointer-events: ${({$isOpen}) => $isOpen ? 'unset' : 'none'};

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

    -ms-overflow-style: none; /* IE 11 */
    scrollbar-width: none; /* Firefox 64 */

  &>:first-child {
    transition: top 0.5s;
    top: ${({$isOpen}) => $isOpen ? '0' : '15px'};;
  }

  ${mediaBreakpointDown(Breakpoint.xMobile)} {
    padding: 10px;
  };
`;
