'use client';

import styled from 'styled-components';

import { ReactComponent as Icon1} from '@landing/assets/images/main/start-section/avatar1.svg';
import { ReactComponent as Icon2} from '@landing/assets/images/main/start-section/avatar2.svg';
import { ReactComponent as Icon3} from '@landing/assets/images/main/start-section/avatar3.svg';

const icons = [Icon3, Icon2, Icon1];

export const Avatars = () => (
    <Container>
        {icons.map((Icon, idx) => (
            <IconContainer key={idx} $index={idx}>
                <Icon/>
            </IconContainer>
        ))}
    </Container>
);

const Container = styled.span`
    position: absolute;
    display: inline-flex;
    align-items: center;
    justify-content: center;
`;

const IconContainer = styled.span<{$index: number}>`
    position: relative;
    left: ${({$index}) => -$index / 2 + 'em'};
    z-index: ${({$index}) => -$index};
`;