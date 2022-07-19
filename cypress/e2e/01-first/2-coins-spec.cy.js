describe('Cryptocurrency coins app part', () => {
	it('visit the coins page', () => {
		cy.visit('http://localhost:3000/crypto-pooper');
	});

	// ADDING A NEW COIN

	it('should add new coin to the list', () => {
		const val = 'Quant';

		cy.wait(500);

		cy.get('[data-test=new-coin-input]').type(val, {
			delay: 100,
			timeout: 100
		});

		cy.get('[data-test=add-coin]').click();

		cy.contains(val);
	});

	it('', () => {});
});
