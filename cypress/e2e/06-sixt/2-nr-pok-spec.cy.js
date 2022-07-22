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
  });

  it('', () => {});
});
