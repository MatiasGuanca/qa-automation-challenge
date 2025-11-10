// Fallback robusto: localiza el input por texto del label
Cypress.Commands.add('getInputByLabel', (labelText) => {
  cy.contains('label', labelText).invoke('attr', 'for').then((id) => {
    expect(id, `label "${labelText}" tiene for`).to.exist
    cy.get(`#${id}`)
  })
})
