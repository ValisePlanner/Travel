/* ================= DADOS DE EXEMPLO (mesmo formato do desktop) ================= */
const iconConfig = {
  'Aéreo': { icon: 'fa-plane', color: '#7aa96b' },
  'Hospedagem': { icon: 'fa-hotel', color: '#c38d9e' },
  'Refeição': { icon: 'fa-utensils', color: '#e0975a' },
  'Transporte': { icon: 'fa-bus', color: '#7fa9c4' },
  'Lazer': { icon: 'fa-landmark', color: '#95b8d1' },
  'Camping': { icon: 'fa-campground', color: '#b08d57' }
};

// events: mesmo shape do desktop (id, trip, cidade, hospedagem, data, hora, desc, classe, valor)
let events = [
  { id:1, trip:'Patagônia 2026', cidade:'El Calafate, Argentina', hospedagem:'Camping Municipal El Calafate', data:'2026-12-12', hora:'08:30', desc:'Voo AR1234 — Buenos Aires → El Calafate', classe:'Aéreo', valor:0 },
  { id:2, trip:'Patagônia 2026', cidade:'El Calafate, Argentina', hospedagem:'Camping Municipal El Calafate', data:'2026-12-12', hora:'11:00', desc:'Check-in no camping e montagem do acampamento', classe:'Hospedagem', valor:0 },
  { id:3, trip:'Patagônia 2026', cidade:'El Calafate, Argentina', hospedagem:'Camping Municipal El Calafate', data:'2026-12-12', hora:'13:00', desc:'Almoço no centro, Av. del Libertador', classe:'Refeição', valor:0 },
  { id:4, trip:'Patagônia 2026', cidade:'El Calafate, Argentina', hospedagem:'Camping Municipal El Calafate', data:'2026-12-12', hora:'16:00', desc:'Caminhada no Mirador Bahía Redonda', classe:'Lazer', valor:0 },
  { id:5, trip:'Patagônia 2026', cidade:'El Calafate, Argentina', hospedagem:'Camping Municipal El Calafate', data:'2026-12-13', hora:'07:00', desc:'Van para o Glaciar Perito Moreno', classe:'Transporte', valor:0 },
  { id:6, trip:'Patagônia 2026', cidade:'El Calafate, Argentina', hospedagem:'Camping Municipal El Calafate', data:'2026-12-13', hora:'09:30', desc:'Passarelas do Perito Moreno — dia inteiro', classe:'Lazer', valor:0 },
  { id:7, trip:'Patagônia 2026', cidade:'El Calafate, Argentina', hospedagem:'Camping Municipal El Calafate', data:'2026-12-13', hora:'19:30', desc:'Jantar cordeiro patagônico', classe:'Refeição', valor:0 },
  { id:8, trip:'Patagônia 2026', cidade:'El Chaltén, Argentina', hospedagem:'Hostería Senderos', data:'2026-12-14', hora:'09:00', desc:'Bus El Calafate → El Chaltén (3h)', classe:'Transporte', valor:0 },
  { id:9, trip:'Patagônia 2026', cidade:'El Chaltén, Argentina', hospedagem:'Hostería Senderos', data:'2026-12-14', hora:'14:00', desc:'Trilha Laguna de los Tres', classe:'Lazer', valor:0 }
];

let checks = [
  { id:1, txt:'Passaporte + cópia digital', cat:'Documentos', trip:'Patagônia 2026', done:true },
  { id:2, txt:'Seguro viagem impresso', cat:'Documentos', trip:'Patagônia 2026', done:true },
  { id:3, txt:'Reserva do camping confirmada', cat:'Documentos', trip:'Patagônia 2026', done:false },
  { id:4, txt:'Casaco corta-vento', cat:'Bagagem', trip:'Patagônia 2026', done:true },
  { id:5, txt:'Botas de trilha', cat:'Bagagem', trip:'Patagônia 2026', done:false },
  { id:6, txt:'Lanterna de cabeça', cat:'Bagagem', trip:'Patagônia 2026', done:false },
  { id:7, txt:'Cartão internacional ativado', cat:'Financeiro', trip:'Patagônia 2026', done:true },
  { id:8, txt:'Pesos argentinos em espécie', cat:'Financeiro', trip:'Patagônia 2026', done:false },
  { id:9, txt:'Botijão de gás para o fogareiro', cat:'Camping', trip:'Patagônia 2026', done:false }
];
const catColors = { 'Documentos':'#6c9bd1', 'Bagagem':'#c38d9e', 'Financeiro':'#c9973a', 'Camping':'#b08d57' };
function catColor(c){ return catColors[c] || '#8d99ae'; }

