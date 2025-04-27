/// <reference types="cypress" />

Cypress.Commands.add('login', () => {
    window.localStorage.setItem('token', 'fake-token');
  });
  
  declare global {
    namespace Cypress {
      interface Chainable {
        login(): Chainable<void>;
      }
    }
  }

