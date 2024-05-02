import { NoWhiteSpaceRule } from "../NoWhiteSpaceRule";

describe('No WhiteSpace rule tests', () => {
  const rule = new NoWhiteSpaceRule();
  const validationMsg = {"en": "There should be no spaces in the field"};

  it('Should pass with valid value', () => {
    // given
    const valid = 'Text';

    // then
    expect(rule.check(valid)).toBeTruthy();
  });

  it('Should not pass with invalid value', () => {
    // given
    const invalid = 'Text With Spaces';

    // then
    expect(rule.check(invalid)).toBeFalsy();
    expect(rule.message()).toStrictEqual(validationMsg);
  });
});