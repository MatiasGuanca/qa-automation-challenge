// Page Object (con fallback por label en name/email)
export class RegisterPage{
  visit(){ cy.visit('/') }

  fillName(v){
    cy.get('[data-cy="reg.name"]',{timeout:0}).then(($el)=>{
      if($el.length) cy.wrap($el).clear().type(v)
      else cy.getInputByLabel('Nombre').clear().type(v)
    })
  }

  fillEmail(v){
    cy.get('[data-cy="reg.email"]',{timeout:0}).then(($el)=>{
      if($el.length) cy.wrap($el).clear().type(v)
      else cy.getInputByLabel('Correo').clear().type(v)
    })
  }

  fillAge(v){ cy.get('[data-cy="reg.age"]').clear().type(v) }
  fillPassword(v){ cy.get('[data-cy="reg.password"]').clear().type(v) }
  fillConfirm(v){ cy.get('[data-cy="reg.confirm"]').clear().type(v) }
  submit(){ cy.get('[data-cy="reg.submit"]').click() }

  errName(){ return cy.get('#err-name') }
  errEmail(){ return cy.get('#err-email') }
  errAge(){ return cy.get('#err-age') }
  errPassword(){ return cy.get('#err-password') }
  errConfirm(){ return cy.get('#err-confirm') }
  success(){ return cy.get('#success') }
}
