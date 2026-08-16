const gradients = [
  'linear-gradient(135deg,#5B1A2B,#8A3B4E)',
  'linear-gradient(135deg,#7A2E42,#C9A15A)',
  'linear-gradient(135deg,#3D0F1E,#5B1A2B)',
  'linear-gradient(135deg,#8A3B4E,#DDC28C)',
  'linear-gradient(135deg,#5B1A2B,#DDC28C)',
  'linear-gradient(135deg,#6B4C56,#E8B4B8)'
];

const profiles = [
  {name:"Camille", age:29, city:"Lyon", initial:"C", bio:"Passionnée de céramique et de longues balades le dimanche matin.", tags:["Art","Nature","Café"]},
  {name:"Thomas", age:33, city:"Bordeaux", initial:"T", bio:"Cuisinier amateur, toujours prêt pour une nouvelle recette ratée.", tags:["Cuisine","Vin","Jazz"]},
  {name:"Léa", age:26, city:"Nantes", initial:"L", bio:"Libraire le jour, danseuse de salsa le soir.", tags:["Lecture","Danse"]},
  {name:"Hugo", age:31, city:"Marseille", initial:"H", bio:"Grimpeur du week-end, sérieux sur les crêpes du dimanche.", tags:["Escalade","Voyage"]},
  {name:"Inès", age:28, city:"Toulouse", initial:"I", bio:"Illustratrice, collectionneuse de carnets jamais terminés.", tags:["Dessin","Chats"]},
  {name:"Nadia", age:34, city:"Lille", initial:"N", bio:"Coureuse de fond, aime les débats qui durent trop longtemps.", tags:["Course","Philo"]}
];

let deck = [...profiles];
let matches = [];
const stackArea = document.getElementById('stackArea');
const stackEmpty = document.getElementById('stackEmpty');

function renderStack(){
  stackArea.querySelectorAll('.pcard').forEach(c=>c.remove());
  deck.slice(0,3).reverse().forEach((p, idx)=>{
    const realIdx = Math.min(deck.length,3) - 1 - idx;
    const card = document.createElement('div');
    card.className='pcard';
    card.style.zIndex = 10+realIdx;
    card.style.transform = `translateY(${realIdx*10}px) scale(${1-realIdx*0.04})`;
    card.innerHTML = `
      <div class="photo" style="background:${gradients[profiles.indexOf(p)%gradients.length]}">
        ${p.initial}
        <span class="stamp">${p.city}</span>
      </div>
      <div class="info">
        <div>
          <h3>${p.name}, ${p.age}</h3>
          <div class="meta">${p.city}</div>
          <p>${p.bio}</p>
          <div class="tags">${p.tags.map(t=>`<span>${t}</span>`).join('')}</div>
        </div>
      </div>`;
    stackArea.appendChild(card);
  });
  stackEmpty.style.display = deck.length===0 ? 'flex' : 'none';
}

function swipe(action){
  if(deck.length===0) return;
  const top = stackArea.querySelector('.pcard[style*="z-index: '+(10+Math.min(deck.length,3)-1)+'"]');
  const current = deck[0];
  if(top){
    top.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
    top.style.transform = action==='like' ? 'translateX(140%) rotate(18deg)' : 'translateX(-140%) rotate(-18deg)';
    top.style.opacity = '0';
  }
  setTimeout(()=>{
    deck.shift();
    if(action==='like' && Math.random() > 0.35){
      matches.push(current);
      renderMatches();
    }
    renderStack();
  }, 320);
}

function resetStack(){
  deck = [...profiles];
  renderStack();
}

function renderMatches(){
  const grid = document.getElementById('matchGrid');
  const empty = document.getElementById('matchEmpty');
  empty.style.display = matches.length===0 ? 'block' : 'none';
  grid.innerHTML = matches.map(p=>`
    <div class="match-card" onclick="openChat('${p.name}','${p.initial}',${profiles.indexOf(p)})">
      <div class="mphoto" style="background:${gradients[profiles.indexOf(p)%gradients.length]}">${p.initial}</div>
      <div class="mname">${p.name}</div>
      <div class="mnote">Dites bonjour ✉</div>
    </div>`).join('');
}