const linkCategoryConfig = {
  'Consulado':   { icon: 'fa-building-columns', color: '#7fa9c4', bg: '#f0f4f8', label:'Consulado / Embaixada' },
  'Museu':       { icon: 'fa-palette',           color: '#c38d9e', bg: '#f9f2f4', label:'Museu / Atração' },
  'Transporte':  { icon: 'fa-bus',               color: '#88d8b0', bg: '#f1faf5', label:'Transporte' },
  'Saúde':       { icon: 'fa-kit-medical',       color: '#ef4444', bg: '#fff1f1', label:'Saúde / Hospital' },
  'Hotel':       { icon: 'fa-hotel',             color: '#c38d9e', bg: '#f9f2f4', label:'Hotel / Hospedagem' },
  'Camping':     { icon: 'fa-caravan',           color: '#f4a259', bg: '#fff8f0', label:'Camping / Área RV' },
  'Restaurante': { icon: 'fa-utensils',          color: '#e8a87c', bg: '#fff5ed', label:'Restaurante' },
  'Compras':     { icon: 'fa-shopping-bag',      color: '#d4a5a5', bg: '#fdf2f2', label:'Compras' },
  'Emergência':  { icon: 'fa-circle-exclamation',color: '#dc2626', bg: '#fee2e2', label:'Emergência' },
  'Outro':       { icon: 'fa-map-pin',           color: '#95b8d1', bg: '#f4f7f9', label:'Outro' }
};
const catOrder = ['Emergência','Consulado','Saúde','Transporte','Hotel','Camping','Museu','Restaurante','Compras','Outro'];
// Categoria desconhecida (ex.: vinda de um arquivo importado) cai em "Outro" em vez de sumir.
function linkCat(l){ return linkCategoryConfig[l && l.cat] ? l.cat : 'Outro'; }

let links = [
  { id:'1', name:'Hospital Municipal El Calafate', cat:'Saúde', trip:'Patagônia 2026', address:'Av. Roca 1487, El Calafate', phone:'+54 2902 491100', url:'', notes:'Atendimento 24h' },
  { id:'2', name:'Consulado do Brasil em El Calafate', cat:'Consulado', trip:'Patagônia 2026', address:'Av. del Libertador 1215', phone:'+54 2902 492260', url:'https://elcalafate.itamaraty.gov.br', notes:'Seg a sex, 9h–13h' },
  { id:'3', name:'Camping Municipal El Calafate', cat:'Camping', trip:'Patagônia 2026', address:'José Pantín s/n, El Calafate', phone:'', url:'https://campingelcalafate.com.ar', notes:'Ponto de água e energia disponível' },
  { id:'4', name:'La Zorra Brewing Co.', cat:'Restaurante', trip:'Patagônia 2026', address:'Gob. Gregores 1057, El Calafate', phone:'', url:'https://lazorracerveza.com', notes:'Cerveja artesanal, bom para grupos' },
  { id:'5', name:'Terminal de Ônibus El Calafate', cat:'Transporte', trip:'Patagônia 2026', address:'Av. Julio A. Roca s/n', phone:'', url:'', notes:'Ônibus para El Chaltén saem daqui' }
];

let tripNames = ['Patagônia 2026', 'Europa 2027'];
let allBudgets = {};
let cartoes = ["Nubank", "Itaú", "Bradesco", "Inter", "XP"];
let loadedFileName = '';

// Cópia dos dados de exemplo, usada para recuperar o app se o estado salvo estiver corrompido.
const DEFAULT_DATA = JSON.parse(JSON.stringify({ events, checks, links, tripNames, cartoes }));

let activeTrip = '';
let currentTab = 'cards';
let activeLinkCat = '';

/* ================= HELPERS DE SEGURANÇA ================= */
// Tudo que vem de arquivo importado ou digitado pelo usuário passa por esc() antes de ir para innerHTML.
function esc(v){
  return String(v == null ? '' : v)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}
const escAttr = esc;
// Só aceita http/https — bloqueia javascript:, data: etc.
function safeUrl(u){
  try{
    const x = new URL(String(u || '').trim());
    return (x.protocol === 'http:' || x.protocol === 'https:') ? x.href : '';
  } catch { return ''; }
}
const S = v => (v == null ? '' : String(v));

function emptyState(icon, t1, t2){
  return `<div class="empty-state"><div class="ico"><i class="fas ${icon}"></i></div><div class="t1">${esc(t1)}</div><div class="t2">${esc(t2)}</div></div>`;
}
function formatDate(dateStr){
  const p = S(dateStr).split('-');
  if(p.length < 3) return { dow:'', num:S(dateStr), mon:'' };
  const d = new Date(+p[0], +p[1]-1, +p[2]);
  if(isNaN(d.getTime())) return { dow:'', num:S(dateStr), mon:'' };
  const dow = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'][d.getDay()];
  const mon = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'][d.getMonth()];
  return { dow, num:p[2].slice(0,2).padStart(2,'0'), mon };
}
function todayStr(){
  const n = new Date();
  return n.getFullYear() + '-' + String(n.getMonth()+1).padStart(2,'0') + '-' + String(n.getDate()).padStart(2,'0');
}

/* ================= NORMALIZAÇÃO / VALIDAÇÃO DE DADOS ================= */
function normEvent(e, i){
  return Object.assign({}, e, {
    id: (e.id === undefined || e.id === null || e.id === '') ? (i + 1) : e.id,
    trip:S(e.trip), cidade:S(e.cidade), hospedagem:S(e.hospedagem), data:S(e.data),
    hora:S(e.hora), desc:S(e.desc), classe:S(e.classe)
  });
}
function normCheck(c){
  return Object.assign({}, c, { txt:S(c.txt), cat:S(c.cat) || 'Geral', trip:S(c.trip) });
}
function normLink(l, i){
  return {
    id: (l.id !== undefined && l.id !== null && l.id !== '') ? String(l.id) : (Date.now().toString() + '-' + i),
    name: S(l.name || l.nome), cat: S(l.cat) || 'Outro', trip: S(l.trip),
    address: S(l.address || l.endereco), phone: S(l.phone || l.telefone),
    url: safeUrl(l.url), notes: S(l.notes || l.obs)
  };
}

