/// <reference types="cypress" />

// TESTS FOR FORM VALIDATION LESSON

describe('Sign Up', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/echo-chamber/sign-up');
    cy.get('[data-test="sign-up-email"]').as('email');
    cy.get('[data-test="sign-up-submit"]').as('submit');
  });

  it('should require an email', () => {
    cy.get('@submit').click();

    // WHEN EMAIL IS INVALID IT SHOULD HAVE PSEUDO CLASS :invalid

    // WE JUST CHECK IF THER IS ONLY ONE INPUT ELEMENT
    // THAT IS CURRENTLY INAVLID
    // .length CAN BE ALSO USE TO CHECK HOW MANY PARAGRAPHS OR DIVS
    // WE HAVE (CAN BE USED FOR ANY ELEMENT)
    // BUT WE ARE NOW CHECKING IF THERE IS ONLY ONE ELEMENT WITH
    // GIVEN DATA ATRIBUTE, AND IT IS INVALID
    cy.get('[data-test="sign-up-email"]:invalid').should('have.length', 1);
    // BUT ALSO, THERE SHOULD BE TOOLTIP WITH A WARNING MESSAGE
    // THIS IS HOW WE CAN ACCESS TOOLTIP
    cy.get('[data-test="sign-up-email"]:invalid')
      .invoke('prop', 'validationMessage')
      .should('contain', 'Please fill out this field.');

    cy.get('[data-test="sign-up-email"]:invalid')
      .invoke('prop', 'validity')
      .its('valueMissing')
      .should('be.true');
  });

  it('should require that the email actually be an email address', () => {
    cy.get('@email').type('foobar');

    cy.get('@submit').click();

    cy.get('input').should('have.length', 2);
  });
});
