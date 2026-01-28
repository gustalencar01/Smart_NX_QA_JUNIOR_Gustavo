describe('Módulo "PIM"', () => {
 beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
  })

it('Pesquisar o módulo “PIM”', () => {
    cy.get('input[placeholder="Search"]').type('PIM')
    cy.get('.oxd-main-menu-item').should('contain', 'PIM')
  })

  it('Pesquisar um módulo diferente de “PIM”', () => {
    cy.get('input[placeholder="Search"]').type('Leave')
    cy.get('.oxd-main-menu-item').should('contain', 'Leave')
    cy.get('.oxd-main-menu-item').should('not.contain', 'PIM')
  })

  it('Apagar a pesquisa', () => {
    cy.get('input[placeholder="Search"]').type('Pim')
    cy.get('input[placeholder="Search"]').clear() 
    cy.contains('span', 'PIM').should('be.visible')
  })

  it('Acessar o módulo “PIM”', () => {
    cy.contains('span', 'PIM').click()
    cy.url().should('include', '/pim/viewEmployeeList')
    cy.get('.oxd-topbar-header-title').should('contain', 'PIM')
  })
})