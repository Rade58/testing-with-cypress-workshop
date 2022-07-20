/// <reference types="cypress" />

describe('Input obstacles', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/obstacle-course');
  });

  it('should input text into the input field', () => {
    const thought = 'Peaches looks nothing like oranges.';

    cy.wait(1000);

    cy.get('[data-test="text-input"]').type(thought, {
      delay: 100,
      timeout: 100
    });

    cy.get('[data-test="text-result"]').contains(thought).should('exist');
  });

  it('should control a select input', () => {
    cy.get('[data-test="select-input"]').select('Hulk');
    cy.get('[data-test="select-result"]').contains('Hulk');
  });

  it('should find and control a checkbox input', () => {
    // AGAIN PROBLEMS WITH CHECBOXES SINCE I'M USING
    // DAISY UI
    cy.wait(1000);
    // cy.get('[data-test="checkbox-sardines"]').check();
    cy.get('[data-test="checkbox-sardines"]').check();
    cy.wait(1000);
    cy.get('[data-test="checkbox-result"]').contains('Sardines');
  });

  it('should find and control a radio input', () => {
    cy.wait(1000);
    cy.get('[data-test=radio-george]').check();
    cy.wait(1000);
    cy.get('[data-test=radio-result]').contains('George');
  });

  it('should find and control a color input', () => {
    const color = '#a8d7cf';

    cy.wait(1000);
    cy.get('[data-test=color-input]').invoke('val', color).trigger('input');
    // cy.wait(1000);
    cy.get('[data-test=color-result]').contains(color);
  });

  it('should find and control a date input', () => {
    const someDate = '2022-08-06';

    cy.wait(1000);
    cy.get('[data-test="date-input"]').type(someDate, {
      delay: 100,
      timeout: 100
    });
    cy.wait(1000);
    cy.get('[data-test="date-result"]').contains(someDate);
  });

  it('should find and control a range input', () => {
    cy.wait(1000);

    cy.get('[data-test="range-input"]').invoke('val', 6).trigger('input');
    cy.wait(1000);
    cy.get('[data-test="range-result"]').contains(6);
  });

  it('should find and control a file input', () => {
    cy.get('[data-test="file-input"]');
    cy.get('[data-test="file-result"]');
  });
});
