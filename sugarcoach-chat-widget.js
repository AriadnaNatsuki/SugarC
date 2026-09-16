(function () {
  // =====================================================================
  // CONFIG — hoy corre en modo MOCK (simulado en el browser, sin backend).
  // Cuando el flujo de n8n esté publicado, cambiar USE_MOCK a false y
  // completar CHAT_ENDPOINT con la URL del endpoint del BFF que reenvía
  // al webhook de n8n (nunca apuntar el widget directo a n8n en producción).
  // =====================================================================
  const USE_MOCK = true;
  const CHAT_ENDPOINT = 'https://TU-BACKEND/api/chat';
  const sessionId = crypto.randomUUID();

  // =====================================================================
  // IDIOMA
  // Se detecta de <html lang="es|en">. Si la landing cambia ese atributo
  // dinámicamente (un switch ES/EN en la misma página), el widget lo nota
  // solo via MutationObserver. Si el switch de la landing NO toca el
  // atributo lang, se puede llamar a mano:
  //   window.SugarCoachChat.setLanguage('en')
  // =====================================================================
  function detectLang() {
    const raw = (document.documentElement.getAttribute('lang')
              || document.documentElement.dataset.lang
              || navigator.language
              || 'es').toLowerCase();
    return raw.startsWith('en') ? 'en' : 'es';
  }
  let LANG = detectLang();

  const CHROME = {
    es: {
      title: 'Asistente SugarCoach',
      status: 'En línea',
      disclaimer: 'Puedo ayudarte con dudas sobre cómo usar la app. No doy indicaciones médicas ni veo tus datos de salud.',
      inputLabel: 'Escribí tu consulta',
      placeholder: 'Escribí tu consulta...',
      openLabel: 'Abrir el asistente de SugarCoach',
      closeLabel: 'Cerrar el asistente de SugarCoach',
      closeBtnLabel: 'Cerrar el asistente',
      sendLabel: 'Enviar mensaje',
      greeting: '¡Hola! Soy el asistente de SugarCoach. Puedo ayudarte con dudas sobre cómo usar la app. ¿En qué te ayudo?',
      menuBtnLabel: 'Ver todas las opciones',
      menuPrompt: 'Claro, elegí una opción:',
      emptyMsg: 'Escribime tu consulta primero 🙂',
      tooLongMsg: 'Tu mensaje es un poco largo, ¿podés resumirlo?',
      connectionErrorMsg: 'Tuvimos un problema de conexión. Probá de nuevo en un momento.',
    },
    en: {
      title: 'SugarCoach Assistant',
      status: 'Online',
      disclaimer: "I can help with questions about how to use the app. I don't give medical advice or see your health data.",
      inputLabel: 'Type your question',
      placeholder: 'Type your question...',
      openLabel: 'Open the SugarCoach assistant',
      closeLabel: 'Close the SugarCoach assistant',
      closeBtnLabel: 'Close assistant',
      sendLabel: 'Send message',
      greeting: "Hi! I'm the SugarCoach assistant. I can help with questions about using the app. What can I help you with?",
      menuBtnLabel: 'Show all options',
      menuPrompt: 'Sure, pick an option:',
      emptyMsg: 'Type your question first 🙂',
      tooLongMsg: 'Your message is a bit long, could you shorten it?',
      connectionErrorMsg: 'We had a connection problem. Please try again in a moment.',
    },
  };

  const TOP_LEVEL_OPTIONS = {
    es: ['Cómo registrar mis datos', 'Puntos y logros', 'Ver mis reportes', 'Cómo enviar datos al médico', 'Cómo vincular a mi familia', 'Planes y precios', 'Hablar con soporte'],
    en: ['How to log my data', 'Points and achievements', 'View my reports', 'How to send data to my doctor', 'How to link my family', 'Plans and pricing', 'Talk to support'],
  };

  // Palabras clave en los dos idiomas juntas: alguien puede escribir en
  // español con la interfaz en inglés (o al revés), y el bot igual
  // tiene que entender de qué tema se trata.
  const CLINICAL_KEYWORDS = [
    'dosis','cuanta insulina','cuánta insulina','me pongo','sintoma','síntoma','me siento mal',
    'hipoglucemia','hiperglucemia','desmay','emergencia','me duele','dolor',
    'dose','dosage','how much insulin','symptom','i feel sick','hypoglycemia','hyperglycemia',
    'passed out','emergency','it hurts','pain',
  ];

  const TOPICS = [
    {
      id: 'registro',
      keywords: ['registrar','registro','cargar','carga','anotar','glucosa','insulina','comida','carbohidr',
                 'logging','record','entry','glucose','insulin','meal','carb'],
      reply: {
        es: 'Podés registrar glucosa, insulina, comidas y actividad desde el botón "+" en la pantalla principal. Se guarda en segundos y suma puntos a tu racha.',
        en: 'You can log glucose, insulin, meals and activity from the "+" button on the main screen. It saves in seconds and adds points to your streak.',
      },
      options: { es: ['¿Cómo sumo puntos?', '¿Dónde veo mis reportes?'], en: ['How do I earn points?', 'Where can I see my reports?'] },
    },
    {
      id: 'puntos',
      keywords: ['punto','puntos','nivel','logro','recompensa','racha','estrella',
                 'point','points','level','achievement','reward','streak','star'],
      reply: {
        es: 'Ganás puntos por cada registro diario completo. Los puntos suben tu nivel y desbloquean logros — nunca califican tus valores de glucosa, solo tu constancia.',
        en: 'You earn points for every complete daily log. Points level you up and unlock achievements — they never grade your glucose values, only your consistency.',
      },
      options: { es: ['¿Cómo registro mis datos?', '¿Qué incluye cada plan?'], en: ['How do I log my data?', "What's included in each plan?"] },
    },
    {
      id: 'reportes',
      keywords: ['reporte','grafico','gráfico','tiempo en rango','tir','estadistica','estadística','historial',
                 'report','chart','graph','time in range','statistics','history'],
      reply: {
        es: 'En la sección de Reportes vas a encontrar tu Tiempo en Rango (TIR) y el cruce de glucosa vs. insulina, listos para compartir en tu consulta.',
        en: "In the Reports section you'll find your Time in Range (TIR) and the glucose vs. insulin comparison, ready to share at your appointment.",
      },
      options: { es: ['Hablar con alguien del equipo'], en: ['Talk to someone on the team'] },
    },
    {
      id: 'compartir_datos',
      keywords: ['datos al medico','datos al médico','enviar datos','compartir datos','mandar datos','codigo qr','código qr',
                 'send data','share data','data to my doctor','data to the doctor','doctor scan','qr code'],
      reply: {
        es: 'Escaneá el código QR que te comparte tu médico y tus datos se envían automáticamente — no hace falta exportar ni mandar nada a mano.',
        en: 'Scan the QR code your doctor shares with you and your data is sent automatically — no need to export or send anything by hand.',
      },
      options: { es: [], en: [] },
    },
    {
      id: 'tratamiento',
      keywords: ['tratamiento','rango','hipo','hiper','target','dosis basal','esquema',
                 'treatment','range','low target','high target','basal dose','regimen'],
      reply: {
        es: 'En "Tratamiento" configurás tus rangos objetivo (hipo, target, hiper) junto con tu profesional de salud. Yo no puedo definir esos valores por vos.',
        en: 'In "Treatment" you set your target ranges (low, target, high) together with your healthcare professional. I can\'t set those values for you.',
      },
      options: { es: ['Hablar con alguien del equipo'], en: ['Talk to someone on the team'] },
    },
    {
      id: 'telemedicina',
      keywords: ['telemedicina','turno','consulta','medico','médico','doctora','doctor','videollamada','cita',
                 'telehealth','appointment','video call','physician'],
      reply: {
        es: 'Podés agendar una consulta de telemedicina desde la sección "Mi equipo". Vas a ver los horarios disponibles de tu profesional asignado.',
        en: 'You can schedule a telehealth visit from the "My team" section. You\'ll see the available times for your assigned professional.',
      },
      options: { es: ['Hablar con alguien del equipo'], en: ['Talk to someone on the team'] },
    },
    {
      id: 'planes',
      keywords: ['plan','precio','premium','gratis','suscripcion','suscripción','pagar','costo',
                 'price','pricing','free','subscription','pay','cost'],
      reply: {
        es: 'El plan gratuito incluye registro y reportes básicos por 60 días. El plan Premium suma telemedicina ilimitada y reportes avanzados.',
        en: 'The free plan includes basic logging and reports for 60 days. The Premium plan adds unlimited telehealth and advanced reports.',
      },
      options: { es: ['Hablar con alguien del equipo'], en: ['Talk to someone on the team'] },
    },
    {
      id: 'familia',
      keywords: ['familia','padre','madre','cuidador','conectar','vincular','compartir acceso',
                 'family','parent','caregiver','connect','link','share access'],
      reply: {
        es: 'Generá un código QR desde la app y pedile a tu familiar que lo escanee desde la suya — el vínculo se crea automáticamente, sin pasos extra.',
        en: "Generate a QR code from the app and have your family member scan it from theirs — the link is created automatically, no extra steps.",
      },
      options: { es: ['¿Cómo registro mis datos?'], en: ['How do I log my data?'] },
    },
    {
      id: 'soporte',
      keywords: ['soporte','ayuda humana','hablar con alguien','contacto','persona','humano',
                 'support','human help','talk to someone','contact','human'],
      reply: {
        es: 'Te dejo el contacto de soporte: soporte@sugar.coach. Un humano te responde a la brevedad.',
        en: "Here's our support contact: soporte@sugar.coach. A person will get back to you shortly.",
      },
      options: { es: [], en: [] },
    },
  ];

  const CLINICAL_REDIRECT = {
    reply: {
      es: 'No puedo darte indicaciones médicas — eso lo tiene que ver tu equipo de salud. Puedo ayudarte con cómo usar la app, o coordinar que hables con tu equipo.',
      en: "I can't give medical advice — that's something your healthcare team needs to handle. I can help with how to use the app, or connect you with your team.",
    },
    options: { es: ['Hablar con alguien del equipo', '¿Cómo registro mis datos?'], en: ['Talk to someone on the team', 'How do I log my data?'] },
  };

  const FALLBACK_REPLY = {
    es: 'No estoy seguro de haber entendido. Elegí una opción, o contame con otras palabras:',
    en: "I'm not sure I understood. Pick an option, or tell me in other words:",
  };

  function classify(text) {
    const t = text.toLowerCase();
    if (CLINICAL_KEYWORDS.some(k => t.includes(k))) {
      return { reply: CLINICAL_REDIRECT.reply[LANG], options: [] };
    }
    const topic = TOPICS.find(tp => tp.keywords.some(k => t.includes(k)));
    if (topic) return { reply: topic.reply[LANG], options: [] };
    // Excepcion: si el bot no entendio, SI mostramos el menu -- es el unico caso
    // donde el usuario no tiene otra pista de por donde seguir.
    return { reply: FALLBACK_REPLY[LANG], options: TOP_LEVEL_OPTIONS[LANG] };
  }

  function mockN8nResponse(text) {
    const trimmed = text.trim();
    if (!trimmed) return Promise.resolve({ reply: CHROME[LANG].emptyMsg, options: [] });
    if (trimmed.length > 400) return Promise.resolve({ reply: CHROME[LANG].tooLongMsg, options: [] });
    return new Promise(resolve => setTimeout(() => resolve(classify(trimmed)), 500 + Math.random() * 400));
  }

  async function getBotReply(text) {
    if (USE_MOCK) return mockN8nResponse(text);
    const res = await fetch(CHAT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, sessionId, lang: LANG }),
    });
    if (!res.ok) return { reply: CHROME[LANG].connectionErrorMsg, options: [] };
    return res.json();
  }

  // ---- Inyeccion del HTML del widget ----
  // El markup (boton + panel) vive en sugarcoach-chat-widget.html, separado de este
  // archivo. Lo traemos con fetch() y lo insertamos en el documento antes de armar
  // los listeners. Requiere que la pagina se sirva por http(s) (Live Server, etc.) --
  // fetch() de un archivo local vía file:// esta bloqueado por CORS en la mayoria
  // de los navegadores.
  const WIDGET_HTML_URL = new URL('sugarcoach-chat-widget.html', document.currentScript.src).href;

  fetch(WIDGET_HTML_URL)
    .then(res => {
      if (!res.ok) throw new Error('No se pudo cargar ' + WIDGET_HTML_URL);
      return res.text();
    })
    .then(html => {
      document.body.insertAdjacentHTML('beforeend', html);
      init();
    })
    .catch(err => {
      console.error('[SugarCoach widget] no se pudo inicializar:', err);
    });

  function init() {

  const btn = document.getElementById('sc-chat-btn');
  const panel = document.getElementById('sc-chat-panel');
  const closeBtn = document.getElementById('sc-chat-close');
  const menuBtn = document.getElementById('sc-chat-menu');
  const messages = document.getElementById('sc-chat-messages');
  const form = document.getElementById('sc-chat-form');
  const input = document.getElementById('sc-chat-input');
  const sendBtn = document.getElementById('sc-chat-send');
  const titleEl = document.getElementById('sc-chat-title');
  const statusEl = document.querySelector('#sc-chat-panel .sc-status');
  const disclaimerEl = document.querySelector('.sc-chat-disclaimer');
  const inputLabelEl = document.querySelector('label[for="sc-chat-input"]');
  const BOT_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFZm0thCmmQiPDtaWr0bChOKpScRGT8p1X7sC6grLXO-g3KvANuFYNQN7kunE7Yd1VlnsuzC7sqxTGifV1HnigDTfp07lN3P2Tmnfwjs80dZUNXR465alau64HEpkawgkZzkIy5mkU2T__Kl8HfyRF2g8mCPe1Ei4EO5Jz4R2f55MbC5bdBNpyrdTJhWJgNSuUpvfcqeyiBy3FHb13G2ehV948SsnrL6jRNBqQgfxOpbJi8d4D3LfWCVvsl03nua_dqg';


  function refreshGreetingIfUntouched() {
    if (messages.querySelector('.sc-user')) return; // ya escribio algo: no tocar el historial
    const greetingBubble = document.querySelector('#sc-greeting-row .sc-bubble');
    if (greetingBubble) greetingBubble.textContent = CHROME[LANG].greeting;
    const greetingOptions = document.getElementById('sc-greeting-options');
    if (greetingOptions) {
      greetingOptions.innerHTML = '';
      TOP_LEVEL_OPTIONS[LANG].forEach(label => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'sc-option-btn';
        b.textContent = label;
        b.addEventListener('click', () => handleUserInput(label));
        greetingOptions.appendChild(b);
      });
    }
  }

  function applyLangToChrome() {
    const c = CHROME[LANG];
    titleEl.textContent = c.title;
    if (statusEl) statusEl.lastChild.textContent = ' ' + c.status;
    if (disclaimerEl) disclaimerEl.textContent = c.disclaimer;
    if (inputLabelEl) inputLabelEl.textContent = c.inputLabel;
    input.placeholder = c.placeholder;
    sendBtn.setAttribute('aria-label', c.sendLabel);
    closeBtn.setAttribute('aria-label', c.closeBtnLabel);
    menuBtn.setAttribute('aria-label', c.menuBtnLabel);
    btn.setAttribute('aria-label', panel.hidden ? c.openLabel : c.closeLabel);
  }

  function scrollToEnd() { messages.scrollTop = messages.scrollHeight; }

  function clearAllOptions() {
    messages.querySelectorAll('.sc-options').forEach(el => el.remove());
  }

  function addUserMessage(text) {
    const row = document.createElement('div');
    row.className = 'sc-msg sc-user';
    row.innerHTML = '<p class="sc-bubble"></p>';
    row.querySelector('.sc-bubble').textContent = text;
    messages.appendChild(row);
    scrollToEnd();
  }

  function addBotMessage(text, options, isGreeting) {
    const row = document.createElement('div');
    row.className = 'sc-msg sc-bot';
    if (isGreeting) row.id = 'sc-greeting-row';
    row.innerHTML = '<img src="' + BOT_AVATAR + '" alt="" aria-hidden="true"><p class="sc-bubble"></p>';
    row.querySelector('.sc-bubble').textContent = text;
    messages.appendChild(row);
    if (options && options.length) {
      const wrap = document.createElement('div');
      wrap.className = 'sc-options';
      if (isGreeting) wrap.id = 'sc-greeting-options';
      options.forEach(label => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'sc-option-btn';
        b.textContent = label;
        b.addEventListener('click', () => handleUserInput(label));
        wrap.appendChild(b);
      });
      messages.appendChild(wrap);
    }
    scrollToEnd();
  }

  function showTyping() {
    const row = document.createElement('div');
    row.className = 'sc-msg sc-bot';
    row.id = 'sc-typing-row';
    row.innerHTML = '<img src="' + BOT_AVATAR + '" alt="" aria-hidden="true"><div class="sc-bubble sc-typing"><span></span><span></span><span></span></div>';
    messages.appendChild(row);
    scrollToEnd();
  }
  function hideTyping() {
    const row = document.getElementById('sc-typing-row');
    if (row) row.remove();
  }

  async function handleUserInput(text) {
    if (!text.trim()) return;
    clearAllOptions();
    addUserMessage(text);
    input.value = '';
    sendBtn.disabled = true;
    showTyping();
    try {
      const res = await getBotReply(text);
      hideTyping();
      addBotMessage(res.reply, res.options);
    } catch (err) {
      hideTyping();
      addBotMessage(CHROME[LANG].connectionErrorMsg, []);
    }
    sendBtn.disabled = false;
  }

  function openPanel() {
    panel.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
    applyLangToChrome();
    if (!messages.childElementCount) {
      addBotMessage(CHROME[LANG].greeting, TOP_LEVEL_OPTIONS[LANG], true);
    }
    input.focus();
  }
  function closePanel() {
    panel.hidden = true;
    btn.setAttribute('aria-expanded', 'false');
    applyLangToChrome();
    btn.focus();
  }

  btn.addEventListener('click', () => { panel.hidden ? openPanel() : closePanel(); });
  closeBtn.addEventListener('click', closePanel);
  menuBtn.addEventListener('click', () => {
    if (messages.querySelector('.sc-options')) {
      scrollToEnd(); // ya se estan mostrando opciones (saludo, fallback u otro click al menu): no duplicar
      return;
    }
    addBotMessage(CHROME[LANG].menuPrompt, TOP_LEVEL_OPTIONS[LANG]);
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) closePanel(); });

  form.addEventListener('submit', e => {
    e.preventDefault();
    handleUserInput(input.value);
  });

  // ---- Cambio de idioma ----
  // 1) Automático: si la landing cambia <html lang="..."> (o el atributo
  //    data-lang), el widget lo detecta solo.
  new MutationObserver(() => {
    const next = detectLang();
    if (next !== LANG) { LANG = next; applyLangToChrome(); refreshGreetingIfUntouched(); }
  }).observe(document.documentElement, { attributes: true, attributeFilter: ['lang', 'data-lang'] });

  // 2) Manual: si el switch ES/EN de la landing no toca esos atributos,
  //    se puede llamar directo a este hook desde su propio código:
  //    window.SugarCoachChat.setLanguage('en')
  window.SugarCoachChat = {
    setLanguage(l) {
      const next = (l || '').toLowerCase().startsWith('en') ? 'en' : 'es';
      if (next !== LANG) { LANG = next; applyLangToChrome(); refreshGreetingIfUntouched(); }
    },
    getLanguage() { return LANG; },
  };

  applyLangToChrome();
  }
})();
