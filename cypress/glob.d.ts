declare global {
  // eslint-disable-next-line
  namespace Cypress {
    interface Chainable {
      // login(email: string, password: string): Chainable<void>
      // drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      // dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      // visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>

      waitForApp: () => Cypress.Chainable<unknown>;
      getData: (attribute: string) => Cypress.Chainable<JQuery<Node>>;
      signIn: (user: { email: string; password: string }) => void;
      signUp: (user: { email: string; password: string }) => void;
    }
  }
}

//
export {};
