/// <reference types="cypress" />

// IN THIS FILE I'M DOOIN THINGS MORE LIKE AUTHOR OF WORKSHOP DID THEM

describe('Cryptocurrency coins app', () => {
  it('visit the coins page', () => {
    cy.visit('http://localhost:3000/crypto-pooper');
  });

  // WE WILL DO JUST SOME PARTS I COULD DO BETTER IN
  // cypress/e2e/01-first/2-coins-spec.cy.js

  // FILTER

  it('shouls only show thing according to the match inside filter field', () => {
    cy.wait(500);

    cy.get('input[data-test=filter-coins]').type('Shiba', {
      delay: 500,
      timeout: 100
    });

    cy.contains('Shiba Inu');
    cy.should('not.contain', 'Ethereum');

    // WE COULD WRITE LIKE THIS
    cy.contains('Ethereum').should('not.exist');

    // WE HAVE USED A BIT OF LOOPING
    // AND jQuery FOR THIS

    // OR WE DO IT LIKE THIS
    cy.get('[data-test=coins] li').each(($item) => {
      // THIS IS JQUERY (USING CHAI NOT IN THE CYPRESS CONTEXT
      // TO BE MORE PRECISE)
      expect($item.text()).to.include('Shiba Inu');
    });

    // BUT IF YOU WANT TO USE CYPRESS IN ABOVE EXAMPLE
    // YOU CAN WRAP JQUERY WITH THE    cy.wrap

    cy.get('[data-test=coins] li').each(($coin) => {
      cy.wrap($coin).should('include.text', 'Shiba Inu');
    });
  });

  // REMOVING ALL ITEMS
  it('should remove all of coins from the page', () => {
    cy.get('[data-test=remove-all]').click();

    cy.get('[data-test=coins] li').should('not.exist');
  });

  // REMOVING ALL ITEMS ALTENATE APPROACH

  it('should remove all of coins from the page (alternate)', () => {
    cy.get('[data-test=remove-all]').click();

    // WHEN I DID THIS IN PREVIOUS FILE
    // I WASN'T USING ANY ASSERTION
    // THIS USES should AS YOU CAN SEE
    cy.get('[data-test=coins-shitcoins]').contains('No coins to show.').should('exist');
    cy.get('[data-test=coins-legit-coins]').contains('No coins to show.').should('exist');
  });

  // CHECKING IF REMOVE BUTTON EXIST ON EVERY INDIVIDUAL ITEM

  it('every coin should have remove button', () => {
    cy.visit('http://localhost:3000/crypto-pooper');

    cy.get('[data-test=coins] li').find('[data-test=remove]').should('exist');

    // CHECKING IF REMOVE BUTTON EXIST ON EVERY INDIVIDUAL ITEM
    // ALTERNATE APPROACH (WITH JQUERY)

    cy.get('[data-test=coins] li').each(($coin) => {
      cy.wrap($coin).find('[data-test=remove]').should('exist');
    });
  });

  it('pressing remove button should remove individual coin from a page', () => {
    cy.wait(300);

    // LIST ITEM IS PARENT HERE
    // AND IT HAS NESTED REMOVE BUTTON
    // SO WE DIDI IT LIKE THIS
    cy.contains('Shiba Inu').parent().find('[data-test=remove]').click();

    cy.contains('Shiba Inu').should('not.exist');
  });

  it('Alternate - pressing remove button should remove individual coin from a page', () => {
    cy.get('[data-test=coins] li')
      .first()
      .within(() => {
        // HERE WE ARE SEACHING FROM ALREADY FOUND li
        // we are sechim for the nested button
        cy.wait(200);
        return cy.get('[data-test=remove]').click({ waitForAnimations: true });
      })
      // BUT AGAIN WE ARE HERE TESTING FROM LIST ITEM
      // AD WE THINK IT SHOULD BE REMOVE
      .should('not.exist');
  });

  // MARKING ALL COINS AS LEGIT
  //
  //

  it('marks all coins as legit', () => {
    // PREPARATION
    cy.wait(500);
    cy.get('[data-test=coins-legit-coins] li').each(($coin) => {
      cy.wrap($coin).find('input').click();
    });
    // ----------------------------------------------

    cy.wait(2000);

    // MAKING ALL COINS LEGIT
    cy.get('[data-test=mark-all-as-legit]').click();

    // ASSERT LIKE THIS

    cy.get('[data-test=coins-shitcoins] li').should('not.exist');

    // OR ASSERT LIKE THIS
    cy.get('[data-test=coins-legit-coins] li').its('length').should('eql', 4);
  });

  // THIS IS BETTER FOR ASSERTION SINCE WE CAN ACCESS COUNT
  // OF ELEMENTS THAT WERE PREVIOUSLY ON SOME SPOT, BEFORE
  // YOU PROCEED TO UNMOUNT THEM
  // WE DON'T NEED TO MEMORIZE COUNT OF THE ELEMENT
  // WE CAN MESURE IT PROGRAMATICALLY

  it('BETTER -> marks all coins as legit', () => {
    // for reseting sake
    cy.visit('http://localhost:3000/crypto-pooper');

    cy.wait(2000);

    cy.get('[data-test=coins-legit-coins] li').each(($coin) => {
      cy.wrap($coin)
        .find('input[type=checkbox]')
        .check({ waitForAnimations: true, delay: 100, timeout: 100 });
    });
    //
    //

    cy.wait(4000);

    cy.get('[data-test=coins-shitcoins] li')
      .its('length')
      .then((len) => {
        // MOVING IT TO "LEGIT SIDE"
        cy.get('[data-test=mark-all-as-legit]').click();

        // NOW THE LEGIT SIDE SHOULD HAVE ALL THE COINS
        cy.get('[data-test=coins-legit-coins] li').its('length').should('eql', len);
      });
  });

  // TOGGLE INDIVIDUAL COIN FROM SHITCOIN TO LEGIT
  // AND VICE VERSA

  // THIS IS A BRITTLE WAY

  it('BRITTLE should move an individual coin from legit to shitcoins', () => {
    cy.get('[data-test=coins-legit-coins]').contains('Shiba Inu').click();
    cy.get('[data-test=coins-shitcoins]').contains('Shiba Inu').should('exist');
  });

  // BETTER WAY (BECAUSE YOU DON'T WANT TO MEMORIZE IN YOUR HEAD
  // DAT IN YOUR UI)

  it('BETTER --> should move an individual coin from legit to shitcoins', () => {
    cy.get('[data-test=coins-shitcoins] li label')
      .first()

      .within(($label) => {
        cy.wrap($label).parent().find('input[type=checkbox]').click();
      })
      .then(($label) => {
        const text = $label.text();
        cy.get('[data-test=coins-legit-coins] label').first().should('have.text', text);
      });
  });
});
