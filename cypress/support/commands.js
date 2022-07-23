/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

// MOVED THIS HERE          cypress/glob.d.ts
/* declare global {
  // eslint-disable-next-line
  namespace Cypress {
    interface Chainable {
      // login(email: string, password: string): Chainable<void>
      // drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      // dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      // visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
      waitForApp: any;
    }
  }
} */

Cypress.Commands.add('waitForApp', () => {
  return cy.wrap(
    new Promise((resolve) => {
      cy.window().then((win) => {
        win.addEventListener('svelte:start', resolve);
      });
    })
  );
});

Cypress.Commands.add('getData', (attribute /* : string */) => {
  return cy.get(`[data-test=${attribute}]`);
});

Cypress.Commands.add('signIn', (user /* : { email: string; password: string } */) => {
  cy.visit('http://localhost:3000/echo-chamber/sign-in');
  cy.getData('sign-in-email').type(user.email);
  cy.getData('sign-in-password').type(user.password);
  cy.getData('sign-in-submit').click();
});

Cypress.Commands.add('signUp', (/* user: { email: string; password: string } */) => {
  cy.visit('http://localhost:3000/echo-chamber/sign-up');
  cy.getData('sign-up-email').type(user.email);
  cy.getData('sign-up-password').type(user.password);
  cy.getData('sign-up-submit').click();
});
