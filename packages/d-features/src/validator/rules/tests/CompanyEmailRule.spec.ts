import { CompanyEmailRule } from "../CompanyEmailRule";

describe('Company Email rule tests', () => {
  const rule = new CompanyEmailRule();
  const validationMsg = {"en": "Please provide your corporate email, this email is not suitable"};

  it('Should pass with valid email', () => {
    // given
    const valid = 'albert@freelbee.com';

    // then
    expect(rule.check(valid)).toBeTruthy();
  });

  it('Should not pass with invalid emails', () => {
    // given
    const invalid = [
      'test@yahoo.com',
      'test@gmail.com',
      'test@outlook.com',
      'test@mail.com',
      'test@mailinator.com',
    ];

    // then
    invalid.forEach(mail => {
     expect(rule.check(mail)).toBeFalsy(); 
    })
    
    expect(rule.message()).toStrictEqual(validationMsg);
  });
});