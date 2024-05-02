
import { SectionTitle } from '@landing/shared';
import { ModalBody } from './ModalBody';
import { Color, Title2, Text } from '@freelbee/shared/ui-kit';
import { LinkButton, LinkStyle } from "@freelbee/shared/ui-kit";
import { ApplicationModalForm } from '@landing/features';

export const FormBlock = () => (
    <ModalBody data-testid={'application-modal'}>
        <SectionTitle>
            <Title2 as='h2'>
                See Freelbee in Action
            </Title2>
            <Text font='body' color={Color.GRAY_900}>Schedule a&nbsp;30-minute product demo with expert Q&amp;A</Text>
        </SectionTitle>
        <ApplicationModalForm />      
        <Text as='p' align='center' font='body' color={Color.GRAY_500}>
            By&nbsp;clicking the button, you agree to&nbsp;the processing of
            <LinkButton 
                linkStyle={LinkStyle.BLUE}
                as='Link' 
                href={'/privacy-policy'} 
                target={'_blank'}> 
                 &nbsp;personal data
            </LinkButton>
        </Text>  
    </ModalBody>
);
