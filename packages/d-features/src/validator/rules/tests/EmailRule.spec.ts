import { EmailRule } from "../EmailRule";

describe('Email rule tests', () => {
  const rule = new EmailRule();
  const validationMsg = {"en": "The field is filled in incorrectly"};

  it('Should pass with valid email', () => {
    // given
    const validEmail = 'albert@gmail.com';

    // then
    expect(rule.check(validEmail)).toBeTruthy();
  });

  it('Should not pass with invalid email', () => {
    // given
    const invalidEmail = 'testov.com';

    // then
    expect(rule.check(invalidEmail)).toBeFalsy();
    expect(rule.message()).toStrictEqual(validationMsg);
  });
});
