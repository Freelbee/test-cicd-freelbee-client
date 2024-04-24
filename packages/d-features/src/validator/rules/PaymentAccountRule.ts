import { RuleMessage } from "packages/f-shared/src/validator/RuleMessage";
import { IRule } from "../interface/IRule";

export class PaymentAccountRule implements IRule
{
    public check (value : { accountNumber: string, bik: string}) : boolean
    {
        const accountNumber: string = value.accountNumber;
        const bik: string = value.bik;

        if (!(/^[0-9]{9}$/.test(bik))) {
            return false;
        }

        if (!(/^[0-9]{20}$/.test(accountNumber))) {
            return false;
        }

        const bikRs = bik.toString().slice(-3) + accountNumber;
        const coefficients = [7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1, 3, 7, 1];
        const checksum = coefficients.reduce((sum, item, i)=>sum + item * (parseFloat(bikRs[i]) % 10), 0);

        return checksum % 10 === 0;

    }

    public message () : RuleMessage
    {
        return {
            en: `Incorrect format of the current account or BIC`,
        };
    }
}
