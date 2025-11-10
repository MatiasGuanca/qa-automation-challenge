// Password y confirmación distintas
import { RegisterPage } from '../pages/RegisterPage'
describe('Contraseñas no coinciden (inline)',()=>{
  const page=new RegisterPage()
  it('muestra error cuando las contraseñas difieren',()=>{
    page.visit();page.fillName('Matías');page.fillEmail('test@mail.com');page.fillPassword('abcdef');page.fillConfirm('abc123');page.submit()
    page.errConfirm().within(()=>{ cy.contains('Las contraseñas no coinciden.') })
  })
})
