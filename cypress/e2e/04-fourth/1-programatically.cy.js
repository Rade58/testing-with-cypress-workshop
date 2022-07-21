/// <reference types="cypress" />

// WE ARE STILL TESTING THIS PART OF THE APP:
//        /secret-menu

// I NEED THIS SINCE I'M GOING TO LOOP OVER THINGS

const restaurants = [
  'Chick-fil-A',
  'McDonalds',
  'In-N-Out',
  'KFC',
  'Jack In The Box',
  'Jamba Juice',
  'Starbucks',
  'Dairy Queen',
  'Burger King',
  'Chipotle',
  'Taco Bell',
  'Five Guys',
  'Sonic',
  'Subway',
  'Panera Bread'
];

const properties = [
  'name',
  'whereToOrder',
  'description',
  'secret',
  'ingredients',
  'popularity',
  'price',
  'howToOrder'
];

const ratings = [1, 2, 3, 4, 5, 6, 7];

//
describe('Secret menu items', () => {
  // beforeEach(() => {
  // });

  it('visit the secret menu', () => {
    cy.visit('http://localhost:3000/secret-menu');
  });

  it('title should be on the page', () => {
    cy.get('h1').should('contain', 'Secret Menu Items');
  });

  // WE WILL LOOP AND TEST IT PROGRAMATICALLY
  // WE ARE GENEATING TEST IN EVERY LOOP ITTERATION

  for (const property of properties) {
    it(`should have colummn for property ${property}`, () => {
      cy.get(`#${property}-column`);
    });

    it(`should have a column with input for showing the ${property} column`, () => {
      cy.get(`#show-${property}`);
    });

    it(`should hide the column when the checkbox is unchecked`, () => {
      cy.get(`#show-${property}`).click();
      cy.wait(400);
      cy.get(`#${property}-column`).should('have.class', 'hidden');
    });
  }
});
