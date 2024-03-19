
import { SectionTitle } from '@landing/shared';
import { ModalBody } from './ModalBody';
import { Color, Heading1, Text } from '@freelbee/shared/ui-kit';
import { LinkButton, LinkStyle } from '@freelbee/features/common';
import { ApplicationForm } from '@landing/features';

export const FormBlock = () => (
    <ModalBody data-testid={'application-modal'}>
        <SectionTitle>
            <Heading1 $align='center' as='h2'>
                See Freelbee in Action
            </Heading1>
            <Text align='center' font='body' color={Color.GRAY_600}>Schedule a&nbsp;30-minute product demo with expert Q&amp;A</Text>
        </SectionTitle>
        <ApplicationForm/>
        <Text as='p' align='center' font='body' color={Color.GRAY_600}>
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
