
import { ReactComponent as PersonalIcon } from "@freelbee/assets/icons/menu-icons/personal.svg";
import { ReactComponent as LockIcon } from "@freelbee/assets/icons/menu-icons/lock.svg";
import { NavLink } from "@freelbee/shared/ui-kit";

export const links: Array<NavLink> = [
    {
        link: `/settings`,
        title: 'Personal info',
        Icon: PersonalIcon
    },
    {
        link: `/settings/security`,
        title: 'Security',
        Icon: LockIcon
    }
]