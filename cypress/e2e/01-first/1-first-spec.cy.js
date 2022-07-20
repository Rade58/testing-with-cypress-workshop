/// <reference types="cypress" />

describe('Create New Item', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/crypto-pooper');
  });

  // THIS HANDLER CAN HAVE ARGUMENT done
  it('should fail if user clickkss on disabled button', (done) => {
    cy.get('[data-test=add-coin][disabled]').click();

    // NOW WE USE HANDLER
    cy.once('fail', (err) => {
      expect(err.message).to.include('this element is `disabled`');
      // BECAUSE TEST IS ASYNCHRONOUS YOU NEED TO USE done
      done();
    });
  });
});
