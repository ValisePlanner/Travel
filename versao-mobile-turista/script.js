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

let activeTrip = '';
let currentTab = 'cards';
let activeLinkCat = '';

function emptyState(icon, t1, t2){
  return `<div class="empty-state"><div class="ico"><i class="fas ${icon}"></i></div><div class="t1">${t1}</div><div class="t2">${t2}</div></div>`;
}
function formatDate(dateStr){
  if(!dateStr) return '';
  const p = dateStr.split('-'); if(p.length<3) return dateStr;
  const d = new Date(+p[0], +p[1]-1, +p[2]);
  const dow = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'][d.getDay()];
  const mon = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'][d.getMonth()];
  return { dow, num:p[2].padStart(2,'0'), mon };
}

/* ================= TOPO: chips de viagem ================= */
function renderTripChips(){
  const el = document.getElementById('tripScroller');
  el.innerHTML = `<div class="trip-chip ${activeTrip===''?'active':''}" data-trip="">Todas as viagens</div>` +
    tripNames.map(n => `<div class="trip-chip ${activeTrip===n?'active':''}" data-trip="${n}">${n}</div>`).join('');
  document.getElementById('tripBadgeName').textContent = activeTrip || 'Todas as viagens';
}

/* ================= CARD DIÁRIO ================= */
function renderCards(){
  const list = document.getElementById('cardsList');
  const filtered = activeTrip ? events.filter(e => e.trip === activeTrip) : events;
  const grouped = filtered.reduce((acc,e) => { acc[e.data] = acc[e.data] || []; acc[e.data].push(e); return acc; }, {});
  const dates = Object.keys(grouped).sort();

  list.innerHTML = dates.map((date,i) => {
    const dayEvents = grouped[date].slice().sort((a,b) => (a.hora||'').localeCompare(b.hora||''));
    const d = formatDate(date);
    return `
    <div class="day-card${i===0 ? ' open' : ''}">
      <div class="day-head" onclick="this.parentElement.classList.toggle('open')">
        <div class="day-date"><div class="dow">${d.dow}</div><div class="num serif">${d.num}</div><div class="mon">${d.mon}</div></div>
        <div class="day-info">
          <div class="day-city"><i class="fas fa-map-marker-alt"></i>${dayEvents[0].cidade||''}</div>
          <div class="day-stay"><i class="fas fa-hotel"></i>${dayEvents[0].hospedagem||''}</div>
        </div>
        <div class="day-count"><span class="count-pill">${dayEvents.length}</span><i class="fas fa-chevron-down chev"></i></div>
      </div>
      <div class="day-body"><div class="timeline">
        ${dayEvents.map(e => {
          const cfg = iconConfig[e.classe] || { icon:'fa-star', color:'#999' };
          return `<div class="ev"><div class="ev-icon" style="color:${cfg.color}"><i class="fas ${cfg.icon}"></i></div>
            <div class="ev-body"><div class="ev-time">${e.hora||''}</div><div class="ev-desc">${e.desc||''}</div></div></div>`;
        }).join('')}
      </div></div>
    </div>`;
  }).join('') || emptyState('fa-calendar-xmark','Nenhum dia para esta viagem ainda.','Troque de viagem no topo ou adicione itens na Timeline.');
}

