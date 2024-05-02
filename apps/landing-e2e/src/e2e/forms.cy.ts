describe('forms-e2e', () => {
    it('should send message in questions form on the main page', () => {
      cy.visit('/');
      cy.setCookieOk();
    });

  it('should pass question form', () => {
    cy.visit('/');

    cy.getDataTest('question-form-email').type('test@comp.com', { force: true });
    cy.getDataTest('question-form-text')
      .type('Hello, it is my e2e test message', { force: true });

    cy.intercept('POST', '/api/tg_bot').as('tgBotRequest');

    cy.getDataTest('question-form-submit').click({ force: true });

    cy.wait('@tgBotRequest').its('response.statusCode').should('eq', 200);
  });

  it('should pass application modal form and redirect to thanks page', () => {
    // there are id = landing-form and first input like email, phone imput and text area
    // fill form and send
    cy.visit('/?modal=application_main');

    cy.getDataTest('landing-form-name').type('Test Testov', { force: true });
    cy.getDataTest('landing-form-company').type('Test Company', { force: true });
    cy.getDataTest('landing-form-phone').type('+79990091213', { force: true });
    cy.getDataTest('landing-form-email').type('e2e@test.com', { force: true });
    cy.getDataTest('landing-form-message')
      .type('Hello, it is my e2e test message', { force: true });
 
    cy.intercept('POST', '/api/tg_bot').as('tgBotRequest');

    cy.getDataTest('landing-form-submit').click({ force: true });

    cy.wait('@tgBotRequest').its('response.statusCode').should('eq', 200);
    cy.url().should('eq', Cypress.config().baseUrl + '/thanks-for-booking')
  });
});
