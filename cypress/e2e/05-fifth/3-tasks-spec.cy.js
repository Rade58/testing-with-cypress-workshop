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
    // Sign Up
    cy.visit('http://localhost:3000/echo-chamber/sign-up');

    cy.get('[data-test=sign-up-email]').type(user.email, { delay: 100, timeout: 100 });
    cy.get('[data-test=sign-up-password]').type(user.password, { delay: 100, timeout: 100 });
    cy.get('[data-test=sign-up-submit]').click();
    // Sign In

    cy.visit('http://localhost:3000/echo-chamber/sign-in');

    cy.get('[data-test=sign-in-email]').type(user.email, { delay: 100, timeout: 100 });
    cy.get('[data-test=sign-in-password]').type(user.password, { delay: 100, timeout: 100 });
    cy.get('[data-test=sign-in-submit]').click();

    cy.wait(2000);
    // ASSERTIONS

    cy.location('pathname').should('contain', '/echo-chamber/posts');

    cy.get('[data-test="current-user"] > .btn-ghost').click();

    cy.contains(`Profile ${user.email}`);
  });
});

describe('Sign In (Failiure Mode)', () => {
  beforeEach(() => {
    cy.task('reset');
    cy.visit('http://localhost:3000/echo-chamber/sign-in');
  });

  it('should sign in with an existing user', () => {
    cy.get('[data-test=sign-in-email]').type(user.email, { delay: 100, timeout: 100 });
    cy.get('[data-test=sign-in-password]').type(user.password, { delay: 100, timeout: 100 });
    cy.get('[data-test=sign-in-submit]').click();

    cy.location('pathname').should('contain', '/echo-chamber/sign-in');
    cy.get('[data-test="current-user"] > .btn-ghost').should('not.exist');

    cy.contains('Error! No such user exists.');

    cy.contains(`Profile ${user.email}`).should('not.exist');
  });
});
