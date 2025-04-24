{/*describe('Auth Redirect', () => {
    it('should redirect unauthenticated user to login page when accessing protected routes', () => {
      // Ensure no token
      cy.clearLocalStorage(); 
      cy.visit('/dashboard');
      cy.url().should('include', '/login');
    });
});*/}
  

// cypress/e2e/auth_redirect.cy.ts
describe('Auth Redirect', () => {
    it('should redirect unauthenticated user to login page when accessing protected routes', () => {
      cy.clearLocalStorage(); // ล้าง token ก่อนเข้า
      cy.visit('/dashboard'); // เข้า /dashboard
      cy.url({ timeout: 10000 }).should('include', '/login'); // ควร redirect ไป login
    });
  });
  