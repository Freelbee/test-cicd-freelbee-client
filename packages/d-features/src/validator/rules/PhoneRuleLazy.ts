import { RuleMessage } from '../interface/RuleMessage';
import { IRule } from '../interface/IRule';

export class PhoneRuleLazy implements IRule {
    private getErrorMessage (): RuleMessage {
        return {
            en: `The field is filled in incorrectly!`,
        };
    }


    private isValid (phone: string) {
        return /\+?[0-9]+/.test(phone) && phone.length > 6;
    }


    check (phone: string): boolean {
        return this.isValid(phone);
    }

    message (): RuleMessage {
        return this.getErrorMessage();
    }
}
