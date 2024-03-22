import { ReactComponent as Icon4} from '../assets/bank.svg';
import { ReactComponent as Icon2} from '../assets/countries.svg';
import { ReactComponent as Icon3} from '../assets/money.svg';
import { ReactComponent as Icon1} from '../assets/paper.svg';

export const CARDS_DATA = [
    {
        Icon: Icon1,
        title: "Overwhelming paperwork: piles of contracts, NDAs, invoices, etc.",
        text: "As your contractor base grows, you might be overwhelmed with choosing the right payment method for each contractor, tracking payments and paid tasks, effectively negotiating contracts, and managing intellectual property rights."
    },
    {
        Icon: Icon2,
        title: 'Contractors from many countries',
        text: 'When you deal with freelancers from different countries, you have to factor in a variety of currencies, local payment systems, transactional requirements, and legal aspects.'
    },
    {
        Icon: Icon3,
        title: 'Security risks of transactions',
        text: 'While working with freelancers you face civil and tax risks and you have to guarantee the satefy of all transactions.'
    },
    {
        Icon: Icon4,
        title: "Frequent or small payments lead to significant bank costs",
        text: "The majority of international payments options are not suitable for bulk payments of small amounts. There is a high risk you will be charged for each transaction which leads to substantial financial costs."
    }
];