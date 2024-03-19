import {ValidatorResult} from "./result/ValidatorResult";
import { IRule } from "./interface/IRule";

export abstract class AbstractValidator<T> {
    protected abstract rules () : {
        [key in keyof T]?: IRule[]
    };

    public validate (data : T) : ValidatorResult<T>
    {
        const rules = this.rules();
        const validatorResult = new ValidatorResult<T>();

        for(const name in rules) {
            // @ts-expect-error @description: fix it later
            for(const rule of rules[name]) {
                if (!rule.check(data[name])) {
                    validatorResult.setError(name, rule.message());
                    break;
                }
            }
        }
        return validatorResult;
    }
}