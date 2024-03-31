import { LinkButton, LinkStyle } from '@freelbee/features/common'

export const ProfileVerificationLink = () => {
  return (
    <LinkButton as='button' linkStyle={LinkStyle.BLUE} font='bodySmall'>Verify Profile</LinkButton>
  )
}