/* Valida o objeto inteiro ANTES de mexer no estado. Se algo estiver errado, lança erro
   e nada é alterado (nem salvo) — o app nunca fica meio-importado/quebrado.
   base = valores usados quando um campo não existe no arquivo. */
function applyData(d, base){
  if(!d || typeof d !== 'object' || Array.isArray(d)) throw new Error('o conteúdo não é um objeto');
  const pickArr = (k) => {
    const v = d[k];
    if(v === undefined || v === null) return base[k];
    if(!Array.isArray(v)) throw new Error(`o campo "${k}" deveria ser uma lista`);
    return v;
  };
  const newEvents = pickArr('events').filter(x => x && typeof x === 'object').map(normEvent);
  const newChecks = pickArr('checks').filter(x => x && typeof x === 'object').map(normCheck);
  const newLinks  = pickArr('links').filter(x => x && typeof x === 'object').map(normLink);
  let newCartoes = pickArr('cartoes').map(S);

  let newTrips = pickArr('tripNames').map(S).filter(Boolean);
  const cleaned = newTrips.filter(n => n !== 'Viagem' && n !== 'Trip');
  newTrips = cleaned.length ? cleaned : (newTrips.length ? newTrips : ['Viagem']);

  let newBudgets = d.allBudgets;
  if(newBudgets === undefined || newBudgets === null) newBudgets = base.allBudgets || {};
  if(typeof newBudgets !== 'object' || Array.isArray(newBudgets)) throw new Error('o campo "allBudgets" deveria ser um objeto');

  events = newEvents; checks = newChecks; links = newLinks;
  tripNames = newTrips; cartoes = newCartoes; allBudgets = newBudgets;
}

/* ================= TOPO: nome da viagem carregada ================= */
function renderTripChips(){
  document.getElementById('tripBadgeName').textContent =
    tripNames.length > 1 ? tripNames.join(' + ') : (tripNames[0] || 'Sem viagem carregada');
}

/* ================= CARD DIÁRIO ================= */
function renderCards(){
  const list = document.getElementById('cardsList');
  const filtered = (activeTrip ? events.filter(e => e.trip === activeTrip) : events).filter(e => e && e.data);
  const grouped = filtered.reduce((acc,e) => { acc[e.data] = acc[e.data] || []; acc[e.data].push(e); return acc; }, {});
  const dates = Object.keys(grouped).sort();
  // Abre o dia de hoje (se fizer parte do roteiro); senão, o primeiro dia.
  const openDate = dates.includes(todayStr()) ? todayStr() : dates[0];

  list.innerHTML = dates.map((date) => {
    const dayEvents = grouped[date].slice().sort((a,b) => S(a.hora).localeCompare(S(b.hora)));
    const d = formatDate(date);
    return `
    <div class="day-card${date===openDate ? ' open' : ''}">
      <div class="day-head" role="button" tabindex="0" aria-expanded="${date===openDate}">
        <div class="day-date"><div class="dow">${esc(d.dow)}</div><div class="num serif">${esc(d.num)}</div><div class="mon">${esc(d.mon)}</div></div>
        <div class="day-info">
          <div class="day-city"><i class="fas fa-map-marker-alt"></i>${esc(dayEvents[0].cidade)}</div>
          <div class="day-stay"><i class="fas fa-hotel"></i>${esc(dayEvents[0].hospedagem)}</div>
        </div>
        <div class="day-count"><span class="count-pill">${dayEvents.length}</span><i class="fas fa-chevron-down chev"></i></div>
      </div>
      <div class="day-body"><div class="day-body-inner"><div class="timeline">
        ${dayEvents.map(e => {
          const cfg = iconConfig[e.classe] || { icon:'fa-star', color:'#999' };
          return `<div class="ev"><div class="ev-icon" style="color:${cfg.color}"><i class="fas ${cfg.icon}"></i></div>
            <div class="ev-body"><div class="ev-time">${esc(e.hora)}</div><div class="ev-desc">${esc(e.desc)}</div></div></div>`;
        }).join('')}
      </div></div></div>
    </div>`;
  }).join('') || emptyState('fa-calendar-xmark','Nenhum dia para esta viagem ainda.','Troque de viagem no topo ou adicione itens na Timeline.');
}
function toggleDayCard(head){
  const card = head.parentElement;
  card.classList.toggle('open');
  head.setAttribute('aria-expanded', card.classList.contains('open'));
}
document.getElementById('cardsList').addEventListener('click', e => {
  const head = e.target.closest('.day-head'); if(head) toggleDayCard(head);
});
document.getElementById('cardsList').addEventListener('keydown', e => {
  if(e.key !== 'Enter' && e.key !== ' ') return;
  const head = e.target.closest('.day-head'); if(!head) return;
  e.preventDefault(); toggleDayCard(head);
});

