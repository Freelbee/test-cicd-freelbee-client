import checkPhone from 'google-libphonenumber';
import { IRule } from '../interface/IRule';
import { RuleMessage } from '../interface/RuleMessage';
const phoneUtil = checkPhone.PhoneNumberUtil.getInstance();


export class PhoneRule implements IRule
{
    public check (value : {country: string, number: string}) : boolean
    {
        const code = value.country;
        const phone = value.number;
        if(phone === ``) return false;
        try {

            const number = phoneUtil.parseAndKeepRawInput(phone, code);
            const valNumber = `+${number.getCountryCode()}${number.getNationalNumber()}`;
            return phoneUtil?.isValidNumber(number) && valNumber === number.getRawInput();
        }catch(e) {
            return false;
        }
    }

    public message () : RuleMessage
    {
        return {
            en: `Phone format is wrong`,
        };
    }
}

//^\+?[78][-]?([(]\d{3}[)]|\d{3})?-?\d{3}-?\d{2}-?\d{2}$
