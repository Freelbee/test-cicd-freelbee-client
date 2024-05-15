import { LinkButton, LinkStyle } from '@freelbee/shared/ui-kit';

export const ProfileVerificationLink = () => {
  return (
    <LinkButton as="button" linkStyle={LinkStyle.BLUE} font="bodySmall">Verify Profile</LinkButton>
  );
};
