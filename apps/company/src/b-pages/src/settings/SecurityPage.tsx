'use client';

import { PageTitle, useUpdateUserPasswordMutation } from "@company/entities"
import { PasswordUpdateDto } from "@freelbee/entities";
import { PasswordUpdateForm} from "@freelbee/widgets"


export const SecurityPage = () => {

  const [updateUserPassword] = useUpdateUserPasswordMutation();

  const handlePasswordUpdate = (dto: PasswordUpdateDto) => {
    return updateUserPassword(dto).unwrap();
  }

  return (
    <>
        <PageTitle text='Change password' />
        <PasswordUpdateForm handlePasswordUpdate={handlePasswordUpdate}/>
    </>
  )
}