const openers = [
  "Bonjour ! J'ai vu qu'on aimait tous les deux {tag}.",
  "Salut, votre profil m'a fait sourire 🙂",
  "Bonjour ! Ça vous dirait un café cette semaine ?"
];

function openChat(name, initial, idx){
  const p = profiles[idx];
  document.getElementById('chatName').textContent = name;
  const body = document.getElementById('chatBody');
  const opener = openers[idx % openers.length].replace('{tag}', p.tags[0]);
  body.innerHTML = `<div class="msg them">${opener}</div>`;
  document.getElementById('chatOverlay').style.display = 'flex';
  document.getElementById('chatOverlay').dataset.current = name;
}

function closeChat(){
  document.getElementById('chatOverlay').style.display = 'none';
}

function sendMsg(){
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if(!text) return;
  const body = document.getElementById('chatBody');
  body.innerHTML += `<div class="msg me">${text}</div>`;
  input.value='';
  body.scrollTop = body.scrollHeight;
  setTimeout(()=>{
    const replies = ["Avec plaisir ! 😊", "Ça me va très bien.", "Racontez-moi en plus !", "Haha, j'adore."];
    body.innerHTML += `<div class="msg them">${replies[Math.floor(Math.random()*replies.length)]}</div>`;
    body.scrollTop = body.scrollHeight;
  }, 700);
}

// ---------- AUTH / ACCOUNT (démo, tout en mémoire, rien n'est transmis) ----------
let currentUser = null; // {prenom, email, verified}
let pendingIdFile = null;
let selectedIdType = 'cni';

const authOverlay = document.getElementById('authOverlay');
const gateMsg = document.getElementById('gateMsg');
const stackActions = document.getElementById('stackActions');

function showStep(step){
  ['stepSignup','stepVerif','stepStatus','stepLogin'].forEach(id=>{
    document.getElementById(id).style.display = id===step ? 'block' : 'none';
  });
}

function openAuth(mode){
  authOverlay.style.display = 'flex';
  if(currentUser && currentUser.verified){
    closeAuth();
    return;
  }
  showStep(mode==='login' ? 'stepLogin' : 'stepSignup');
}
function closeAuth(){ authOverlay.style.display = 'none'; }

function markInvalid(id, invalid){
  document.getElementById(id).classList.toggle('invalid', invalid);
}

function submitSignup(){
  const prenom = document.getElementById('in-prenom').value.trim();
  const naissance = document.getElementById('in-naissance').value;
  const email = document.getElementById('in-email').value.trim();
  const pass = document.getElementById('in-pass').value;

  let ok = true;
  markInvalid('f-prenom', !prenom); if(!prenom) ok=false;

  let age18 = false;
  if(naissance){
    const d = new Date(naissance);
    const cutoff = new Date();
    cutoff.setFullYear(cutoff.getFullYear()-18);
    age18 = d <= cutoff;
  }
  markInvalid('f-naissance', !age18); if(!age18) ok=false;

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  markInvalid('f-email', !emailOk); if(!emailOk) ok=false;

  const passOk = pass.length >= 8;
  markInvalid('f-pass', !passOk); if(!passOk) ok=false;

  if(!ok) return;

  currentUser = {prenom, email, verified:false};
  showStep('stepVerif');
}

function pickIdType(btn){
  document.querySelectorAll('.id-types button').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  selectedIdType = btn.dataset.type;
}

function handleIdFile(event){
  const file = event.target.files[0];
  if(!file) return;
  pendingIdFile = file;
  const url = URL.createObjectURL(file);
  document.getElementById('idPreviewImg').src = url;
  document.getElementById('idFileName').textContent = file.name;
  document.getElementById('idPreview').style.display = 'flex';
  document.getElementById('idUploadZone').style.display = 'none';
  document.getElementById('verifSubmitBtn').disabled = false;
}

function removeIdFile(event){
  event.stopPropagation();
  pendingIdFile = null;
  document.getElementById('idFile').value = '';
  document.getElementById('idPreview').style.display = 'none';
  document.getElementById('idUploadZone').style.display = 'block';
  document.getElementById('verifSubmitBtn').disabled = true;
}

