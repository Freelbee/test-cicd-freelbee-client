import { AbstractValidator, EmailRule, IRule, RequiredRule } from '@freelbee/features';
import { AuthenticationDto } from '@freelbee/entities';

export class LoginDataValidator extends AbstractValidator<AuthenticationDto> {
  protected rules(): { [key in keyof AuthenticationDto]?: IRule[] } {
    return {
      email: [new RequiredRule(), new EmailRule()],
      password: [new RequiredRule()]
    };
  }
}
