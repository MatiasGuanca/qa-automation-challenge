# QA Automation Challenge Cypress

Formulario de registro con **validaciones** y **errores inline por campo**. Suite **E2E con Cypress**, **mocks de API** y **Page Object Model**.

## Qué se valida
- **Nombre** obligatorio
- **Email** obligatorio y **válido**
- **Edad** opcional; si se completa, debe ser **entero positivo**
- **Contraseña** ≥ 6 y **Confirmación** igual
- **Errores** al **lado** del campo (en mobile: debajo)
- **Éxito literal**: `Registro exitoso. Bienvenido/a, [Nombre]!`

> Notas: validación nativa HTML5 + reglas JS. Errores de API (ej. duplicado) aparecen en el **campo relevante**.

## Por qué estos tests
- **Mínimos**: éxito, email inválido, contraseñas distintas.
- **Adicionales**: vacíos múltiples, edad inválida (negativa / texto), duplicado (409), a11y básica.
- **Edge**: trim de nombre; edad decimal (falla por “entero positivo”).
- **Opcional**: interceptar POST y **validar `req.body`** + regla de dominio de email.

## Selectores y robustez
- Atributos estables **`data-cy="reg.*"`** definidos en la app.
- Soporte de accesibilidad: `aria-describedby`, `aria-invalid`, roles `alert/status`.
- **POM** para aislar selectores; si cambian IDs/clases, se ajusta el POM sin tocar specs.
- Fallback por **label** (texto visible) en `name` y `email` si faltaran los `data-cy`.

## Estructura
```
public/            # HTML, CSS, JS (errores inline)
cypress/
  pages/           # Page Object (RegisterPage.js)
  utils/           # datos de prueba
  support/         # bootstrap y custom commands
  e2e/             # specs (mínimos, extra, edge y opcional)
cypress.config.js  # ESM, baseUrl, etc.
```

## Ejecutar (Windows/macOS)
Requisito: **Node.js LTS**  
- macOS: `brew install node` (o `brew install nvm && nvm install --lts`)  
- Windows: `winget install OpenJS.NodeJS.LTS` (o `choco install nodejs-lts -y`)

```bash
npm install
npm run dev         # http://localhost:8080
# en otra terminal:
npm run cy:open     # UI interactiva
# o
npm run cy:run      # headless
```

## Ejecución en mobile (responsive)
```js
// al inicio del spec o en beforeEach:
cy.viewport(390, 844)          // iPhone 12 aprox
// también podés usar presets:
cy.viewport('iphone-6')        // preset de Cypress
```

## Estrategia
Lanzamos navegador, completamos el form, **mockeamos** la API (`cy.intercept`), **verificamos** errores inline / éxito literal y cerramos.

### Rationale
Preferimos `data-cy` para estabilidad; si mañana cambian IDs, el POM y el fallback por **label** permiten ajustar sin tocar los specs.

### Limitación conocida
Sin backend real; el flujo depende de mocks. En prod se usaría un sandbox o contract test.