function submitVerification(){
  if(!pendingIdFile || !currentUser) return;
  showStep('stepStatus');
  document.getElementById('statusPending').style.display = 'block';
  document.getElementById('statusDone').style.display = 'none';

  // Simulation de vérification (démo) — aucun envoi réel, aucun serveur
  setTimeout(()=>{
    currentUser.verified = true;
    document.getElementById('statusPending').style.display = 'none';
    document.getElementById('statusDone').style.display = 'block';
    document.getElementById('doneNameSpan').textContent = currentUser.prenom;
    refreshAccountUI();
  }, 2200);
}

function submitLogin(){
  const email = document.getElementById('login-email').value.trim() || 'demo@exemple.fr';
  currentUser = {prenom: email.split('@')[0], email, verified:true};
  refreshAccountUI();
  closeAuth();
}

function refreshAccountUI(){
  const navCta = document.getElementById('navCta');
  const badge = document.getElementById('userBadge');
  if(currentUser){
    navCta.style.display = 'none';
    badge.style.display = 'flex';
    document.getElementById('userAvatar').textContent = currentUser.prenom[0].toUpperCase();
    document.getElementById('userName').textContent = currentUser.prenom;
    document.getElementById('userVtag').style.display = currentUser.verified ? 'inline' : 'none';
  } else {
    navCta.style.display = 'inline-block';
    badge.style.display = 'none';
  }
  // débloquer / verrouiller la découverte de profils
  const unlocked = !!(currentUser && currentUser.verified);
  gateMsg.style.display = unlocked ? 'none' : 'flex';
  stackArea.style.display = unlocked ? 'block' : 'none';
  stackActions.style.display = unlocked ? 'flex' : 'none';
}

// initial: verrouillé
refreshAccountUI();
renderStack();
renderMatches();
// ---------- MESSAGERIE EN DIRECT (vrais comptes, via stockage partagé) ----------
// Note : les données des salons sont visibles par quiconque connaît le code —
// c'est un stockage "shared" de démonstration, pas un service chiffré de bout en bout.
let roomCode = null;
let lastMsgCount = 0;
let msgPollTimer = null;
let callPollTimer = null;
let callTimerInterval = null;
let callSeconds = 0;
let callRole = null; // 'caller' | 'callee'
let callActive = false;
const clientId = 'c-' + Math.random().toString(36).slice(2,10);

function genCode(){
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let c = '';
  for(let i=0;i<6;i++) c += chars[Math.floor(Math.random()*chars.length)];
  return c;
}

async function createRoom(){
  const code = genCode();
  try{
    await window.storage.set('room:'+code+':messages', JSON.stringify([]), true);
    await window.storage.set('room:'+code+':call', JSON.stringify({status:'idle'}), true);
    enterRoom(code);
  }catch(e){
    alert("Impossible de créer le salon pour l'instant. Réessayez.");
  }
}

function joinRoomFromInput(){
  const code = document.getElementById('joinCodeInput').value.trim().toUpperCase();
  if(!code) return;
  enterRoom(code);
}

async function enterRoom(code){
  roomCode = code;
  document.getElementById('roomPicker').style.display = 'none';
  document.getElementById('liveChat').style.display = 'flex';
  document.getElementById('liveCodeDisplay').textContent = code;
  document.getElementById('liveBody').innerHTML = `<div class="msg system">Salon ${code} — partagez ce code pour que quelqu'un vous rejoigne</div>`;
  lastMsgCount = 0;
  await pollMessages();
  msgPollTimer = setInterval(pollMessages, 2500);
  callPollTimer = setInterval(pollCallStatus, 1800);
}

function leaveRoom(){
  clearInterval(msgPollTimer);
  clearInterval(callPollTimer);
  roomCode = null;
  document.getElementById('roomPicker').style.display = 'block';
  document.getElementById('liveChat').style.display = 'none';
  document.getElementById('joinCodeInput').value = '';
}

