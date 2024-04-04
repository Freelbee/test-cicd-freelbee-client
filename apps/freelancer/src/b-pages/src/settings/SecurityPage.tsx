'use client';

import { PageTitle } from "@freelancer/entities"
import { PasswordChangeForm } from "@freelbee/widgets"

export const SecurityPage = () => {

  return (
    <>
        <PageTitle text='Change password' />
        <PasswordChangeForm handler={() => {}}/>
    </>
  )
}
