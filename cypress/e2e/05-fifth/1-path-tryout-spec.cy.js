/// <reference types="cypress" />

// WE WILL DEAL A BIT WITH /echo-chamber PAGE

describe('echo chamber tryout', () => {
  it('visits the echo chamber', () => {
    cy.visit('http://localhost:3000/echo-chmber');
  });
});
