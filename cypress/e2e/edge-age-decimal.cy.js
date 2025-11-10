// Edad decimal (entero requerido)
import { RegisterPage } from '../pages/RegisterPage'
describe('Edge: edad decimal (entero requerido)',()=>{
  const page=new RegisterPage()
  it('rechaza 12.5',()=>{
    page.visit();page.fillName('Matías');page.fillEmail('matias@mail.com');page.fillAge('12.5');page.fillPassword('abcdef');page.fillConfirm('abcdef');page.submit()
    page.errAge().should('contain','La edad debe ser un número positivo.')
  })
})