/* ================= CHECKLIST ================= */
function renderChecklist(){
  normalizeChecks();
  const list = document.getElementById('checkList');
  const filtered = activeTrip ? checks.filter(c => c.trip === activeTrip) : checks;
  if(filtered.length === 0){ list.innerHTML = emptyState('fa-clipboard-check','Nenhum item no checklist','Toque no + para adicionar o primeiro item.'); return; }

  const totalDone = filtered.filter(c => c.done).length;
  const totalAll = filtered.length;
  const pct = Math.round((totalDone/totalAll)*100);
  const circ = 2*Math.PI*23;
  const offset = circ - (pct/100)*circ;
  const grouped = filtered.reduce((acc,c) => { acc[c.cat] = acc[c.cat]||[]; acc[c.cat].push(c); return acc; }, {});

  let html = `<div class="progress-card">
      <div class="ring"><svg><circle class="track" cx="28" cy="28" r="23"/><circle class="fill" cx="28" cy="28" r="23" stroke-dasharray="${circ}" stroke-dashoffset="${offset}"/></svg><div class="ring-label">${pct}%</div></div>
      <div class="progress-text"><div class="progress-title">${totalDone} de ${totalAll} prontos</div><div class="progress-sub">${totalAll-totalDone} itens ainda pendentes</div></div>
    </div>`;

  for(const cat in grouped){
    const items = [...grouped[cat]].sort((a,b) => (a.done===b.done)?0:a.done?1:-1);
    const done = items.filter(i=>i.done).length, total = items.length, allDone = done===total;
    html += `<div class="cat-group">
        <div class="cat-head"><div class="cat-name"><span class="cat-dot" style="background:${catColor(cat)}"></span>${esc(cat)}</div><div class="cat-tally ${allDone?'done':''}">${done}/${total}</div></div>
        <div class="cat-bar"><div class="cat-bar-fill" style="width:${(done/total)*100}%; background:${catColor(cat)}"></div></div>
        ${items.map(i => `<div class="check-item ${i.done?'done':''}" data-id="${esc(i.id)}">
            <div class="check-box" data-act="toggle" role="checkbox" aria-checked="${i.done}" aria-label="Marcar item" style="cursor:pointer;">${i.done?'<i class="fas fa-check"></i>':''}</div>
            <span class="check-txt" data-act="toggle" style="cursor:pointer;">${esc(i.txt)}</span>
            <button class="check-del" data-act="del" aria-label="Excluir item" title="Excluir"><i class="fas fa-trash"></i></button>
          </div>`).join('')}
      </div>`;
  }
  list.innerHTML = html;
}

/* Garante que todo item tenha id único e done booleano. Arquivos vindos do desktop
   podem trazer ids como texto, repetidos ou ausentes — isso quebrava o clique. */
function normalizeChecks(){
  const seen = new Set();
  checks.forEach((c, idx) => {
    let id = (c.id === undefined || c.id === null || c.id === '') ? null : String(c.id);
    if(id === null || seen.has(id)){ id = Date.now() + '-' + idx + '-' + Math.random().toString(36).slice(2,6); }
    c.id = id; seen.add(id);
    c.done = (c.done === true || c.done === 'true' || c.done === 1);
  });
}

function toggleCheck(id){
  const item = checks.find(c => String(c.id) === String(id));
  if(item){ item.done = !item.done; renderChecklist(); saveState(); }
}
function deleteCheck(id){
  const idx = checks.findIndex(c => String(c.id) === String(id));
  if(idx < 0) return;
  const removed = checks.splice(idx, 1)[0];
  renderChecklist(); saveState();
  showToast('Item removido', 'Desfazer', () => {
    checks.splice(Math.min(idx, checks.length), 0, removed);
    renderChecklist(); saveState();
  });
}

document.getElementById('checkList').addEventListener('click', e => {
  const act = e.target.closest('[data-act]');
  if(!act) return;
  const row = act.closest('.check-item');
  if(!row) return;
  if(act.dataset.act === 'toggle') toggleCheck(row.dataset.id);
  else if(act.dataset.act === 'del') deleteCheck(row.dataset.id);
});

