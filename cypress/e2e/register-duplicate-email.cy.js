// Email duplicado (409) → error en el campo email
import { RegisterPage } from '../pages/RegisterPage'
describe('Registro duplicado (inline)',()=>{
  const page=new RegisterPage()
  it('muestra error cuando el email ya existe',()=>{
    page.visit()
    cy.intercept('POST','/api/register',{statusCode:409,body:{error:'Email ya registrado'}}).as('fail')
    page.fillName('Matías');page.fillEmail('matias@mail.com');page.fillPassword('abcdef');page.fillConfirm('abcdef');page.submit()
    cy.wait('@fail');page.errEmail().within(()=>{ cy.contains('Email ya registrado') })
  })
})
