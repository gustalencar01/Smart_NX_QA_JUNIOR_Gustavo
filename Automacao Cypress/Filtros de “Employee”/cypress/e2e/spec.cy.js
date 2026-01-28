describe('Filtros de “Employee”', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.contains('span', 'PIM').click()
    cy.wait(1000) 
  })

  it('Pesquisar um employee pelo nome', () => {
    cy.get('.oxd-autocomplete-text-input > input').first().type('Charles')
    cy.get('button[type="submit"]').click({ force: true })
    cy.get('.orangehrm-container').should('contain', 'Charles')
  })

  it('Pesquisar um employee pelo ID', () => {
    cy.get('.oxd-input-group').contains('Employee Id').parent().next().find('input').type('0001')
    cy.get('button[type="submit"]').click()
    cy.get('.orangehrm-container').should('contain', '0001')
  })

  it('Pesquisar um employee com nome inexistente', () => {
    cy.get('.oxd-autocomplete-text-input > input').first().type('UsuarioNaoExistente')
    cy.get('button[type="submit"]').click({ force: true })
    cy.contains('No Records Found').should('be.visible')
  })

  it('Pesquisar um employee com ID inexistente', () => {
    cy.get('.oxd-input-group').contains('Employee Id').parent().next().find('input').type('9999999')
    cy.get('button[type="submit"]').click()
    cy.contains('No Records Found').should('be.visible')
  })
})