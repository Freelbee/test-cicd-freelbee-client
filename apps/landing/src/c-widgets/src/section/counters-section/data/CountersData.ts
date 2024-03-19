import { ReactComponent as CryptoIcon} from '../assets/crypto.svg';
import { ReactComponent as FeeIcon} from '../assets/fee.svg';
import { ReactComponent as WorldIcon} from '../assets/global.svg';
import { ReactComponent as MoneyIcon} from '../assets/money.svg';
import { CounterData } from "../interface/Counter";

export const CountersData: Array<CounterData> = [
    {
        subtitle: 'service fee',
        prefix: '$',
        countTo: 0,
        Icon: FeeIcon
    },
    {
        subtitle: 'countries',
        countTo: 160,
        Icon: WorldIcon
    },
    {
        subtitle: 'currencies',
        countTo: 97,
        Icon: MoneyIcon
    },
    {
        subtitle: 'cryptocurrencies',
        prefix: '+',
        countTo: 170,
        Icon: CryptoIcon
    },
];