async function pollMessages(){
  if(!roomCode) return;
  try{
    const res = await window.storage.get('room:'+roomCode+':messages', true);
    const list = res ? JSON.parse(res.value) : [];
    if(list.length !== lastMsgCount){
      lastMsgCount = list.length;
      const body = document.getElementById('liveBody');
      body.innerHTML = `<div class="msg system">Salon ${roomCode}</div>` + list.map(m=>
        `<div class="msg ${m.from === clientId ? 'me' : 'them'}">${escapeHtml(m.text)}</div>`
      ).join('');
      body.scrollTop = body.scrollHeight;
    }
  }catch(e){ /* salon pas encore créé côté serveur, on réessaiera */ }
}

function escapeHtml(str){
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

async function sendRealMsg(){
  if(!roomCode) return;
  const input = document.getElementById('liveInput');
  const text = input.value.trim();
  if(!text) return;
  input.value = '';
  try{
    const res = await window.storage.get('room:'+roomCode+':messages', true);
    const list = res ? JSON.parse(res.value) : [];
    list.push({text, ts: Date.now(), from: clientId});
    await window.storage.set('room:'+roomCode+':messages', JSON.stringify(list), true);
    // affichage optimiste local en "mine" — les autres appareils verront ce texte en "them"
    lastMsgCount = 0; // force le prochain poll à réafficher correctement
    await pollMessages();
  }catch(e){
    alert("Message non envoyé, réessayez.");
  }
}

// ---------- SIGNAL D'APPEL (démo — aucun flux audio/vidéo réel) ----------
async function startCall(){
  if(!roomCode) return;
  callRole = 'caller';
  try{
    await window.storage.set('room:'+roomCode+':call', JSON.stringify({status:'ringing', ts:Date.now()}), true);
    openCallUI('Appel en cours…', false);
  }catch(e){ alert("Impossible de lancer l'appel."); }
}

async function pollCallStatus(){
  if(!roomCode) return;
  try{
    const res = await window.storage.get('room:'+roomCode+':call', true);
    const call = res ? JSON.parse(res.value) : {status:'idle'};
    if(call.status === 'ringing' && callRole !== 'caller' && !callActive){
      callRole = 'callee';
      openCallUI('Appel entrant…', true);
    } else if(call.status === 'active' && !callActive){
      callActive = true;
      openCallUI('En communication', false);
      startCallTimer();
    } else if(call.status === 'idle' || call.status === 'ended'){
      if(document.getElementById('callOverlay').style.display === 'flex'){
        closeCallUI();
      }
    }
  }catch(e){}
}

function openCallUI(statusText, showAccept){
  document.getElementById('callOverlay').style.display = 'flex';
  document.getElementById('callStatusText').textContent = statusText;
  document.getElementById('callAvatar').textContent = roomCode ? roomCode[0] : '?';
  document.getElementById('callAcceptBtn').style.display = showAccept ? 'inline-block' : 'none';
  document.getElementById('callTimer').textContent = '00:00';
}

async function acceptCall(){
  callActive = true;
  try{ await window.storage.set('room:'+roomCode+':call', JSON.stringify({status:'active', ts:Date.now()}), true); }catch(e){}
  document.getElementById('callStatusText').textContent = 'En communication';
  document.getElementById('callAcceptBtn').style.display = 'none';
  startCallTimer();
}

async function declineOrEndCall(){
  try{ await window.storage.set('room:'+(roomCode||'x')+':call', JSON.stringify({status:'ended', ts:Date.now()}), true); }catch(e){}
  closeCallUI();
}

function closeCallUI(){
  callActive = false;
  callRole = null;
  clearInterval(callTimerInterval);
  callSeconds = 0;
  document.getElementById('callOverlay').style.display = 'none';
}

function startCallTimer(){
  clearInterval(callTimerInterval);
  callSeconds = 0;
  callTimerInterval = setInterval(()=>{
    callSeconds++;
    const m = String(Math.floor(callSeconds/60)).padStart(2,'0');
    const s = String(callSeconds%60).padStart(2,'0');
    document.getElementById('callTimer').textContent = `${m}:${s}`;
  }, 1000);
}
