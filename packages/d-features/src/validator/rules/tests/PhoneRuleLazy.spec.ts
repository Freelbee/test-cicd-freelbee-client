import { PhoneRuleLazy } from "../PhoneRuleLazy";

describe('PhoneRuleLazy rule tests', () => {
  const rule = new PhoneRuleLazy();
  const validationMsg = {"en": "The field is filled in incorrectly"};

  it('Should pass with valid value', () => {
    // given
    const valid = '+79804556688';

    // then
    expect(rule.check(valid)).toBeTruthy();
  });

  it('Should not pass with empty string value', () => {
    // given
    const invalid = '';

    // then
    expect(rule.check(invalid)).toBeFalsy();
    expect(rule.message()).toStrictEqual(validationMsg);
  });

  it('Should not pass with short number', () => {
    // given
    const invalid = '23451';

    // then
    expect(rule.check(invalid)).toBeFalsy();
  });

  it('Should not pass with invalid string', () => {
    // given
    const invalid = 'phone string';

    // then
    expect(rule.check(invalid)).toBeFalsy();
  });
});