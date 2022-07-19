describe('Cryptocurrency coins app part', () => {
	it('visit the coins page', () => {
		cy.visit('http://localhost:3000/crypto-pooper');
	});

	// ADDING A NEW COIN

	const val = 'Quant';
	const val2 = 'Safemoon';

	it('should add new coin to the list', () => {
		cy.wait(500);

		cy.get('[data-test=new-coin-input]').type(val, {
			delay: 100,
			timeout: 100
		});

		cy.get('[data-test=add-coin]').click();

		cy.contains(val);

		cy.wait(1000);

		// WE ARE GOING TO ADD NEW COIN BUT NOW LETS USE
		// FORM AND .submit()

		cy.get('[data-test=new-coin-input]').type(val2, {
			delay: 100,
			timeout: 100
		});

		cy.get('form').submit();

		cy.contains(val2);
	});

	// FILTERING THE COINS ON THE PAGE

	it("filtes coins by 'shit/legit' criteria", () => {
		cy.get('[data-test=coins-legit-coins] input').last().check();

		cy.wait(4000);

		cy.get('[data-test=coins-shitcoins] input').first().click();
		cy.wait(4000);

		cy.get('[data-test=coins-shitcoins] label').last().should('have.html', val2);
		cy.get('[data-test=coins-legit-coins] li:nth-last-of-type(2) label').should(
			'have.html',
			'Decentraland'
		);
	});

	it('', () => {});
});
