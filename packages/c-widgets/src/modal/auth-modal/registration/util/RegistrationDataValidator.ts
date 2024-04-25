import {
  AbstractValidator,
  CheckedRule,
  EmailRule,
  IRule,
  MinLengthRule,
  NoWhiteSpaceRule,
  PasswordRule,
  RequiredRule
} from "@freelbee/features";
import {RegistrationData} from "@freelbee/entities";


export class RegistrationDataValidator extends AbstractValidator<RegistrationData>
{
    protected rules () : {[key in keyof RegistrationData]?: IRule[]}
    {
        return {
            email: [new RequiredRule(), new EmailRule()],
            password: [new RequiredRule(), new NoWhiteSpaceRule(), new MinLengthRule(8), new PasswordRule()],
            phone: [new RequiredRule()],
            agreeWithTerms: [new CheckedRule()]
        };
    }
}

