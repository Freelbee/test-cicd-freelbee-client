import { OnlyLettersRule } from "../OnlyLettersRule";

describe('Only Letters rule tests', () => {
  const rule = new OnlyLettersRule();
  const validationMsg = {"en": "The field is filled in incorrectly"};

  it('Should pass with valid value', () => {
    // given
    const valid = 'some text';

    // then
    expect(rule.check(valid)).toBeTruthy();
  });

  it('Should not pass with invalid value', () => {
    // given
    const invalid = 'Sto1234';

    // then
    expect(rule.check(invalid)).toBeFalsy();
    expect(rule.message()).toStrictEqual(validationMsg);
  });
});