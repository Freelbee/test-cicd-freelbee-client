'use client';

import { Color, Text } from "@freelbee/shared/ui-kit";
import styled from "styled-components";
import {ReactComponent as UserImage} from '@freelbee/assets/icons/user/person.svg';

export const AvatarWidget = () => {
    return (
        <Container>
            <Avatar>
                <UserImage stroke={Color.GRAY_600} width={40} height={40} />
            </Avatar>
            <Text font='bodyMedium'>Profile photo</Text>
            <Text font='body' color={Color.GRAY_700}>This image will be displayed on your profile</Text>
        </Container>
      )
    }
    
    const Container = styled.div`
        display: flex;
        flex-direction: column;
        gap: 4px;
        align-items: center;
    `;
    
    const Avatar = styled.div`
        margin-bottom: 12px;
        width: 100px;
        height: 100px;
        overflow: hidden;
        border-radius: 33px;
        background-color: ${Color.GRAY_300};
        display: flex;
        align-items: center;
        justify-content: center;
    `;