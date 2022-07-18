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

	// HERE YOU GO, IT IS PRETTY MUCH AMAZING WHAT SEMANTICS YOU CAN USE

	it('parent of the element that has nested text: "Email Addresa" should have attribute "method"', () => {
		cy.contains('Email Address').parent().should('have.attr', 'method');
	});
});
