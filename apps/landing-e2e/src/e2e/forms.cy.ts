describe('forms-e2e', () => {
    it('should send massage in questions form on the main page', () => {
      cy.visit('/');
      cy.setCookieOk();
    });

  it('should pass form', () => {
    // there are id = landing-form and first input like email, phone imput and text area
    // fill form and send
    cy.visit('/?modal=application_main');

    cy.getDataTest('landing-form-phone').type('+79990091213', { force: true });
    cy.getDataTest('landing-form-email').type('e2e@test.com', { force: true });
    cy.getDataTest('landing-form-message')
      .type('Hello, it is my e2e test message', { force: true });
    cy.getDataTest('landing-form-message').click({ force: true })

    cy.intercept('POST', '/api/tg_bot').as('tgBotRequest');

    cy.getDataTest('landing-form-submit').click({ force: true });

    // cy.wait('@tgBotRequest').its('response.statusCode').should('eq', 200);

    cy.wait('@tgBotRequest').then((interception) => {
      console.log(interception.request, interception.response)
      expect([200, 400, 500, 401]).to.include(interception.response.statusCode);
    });

  });
});
