describe('aliases (author of workshop solution)', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/crypto-pooper');
    // MAKING ALIASES BEFORE EACH TEST

    cy.get('[data-test=coins]').as('allCoins');
    cy.get('[data-test=coins-shitcoins]').as('shit');
    cy.get('[data-test=coins-legit-coins]').as('legit');
    cy.get('[data-test=filter-coins]').as('filterInput');
  });

  // SHOULD HOLD ONTO AN ALIAS
  // BECAUSE YOU ARE SETTING ALISES BEFORE EACH TEST INCLUDING THIS ONE
  it('should hold onto an alias (clicking to mocve fro mshitcoins to legit coins)', () => {
    cy.get('@shit').find('label').first().as('firstCoin');
    // WE CAN LABLE A TEXT TOO
    cy.get('@firstCoin').invoke('text').as('text');

    // CLICK
    //
    cy.wait(1000);
    cy.get('@firstCoin').parent().find('input[type=checkbox]').click();

    // ASSERTION
    cy.get('@text').then(($text) => {
      cy.get('@legit').find('label').last().should('include.text', $text);
    });
  });

  //
  it('should filter coins shown on the page', () => {
    // WE ASUME AGAIN THAT ALIAS IS SETTED BEFORE TEST

    cy.wait(1000);
    cy.get('@filterInput').type('Shib', {
      delay: 500,
      timeout: 400
    });

    cy.get('@allCoins').should('contain.text', 'Shiba Inu');
  });
});
