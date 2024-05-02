import { AbstractValidator, IRule, RequiredRule } from "@freelbee/features";
import { PaymentMethodPropType } from "@freelbee/entities";

type CardForm = Partial<{[K in PaymentMethodPropType]: string}>;

export class CardFormValidator extends AbstractValidator<CardForm>
{
    protected rules () : {[key in keyof CardForm]?: IRule[]}
    {
        return {
            [PaymentMethodPropType.HOLDER_NAME]: [new RequiredRule()],
            [PaymentMethodPropType.CARD_NUMBER]: [new RequiredRule()],
        };
    }
}