import { ReactComponent as FreelbeeLogo} from '@landing/assets/icons/logo/freelbee-logo.svg';
import { ReactComponent as RandomLogo} from '@landing/assets/icons/logo/random-copany-logo.svg';

import { CompareCard } from "../interface/CompareCard";
import { ActionButton } from '../ui/ActionButton';
import { FreelbeMonthlyPrice, FreelbeTransactionPrice, OtherMonthlyPrice, OtherTransactionPrice } from '../ui/Prices';
import { Button } from '@freelbee/features/common';


export const CardsData: Array<CompareCard> = [
    {
        disabled: false,
        Icon: <FreelbeeLogo />,
        title: 'Best Value',
        monthlyPrice: <FreelbeMonthlyPrice/>,
        transactionPrice: <FreelbeTransactionPrice/>,
        button: <ActionButton />,
    },
    {
        disabled: true,
        Icon: <RandomLogo />,
        title: 'Alternative',
        monthlyPrice: <OtherMonthlyPrice/>,
        transactionPrice: <OtherTransactionPrice/>,
        button: <Button disabled isWide style={{color: 'transparent'}}>Better not</Button>,
    }
];
