import { NavLink } from "../interface/NavLink";
import { ReactComponent as TasksIcon } from "@freelbee/assets/icons/menu-icons/tasks.svg";
import { ReactComponent as SettingsIcon } from "@freelbee/assets/icons/menu-icons/settings.svg";
import { ReactComponent as CompanyIcon } from "@freelbee/assets/icons/menu-icons/companies.svg";

export const links: Array<NavLink> = [
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
    {
        link: `settings`,
        title: 'Settings',
        Icon: SettingsIcon
    },
]