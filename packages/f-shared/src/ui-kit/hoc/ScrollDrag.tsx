import { ReactNode, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { Color } from '../style-base/enums/enums';

interface Props {
    children: ReactNode;
    withScrollbar?: boolean;
    scrollTrackColor?: Color;
    scrollThumbColor?: Color;
    slowMotion?: number;
}

export const ScrollDrag = (props: Props) => {
    const {
        children,
        withScrollbar,
        scrollThumbColor = Color.GRAY_400,
        scrollTrackColor = Color.WHITE,
        slowMotion = 8
    } = props;

    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);

    const xRef = useRef<number>(0);

    const [dragging, setDragging] = useState<boolean>(false);
    const [overflow, setOverflow] = useState<boolean>(false);

    const checkOverflow = () => {
        if (contentRef.current && wrapperRef.current) {
            if (contentRef.current.scrollWidth > wrapperRef.current.offsetWidth) {
                setOverflow(true);
            } else {
                setOverflow(false);
            }
        }
    };

    const onMouseMove = (e: MouseEvent) => {
        if (!wrapperRef.current || !contentRef.current) return;
        const offset = e.screenX - xRef.current;
        wrapperRef.current.scrollLeft -= (offset / slowMotion);
    };

    const onMouseDown = ({ target, screenX }: MouseEvent) => {
        if ((target as HTMLElement).tagName === 'BUTTON'
            || (target as HTMLElement).tagName === 'A') return;

        xRef.current = screenX;
        setDragging(true);

        contentRef.current?.addEventListener('mousemove', onMouseMove);
        contentRef.current?.addEventListener('mouseup', onMouseUp);
        contentRef.current?.addEventListener('mouseleave', onMouseUp);
    };

    const onMouseUp = () => {
        setDragging(false);

        contentRef.current?.removeEventListener('mousemove', onMouseMove);
        contentRef.current?.removeEventListener('mouseup', onMouseUp);
        contentRef.current?.removeEventListener('mouseleave', onMouseUp);
    };

    useEffect(() => {        
        const contentRow = contentRef.current;
        
        window?.addEventListener('resize', checkOverflow);
        contentRow?.addEventListener('mousedown', onMouseDown);

        return () => {
            window?.removeEventListener('resize', checkOverflow);
            contentRow?.removeEventListener('mousedown', onMouseDown);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        checkOverflow();
    }, [children]);


    return (
        <DragWrapper 
            isDraggable={overflow} 
            isDragging={dragging} 
            withScrollBar={withScrollbar}
            thumbColor={scrollThumbColor}
            trackColor={scrollTrackColor}
            ref={wrapperRef}>
            <DragContent ref={contentRef}>
                {children}
            </DragContent>
        </DragWrapper>
    );
};

const DragWrapper = styled.div<{ 
    isDraggable: boolean, 
    isDragging: boolean,
    withScrollBar?: boolean,
    thumbColor?: Color,
    trackColor?: Color }>`

    user-select: none;
    max-width: 100%;
    overflow-x: scroll;

    ${({ isDraggable }) => isDraggable && css`
        cursor: grab;
    `}

    ${({ isDragging, isDraggable }) => isDragging && isDraggable && css`
        cursor: grabbing;
    `}

    ${({withScrollBar, thumbColor, trackColor}) => withScrollBar ? 
        css`
        scrollbar-width: none;
          -ms-overflow-style: none; /* IE 11 */

        &::-webkit-scrollbar-thumb {
            border-radius: 5px;
            background-color: ${thumbColor};
            background-position: center;
            background-repeat: no-repeat;
            height: 3px;
        }

        &::-webkit-scrollbar-track {
            border-radius: 5px;
            background-color: ${trackColor};
        } 

        &::-webkit-scrollbar {
            width: 3px;
            height: 3px;
        } 
    `
        :
        css`
         &::-webkit-scrollbar {
            width: 0px;
            background: transparent;
            -webkit-appearance: none;
            display: none;
            scrollbar-width: none; /* Firefox */
        } 

        scrollbar-width: none;
    `}

    img {
        touch-action: none;
    }
`;

const DragContent = styled.div`
    width: max-content;
    height: max-content;
`;