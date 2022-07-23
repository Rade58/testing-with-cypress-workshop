/// <reference types="cypress" />

// OK WE MEDE SOME COMMANDS IN      cypress/support/e2e.ts
// THEY ARE COMMANDS FOR SIGNING IN/UP USER
// FOR THE /echo-chamber PART OF THE PROJECT
// WE ARE AGAIN GOING TO USE THESR COMMANDS

// BUT WE WILL ALSO USE       cy.getCookie     AND    cy.setCookie
// JUST TO SHOW YOU THAT YOU CAN SETUP jwt COOKIE
// IF YOU WANT TO TEST THINGS QUICKLY FOR THE PART OF YOUR APP
// WHERE YOU WOULD NEED AUTHENTICATED USER
// BUT YOU DON'T WNT TO GO THROUGH DEALING WITH DATABASE

// import { decodeToken, encodeToken } from '../../../src/util/jwt';

const decodeToken = (token /* : string */) =>
  JSON.parse(Buffer.from(token, 'base64').toString('utf-8'));
const encodeToken = (token /* : string */) => Buffer.from(JSON.stringify(token)).toString('base64');

// SAME UER AS ONE WE USED IN SEEDING
const user = {
  email: 'bazqux@example.com',
  password: 'passwordtwo2'
};

describe('signing in with seeded datbase', () => {
  beforeEach(() => {
    cy.task('seed'), cy.visit('http://localhost:3000/echo-chamber/sign-in');

    cy.signIn(user);
  });

  it('should be already loged in because we used command for that', () => {
    cy.location('pathname').should('contain', '/posts');
  });

  it('jwt and user should match', () => {
    cy.getCookie('jwt').then((jwtCookie) => {
      const decoded = decodeToken(jwtCookie.value);

      expect(decoded.email).to.equal(user.email);
    });
  });
});

// LETS DO TESTS WITH
// SETTING THE jwt COOKIE NO MATTER IF USER IS IN DATABASE OR NOT
describe('Setting the cookie', () => {
  beforeEach(() => {
    cy.task('seed');
    cy.setCookie('jwt', encodeToken({ id: 66, email: 'shiba@example.com' }));
    cy.visit('http://localhost:3000/echo-chamber/sign-in');
  });

  it('should be logged in because of rediect to /posts which happens when user is authenticated', () => {
    cy.location('pathname').should('contain', 'posts');
  });

  it('should have authnticated user', () => {
    cy.get('[data-test="current-user"] > .btn-ghost').click({ timeout: 300 });
    cy.contains('shiba@example.com');
  });
});

// SET THE jwt AND USE REAL USER FROM THE DATBASE
describe('Setting the cookie with a real user data', () => {
  beforeEach(() => {
    cy.task('seed');
    cy.request('/echo-chamber/api/users')
      .then((resp) => {
        const [firstUser] = resp.body.users;

        return cy.setCookie('jwt', encodeToken(firstUser)).then(() => firstUser);
      })
      .as('user');

    cy.visit('http://localhost:3000/echo-chamber/sign-in');
  });

  it('should be logged in', () => {
    cy.location('pathname').should('contain', 'posts');
  });

  it('show that user on the page', () => {
    cy.get('@user').then((user) => {
      cy.get('[data-test="current-user"] > .btn-ghost').click({ timeout: 300 });
      cy.contains(`Profile ${user.email}`);
    });
  });
});
