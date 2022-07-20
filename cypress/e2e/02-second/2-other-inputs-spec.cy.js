/// <reference types="cypress" />

describe('Secret Menu Stuff', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/secret-menu');

    // ALIASING RANGE INPUT AND SELECT ELEMENT

    cy.get('#minimum-rating-visibility').as('ranger');

    cy.get('#restaurant-visibility-filter').as('filterSelect');
  });

  it('should set the range and verify it', () => {
    // THIS IS HOW YOU WOULD MAKE CTION ON RANGE LEMENT
    cy.get('@ranger').invoke('val', 6).trigger('input');

    // ASSERTION
    cy.get('@ranger').should('have.value', 6);
  });

  it('should check the checkbox and verify it', () => {
    cy.get('#show-description').as('description-check');

    // I HAVE PROBLEM IN MY UI
    // I DON'T KNOW IF THAT IS BECAUSE I'M USING DAISY UI LIBRARY
    // SO INSTEAD OF USING .check
    // WITH I COULDN'T CRETE ACTION
    // I AM USING .click
    // I THINK THE PROBLEM IS WITH checked ATTRIBUTE THAT ISN'T
    // BEING SHOWN IN DOM ON THE CHECKBOX AT ALL
    // SO I THINK THAT UI LIBRARY IS UISNG SOME OTHER LOGIC

    // cy.wait(1000);
    // cy.get('@description-check').check({
    // waitForAnimations: true,
    // delay: 1000,
    // timeout: 1000
    // });
    // cy.wait(1000);
    //
    // cy.get('@description-check').should('be.checked');
    //
    // cy.get('@description-check').should('have.attr', 'checked', false);

    // THIS IS WHAT WORKED

    cy.get('@description-check').click();

    cy.get('@description-check').should('not.be.checked');

    // TRYING AGAIN
    cy.wait(1000);

    cy.get('@description-check').click();

    cy.get('@description-check').should('be.checked');
  });

  it('should select an option from the select and verify it', () => {
    cy.get('@filterSelect').select('Chipotle');

    cy.get('@filterSelect').should('have.value', 'Chipotle');
  });
});
