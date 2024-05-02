import { CellTitle } from "../intreface/TableCell";

export const freelbeeTable: Record<CellTitle, string[]> = {
    [CellTitle["Budget-friendly"]]: [
        'Low fixed transaction fee',
        'No surplus fee per contractor',
        'No hidden costs'
    ],
    [CellTitle["One-stop solution"]]: [
        'One tool for payment processing, document management, and contractor administration',
        'A simple solution to handle tasks related to contractor payments.'
    ],
    [CellTitle["No borders"]]: [
        'Supports 160+ countries'
    ],
    [CellTitle["Cryptocurrency payments"]]: [
        'Pay contractors with cryptocurrency using your local currencies or other cryptocurrencies'
    ]
};