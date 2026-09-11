# Guía de integración — Widget de chat SugarCoach

Este widget es un botón flotante + panel de chat que responde dudas funcionales sobre el uso de la app ("¿cómo registro glucosa?", "¿qué incluye el plan premium?", etc.). **No da indicaciones médicas** — si detecta que la consulta suena clínica, deriva a soporte humano en vez de responder.

Son 3 archivos, sin dependencias externas (no npm, no build step):

| Archivo | Qué es |
|---|---|
| `sugarcoach-chat-widget.css` | Estilos del botón, el panel y los mensajes |
| `sugarcoach-chat-widget.html` | El botón flotante + el panel del chat (markup) |
| `sugarcoach-chat-widget.js` | Toda la lógica: abrir/cerrar, enviar mensajes, mostrar opciones |

---

## 1. Requisito previo — variables CSS de la marca

El widget **no trae sus propios colores**. Usa las variables CSS que ya están definidas en la landing (`--c-primary`, `--c-surface`, `--c-on-surface`, `--c-outline-variant`, etc.) — por eso, con cero configuración extra, el widget ya respeta el modo claro, oscuro y accesible del sitio.

**Antes de integrar, confirmar que la página destino ya define esas variables** (`:root { --c-primary: ...; }` y sus equivalentes bajo `.dark` / `.a11y`). Si la landing final usa otro sistema de theming (por ejemplo, si el paso a Next.js + Tailwind + shadcn/ui cambia los nombres de variables), hay que:
- mapear esos mismos nombres de variable en el CSS del widget (buscar y reemplazar `var(--c-X)` por el token equivalente del nuevo sistema), o
- definir un pequeño bloque puente, ej.: `--c-primary: theme('colors.primary');` si migran a Tailwind con su propia paleta.

También depende de la fuente de íconos **Material Symbols Outlined**, que la landing ya carga en el `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">
```
Si el widget se lleva a una página que no la tiene, hay que agregar ese link, o reemplazar los `<span class="material-symbols-outlined">` por otro set de íconos.

---

## 2. Pasos de integración

1. **CSS** — pegar el contenido de `sugarcoach-chat-widget.css` dentro del `<style>` existente de la página (o linkearlo aparte con un `<link rel="stylesheet">`, si el proyecto separa estilos en archivos).
2. **HTML** — pegar el contenido de `sugarcoach-chat-widget.html` justo antes de `</body>`. Tiene que ir en TODAS las páginas donde el widget deba aparecer (hoy pensado para la landing; si más adelante va dentro de la app autenticada, revisar la sección 4).
3. **JS** — pegar el contenido de `sugarcoach-chat-widget.js` envuelto en un `<script>...</script>`, también antes de `</body>`, después del HTML del paso 2.

Orden final antes de `</body>`:
```html
  ...resto de la página...
  <!-- 1. HTML del widget (paso 2) -->
  <button id="sc-chat-btn">...</button>
  <div id="sc-chat-panel">...</div>

  <!-- 2. Script del widget (paso 3) -->
  <script>
    (function () { ... })();
  </script>
</body>
```

No requiere ningún framework, build step, ni paquete de npm — es JS vanilla con `fetch` y `crypto.randomUUID()` (soportado en todos los navegadores modernos).

---

## 3. Configuración — conectar al backend real

Arriba del todo en `sugarcoach-chat-widget.js` está el único bloque que el equipo de frontend necesita tocar:

```js
const USE_MOCK = true;
const CHAT_ENDPOINT = 'https://TU-BACKEND/api/chat';
```

- **`USE_MOCK = true`** (como está hoy): el widget simula las respuestas en el propio navegador, sin pegarle a ningún servidor. Sirve para maquetar y probar el diseño sin depender de que el backend esté levantado.
- **Para conectar al backend real:** cambiar a `USE_MOCK = false` y completar `CHAT_ENDPOINT` con la URL del **BFF** (no la URL de n8n directamente — el widget nunca debe hablarle a n8n de forma directa, ese endpoint tiene que quedar solo accesible desde el backend).

### Contrato esperado

**Request** (lo que el widget manda):
```json
POST /api/chat
{
  "message": "cómo registro mi insulina",
  "sessionId": "uuid-generado-por-el-widget"
}
```

**Response** (lo que el widget espera recibir):
```json
{
  "reply": "Podés registrar glucosa, insulina...",
  "options": ["Puntos y logros", "Ver mis reportes"]
}
```

`options` puede venir vacío (`[]`) cuando no hay seguimiento sugerido. Si el backend devuelve `res.ok === false` (error HTTP), el widget ya maneja ese caso mostrando un mensaje de "problema de conexión" — no hace falta lógica extra del lado del frontend para eso.

---

## 4. Qué NO tocar (a propósito)

- **No guardar nada en `localStorage`/`sessionStorage`.** El `sessionId` se genera nuevo en cada carga de página, a propósito — la persistencia de conversación, si se necesita, tiene que resolverse del lado del backend (asociada al `sessionId`), no en el navegador.
- **No sacar el disclaimer** ("No doy indicaciones médicas...") que aparece fijo arriba de los mensajes. Es la frontera de responsabilidad que se definió con el resto del equipo — cualquier cambio de copy ahí debería pasar por la misma revisión.
- **No reemplazar los botones de opciones por links (`<a>`)** — están armados como `<button>` a propósito para que reutilicen el mismo flujo de envío que el texto libre (`handleUserInput`), en vez de duplicar lógica.

---

## 5. Accesibilidad ya resuelta (no hace falta re-implementar)

- Foco visible en el input (`:focus-visible`), botones con mínimo 44×44px de área táctil.
- `role="dialog"` en el panel, `aria-live="polite"` en la lista de mensajes (un lector de pantalla anuncia cada respuesta nueva sin que el usuario tenga que buscarla).
- `Escape` cierra el panel y devuelve el foco al botón flotante.
- El botón cambia su `aria-label` según el estado ("Abrir..." / "Cerrar...").

Si el equipo de frontend modifica el markup, mantener estos atributos — son parte de la misma auditoría WCAG que se aplicó al resto de la landing.

---

## 6. Nota si el proyecto migra a Next.js / React

Hoy el widget es vanilla JS a propósito, para poder integrarlo en la landing HTML actual sin depender de un build step. Si el frontend pasa a Next.js (como está definido en el stack), portarlo es directo:

- El HTML del panel → un componente `<ChatWidget />`.
- El CSS → puede quedar como está (funciona igual dentro de un componente) o migrarse a clases de Tailwind, dado que ya usan `shadcn/ui`.
- La lógica del `.js` → mover a hooks de React (`useState` para mensajes/abierto-cerrado, un hook `useChat` para `getBotReply`), y `CHAT_ENDPOINT` pasaría a una variable de entorno (`NEXT_PUBLIC_CHAT_API_URL`) en vez de estar hardcodeada en el archivo.

No es necesario hacer esa migración ahora — el widget vanilla funciona igual de bien embebido dentro de una página Next.js si hiciera falta salir rápido con esto antes de que el resto del front esté migrado.

---

## 7. Cómo probarlo ustedes mismos

Con `USE_MOCK = true` (el valor por defecto), el widget funciona completo sin backend: abran la landing en el navegador, toquen el botón flotante, prueben las opciones y escriban preguntas como *"cómo veo mis reportes"* o *"cuánta insulina me pongo"* (esta última debería derivar a soporte, no responder). Si el comportamiento ahí ya los convence, conectar el backend real es solo el cambio de 2 líneas de la sección 3.
