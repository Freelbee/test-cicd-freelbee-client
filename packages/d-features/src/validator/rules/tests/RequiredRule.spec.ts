import { RequiredRule } from "../RequiredRule";

describe('Required rule tests', () => {
  const rule = new RequiredRule();
  const validationMsg = {"en": "The field cannot be empty"};

  it('Should pass with valid value', () => {
    // given
    const valid = 'some text';

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
});