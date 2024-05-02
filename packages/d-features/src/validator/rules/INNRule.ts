/* eslint-disable no-case-declarations */
import { RuleMessage } from "packages/f-shared/src/validator/RuleMessage";
import {IRule} from "../interface/IRule";

export class INNRule implements IRule
{

    public check (value : string) : boolean
    {
        if (!/[0-9]{10}|[0-9]{12}/.test(value)) {
            // Sentry.captureMessage(`INNRule: ${value} not valid length`);
            return false;
        }
        const checkDigit = function (inn: string, coefficients: Array<number>) {
            let n = 0;
            for(let i = 0; i < coefficients.length; i++) {
                n += coefficients[i] * parseInt(inn[i]);
            }
            return parseInt(String(n % 11 % 10));
        };
        switch (value.length) {
            case 10:
                const n10 = checkDigit(value, [2, 4, 10, 3, 5, 9, 4, 6, 8]);
                if (n10 === parseInt(value[9])) {
                    return true;
                }
                break;
            case 12:
                const n11 = checkDigit(value, [7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
                const n12 = checkDigit(value, [3, 7, 2, 4, 10, 3, 5, 9, 4, 6, 8]);
                if ((n11 === parseInt(value[10])) && (n12 === parseInt(value[11]))) {
                    return true;
                }
                break;
        }
        // Sentry.captureMessage(`INNRule: ${value} not valid`);
        return false;
    }

    public message () : RuleMessage
    {
        return {
            en: `The field is filled in incorrectly`,
        };
    }
}
