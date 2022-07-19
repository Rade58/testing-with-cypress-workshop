/// <reference types="cypress" />

describe('Create New Item', () => {
	// FIRST LETS VISIT THE CORRECT PAGE
	// BUT LET DEFINE THAT WE WANT TO DO THAT
	// BEFORE EACH TEST IN THIS DESCRIBE BLOCK
	beforeEach(() => {
		cy.visit('http://localhost:3000/crypto-pooper');
	});

	// LETS MAKE A SIMPLE ASSERTION

	it('should have a form', () => {
		cy.get('form').should('exist');
	});

	// WE NEED TO UNDERSTND WHEN CYPRESS SUCCEDS AND WHEN IT FAILS
	// FOR EXAMPLE JEST WILL FAIL IF THERE IS NO ASSERTIONS
	// BUT NOTE THAT THIS IS NOT THE CSE WITH CYPRESS

	// CYPRESS WILLL SUCCED EVEN YOU JUST VISITED PAGE
	// OR YOU JUST FIND AN ELEMENT

	// SO FAR I KNOW THAT CYPRESS WILL FAIL IF YOU MAK A
	// WRONG ASSERTION OR IF ELEMENT CAN'T BE FOUND

	// THIS ONE WILL FAIL

	it(' should have a special "formmmmm" element', () => {
		cy.get('formmmmmm');
	});
	// AND THIS ONE WILL FAIL

	it('form shouldn`t exist', () => {
		cy.get('form').should('not.exist');
	});
});
