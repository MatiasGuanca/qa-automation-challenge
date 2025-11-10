// Trim de nombre
import { RegisterPage } from '../pages/RegisterPage'
describe('Edge: nombre con espacios (trim)',()=>{
  const page=new RegisterPage()
  it('hace trim del nombre y permite el éxito',()=>{
    page.visit()
    cy.intercept('POST','/api/register',{statusCode:200,body:{message:'Registro exitoso. Bienvenido/a, Matías!'}}).as('register')
    page.fillName('   Matías   ');page.fillEmail('matias@mail.com');page.fillPassword('abcdef');page.fillConfirm('abcdef');page.submit()
    cy.wait('@register');cy.get('#success').should('contain','Registro exitoso. Bienvenido/a, Matías!')
  })
})
