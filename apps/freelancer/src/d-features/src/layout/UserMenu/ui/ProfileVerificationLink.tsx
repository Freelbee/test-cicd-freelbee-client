import { LinkButton, LinkStyle } from '@freelbee/features/common'
import React from 'react'

export const ProfileVerificationLink = () => {
  return (
    <LinkButton as='button' linkStyle={LinkStyle.BLUE} font='bodySmall'>Verify Profile</LinkButton>
  )
}
