import { ReactComponent as AdminsIcon } from '@freelbee/assets/icons/menu-icons/admin.svg';
import { ReactComponent as CompaniesIcon } from '@freelbee/assets/icons/menu-icons/companies.svg';
import { ReactComponent as SettingsIcon } from '@freelbee/assets/icons/menu-icons/settings.svg';
import { MobileMenuLink } from '../interface/MobuileMenuLink';

export const visibleMenuItems: Array<MobileMenuLink> = [
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

export const hiddenMenuItems: Array<MobileMenuLink> = [
  {
    link: `/settings`,
    title: 'Settings',
    Icon: SettingsIcon
  }
];
