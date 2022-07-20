/// <reference types="cypress" />

it('vist the crypto page', () => {
  cy.visit('http://localhost:3000/crypto-pooper');
});

it('should move an individual coin from legit to shitcoins', () => {
  cy.get('[data-test=coins-legit-coins]').as('legit');
  cy.get('[data-test=coins-shitcoins]').as('shit');

  cy.get('@legit').find('label').first().as('f1');

  let text;
  cy.get('@f1')
    .invoke('text')
    .then(($text) => {
      text = $text;
    })
    .then(() => {
      cy.wait(1000);
      cy.get('@f1').click();
      cy.get('@shit').contains(text).should('exist');
    });

  cy.get('@shit').find('label').last().as('f2');

  // cy.get('[data-test=coins-legit-coins]').contains('Shiba Inu').click();
  // cy.get('[data-test=coins-shitcoins]').contains('Shiba Inu').should('exist');
});
