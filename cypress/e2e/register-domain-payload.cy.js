// Opcional: valida req.body y aplica dominio corporativo (criterio de negocio)
import { RegisterPage } from '../pages/RegisterPage'

describe('Opcional: dominio y payload',()=>{
  const page=new RegisterPage()

  it('acepta solo emails @empresa.com.ar y valida el payload enviado',()=>{
    page.visit()
    cy.viewport(390, 844) // mobile sample

    cy.intercept('POST','/api/register',(req)=>{
      // Criterio de negocio y contrato mínimo del endpoint:
      expect(req.body).to.have.keys(['name','email','age'])
      expect(req.body.email).to.match(/@empresa\.com\.ar$/)
      req.reply({statusCode:200, body:{message:`Registro exitoso. Bienvenido/a, ${req.body.name}!`}})
    }).as('register')

    page.fillName('Matías')
    page.fillEmail('matias@empresa.com.ar')
    page.fillPassword('abcdef')
    page.fillConfirm('abcdef')
    page.submit()

    cy.wait('@register')
    cy.get('#success').should('contain','Registro exitoso. Bienvenido/a, Matías!')
  })
})
