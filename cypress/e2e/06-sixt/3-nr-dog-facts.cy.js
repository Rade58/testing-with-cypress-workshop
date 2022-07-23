/// <reference types="cypress" />

describe('Dog facts', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/dog-facts');

    cy.get('[data-test="amount-select"]').as('amountSelect');
    cy.get('[data-test="fetch-button"]').as('fetchButton');
    cy.get('[data-test="clear-button"]').as('clearButton');
    cy.get('[data-test="empty-state"]').as('emptyState');

    cy.intercept('/dog-facts/api?*').as('api');
  });

  it('should start out as an empty state', () => {
    cy.get('@emptyState').should('contain', 'Fetch some dog facts');
  });

  it('should make a reuest when a fetch button is clicked on', () => {
    cy.wait(1000);
    cy.get('@fetchButton').click();
    cy.wait('@api');
  });

  it('should no longer have empty state after fetch', () => {
    cy.wait(1000);
    cy.get('@fetchButton').click();
    cy.wait('@api');

    cy.get('@emptyState').should('not.exist');
  });

  it('should adjust the amount when the select is changed', () => {
    cy.get('@amountSelect').select('6');

    cy.get('@fetchButton').click({ timeout: 200 });

    cy.wait('@api').then((interception) => {
      expect(interception.request.url).to.match(/\?amount=6$/);
    });
  });

  it('should show the correct number of facts on the page', () => {
    cy.get('@amountSelect').select('6');

    cy.get('@fetchButton').click({ timeout: 200 });
    cy.wait('@api');

    cy.get('#facts > div').should('have.length', 6);
  });

  it('should clear the facts when "Clear button" is pressed', () => {
    cy.get('@amountSelect').select('6');
    cy.get('@fetchButton').click({ timeout: 200 });
    cy.get('@clearButton').click({ timeout: 200 });

    cy.wait(1000);
    cy.get('@emptyState').should('not.exist');
  });

  it('should reflect number of facts we are looking for in the title', () => {
    // AT THE BEGINING
    cy.title().should('eq', '3 Dog Facts');

    cy.get('@amountSelect').select('6');

    cy.title().should('eq', '6 Dog Facts');
  });
});
