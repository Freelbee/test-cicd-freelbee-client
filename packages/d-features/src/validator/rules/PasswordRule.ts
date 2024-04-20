import {IRule, RuleMessage} from "@freelbee/features";

export class PasswordRule implements IRule {
  public check(value: string): boolean {
    const hasLowerCase = /[a-z]/.test(value);
    const hasUpperCase = /[A-Z]/.test(value);
    return hasLowerCase && hasUpperCase;
  }

  public message(): RuleMessage {
    return {
      en: `Password should contain at less one lowercase symbol and one uppercase`
    };
  }
}
