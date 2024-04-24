import { AbstractValidator, IRule, RequiredRule } from "@freelbee/features";
import { PaymentMethodPropType } from "@freelbee/entities";

type BankForm = Partial<{[K in PaymentMethodPropType]: string}>;

export class BankFormValidator extends AbstractValidator<BankForm>
{
    protected rules () : {[key in keyof BankForm]?: IRule[]}
    {
        return {
            [PaymentMethodPropType.BANK_ACCOUNT_NUMBER]: [new RequiredRule()],
            [PaymentMethodPropType.BANK_NAME]: [new RequiredRule()],
            [PaymentMethodPropType.BIC_OR_SWIFT]: [new RequiredRule()],
            [PaymentMethodPropType.HOLDER_NAME]: [new RequiredRule()],
            [PaymentMethodPropType.IBAN]: [new RequiredRule()],
        };
    }
}