/* ================= CHECKLIST ================= */
function renderChecklist(){
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
        <div class="cat-head"><div class="cat-name"><span class="cat-dot" style="background:${catColor(cat)}"></span>${cat}</div><div class="cat-tally ${allDone?'done':''}">${done}/${total}</div></div>
        <div class="cat-bar"><div class="cat-bar-fill" style="width:${(done/total)*100}%; background:${catColor(cat)}"></div></div>
        ${items.map(i => `<div class="check-item ${i.done?'done':''}">
            <div class="check-box" onclick="toggleCheck(${i.id})" style="cursor:pointer;">${i.done?'<i class=\"fas fa-check\"></i>':''}</div>
            <span class="check-txt" onclick="toggleCheck(${i.id})" style="cursor:pointer;">${i.txt}</span>
            <button class="check-del" onclick="deleteCheck(${i.id})"><i class="fas fa-trash"></i></button>
          </div>`).join('')}
      </div>`;
  }
  list.innerHTML = html;
}
function toggleCheck(id){ const item = checks.find(c => c.id === id); if(item){ item.done = !item.done; renderChecklist(); saveState(); } }
function deleteCheck(id){ checks = checks.filter(c => c.id !== id); renderChecklist(); saveState(); }

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
    if(activeLinkCat && l.cat !== activeLinkCat) return false;
    if(search && !(l.name.toLowerCase().includes(search) || (l.address||'').toLowerCase().includes(search))) return false;
    return true;
  });
  if(filtered.length === 0){ list.innerHTML = emptyState('fa-map-location-dot','Nenhum local encontrado','Ajuste os filtros ou toque no + para adicionar.'); return; }

  const groups = {};
  filtered.forEach(l => { groups[l.cat] = groups[l.cat] || []; groups[l.cat].push(l); });
  const sortedCats = catOrder.filter(c => groups[c]);

  let html = '';
  sortedCats.forEach(cat => {
    const cfg = linkCategoryConfig[cat];
    html += `<div class="link-section-title"><i class="fas ${cfg.icon}" style="color:${cfg.color}"></i>${cfg.label}<span class="line"></span></div>`;
    groups[cat].forEach(l => {
      const mapUrl = l.address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(l.address)}` : '';
      html += `<div class="link-card" style="border-left-color:${cfg.color}">
        <div class="link-top">
          <div class="link-ico" style="background:${cfg.bg}"><i class="fas ${cfg.icon}" style="color:${cfg.color}"></i></div>
          <div style="flex:1; min-width:0;">
            <span class="link-name">${l.name}</span>${l.trip ? `<span class="link-trip-tag">${l.trip}</span>` : ''}
            <div class="link-meta">
              ${l.address ? `<div><i class="fas fa-location-dot"></i>${l.address}</div>` : ''}
              ${l.phone ? `<div><i class="fas fa-phone"></i>${l.phone}</div>` : ''}
              ${l.notes ? `<div><i class="fas fa-note-sticky"></i>${l.notes}</div>` : ''}
            </div>
          </div>
        </div>
        <div class="link-actions">
          ${l.url ? `<a class="link-pill site" href="${l.url}" target="_blank"><i class="fas fa-arrow-up-right-from-square"></i>Site</a>` : ''}
          ${mapUrl ? `<a class="link-pill map" href="${mapUrl}" target="_blank"><i class="fas fa-map-location-dot"></i>Mapa</a>` : ''}
          ${l.phone ? `<a class="link-pill call" href="tel:${l.phone.replace(/\\s/g,'')}"><i class="fas fa-phone"></i>Ligar</a>` : ''}
          <div class="link-icon-btn">
            <button onclick="editLink('${l.id}')" title="Editar"><i class="fas fa-pen"></i></button>
            <button onclick="deleteLink('${l.id}')" title="Excluir"><i class="fas fa-trash"></i></button>
          </div>
        </div>
      </div>`;
    });
  });
  list.innerHTML = html;
}
function deleteLink(id){ links = links.filter(l => l.id !== id); renderLinks(); saveState(); }
function editLink(id){ const l = links.find(x => x.id === id); if(l) openLinkSheet(l); }

/* ================= SHEETS: checklist / link ================= */
const sheetBackdrop = document.getElementById('sheetBackdrop');
const sheetCheck = document.getElementById('sheetCheck');
const sheetLink = document.getElementById('sheetLink');
const sheetFile = document.getElementById('sheetFile');
let sheetCat = 'Bagagem';
let lkCat = 'Consulado';

function showSheet(el){ el.classList.add('show'); sheetBackdrop.classList.add('show'); }
function hideAllSheets(){ sheetCheck.classList.remove('show'); sheetLink.classList.remove('show'); sheetFile.classList.remove('show'); sheetBackdrop.classList.remove('show'); }

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
  document.getElementById('sheetCats').innerHTML = allCats.map(c => `<div class="cat-chip ${c===sheetCat?'active':''}" data-cat="${c}">${c}</div>`).join('');
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
  lkCat = editing ? editing.cat : (activeLinkCat || 'Consulado');
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
   dados de exemplo se a página recarregar (ex.: gesto de puxar para atualizar,
   trocar de app e voltar, etc). O arquivo .json continua sendo a forma de
   levar os dados para outro dispositivo ou para o desktop. */
const STORAGE_KEY = 'valise_mobile_state_v1';

function saveState(){
  try{
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      events, checks, tripNames, allBudgets, cartoes, links, loadedFileName
    }));
  } catch(e){ /* localStorage pode estar indisponível (modo privado, quota etc.) — ignora silenciosamente */ }
}

