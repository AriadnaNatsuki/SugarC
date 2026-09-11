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

  const TOP_LEVEL_OPTIONS = [
    { label: 'Cómo registrar mis datos', value: 'Cómo registrar mis datos' },
    { label: 'Puntos y logros', value: 'Puntos y logros' },
    { label: 'Ver mis reportes', value: 'Ver mis reportes' },
    { label: 'Planes y precios', value: 'Planes y precios' },
    { label: 'Hablar con soporte', value: 'Hablar con soporte' },
  ];

  // Misma lógica que va a vivir en el nodo Code de n8n (ver workflow adjunto),
  // para que el demo de hoy y el flujo real respondan igual.
  const CLINICAL_KEYWORDS = ['dosis','cuanta insulina','cuánta insulina','me pongo','sintoma','síntoma','me siento mal','hipoglucemia','hiperglucemia','desmay','emergencia','me duele','dolor'];
  const TOPICS = [
    { id: 'registro', keywords: ['registrar','registro','cargar','carga','anotar','glucosa','insulina','comida','carbohidr'],
      reply: 'Podés registrar glucosa, insulina, comidas y actividad desde el botón "+" en la pantalla principal. Se guarda en segundos y suma puntos a tu racha.',
      options: ['Puntos y logros', 'Ver mis reportes'] },
    { id: 'puntos', keywords: ['punto','puntos','nivel','logro','recompensa','racha','estrella'],
      reply: 'Ganás puntos por cada registro diario completo. Los puntos suben tu nivel y desbloquean logros — nunca califican tus valores de glucosa, solo tu constancia.',
      options: ['Cómo registrar mis datos', 'Planes y precios'] },
    { id: 'reportes', keywords: ['reporte','grafico','gráfico','tiempo en rango','tir','estadistica','estadística','historial'],
      reply: 'En la sección de Reportes vas a encontrar tu Tiempo en Rango (TIR) y el cruce de glucosa vs. insulina, listos para compartir en tu consulta.',
      options: ['Hablar con soporte'] },
    { id: 'tratamiento', keywords: ['tratamiento','rango','hipo','hiper','target','dosis basal','esquema'],
      reply: 'En "Tratamiento" configurás tus rangos objetivo (hipo, target, hiper) junto con tu profesional de salud. Yo no puedo definir esos valores por vos.',
      options: ['Hablar con soporte'] },
    { id: 'telemedicina', keywords: ['telemedicina','turno','consulta','medico','médico','doctora','doctor','videollamada','cita'],
      reply: 'Podés agendar una consulta de telemedicina desde la sección "Mi equipo". Vas a ver los horarios disponibles de tu profesional asignado.',
      options: ['Hablar con soporte'] },
    { id: 'planes', keywords: ['plan','precio','premium','gratis','suscripcion','suscripción','pagar','costo'],
      reply: 'El plan gratuito incluye registro y reportes básicos por 60 días. El plan Premium suma telemedicina ilimitada y reportes avanzados.',
      options: ['Hablar con soporte'] },
    { id: 'familia', keywords: ['familia','padre','madre','cuidador','conectar','vincular','compartir acceso'],
      reply: 'Desde "Mi familia" podés invitar a un cuidador para que vea tus resúmenes, con los permisos que vos elijas.',
      options: ['Cómo registrar mis datos'] },
    { id: 'soporte', keywords: ['soporte','ayuda humana','hablar con alguien','contacto','persona','humano'],
      reply: 'Te dejo el contacto de soporte: soporte@sugar.coach. Un humano te responde a la brevedad.',
      options: [] },
  ];

  function classify(text) {
    const t = text.toLowerCase();
    if (CLINICAL_KEYWORDS.some(k => t.includes(k))) {
      return {
        reply: 'No puedo darte indicaciones médicas — eso lo tiene que ver tu equipo de salud. Puedo ayudarte con cómo usar la app, o coordinar que hables con tu equipo.',
        options: ['Hablar con soporte', 'Cómo registrar mis datos'],
      };
    }
    const topic = TOPICS.find(tp => tp.keywords.some(k => t.includes(k)));
    if (topic) return { reply: topic.reply, options: topic.options };
    return {
      reply: 'No estoy seguro de haber entendido. Elegí una opción, o contame con otras palabras:',
      options: TOP_LEVEL_OPTIONS.map(o => o.label),
    };
  }

  function mockN8nResponse(text) {
    const trimmed = text.trim();
    if (!trimmed) return Promise.resolve({ reply: 'Escribime tu consulta primero 🙂', options: [] });
    if (trimmed.length > 400) return Promise.resolve({ reply: 'Tu mensaje es un poco largo, ¿podés resumirlo?', options: [] });
    return new Promise(resolve => setTimeout(() => resolve(classify(trimmed)), 500 + Math.random() * 400));
  }

  async function getBotReply(text) {
    if (USE_MOCK) return mockN8nResponse(text);
    const res = await fetch(CHAT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, sessionId }),
    });
    if (!res.ok) return { reply: 'Tuvimos un problema de conexión. Probá de nuevo en un momento.', options: [] };
    return res.json();
  }

  // ---- UI ----
  const btn = document.getElementById('sc-chat-btn');
  const panel = document.getElementById('sc-chat-panel');
  const closeBtn = document.getElementById('sc-chat-close');
  const messages = document.getElementById('sc-chat-messages');
  const form = document.getElementById('sc-chat-form');
  const input = document.getElementById('sc-chat-input');
  const sendBtn = document.getElementById('sc-chat-send');
  const BOT_AVATAR = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFZm0thCmmQiPDtaWr0bChOKpScRGT8p1X7sC6grLXO-g3KvANuFYNQN7kunE7Yd1VlnsuzC7sqxTGifV1HnigDTfp07lN3P2Tmnfwjs80dZUNXR465alau64HEpkawgkZzkIy5mkU2T__Kl8HfyRF2g8mCPe1Ei4EO5Jz4R2f55MbC5bdBNpyrdTJhWJgNSuUpvfcqeyiBy3FHb13G2ehV948SsnrL6jRNBqQgfxOpbJi8d4D3LfWCVvsl03nua_dqg';

  function scrollToEnd() { messages.scrollTop = messages.scrollHeight; }

  function addUserMessage(text) {
    const row = document.createElement('div');
    row.className = 'sc-msg sc-user';
    row.innerHTML = '<p class="sc-bubble"></p>';
    row.querySelector('.sc-bubble').textContent = text;
    messages.appendChild(row);
    scrollToEnd();
  }

  function addBotMessage(text, options) {
    const row = document.createElement('div');
    row.className = 'sc-msg sc-bot';
    row.innerHTML = '<img src="' + BOT_AVATAR + '" alt="" aria-hidden="true"><p class="sc-bubble"></p>';
    row.querySelector('.sc-bubble').textContent = text;
    messages.appendChild(row);
    if (options && options.length) {
      const wrap = document.createElement('div');
      wrap.className = 'sc-options';
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
      addBotMessage('Tuvimos un problema de conexión. Probá de nuevo en un momento.', []);
    }
    sendBtn.disabled = false;
  }

  function openPanel() {
    panel.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
    btn.setAttribute('aria-label', 'Cerrar el asistente de SugarCoach');
    if (!messages.childElementCount) {
      addBotMessage('¡Hola! Soy el asistente de SugarCoach. Puedo ayudarte con dudas sobre cómo usar la app. ¿En qué te ayudo?', TOP_LEVEL_OPTIONS.map(o => o.label));
    }
    input.focus();
  }
  function closePanel() {
    panel.hidden = true;
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Abrir el asistente de SugarCoach');
    btn.focus();
  }

  btn.addEventListener('click', () => { panel.hidden ? openPanel() : closePanel(); });
  closeBtn.addEventListener('click', closePanel);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !panel.hidden) closePanel(); });

  form.addEventListener('submit', e => {
    e.preventDefault();
    handleUserInput(input.value);
  });
})();
