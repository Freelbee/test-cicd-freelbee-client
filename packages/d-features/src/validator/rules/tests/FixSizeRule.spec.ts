import { FixSizeRule } from "../FixSizeRule";


describe('FixSize rule tests', () => {
  const size = 5;
  const rule = new FixSizeRule(size);
  const validationMsg = {"en": "The field is filled in incorrectly"};

  it('Should pass with valid value', () => {
    // given
    const valid = '12345';

    // then
    expect(rule.check(valid)).toBeTruthy();
  });

  it('Should not pass with invalid value', () => {
    // given
    const invalid = '';

    // then
    expect(rule.check(invalid)).toBeFalsy();
    expect(rule.message()).toStrictEqual(validationMsg);
  });
});