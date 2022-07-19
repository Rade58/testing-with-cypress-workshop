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

		// OR WE DO IT LIKE THIS
		cy.get('[data-test=coins] li').each(($item) => {
			expect($item.text()).to.include('Shiba Inu');
		});
	});
});
