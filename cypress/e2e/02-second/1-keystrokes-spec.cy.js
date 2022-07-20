/// <reference types="cypress" />

it('we submit a form with pressing enter', () => {
  cy.visit('http://localhost:3000/crypto-pooper');

  cy.wait(200);

  // IN THIS CASE IN MY APP, PRESSING ENTER WOULD MEAN
  // SUBMITTING A FORM

  cy.get('[data-test=new-coin-input]').type('Dogebonk{enter}', {
    delay: 200,
    timeout: 300
  });

  cy.contains('Dogebonk').should('exist');
});

// OR LETS USE .submit METHOD

it('sumbits the form again', () => {
  cy.get('[data-test=new-coin-input]').type('Shibonk', {
    delay: 200,
    timeout: 300
  });

  cy.get('form').submit();

  cy.contains('Shibonk').should('exist');
});
