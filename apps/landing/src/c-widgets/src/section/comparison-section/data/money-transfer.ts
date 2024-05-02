import { CellTitle } from "../intreface/TableCell";

export const moneyTransfer: Record<CellTitle, string[]> = {
    [CellTitle["Budget-friendly"]]: [
        'Fixed commission for transactions. May have high withdrawal fees'
    ],
    [CellTitle["One-stop solution"]]: [
        'Only payments.',
        'No document processing, and contractor management tools'
    ],
    [CellTitle["No borders"]]: [
        'May limit payments to specific countries due to regulatory challenges and local risks'
    ],
    [CellTitle["Cryptocurrency payments"]]: [
        'No options to pay in cryptocurrency'
    ]
};