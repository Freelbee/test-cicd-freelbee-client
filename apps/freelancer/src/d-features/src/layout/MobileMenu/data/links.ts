import { ReactComponent as CompanyIcon } from "@freelbee/assets/icons/menu-icons/companies.svg";
import { ReactComponent as TasksIcon } from "@freelbee/assets/icons/menu-icons/tasks.svg";
import { ReactComponent as SettingsIcon } from "@freelbee/assets/icons/menu-icons/settings.svg";
import { MobileMenuLink } from "../interface/MobuileMenuLink";

export const visibleMenuItems: Array<MobileMenuLink> = [
    {
        link: `/`,
        title: 'Tasks',
        Icon: TasksIcon
    },
    {
        link: `companies`,
        title: 'Companies',
        Icon: CompanyIcon
    },
];

export const hiddenMenuItems: Array<MobileMenuLink> = [
    {
        link: `settings`,
        title: 'Settings',
        Icon: SettingsIcon
    },
];