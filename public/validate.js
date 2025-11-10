// Validación cliente (errores inline) + fetch mockeable
const form=document.getElementById('register-form')
const success=document.getElementById('success')
const {name:nameInput,email:emailInput,age:ageInput,password:passwordInput,confirm:confirmInput}=form.elements

// Slots de error por campo
const errName=document.getElementById('err-name')
const errEmail=document.getElementById('err-email')
const errAge=document.getElementById('err-age')
const errPassword=document.getElementById('err-password')
const errConfirm=document.getElementById('err-confirm')

// Utilidades pequeñas (evitan expresiones inline crípticas)
const isPositiveInt = (v) => {
  if (v === '') return false
  const n = Number(v)
  return Number.isInteger(n) && n > 0
}

function clearErrors(){
  [errName,errEmail,errAge,errPassword,errConfirm].forEach(n=>n.textContent='')
  ;[nameInput,emailInput,ageInput,passwordInput,confirmInput].forEach(i=>i.setAttribute('aria-invalid','false'))
  success.textContent=''
}

function setErr(input,slot,msg){
  if(!msg) return
  input.setAttribute('aria-invalid','true')
  slot.textContent=msg
}

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  clearErrors()

  const msgs = { name:'', email:'', age:'', password:'', confirm:'' }

  // Reglas de negocio
  if(!nameInput.value.trim()) msgs.name='El nombre es obligatorio.'
  if(!emailInput.checkValidity()) msgs.email='Email inválido.'
  const ageVal = ageInput.value.trim()
  if (ageVal && !isPositiveInt(ageVal)) msgs.age='La edad debe ser un número positivo.'
  if(passwordInput.value.length<6) msgs.password='La contraseña debe tener al menos 6 caracteres.'
  if(passwordInput.value!==confirmInput.value) msgs.confirm='Las contraseñas no coinciden.'

  const hasInvalid = !form.checkValidity() || Object.values(msgs).some(Boolean)

  // Pintar inline
  setErr(nameInput,errName,msgs.name)
  setErr(emailInput,errEmail,msgs.email)
  setErr(ageInput,errAge,msgs.age)
  setErr(passwordInput,errPassword,msgs.password)
  setErr(confirmInput,errConfirm,msgs.confirm)

  if (hasInvalid) return

  const payload = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    age: ageVal
  }

  try{
    const res = await fetch('/api/register', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(payload)
    })
    let data={}; try{ data=await res.json() }catch{}

    if(!res.ok){
      // Criterio de negocio: errores 4xx del registro impactan el campo relevante (acá: email)
      setErr(emailInput, errEmail, data?.error || 'Error al registrar')
      return
    }

    success.textContent = data?.message ?? `Registro exitoso. Bienvenido/a, ${payload.name}!`
  }catch{
    setErr(emailInput, errEmail, 'No se pudo registrar. Intente más tarde.')
  }
})
