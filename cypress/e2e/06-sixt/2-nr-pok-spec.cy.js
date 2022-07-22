/// <reference types="cypress" />

const pokemons = [
  // { id: 1, name: 'WhiteRnger' },
  { id: 1, name: 'Charmander' },
  { id: 2, name: 'Lotad' },
  { id: 3, name: 'Axew' }
  // { id: 1, name: 'Bllwinkle' }
  // { id: 2, name: 'NinjaTurtle' },
  // { id: 3, name: 'Altair' },
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

  it('should update the query parameter', () => {
    cy.wait(1000);
    cy.get('@search').type('charm', {
      delay: 100,
      timeout: 100
    });
    cy.wait('@api');

    cy.location('search').should('equal', '?name=charm');
  });

  it('should call the API with correct query parameter', () => {
    cy.wait(1000);

    cy.get('@search').type('charm', {
      delay: 100,
      timeout: 100
    });
    cy.wait('@api').then((interception) => {
      expect(interception.request.url).to.contain('name=charm');
    });
  });

  it('should pre-populate the search field with the query parameter', () => {
    // WE CAN SET QUERY PARAMETERS WHEN USING cy.visit()

    cy.visit({
      url: 'http://localhost:3000/pokemon-search',
      qs: {
        name: 'charm'
      }
    });

    cy.get('@search').should('have.value', 'charm');
  });

  it('should render the result to the page', () => {
    // HERE WE ARE SETTING THAT RESPONSE
    // WILL ALWAYS HAVE DATA WE SETTED UP
    cy.intercept('/pokemon-search/api?*', { pokemons }).as('stubbed-api');

    // IT DOESN'T METTER WHAT WE PASS HERE
    // SINCE RESPONSE WILL ALWAYS HAVE DATA ABOVE
    cy.get('@search').type('lol');

    cy.wait('@stubbed-api');

    // NOW LIST SHOULD HAVE 3 DIFFERENT POKEMONS
    cy.get('[data-test="result"]').should('have.length', 3);
  });
});
