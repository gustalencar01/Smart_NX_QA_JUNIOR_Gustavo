describe('Exclusão de “Employee”', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    cy.contains('span', 'PIM').click()
  })

  it('Clicar no ícone de lixeira e cancelar a exclusão, garantindo que o employee não foi excluído', () => {
    const employeeId = '0360' 

    cy.get('.oxd-input-group').contains('Employee Id').parent().next().find('input').type(employeeId)
    cy.get('button[type="submit"]').click()
    cy.get('.bi-trash').first().click()
    cy.get('.orangehrm-modal-footer > .oxd-button--ghost').click()
    cy.get('.oxd-input-group').contains('Employee Id').parent().next().find('input').clear().type(employeeId)
    cy.get('button[type="submit"]').click()
    cy.get('.orangehrm-container').should('be.visible').and('contain', employeeId)
  })

 it('Deve criar um novo employee e excluí-lo logo em seguida', () => {
    const firstName = 'Teste'
    const lastName = 'Exclusao'
    const employeeId = `ID${Math.floor(Math.random() * 10000)}`

    cy.contains('span', 'PIM').click()
    cy.get('button.oxd-button--secondary').contains('Add').click()
    cy.get('input[name="firstName"]').type(firstName)
    cy.get('input[name="lastName"]').type(lastName)
    cy.get('.oxd-grid-2 input').eq(0).clear().type(employeeId)
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/viewPersonalDetails')

    cy.contains('span', 'PIM').click()
    cy.get('.oxd-input-group').contains('Employee Id').parent().next().find('input').type(employeeId)
    cy.get('button[type="submit"]').click()
    cy.get('.oxd-table-loader').should('not.exist')

    cy.get('.orangehrm-container').contains(employeeId).parents('.oxd-table-row').find('.bi-trash').click()
    cy.get('.orangehrm-modal-footer > .oxd-button--label-danger').click()

    cy.contains('Successfully Deleted').should('be.visible')
    cy.get('.oxd-input-group').contains('Employee Id').parent().next().find('input').clear().type(employeeId)
    cy.get('button[type="submit"]').click()
    cy.contains('No Records Found').should('be.visible')
  })
})