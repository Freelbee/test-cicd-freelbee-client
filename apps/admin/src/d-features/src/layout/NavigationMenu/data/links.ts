import { ReactComponent as AdminsIcon } from '@freelbee/assets/icons/menu-icons/admin.svg';
import { ReactComponent as CompaniesIcon } from '@freelbee/assets/icons/menu-icons/companies.svg';
import { NavLink } from '@freelbee/features/common';

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
  }
];
