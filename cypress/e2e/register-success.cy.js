// Happy path: éxito literal con nombre
import { RegisterPage } from '../pages/RegisterPage'
import { validUser } from '../utils/data'

describe('Registro exitoso (inline)',()=>{
  const page=new RegisterPage()
  it('muestra el mensaje de éxito con datos válidos',()=>{
    page.visit()
    cy.intercept('POST','/api/register',{statusCode:200,body:{message:`Registro exitoso. Bienvenido/a, ${validUser.name}!`}}).as('register')
    page.fillName(validUser.name);page.fillEmail(validUser.email);page.fillAge(validUser.age)
    page.fillPassword(validUser.password);page.fillConfirm(validUser.password);page.submit()
    cy.wait('@register');page.success().should('contain',`Registro exitoso. Bienvenido/a, ${validUser.name}!`)
  })
})
