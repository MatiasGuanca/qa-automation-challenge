// Varios errores simultáneos al enviar vacío
import { RegisterPage } from '../pages/RegisterPage'
describe('Campos vacíos (inline)',()=>{
  const page=new RegisterPage()
  it('muestra múltiples errores cuando se envía vacío',()=>{
    page.visit();page.submit()
    page.errName().should('contain','El nombre es obligatorio.')
    page.errEmail().should('contain','Email inválido.')
    page.errPassword().should('contain','La contraseña debe tener al menos 6 caracteres.')
  })
})
