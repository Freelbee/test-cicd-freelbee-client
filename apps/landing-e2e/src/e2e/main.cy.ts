describe('landing-e2e', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.setCookieOk();
  });

  it('should be only one h1 per page', () => {
    cy.get('h1').should('have.length', 1);
  });

  it('should open login modal window', () => {
    cy.getDataTest('header-menu-button').click();
    cy.getDataTest('login-mobile-button').should('be.visible').click();

    cy.url().should('contain', '/?modal=login');

    cy.getDataTest('company-login')
    .should('be.visible')
    .should('have.attr', 'href')
    .should('not.be.empty')
    .and('contain', Cypress.env().NEXT_PUBLIC_COMPANY_URL);

    cy.getDataTest('freelancer-login')
    .should('be.visible')
    .should('have.attr', 'href')
    .should('not.be.empty')
    .and('contain', Cypress.env().NEXT_PUBLIC_FREELANCER_URL);    
  });

  it('should open start modal window', () => {
    cy.getDataTest('header-menu-button').click();
    cy.getDataTest('start-mobile-button').should('be.visible').click();

    cy.url().should('contain', '/?modal=start');

    cy.getDataTest('company-login')
    .should('be.visible')
    .should('have.attr', 'href')
    .should('not.be.empty');

    cy.getDataTest('freelancer-login')
    .should('be.visible')
    .should('have.attr', 'href')
    .should('not.be.empty');
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
