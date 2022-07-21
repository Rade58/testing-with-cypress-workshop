/// <reference types="cypress" />

const user = {
  email: 'foobar@example.com',
  password: 'mydaughtersbirthday'
};

describe('Sign Up', () => {
  // BEFORE EACHE TEST IN THIS describe BLOCK WE SHOULD RESET THE DATBASE
  beforeEach(() => {
    cy.task('reset');

    //
  });

  it('should successfully create a user when entering an email and a password', () => {
    cy.visit('http://localhost:3000/echo-chamber/sign-up');
  });
});
