import { AbstractValidator, DateFormatRule, IRule, MinAgeRule, OnlyLettersRule, RequiredRule } from '@freelbee/features';
import { FormData } from '../interface/FormData';
import { UserDataPropsType } from '@freelbee/entities';

export class PersonalFormValidator extends AbstractValidator<FormData> {
  protected rules(): { [key in keyof FormData]?: IRule[] } {
    return {
      [UserDataPropsType.DOCUMENT_NUMBER]: [new RequiredRule()],
      [UserDataPropsType.FIRST_NAME]: [new RequiredRule(), new OnlyLettersRule()],
      [UserDataPropsType.LAST_NAME]: [new RequiredRule(), new OnlyLettersRule()],
      [UserDataPropsType.BIRTH_DATE]: [new RequiredRule(), new DateFormatRule(), new MinAgeRule(18)],
      [UserDataPropsType.TIN]: [new RequiredRule()],
  };
  }
}
