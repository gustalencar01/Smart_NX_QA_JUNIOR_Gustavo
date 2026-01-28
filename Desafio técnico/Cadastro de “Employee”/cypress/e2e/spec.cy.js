describe('Cadastro de "Employee"', () => {

  beforeEach(() => {
    // Login e navegação até o PIM
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.contains('span', 'PIM').click()
  })

  it('Validar a existência do botão “+ Add”', () => {
    cy.get('button.oxd-button--secondary').contains('Add').should('be.visible')
  })

  it('Acessar a tela de cadastro de usuário clicando no botão “+ Add”', () => {
    cy.get('button.oxd-button--secondary').contains('Add').click()
    cy.url().should('include', '/pim/addEmployee')
    cy.get('h6').should('contain', 'Add Employee')
  })

  it('Tentar cadastrar um usuário sem preencher o nome', () => {
    cy.get('button.oxd-button--secondary').contains('Add').click()
    cy.get('button[type="submit"]').click()
    cy.get('.oxd-input-group').contains('Required').should('be.visible')
  })

  it('Validar tentativa de cadastro com “Employee ID” já existente', () => {
    cy.get('button.oxd-button--secondary').contains('Add').click()
    cy.get('input[name="firstName"]').type('Teste')
    cy.get('input[name="lastName"]').type('Cypress')
    cy.get('.oxd-grid-2 input').eq(0).clear().type('0001')
    cy.get('button[type="submit"]').click()
    cy.contains('span', 'Employee Id already exists').should('be.visible')
  })

  it('Cadastrar um employee sem dados de login', () => {
    cy.get('button.oxd-button--secondary').contains('Add').click()
    
    const firstName = 'Novo'
    const lastName = 'Funcionario'

    cy.get('input[name="firstName"]').type(firstName)
    cy.get('input[name="lastName"]').type(lastName)
    cy.get('button[type="submit"]').click()
    cy.url({ timeout: 10000 }).should('include', '/pim/viewPersonalDetails')
    cy.get('.orangehrm-edit-employee-name').should('contain', firstName)
  })
})