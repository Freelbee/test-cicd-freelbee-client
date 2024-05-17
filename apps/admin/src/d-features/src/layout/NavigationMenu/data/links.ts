import { ReactComponent as AdminsIcon } from '@freelbee/assets/icons/menu-icons/admin.svg';
import { ReactComponent as CompaniesIcon } from '@freelbee/assets/icons/menu-icons/companies.svg';
import { ReactComponent as ConfirmationCodesIcon } from '@freelbee/assets/icons/menu-icons/settings.svg';
import { NavLink } from '@freelbee/shared/ui-kit';

export const links: Array<NavLink> = [
  {
    link: `/admins`,
    title: 'Admin',
    Icon: AdminsIcon
  },
  {
    link: `/companies`,
    title: 'Companies',
    Icon: CompaniesIcon
  },
  {
    link: `/confirmation-codes`,
    title: 'Codes',
    Icon: ConfirmationCodesIcon
  },
];
