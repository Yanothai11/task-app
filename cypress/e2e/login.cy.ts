describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login') // แก้ URL ถ้าจำเป็น
  })

  it('should display validation messages for empty fields', () => {
    cy.get('button[type="submit"]').click()

    cy.contains('Required').should('exist') // ตรวจสอบว่ามีข้อความ Required
  })

  it('should show error for invalid email', () => {
    cy.get('input[name="email"]').type('invalidemail')
    cy.get('input[name="password"]').type('123456')
    cy.get('button[type="submit"]').click()

    cy.contains('Invalid email address').should('exist')
  })

  it('should login successfully with valid credentials', () => {
    // ใส่ email และ password ที่ถูกต้อง (mock หรือของจริงตามระบบคุณ)
    cy.get('input[name="email"]').type('test@example.com')
    cy.get('input[name="password"]').type('123456')
    cy.get('button[type="submit"]').click()

    // ตรวจสอบว่าเปลี่ยนหน้าไป Dashboard หรือมีข้อความเฉพาะ
    cy.url().should('include', '/dashboard')
    cy.contains('Dashboard').should('exist')
  })
})
