import { AbstractValidator, IRule, RequiredRule } from "@freelbee/features";
import { PaymentMethodPropType } from "@freelbee/entities";

type CryptoForm = Partial<{[K in PaymentMethodPropType]: string}>;

export class CryptoFormValidator extends AbstractValidator<CryptoForm>
{
    protected rules () : {[key in keyof CryptoForm]?: IRule[]}
    {
        return {
            [PaymentMethodPropType.CRYPTO_WALLET_ADDRESS]: [new RequiredRule()]
        };
    }
}