export interface CompareCard {
    title: string;
    Icon: JSX.Element;
    monthlyPrice: JSX.Element,
    transactionPrice: JSX.Element,
    button?: JSX.Element
    disabled: boolean,
}