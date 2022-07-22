/// <reference types="cypress" />

const pokemons = [
  { id: 1, name: 'WhiteRnger' },
  { id: 2, name: 'NinjaTurtle' },
  { id: 3, name: 'Altair' },
  { id: 4, name: 'Bllwinkle' }
];

describe('Pokemon search', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/pokemon-search');

    cy.get('[data-test="search"]').as('search');
    cy.get('[data-test="search-label"]').as('label');
    // AN ALIAS FOR INTERCEPTING NETWORK REQUEST
    // AS YOU CAN SE YOU CAN USE GLOB
    cy.intercept('/pokemon-search/api?*').as('api');
  });

  it('should call the API when the user types', () => {
    cy.wait(1000);

    cy.get('@search').type('charm', {
      delay: 100,
      timeout: 100
    });
    // I GUESS WE ARE WAITING ON THIS REQUEST
    cy.wait('@api');
  });
});
