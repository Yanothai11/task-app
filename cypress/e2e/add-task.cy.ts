describe('Add Task', () => {
    it('should add a task with valid inputs', () => {
      cy.visit('/dashboard');
      cy.get('[data-testid="title-input"]').type('New Task');
      cy.get('[data-testid="description-input"]').type('This is a test');
      cy.contains('Add Task').click();
      cy.contains('New Task').should('exist');
    });
  });
  