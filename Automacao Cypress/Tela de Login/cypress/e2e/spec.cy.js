describe('Tela de Login', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  })


  it('Deve realizar o Login', () => {
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.wait(5000)
    cy.url().should('eq', 'https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index')
  })

  it('Credenciais incorretas', () => {
    cy.get('input[name="username"]').type('Userincorreto')
    cy.get('input[name="password"]').type('SenhaIncorreta')
    cy.get('button[type="submit"]').click()
    cy.wait(5000)
    cy.get('.oxd-alert').should('be.visible').and('contain', 'Invalid credentials')
    cy.url().should('eq', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

  })

  it('Não deve realizar login', () => {
    cy.get('button[type="submit"]').click()
    cy.wait(5000)
    cy.get('.oxd-text').should('be.visible').and('contain', 'Required')
    cy.url().should('eq', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

  })

})