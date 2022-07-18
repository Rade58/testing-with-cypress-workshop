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

	// HERE YOU GO

	it('form has label with text: "Password"', () => {
		cy.get('form label:nth-of-type(2)').contains('Password');
	});
});
