import { Step} from "../interface/Step";

import paySrc from "@landing/assets/images/main/steps/pay.svg";
import regSrc from "@landing/assets/images/main/steps/register.svg";
import addSrc from "@landing/assets/images/main/steps/add.svg";

export const stepsData: Array<Step> = [
    {
        title: 'Register your company',
        description: 'Enter your personal info and confirm your entity status',
        image: regSrc
    },
    {
        title: 'Add contractors',
        description: 'Choose you preferred payment method such as bank transfer or credit card to top up your wallet',
        image: addSrc
    },
    {
        title: 'Make payments',
        description: 'Sign up for free wallet on web, IOS or Android and follow our easy process to set up your profile',
        image: paySrc
    },
];
