import { ReactComponent as TasksIcon } from "@freelbee/assets/icons/menu-icons/tasks.svg";
import { ReactComponent as SettingsIcon } from "@freelbee/assets/icons/menu-icons/settings.svg";
import { NavLink } from "@freelbee/shared/ui-kit";

export const links: Array<NavLink> = [
    {
        link: `/`,
        title: 'Tasks',
        Icon: TasksIcon
    },
    // {
    //     link: `/freelancers`,
    //     title: 'Freelancers',
    //     Icon: PeopleIcon
    // },
    // {
    //     link: `/documents`,
    //     title: 'Documents',
    //     Icon: DocsIcon
    // },
    {
        link: `/settings`,
        title: 'Settings',
        Icon: SettingsIcon
    },
]
