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
    cy.get('@search').type('hello world');

    cy.wait('@stubbed-api');

    // NOW LIST SHOULD HAVE 3 DIFFERENT POKEMONS
    cy.get('[data-test="result"]').should('have.length', 3);
  });

  it('should link to the correct pokemon', () => {
    cy.intercept('/pokemon-search/api?*', { pokemons }).as('stubbed-api');
    cy.get('@search').type('hello world', {
      delay: 200,
      timeout: 200
    });
    cy.wait('@stubbed-api');

    cy.get('[data-test="results"] a').each(($el, index) => {
      const { id } = pokemons[index];

      expect($el.attr('href')).to.contain(`/pokemon-search/${id}`);
    });
  });

  it('should persist the query parameter in the link to a pokemon', () => {
    cy.intercept('/pokemon-search/api?*', { pokemons }).as('stubbed-api');
    cy.get('@search').type('hello world', {
      timeout: 200,
      delay: 200
    });
    cy.wait('@stubbed-api');

    cy.get('[data-test="results"] a').each(($el, index) => {
      expect($el.attr('href')).to.contain('name=hello world');
      // expect($el.attr('href')).to.contain('name=hello+world');
    });
  });

  // WE ARE GOING TO USE FIXTURES IN NEXT TEST
  // FIXTURES ARE FILE WITH DATA WE WANT TO USE AS MOCK DATA

  it('should bring you to the route for the correct pokemon', () => {
    cy.intercept('/pokemon-search/api?*', { pokemons }).as('stubbed-api');
    // FROM [id].svelte IS GOING TO BE MADE THIS NETWORK REQUEST
    // INSTEAD OF APPROPRIATE DATA WE ARE SERVING FIXTURE
    // IN CASE OF id === 1
    // THE FIXTURE IS HERE:  cypress/fixtures/powerranger.json
    // BUT YOU JUST SPECIFY FILENAME
    cy.intercept('/pokemon-search/api/1', { fixture: 'powerranger.json' }).as('individual-api');

    cy.get('@search').type('hello world', {
      delay: 100,
      timeout: 200
    });

    cy.wait('@stubbed-api');

    cy.get('[data-test="results"] a').first().click();

    cy.wait('@individual-api');

    cy.location('pathname').should('contain', '/pokemon-search/1');
  });

  it('should imediately fetch a pokemon if a query parameter is provided', () => {
    cy.intercept('/pokemon-search/api?*', { pokemons }).as('stubbed-api');

    cy.visit({ url: 'http://localhost:3000/pokemon-search', qs: { name: 'charm' } });

    cy.wait('@stubbed-api').its('response.url').should('contain', '?name=charm');
  });
});
