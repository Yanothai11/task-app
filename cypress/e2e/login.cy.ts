describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login') 
  })

  it('should display validation messages for empty fields', () => {
    cy.get('button[type="submit"]').click()

    cy.contains('Required').should('exist') 
  })

  it('should show error for invalid email', () => {
    cy.get('input[name="email"]').type('invalidemail')
    cy.get('input[name="password"]').type('123456')
    cy.get('button[type="submit"]').click()

    cy.contains('Invalid email address').should('exist')
  })

  it('should login successfully with valid credentials', () => {
    cy.get('input[name="email"]').type('test@example.com')
    cy.get('input[name="password"]').type('123456')
    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/dashboard')
    cy.contains('Dashboard').should('exist')
  })
})

