# Guía de integración — Widget de chat SugarCoach

Botón flotante + panel de chat que responde dudas funcionales sobre el uso de la app ("¿cómo registro glucosa?", "¿qué incluye el plan premium?", etc.). **No da indicaciones médicas** — si detecta que la consulta suena clínica, deriva a soporte humano en vez de responder.

Todo va por **link**, nada se copia ni se pega dentro de `index.html`.

---

## 1. Los archivos

Son 3, y viven todos juntos en una carpeta llamada **`chatbot`**, en la raíz del repo (al lado de `index.html`, no adentro de otra carpeta):

```
/ (raíz del repo)
├── index.html
└── chatbot/
    ├── sugarcoach-chat-widget.css
    ├── sugarcoach-chat-widget.html
    └── sugarcoach-chat-widget.js
```

| Archivo | Qué es |
|---|---|
| `sugarcoach-chat-widget.css` | Estilos del botón, el panel y los mensajes |
| `sugarcoach-chat-widget.html` | El botón flotante + el panel del chat (markup) |
| `sugarcoach-chat-widget.js` | Toda la lógica: trae el HTML solo, abre/cierra, envía mensajes, muestra opciones |

Ninguno de los tres se pega dentro de `index.html`. El `.js` trae el `.html` solo con `fetch()` en cuanto la página carga — por eso el `.html` tiene que estar en la carpeta, pero nunca copiado a mano en ningún otro archivo.

---

## 2. Integración — 2 líneas en `index.html`

**En el `<head>`**, agregar:
```html
<link rel="stylesheet" href="chatbot/sugarcoach-chat-widget.css">
```

**Antes de `</body>`**, agregar:
```html
<script src="chatbot/sugarcoach-chat-widget.js" defer></script>
```

Eso es todo. No hace falta agregar el botón, el panel, ni ningún otro `<script>` — el `.js` arma el resto solo en cuanto corre.

**Importante:** la página tiene que servirse por http(s) (Live Server, o cualquier servidor local/de producción) — **no abrirse con doble clic desde el explorador de archivos**. Si se abre como `file:///...`, el navegador bloquea el `fetch()` que trae el HTML del widget y el botón no va a aparecer. Si ya usás Live Server para levantar la landing, esto no cambia nada para vos.

**Para sumar el widget a otra página del sitio:** las mismas 2 líneas, ajustando la ruta relativa a `chatbot/` según dónde viva esa página.

---

## 3. Requisito de la página: variables CSS de la marca

El widget no trae sus propios colores — usa las variables ya definidas en la landing (`--c-primary`, `--c-surface`, `--c-on-surface`, `--c-outline-variant`, etc.), por eso respeta solo los modos claro/oscuro/accesible del sitio sin configuración extra. Si el sistema de theming cambia de nombre (por ejemplo al migrar a Tailwind + shadcn/ui), hay que actualizar esos nombres dentro de `sugarcoach-chat-widget.css`.

También depende de la fuente **Material Symbols Outlined**, que la landing ya carga en el `<head>`. Si se lleva el widget a una página sin esa fuente, hay que agregar el link o cambiar los íconos.

---

## 4. Conectar al backend real

Arriba del todo en `sugarcoach-chat-widget.js`:
```js
const USE_MOCK = true;
const CHAT_ENDPOINT = 'https://TU-BACKEND/api/chat';
```
Hoy corre en modo simulado (sin backend). Para conectar el real: `USE_MOCK = false` y completar `CHAT_ENDPOINT` con la URL del **BFF** — nunca la URL de n8n directamente, esa tiene que quedar accesible solo desde el backend.

**Contrato:**
```json
// request
{ "message": "cómo registro mi insulina", "sessionId": "uuid-generado-por-el-widget", "lang": "es" }

// response
{ "reply": "Podés registrar glucosa, insulina...", "options": [] }
```
`lang` viaja como `"es"` o `"en"` según el idioma activo del sitio — el workflow de n8n (`sugarcoach-chat-n8n-workflow.json`, en la misma carpeta) ya responde acorde. `options` casi siempre viene vacío: el chat solo muestra botones en el saludo inicial y cuando el usuario reabre el menú — las respuestas normales no ofrecen seguimiento automático, a propósito.

---

## 5. Qué NO hacer

- **No pegar el contenido de `sugarcoach-chat-widget.html` en ningún lado.** El JS lo trae solo — pegarlo a mano genera el botón y el panel duplicados (con los mismos `id`, rompe todo).
- **No guardar nada en `localStorage`/`sessionStorage`** — el `sessionId` se genera nuevo en cada carga, a propósito.
- **No sacar el disclaimer** ("No doy indicaciones médicas...").
- **No agregar botones de opciones a las respuestas normales.** Es una decisión de diseño: el chat queda limpio después de cada respuesta; la única forma de volver a ver el menú es el ícono ☰ del header (o si el bot no entendió el mensaje).

---

## 6. Idioma (ES / EN) y modos de color

El widget detecta el idioma leyendo `document.documentElement.lang` y lo sigue solo si ese atributo cambia — ya está enganchado al botón ES/EN del header. Si el idioma cambia antes de escribir algo, el saludo se re-traduce también; si ya hay conversación, no se toca lo ya dicho. Para forzarlo desde otro lado del código: `window.SugarCoachChat.setLanguage('en')`.

Los 3 modos de color (Claro / Oscuro / Accesible) del selector del header funcionan solos, sin tocar el widget — heredan todo de las variables CSS del punto 3.

---

## 7. Cómo probarlo

Con `USE_MOCK = true`, anda completo sin backend: serví la landing con Live Server, tocá el botón flotante, probá el menú, escribí preguntas como *"cómo veo mis reportes"* o *"cuánta insulina me pongo"* (esta última deriva a soporte). Probá también el botón ES/EN y los 3 modos de color con el chat abierto.
