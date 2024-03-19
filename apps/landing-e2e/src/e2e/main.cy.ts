describe('landing-e2e', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.setCookieOk();
  });

  it('should be only one h1 per page', () => {
    cy.get('h1').should('have.length', 1);
  });

  it('should redirect to the personal account login page', () => {
    cy.getDataTest('header-menu-button').click();
    cy.getDataTest('login-mobile-button').should('be.visible').click();

    cy.url().should('equal', Cypress.env().NEXT_PUBLIC_PERSONAL_URL)
  });

  it('should open application modal with searchParams on button click', () => {
    cy.getDataTest('main-banner-btn').click();
    cy.getDataTest('application-modal').should('be.visible');
  });

  it('should open application modal by visit', () => {
    cy.visit('/?modal=application_main');
    cy.getDataTest('application-modal').should('be.visible');
  });

});
