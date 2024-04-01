import OnlyNumbersRule from "../OnlyNumbersRule";

describe('Only Numbers rule tests', () => {
  const rule = new OnlyNumbersRule();
  const validationMsg = {"en": "The field is filled in incorrectly"};

  it('Should pass with valid value', () => {
    // given
    const valid = '12345';

    // then
    expect(rule.check(valid)).toBeTruthy();
  });

  it('Should not pass with invalid value', () => {
    // given
    const invalid = '123DqrA';

    // then
    expect(rule.check(invalid)).toBeFalsy();
    expect(rule.message()).toStrictEqual(validationMsg);
  });
});