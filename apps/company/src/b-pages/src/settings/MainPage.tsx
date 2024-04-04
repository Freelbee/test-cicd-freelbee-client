import { PageTitle } from "@company/entities"
import { AvatarWidget, UserDetailsForm } from "@freelbee/widgets"

export const MainPage = () => {

  // To-Do
  const user = {
    id: 1,
    firstname: 'Testov',
    lastname: 'Test',
    email: 'test@mail.com',
    phone: '+79784556633',
    status: 'approved',
  }

  return (
    <>
        <PageTitle text='Personal info' />
        <AvatarWidget />
        <UserDetailsForm user={user} />
    </>
  )
}
