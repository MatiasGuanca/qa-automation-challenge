// Edad negativa y no numérica
import { RegisterPage } from '../pages/RegisterPage'
describe('Edad inválida (inline)',()=>{
  const page=new RegisterPage()
  it('rechaza edad negativa',()=>{
    page.visit();page.fillName('Matías');page.fillEmail('matias@mail.com');page.fillAge('-1');page.fillPassword('abcdef');page.fillConfirm('abcdef');page.submit()
    page.errAge().should('contain','La edad debe ser un número positivo.')
  })
  it('rechaza edad no numérica',()=>{
    page.visit();page.fillName('Matías');page.fillEmail('matias@mail.com');page.fillAge('abc');page.fillPassword('abcdef');page.fillConfirm('abcdef');page.submit()
    page.errAge().should('contain','La edad debe ser un número positivo.')
  })
})
