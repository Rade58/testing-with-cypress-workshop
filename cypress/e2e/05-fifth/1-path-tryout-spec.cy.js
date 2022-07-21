/// <reference types="cypress" />

// WE WILL DEAL A BIT WITH /echo-chamber PAGE

describe('echo chamber tryout', () => {
  /*   it('visits the echo chamber', () => {
    cy.visit('http://localhost:3000/echo-chamber');
  });

 */ beforeEach(() => {
    cy.visit('http://localhost:3000/echo-chamber');

    cy.get('.dropdown > .btn').first().as('dropdown');
  });

  it('should have a title of the application in the window', () => {
    cy.title().should('contain', 'Echo Chamber');
  });

  it("should navigate to /aign-in when you click on 'Sign In Button'", () => {
    cy.get('@dropdown').click();

    cy.wait(1000);

    cy.get('[data-test=sign-in]').click();

    cy.location('pathname').should('contain', 'sign-in');
  });
});
