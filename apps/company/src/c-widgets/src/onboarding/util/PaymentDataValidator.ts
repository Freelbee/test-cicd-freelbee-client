import { AbstractValidator, IRule,  RequiredRule } from "@freelbee/features";
import { PaymentMethodFormData } from "../interface/PaymentMethodsFormData";
import { PaymentMethodPropType } from "@freelbee/entities";

export class PaymentDataValidator extends AbstractValidator<PaymentMethodFormData>
{
    protected rules () : {[key in keyof PaymentMethodFormData]?: IRule[]}
    {
        return {
            [PaymentMethodPropType.BANK_ACCOUNT_NUMBER]: [new RequiredRule()],
            [PaymentMethodPropType.BANK_NAME]: [ new RequiredRule()],
            [PaymentMethodPropType.HOLDER_NAME]: [new RequiredRule()],
            [PaymentMethodPropType.BIC_OR_SWIFT]: [new RequiredRule()],
            [PaymentMethodPropType.IBAN]: [new RequiredRule()],
        };
    }
}