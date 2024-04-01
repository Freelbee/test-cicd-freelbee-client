import { CirilycRule } from "../CirilycRule";

describe('Cirilyc rule tests', () => {
  const rule = new CirilycRule();
  const validationMsg = {"en": "The field must contain only Cyrillic letters"};

  it('Should pass with valid value', () => {
    // given
    const valid = 'Тест';

    // then
    expect(rule.check(valid)).toBeTruthy();
  });

  it('Should not pass with invalid value', () => {
    // given
    const invalid = 'Test';

    // then
    expect(rule.check(invalid)).toBeFalsy();
    expect(rule.message()).toStrictEqual(validationMsg);
  });
});