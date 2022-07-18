/// <reference types="cypress" />

describe('Foo test', () => {
	it('goes to the google page', () => {
		cy.visit('https://google.com');
	});
});
