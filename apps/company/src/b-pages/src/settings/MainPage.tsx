'use client';

import { PageTitle, useUserData } from "@company/entities"
import { AvatarWidget, UserDetailsForm } from "@freelbee/widgets"

export const MainPage = () => {

  const [user] = useUserData();

  return (
    <>
        <PageTitle text='Personal info' />
        <AvatarWidget />
        <UserDetailsForm user={user} />
    </>
  )
}
