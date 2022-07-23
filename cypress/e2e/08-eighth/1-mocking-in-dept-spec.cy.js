/// <reference types="cypress" />

const decodeToken = (token /* : string */) =>
  JSON.parse(Buffer.from(token, 'base64').toString('utf-8'));
const encodeToken = (userData /* : {email:string; id:string} */) =>
  Buffer.from(JSON.stringify(userData)).toString('base64');

// IN THIS TESTS WE ARE GOING TO SERVE DATA FROM FIXTURES INSTEAD OF OUR DATBASE
// WE ARE GOING TO BE USING THIS FILES
// cypress/fixtures/post.json
// cypress/fixtures/posts.json
// cypress/fixtures/users.json

// THIS IS ONE OF THE USERS FROM        cypress/fixtures/users.json
const user = { email: 'second@example.com', id: 2 };

// EVERY NETWORK REQUEST IS GOING TO BE ITERCEPTED
// AND DATA IS GOING TO BE SERVED FROM FIXTURES

describe('Signing in with a mocked data', () => {
  beforeEach(() => {
    cy.setCookie('jwt', encodeToken(user));

    cy.intercept('GET', '/echo-chamber/api', { fixture: 'posts' }).as('postsApi');
    cy.intercept('GET', '/echo-chamber/api/*', { fixture: 'post' }).as('postApi');
    // cy.intercept("GET", "/echo-chamber/api", {fixture: "posts"}).as("postsApi");
  });

  it('', () => {
    cy.visit('http://localhost:3000/echo-chamber/posts');

    cy.wait('@postsApi');

    cy.visit('http://localhost:3000/echo-chamber/posts/1');

    cy.wait('@postApi');
  });
});
