// Email inválido → error junto al campo (assert vecino)
import { RegisterPage } from '../pages/RegisterPage'
import { invalidEmail } from '../utils/data'

describe('Email inválido (inline)',()=>{
  const page=new RegisterPage()
  it('muestra error cuando el email no es válido',()=>{
    page.visit();page.fillName('Matías');page.fillEmail(invalidEmail);page.fillPassword('abcdef');page.fillConfirm('abcdef');page.submit()
    cy.get('#email').next('.field-error').should('contain','Email inválido.')
  })
})
