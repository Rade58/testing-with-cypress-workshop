/// <reference types="cypress" />

describe('Foo test', () => {
	it('goes to the the localhost of our app; on sign in page', () => {
		cy.visit('http://localhost:3000/echo-chamber/sign-in');
	});

	it('form should have method "POST" on it', () => {
		cy.get('[data-test="sign-in-form"]').should('have.attr', 'method', 'post');
	});

	it('goes to the signup page', () => {
		cy.visit('http://localhost:3000/echo-chamber/sign-up');
	});

	it('form has label with text: "Password"', () => {
		cy.get('form label:nth-of-type(2)').contains('Password');
	});

	it('parent of the element that has nested text: "Email Addresa" should have attribute "method"', () => {
		cy.contains('Email Address').parent().should('have.attr', 'method');
	});

	it('go to dog-pooper page', () => {
		cy.visit('http://localhost:3000/crypto-pooper');
	});

	// LETS CHECK USE check NOW APPARENTLY IT WILL WORK NOW
	// BUT BEFORE CHECK WE WILL USE SSERTION

	it('Type some text to create new coin, ant coin to be added to the list, Move coin to shitcoins', () => {
		// still not working
		cy.contains('Legit Coins').parent().find('label').last().trigger('click');

		cy.contains('Coin').click().type('Quant');

		cy.get('button[type="submit"]#add-coin').click();

		// ASSERTION
		cy.contains('Legit Coins').parent().find('label').last().should('have.html', 'Quant');

		// BUT HERE check DID WORK
		cy.contains('Legit Coins').parent().find('input').last().trigger('change');
	});
});