/* ================= LINKS ================= */
function renderLinkCatScroller(){
  const el = document.getElementById('linkCatScroller');
  el.innerHTML = `<div class="cat-filter-chip ${activeLinkCat===''?'active':''}" data-cat="">Todas</div>` +
    catOrder.map(c => `<div class="cat-filter-chip ${activeLinkCat===c?'active':''}" data-cat="${c}"><i class="fas ${linkCategoryConfig[c].icon}"></i>${c}</div>`).join('');
}
function renderLinks(){
  const list = document.getElementById('linksList');
  const search = document.getElementById('linkSearch').value.toLowerCase();
  let filtered = links.filter(l => {
    if(activeTrip && l.trip !== activeTrip) return false;
    if(activeLinkCat && linkCat(l) !== activeLinkCat) return false;
    if(search && !(S(l.name).toLowerCase().includes(search) || S(l.address).toLowerCase().includes(search))) return false;
    return true;
  });
  if(filtered.length === 0){ list.innerHTML = emptyState('fa-map-location-dot','Nenhum local encontrado','Ajuste os filtros ou toque no + para adicionar.'); return; }

  const groups = {};
  filtered.forEach(l => { const c = linkCat(l); groups[c] = groups[c] || []; groups[c].push(l); });
  const sortedCats = catOrder.filter(c => groups[c]);

  let html = '';
  sortedCats.forEach(cat => {
    const cfg = linkCategoryConfig[cat];
    html += `<div class="link-section-title"><i class="fas ${cfg.icon}" style="color:${cfg.color}"></i>${esc(cfg.label)}<span class="line"></span></div>`;
    groups[cat].forEach(l => {
      const mapUrl = l.address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(l.address)}` : '';
      const siteUrl = safeUrl(l.url);
      const telNum = S(l.phone).replace(/[^\d+]/g, '');
      html += `<div class="link-card" style="border-left-color:${cfg.color}" data-id="${esc(l.id)}">
        <div class="link-top">
          <div class="link-ico" style="background:${cfg.bg}"><i class="fas ${cfg.icon}" style="color:${cfg.color}"></i></div>
          <div style="flex:1; min-width:0;">
            <span class="link-name">${esc(l.name)}</span>${l.trip ? `<span class="link-trip-tag">${esc(l.trip)}</span>` : ''}
            <div class="link-meta">
              ${l.address ? `<div><i class="fas fa-location-dot"></i>${esc(l.address)}</div>` : ''}
              ${l.phone ? `<div><i class="fas fa-phone"></i>${esc(l.phone)}</div>` : ''}
              ${l.notes ? `<div><i class="fas fa-note-sticky"></i>${esc(l.notes)}</div>` : ''}
            </div>
          </div>
        </div>
        <div class="link-actions">
          ${siteUrl ? `<a class="link-pill site" href="${esc(siteUrl)}" target="_blank" rel="noopener noreferrer"><i class="fas fa-arrow-up-right-from-square"></i>Site</a>` : ''}
          ${mapUrl ? `<a class="link-pill map" href="${esc(mapUrl)}" target="_blank" rel="noopener noreferrer"><i class="fas fa-map-location-dot"></i>Mapa</a>` : ''}
          ${telNum ? `<a class="link-pill call" href="tel:${esc(telNum)}"><i class="fas fa-phone"></i>Ligar</a>` : ''}
          <div class="link-icon-btn">
            <button data-act="edit" aria-label="Editar" title="Editar"><i class="fas fa-pen"></i></button>
            <button data-act="del" aria-label="Excluir" title="Excluir"><i class="fas fa-trash"></i></button>
          </div>
        </div>
      </div>`;
    });
  });
  list.innerHTML = html;
}
function deleteLink(id){
  const idx = links.findIndex(l => l.id === id);
  if(idx < 0) return;
  const removed = links.splice(idx, 1)[0];
  renderLinks(); saveState();
  showToast('Local removido', 'Desfazer', () => {
    links.splice(Math.min(idx, links.length), 0, removed);
    renderLinks(); saveState();
  });
}
function editLink(id){ const l = links.find(x => x.id === id); if(l) openLinkSheet(l); }
document.getElementById('linksList').addEventListener('click', e => {
  const btn = e.target.closest('[data-act]'); if(!btn) return;
  const card = btn.closest('.link-card'); if(!card) return;
  if(btn.dataset.act === 'edit') editLink(card.dataset.id);
  else if(btn.dataset.act === 'del') deleteLink(card.dataset.id);
});

/* ================= SHEETS: checklist / link ================= */
const sheetBackdrop = document.getElementById('sheetBackdrop');
const sheetCheck = document.getElementById('sheetCheck');
const sheetLink = document.getElementById('sheetLink');
const sheetFile = document.getElementById('sheetFile');
let sheetCat = 'Bagagem';
let lkCat = 'Consulado';

/* O botão "voltar" do Android fecha o sheet em vez de sair do app:
   abrir um sheet empilha uma entrada no histórico; voltar (popstate) fecha. */
let sheetOpen = false;
function closeSheetsUI(){
  sheetCheck.classList.remove('show'); sheetLink.classList.remove('show'); sheetFile.classList.remove('show');
  sheetBackdrop.classList.remove('show');
}
function showSheet(el){
  el.classList.add('show'); sheetBackdrop.classList.add('show');
  if(!sheetOpen){
    try{ history.pushState({ sheet:1 }, ''); sheetOpen = true; } catch(e){}
  }
}
function hideAllSheets(){
  closeSheetsUI();
  if(sheetOpen){
    sheetOpen = false;
    if(history.state && history.state.sheet){ try{ history.back(); } catch(e){} }
  }
}
window.addEventListener('popstate', () => {
  if(sheetOpen){ sheetOpen = false; closeSheetsUI(); }
});

function openCheckSheet(){
  document.getElementById('sheetInput').value = '';
  document.getElementById('sheetNewCat').value = '';
  renderSheetCats();
  showSheet(sheetCheck);
  setTimeout(()=> document.getElementById('sheetInput').focus(), 250);
}
function renderSheetCats(){
  const base = ['Bagagem','Documentos','Financeiro'];
  const allCats = [...new Set([...base, ...checks.map(c=>c.cat)])];
  document.getElementById('sheetCats').innerHTML = allCats.map(c => `<div class="cat-chip ${c===sheetCat?'active':''}" data-cat="${esc(c)}">${esc(c)}</div>`).join('');
}
document.getElementById('sheetCats').addEventListener('click', e => {
  const chip = e.target.closest('.cat-chip'); if(!chip) return;
  sheetCat = chip.dataset.cat; document.getElementById('sheetNewCat').value=''; renderSheetCats();
});
document.getElementById('sheetCancel').addEventListener('click', hideAllSheets);
document.getElementById('sheetConfirm').addEventListener('click', () => {
  const txt = document.getElementById('sheetInput').value.trim();
  if(!txt) return;
  const newCat = document.getElementById('sheetNewCat').value.trim();
  checks.push({ id: Date.now(), txt, cat: newCat || sheetCat, trip: activeTrip || tripNames[0] || '', done:false });
  hideAllSheets(); renderChecklist(); saveState();
});

function openLinkSheet(editing){
  document.getElementById('linkSheetTitle').textContent = editing ? 'Editar local' : 'Novo local';
  document.getElementById('lkName').value = editing ? editing.name : '';
  document.getElementById('lkAddress').value = editing ? editing.address : '';
  document.getElementById('lkPhone').value = editing ? editing.phone : '';
  document.getElementById('lkUrl').value = editing ? editing.url : '';
  document.getElementById('lkNotes').value = editing ? editing.notes : '';
  document.getElementById('lkEditId').value = editing ? editing.id : '';
  lkCat = editing ? linkCat(editing) : (activeLinkCat || 'Consulado');
  renderLkCats();
  showSheet(sheetLink);
}
function renderLkCats(){
  document.getElementById('lkCats').innerHTML = catOrder.map(c =>
    `<div class="cat-chip ${c===lkCat?'active':''}" data-cat="${c}"><i class="fas ${linkCategoryConfig[c].icon}"></i>${c}</div>`).join('');
}
document.getElementById('lkCats').addEventListener('click', e => {
  const chip = e.target.closest('.cat-chip'); if(!chip) return;
  lkCat = chip.dataset.cat; renderLkCats();
});
document.getElementById('linkSheetCancel').addEventListener('click', hideAllSheets);
document.getElementById('linkSheetConfirm').addEventListener('click', () => {
  const name = document.getElementById('lkName').value.trim();
  if(!name){ document.getElementById('lkName').focus(); return; }
  let url = document.getElementById('lkUrl').value.trim();
  if(url && !/^https?:\/\//i.test(url)) url = 'https://' + url;
  url = safeUrl(url); // descarta qualquer coisa que não seja um endereço http(s) válido
  const editId = document.getElementById('lkEditId').value;
  const entry = {
    id: editId || Date.now().toString(), name, cat: lkCat, trip: activeTrip || tripNames[0] || '',
    address: document.getElementById('lkAddress').value.trim(),
    phone: document.getElementById('lkPhone').value.trim(),
    url, notes: document.getElementById('lkNotes').value.trim()
  };
  if(editId){ const idx = links.findIndex(l => l.id === editId); if(idx>-1) links[idx] = entry; }
  else links.push(entry);
  hideAllSheets(); renderLinks(); saveState();
});

/* ================= PERSISTÊNCIA LOCAL (sobrevive a refresh / puxar-para-atualizar) =================
   O app guarda o estado atual no localStorage do navegador a cada alteração.
   Isso é diferente de "Salvar arquivo": aqui é só para a tela não voltar aos
   dados de exemplo se a página recarregar. O arquivo .json continua sendo a
   forma de levar os dados para outro dispositivo ou para o desktop.
   A chave inclui o id do usuário logado: quem entrar depois no mesmo aparelho
   não enxerga os dados de quem usou antes. */
const LEGACY_STORAGE_KEY = 'valise_mobile_state_v1';
const STORAGE_KEY = (function(){
  let uid = 'anon';
  try{ uid = localStorage.getItem('valise_uid') || 'anon'; } catch(e){}
  return LEGACY_STORAGE_KEY + ':' + uid;
})();

function saveState(){
  try{
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      events, checks, tripNames, allBudgets, cartoes, links, loadedFileName
    }));
  } catch(e){ /* localStorage pode estar indisponível (modo privado, quota etc.) — ignora silenciosamente */ }
}

function loadState(){
  let raw = null;
  try{
    raw = localStorage.getItem(STORAGE_KEY);
    if(!raw){
      // Migração única: estado salvo por versões antigas (sem id de usuário na chave).
      const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
      if(legacy){ raw = legacy; localStorage.removeItem(LEGACY_STORAGE_KEY); }
    }
  } catch(e){ return false; }
  if(!raw) return false;
  const d = JSON.parse(raw);               // JSON inválido lança erro -> tratado em boot()
  applyData(d, { events, checks, links, tripNames, cartoes, allBudgets });
  loadedFileName = (d && typeof d.loadedFileName === 'string') ? d.loadedFileName : '';
  return true;
}

/* ================= SALVAR / ABRIR ARQUIVO ================= */
function currentExportObject(){
  return { events, checks, tripNames, allBudgets, cartoes, links, exportDate: new Date().toISOString() };
}

async function exportData(){
  // NFD + remoção de diacríticos: mantém a letra (ô → o) em vez de virar "_"
  const suggested = (activeTrip || tripNames[0] || 'valise')
    .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
    .replace(/[^\w\-]+/g,'_');
  const filename = `${suggested}.json`;
  const content = JSON.stringify(currentExportObject(), null, 2);

  // 1) File System Access API: seletor nativo de pasta/nome. Só existe em
  //    Chromium desktop em contexto seguro.
  if (window.showSaveFilePicker) {
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: filename,
        types: [{ description: 'Arquivo Valise (JSON)', accept: { 'application/json': ['.json'] } }]
      });
      const writable = await handle.createWritable();
      await writable.write(content);
      await writable.close();
      loadedFileName = handle.name;
      saveState(); updateFileStatus(); hideAllSheets();
      showToast(`Arquivo "${handle.name}" salvo ✅`);
      return;
    } catch (err) {
      if (err && err.name === 'AbortError') return; // usuário cancelou o seletor
      console.warn('showSaveFilePicker falhou, tentando compartilhar/baixar:', err);
    }
  }

  // 2) Celular (principalmente PWA no iOS, onde <a download> costuma falhar):
  //    folha de compartilhamento do sistema ("Salvar em Arquivos", Drive, WhatsApp...).
  try {
    const file = new File([content], filename, { type:'application/json' });
    if (navigator.canShare && navigator.canShare({ files:[file] })) {
      await navigator.share({ files:[file], title: filename });
      loadedFileName = filename;
      saveState(); updateFileStatus(); hideAllSheets();
      showToast(`Arquivo "${filename}" pronto ✅`);
      return;
    }
  } catch (err) {
    if (err && err.name === 'AbortError') return; // usuário fechou a folha de compartilhamento
    console.warn('navigator.share falhou, caindo para download:', err);
  }

  // 3) Download padrão.
  const blob = new Blob([content], { type:'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  setTimeout(()=> URL.revokeObjectURL(url), 30000);
  loadedFileName = filename;
  saveState(); updateFileStatus(); hideAllSheets();
  showToast(`Arquivo "${filename}" salvo ✅`);
}

function importData(file){
  const fileBaseName = file.name.replace(/\.[^/.]+$/, '');
  const reader = new FileReader();

  reader.onerror = () => {
    showFileError('Não foi possível ler o arquivo (falha do navegador ao abrir o arquivo).');
  };

  reader.onload = (e) => {
    let raw;
    try {
      raw = JSON.parse(e.target.result);
    } catch(err){
      showFileError('O arquivo não é um .json válido. Detalhe: ' + (err && err.message));
      return;
    }

    try {
      if(!raw || typeof raw !== 'object' || Array.isArray(raw)) throw new Error('o conteúdo não é um objeto');

      const data = raw.tripNames ? raw : {
        // fallback simples para arquivos exportados como "Roteiro do Cliente"
        events: raw.events || [],
        checks: (() => {
          const src = raw.checklist || raw.checks || [];
          if(!Array.isArray(src)) throw new Error('o campo do checklist deveria ser uma lista');
          return src.map((c,i) => ({
            id: (c && c.id) || (Date.now()+i), txt: (c && (c.texto || c.txt)) || '', cat: (c && (c.grupo || c.cat)) || 'Geral',
            trip: fileBaseName, done: !!(c && (c.feito || c.done))
          }));
        })(),
        tripNames: [fileBaseName], allBudgets: {}, cartoes: cartoes, links: raw.links || []
      };

      // Sem window.confirm() de propósito: dentro de páginas publicadas/embutidas
      // diálogos nativos podem ser bloqueados silenciosamente. A escolha do arquivo
      // no seletor do sistema já é a confirmação do usuário.
      // applyData valida tudo antes de alterar o estado: arquivo ruim = nada muda.
      applyData(data, { events:[], checks:[], links:[], tripNames:['Viagem'], cartoes, allBudgets:{} });

      loadedFileName = file.name;
      activeTrip = ''; // mostra "Todas as viagens" após importar — evita esconder dados por trás do filtro
      saveState();
      updateFileStatus();
      renderTripChips(); renderCards(); renderChecklist(); renderLinkCatScroller(); renderLinks();
      hideAllSheets();
      showToast(`Arquivo "${file.name}" carregado ✅`);
    } catch(err){
      showFileError('O .json foi lido, mas o conteúdo não tem o formato esperado. Detalhe: ' + (err && err.message));
    }
  };
  reader.readAsText(file);
}

function showFileError(msg){
  document.getElementById('fileStatusIcon').className = 'fas fa-triangle-exclamation';
  document.getElementById('fileStatusIcon').style.color = 'var(--red)';
  document.getElementById('fileStatusText').textContent = msg;
  showSheet(sheetFile);
  showToast('Falha ao carregar o arquivo');
}

function updateFileStatus(){
  document.getElementById('fileStatusIcon').className = 'fas fa-circle-check';
  document.getElementById('fileStatusIcon').style.color = '';
  document.getElementById('fileStatusText').textContent = loadedFileName ? `Arquivo atual: ${loadedFileName}` : 'Nenhum arquivo carregado ainda — usando dados de exemplo';
}

document.getElementById('btnFileMenu').addEventListener('click', () => showSheet(sheetFile));
document.getElementById('fileSheetClose').addEventListener('click', hideAllSheets);
document.getElementById('btnSaveFile').addEventListener('click', exportData);
document.getElementById('btnOpenFile').addEventListener('click', () => document.getElementById('fileInput').click());
document.getElementById('fileInput').addEventListener('change', (e) => {
  const file = e.target.files[0];
  e.target.value = '';
  if(file) importData(file);
});
sheetBackdrop.addEventListener('click', hideAllSheets);

/* ================= NAV & FILTROS ================= */
document.getElementById('linkCatScroller').addEventListener('click', e => {
  const chip = e.target.closest('.cat-filter-chip'); if(!chip) return;
  activeLinkCat = chip.dataset.cat; renderLinkCatScroller(); renderLinks();
});
document.getElementById('linkSearch').addEventListener('input', renderLinks);

/* Toast simples; com actionLabel mostra um botão (ex.: "Desfazer") e fica mais tempo. */
let toastTimer = null;
function showToast(msg, actionLabel, onAction){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.toggle('has-action', !!actionLabel);
  if(actionLabel){
    const b = document.createElement('button');
    b.className = 'toast-action';
    b.textContent = actionLabel;
    b.addEventListener('click', () => {
      clearTimeout(toastTimer); t.classList.remove('show');
      if(onAction) onAction();
    });
    t.appendChild(b);
  }
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> t.classList.remove('show'), actionLabel ? 5000 : 2000);
}

document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;
    currentTab = tab;
    document.querySelectorAll('.nav-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('screen-cards').classList.toggle('active', tab==='cards');
    document.getElementById('screen-checklist').classList.toggle('active', tab==='checklist');
    document.getElementById('screen-links').classList.toggle('active', tab==='links');
    document.getElementById('fabAdd').style.display = (tab==='checklist' || tab==='links') ? 'flex' : 'none';
  });
});
document.getElementById('fabAdd').addEventListener('click', () => {
  if(currentTab === 'checklist') openCheckSheet();
  else if(currentTab === 'links') openLinkSheet(null);
});

/* ================= INICIALIZAÇÃO (à prova de estado corrompido) ================= */
function renderAll(){
  activeTrip = tripNames.includes(activeTrip) ? activeTrip : '';
  renderTripChips();
  renderCards();
  renderChecklist();
  renderLinkCatScroller();
  renderLinks();
  updateFileStatus();
}
function resetToDefaults(){
  events = JSON.parse(JSON.stringify(DEFAULT_DATA.events));
  checks = JSON.parse(JSON.stringify(DEFAULT_DATA.checks));
  links = JSON.parse(JSON.stringify(DEFAULT_DATA.links));
  tripNames = DEFAULT_DATA.tripNames.slice();
  cartoes = DEFAULT_DATA.cartoes.slice();
  allBudgets = {}; loadedFileName = ''; activeTrip = '';
}
function boot(){
  let recovered = false;
  try{
    loadState();
    renderAll();
  } catch(err){
    console.error('[Valise] Estado salvo inválido; voltando aos dados de exemplo:', err);
    try{
      // guarda uma cópia do estado ruim, caso precise ser examinado depois
      const bad = localStorage.getItem(STORAGE_KEY);
      if(bad) localStorage.setItem(STORAGE_KEY + ':corrompido', bad);
      localStorage.removeItem(STORAGE_KEY);
    } catch(e){}
    resetToDefaults();
    try{ renderAll(); } catch(e2){ console.error(e2); }
    recovered = true;
  }
  if(recovered) showToast('Dados salvos estavam corrompidos — voltei ao exemplo');
}
boot();

/* ================= PWA: registro do Service Worker =================
   Registra sw.js para permitir instalação na tela inicial e uso offline.
   Quando uma versão nova assume o controle, avisa o usuário. */
if ('serviceWorker' in navigator) {
  const hadController = !!navigator.serviceWorker.controller;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if(hadController) showToast('Nova versão instalada', 'Recarregar', () => location.reload());
  });
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(err => {
      console.warn('Service worker não registrado:', err);
    });
  });
}

/* ================= LOGO: tenta alguns caminhos comuns =================
   Se "../assets/Logo T01.png" não carregar, tenta variações de caixa/pasta
   antes de desistir e voltar pro ícone genérico. */
(function(){
  const img = document.getElementById('brandLogo');
  if(!img) return;
  const candidates = [
    '../assets/Logo T01.png',
    '../Assets/Logo T01.png',
    '../assets/logo t01.png',
    './assets/Logo T01.png',
    'assets/Logo T01.png'
  ];
  let i = 0;
  function tryNext(){
    if(i >= candidates.length){
      console.warn('[Valise] Nenhum caminho de logo funcionou. Tentados:', candidates);
      img.replaceWith(Object.assign(document.createElement('i'), { className:'fas fa-suitcase-rolling' }));
      return;
    }
    img.src = candidates[i++];
  }
  img.addEventListener('error', tryNext);
  img.addEventListener('load', () => console.info('[Valise] Logo carregada de:', img.src));
  tryNext();
})();