function loadState(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return false;
    const d = JSON.parse(raw);
    if(!d || typeof d !== 'object') return false;
    events = d.events || events;
    checks = d.checks || checks;
    tripNames = (d.tripNames && d.tripNames.length) ? d.tripNames : tripNames;
    allBudgets = d.allBudgets || allBudgets;
    cartoes = d.cartoes || cartoes;
    links = d.links || links;
    loadedFileName = d.loadedFileName || '';
    return true;
  } catch(e){ return false; }
}

/* ================= SALVAR / ABRIR ARQUIVO ================= */
function currentExportObject(){
  return { events, checks, tripNames, allBudgets, cartoes, links, exportDate: new Date().toISOString() };
}

function exportData(){
  const suggested = (activeTrip || tripNames[0] || 'valise').replace(/[^\w\-]+/g,'_');
  const filename = `${suggested}.json`;
  const content = JSON.stringify(currentExportObject(), null, 2);
  const blob = new Blob([content], { type:'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  setTimeout(()=> URL.revokeObjectURL(url), 30000);
  loadedFileName = filename;
  updateFileStatus();
  hideAllSheets();
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
      const data = raw.tripNames ? raw : {
        // fallback simples para arquivos exportados como "Roteiro do Cliente"
        events: raw.events || [], checks: (raw.checklist || raw.checks || []).map((c,i) => ({
          id: c.id || (Date.now()+i), txt: c.texto || c.txt || '', cat: c.grupo || c.cat || 'Geral',
          trip: fileBaseName, done: c.feito || c.done || false
        })),
        tripNames: [fileBaseName], allBudgets: {}, cartoes: cartoes, links: raw.links || []
      };

      // Sem window.confirm() de propósito: dentro de páginas publicadas/embutidas
      // (webview do app, navegador in-app) diálogos nativos (confirm/alert) podem
      // ser bloqueados silenciosamente, fazendo a importação parecer que "não fez nada".
      // A escolha do arquivo no seletor do sistema já é a confirmação do usuário.
      events = data.events || [];
      checks = data.checks || [];
      tripNames = (data.tripNames && data.tripNames.filter(n => n && n!=='Viagem' && n!=='Trip').length)
        ? data.tripNames.filter(n => n && n!=='Viagem' && n!=='Trip')
        : (data.tripNames && data.tripNames.length ? data.tripNames : ['Viagem']);
      allBudgets = data.allBudgets || {};
      cartoes = data.cartoes || cartoes;
      links = (data.links || []).map(l => ({
        id: l.id || (Date.now().toString()+Math.random()), name: l.name || l.nome || '', cat: l.cat || 'Outro',
        trip: l.trip || '', address: l.address || l.endereco || '', phone: l.phone || l.telefone || '',
        url: l.url || '', notes: l.notes || l.obs || ''
      }));
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
document.getElementById('tripScroller').addEventListener('click', e => {
  const chip = e.target.closest('.trip-chip'); if(!chip) return;
  activeTrip = chip.dataset.trip;
  renderTripChips(); renderCards(); renderChecklist(); renderLinks();
});
document.getElementById('linkCatScroller').addEventListener('click', e => {
  const chip = e.target.closest('.cat-filter-chip'); if(!chip) return;
  activeLinkCat = chip.dataset.cat; renderLinkCatScroller(); renderLinks();
});
document.getElementById('linkSearch').addEventListener('input', renderLinks);

function showToast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  setTimeout(()=> t.classList.remove('show'), 2000);
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

loadState();
activeTrip = tripNames.includes(activeTrip) ? activeTrip : '';
renderTripChips();
renderCards();
renderChecklist();
renderLinkCatScroller();
renderLinks();
updateFileStatus();

/* ================= PWA: registro do Service Worker =================
   Mesma lógica do desktop: registra sw.js (se existir na mesma pasta)
   para permitir instalação na tela inicial e uso básico offline.
   Falha de forma silenciosa em navegadores sem suporte. */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(err => {
      console.warn('Service worker não registrado:', err);
    });
  });
}

/* ================= LOGO: tenta alguns caminhos comuns =================
   Se "../assets/Logo T01.png" não carregar, tenta variações de caixa/pasta
   antes de desistir e voltar pro ícone genérico. Registra no console qual
   caminho funcionou (ou por que nenhum funcionou) — útil pra debugar no
   celular usando "inspecionar" remoto (chrome://inspect) ou o Safari Web Inspector. */
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
    const path = candidates[i++];
    img.src = path;
  }
  img.addEventListener('error', tryNext);
  img.addEventListener('load', () => console.info('[Valise] Logo carregada de:', img.src));
  tryNext();
})();
