import { CellTitle } from "../intreface/TableCell";

export const contractorsManagement: Record<CellTitle, string[]> = {
    [CellTitle["Budget-friendly"]]: [
        'Higher commission per transaction',
        'Monthly service fee per contractor',
        'Hidden transaction costs are pretty common',
    ],
    [CellTitle["One-step solution"]]: [
        'Too many excessive features, with no customization options for pricing and user experience',
        'One tool for payment processing, document management, and contractor administration'
    ],
    [CellTitle["No borders"]]: [
        'Most solutions work only with US and EU companies'
    ],
    [CellTitle["Cryptocurrency payments"]]: [
        'Not common'
    ]
};