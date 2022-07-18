/// <reference types="cypress" />

describe('Foo test', () => {
	// WE ARE GOING TO THE PAGE IN OUR PROJECT
	it('goes to the the localhost of our app; on sign in page', () => {
		cy.visit('http://localhost:3000/echo-chamber/sign-in');
	});

	// HERE YOU GO WE USED HERE AN ATTRIBUTE SELECTOR
	// WE ARE SEARCHING FOR FORM ELEMENT

	// FOR THE FIRST ELEMENT FOUND WE ARE THEN CHECKING IF
	// THAT ELEMENT HAS SOME ATTRIBUTE

	it('form should have method "POST" on it', () => {
		cy.get('[data-test="sign-in-form"]').should('have.attr', 'method', 'post');
	});

	// NOW WE GO TO SOME OOTHER PAGE

	it('fgoess to the signup page', () => {
		cy.visit('http://localhost:3000/echo-chamber/sign-up');
	});
});
