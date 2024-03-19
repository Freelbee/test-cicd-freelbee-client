import { ReactComponent as apple} from '@landing/assets/icons/payments/apple.svg';
import { ReactComponent as astropay }from '@landing/assets/icons/payments/astropay.svg';
import { ReactComponent as bpi} from '@landing/assets/icons/payments/bpi.svg';
import { ReactComponent as cashAppLogo} from '@landing/assets/icons/payments/cash-app-logo.svg';
import { ReactComponent as pse }from '@landing/assets/icons/payments/pse.svg';
import { ReactComponent as sepa} from '@landing/assets/icons/payments/sepa.svg';
import { ReactComponent as shopee} from '@landing/assets/icons/payments/shopee.svg';
import { ReactComponent as unionbank} from '@landing/assets/icons/payments/unionbank.svg';
import { ReactComponent as upi} from '@landing/assets/icons/payments/upi.svg';
import { ReactComponent as visa} from '@landing/assets/icons/payments/visa.svg';
import { Icon } from '../interface/Icon';

export const METHODS: Array<Icon> = [
    {
        Icon: visa,
        alt: 'visa'
    },
    {
        Icon: apple,
        alt: 'apple'
    },
    {
        Icon: astropay,
        alt: 'astropay'
    },
    {
        Icon: bpi,
        alt: 'bpi'
    },
    {
        Icon: cashAppLogo,
        alt: 'cashAppLogo'
    },
    {
        Icon: pse,
        alt: 'pse'
    },
    {
        Icon: sepa,
        alt: 'sepa'
    },{
        Icon: shopee,
        alt: 'shopee'
    },{
        Icon: unionbank,
        alt: 'unionbank'
    },{
        Icon: upi,
        alt: 'upi'
    }
];