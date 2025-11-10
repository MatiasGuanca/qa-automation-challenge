// A11y básica: aria-describedby y roles
describe('Accesibilidad básica (inline)',()=>{
  it('usa aria-describedby y roles',()=>{
    cy.visit('/')
    cy.get('#name').should('have.attr','aria-describedby','err-name')
    cy.get('#email').should('have.attr','aria-describedby','err-email')
    cy.get('#success').should('have.attr','role','status')
  })
})
