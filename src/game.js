(()=>{
'use strict';
const $=s=>document.querySelector(s);
const rand=(a,b)=>a+Math.random()*(b-a);
const ri=n=>Math.floor(Math.random()*n);
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const lerp=(a,b,t)=>a+(b-a)*t;
const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=ri(i+1);[a[i],a[j]]=[a[j],a[i]]}return a};
const pickOne=a=>a[ri(a.length)];
const DPR=()=>Math.min(2,window.devicePixelRatio||1);
const TAU=Math.PI*2;

const WK=['lagoon','candy','canopy','ocean','bows','boba','birds'];
const WNAME={lagoon:'Lagoon',candy:'Sweetshop',canopy:'Rainforest',ocean:'Ocean',bows:'Bow Boutique',boba:'Boba Shop',birds:'Terror Birds'};
const WGRAD={lagoon:'linear-gradient(135deg,#CFF0F1,#9BDCE0)',candy:'linear-gradient(135deg,#FFF3F8,#FFD3E6)',canopy:'linear-gradient(135deg,#E4F3D6,#AFDA95)',ocean:'linear-gradient(135deg,#E3E7FF,#B9C3F5)',bows:'linear-gradient(135deg,#FFF0F6,#F8C8DD)',boba:'linear-gradient(135deg,#FFF6EC,#F5D9BD)',birds:'linear-gradient(135deg,#F6E9CF,#E6CFA3)'};
const KIDS=[{id:'charlie',name:'Charlie',theme:'candy'},{id:'riley',name:'Riley',theme:'lagoon'},{id:'vera',name:'Vera',theme:'canopy'},{id:'cora',name:'Cora',theme:'ocean'},{id:'addie',name:'Addie',theme:'bows'},{id:'amy',name:'Amy',theme:'boba'},{id:'hallie',name:'Hallie',theme:'birds'}];
const CHAR_COST=[0,40,90,150,220,300];
const ACOL={lagoon:['#2FAFC4','#1F9C72','#E8809B','#7A5CC9'],candy:['#F0468C','#3DA9E0','#1FB98A','#F5A623'],canopy:['#E07A2E','#2E9E5B','#2FA3B8','#B04FC2'],ocean:['#6A48F5','#0F8378','#F06292','#3B66E6'],bows:['#C92A6E','#7447D6','#0F8378','#E08A2E'],boba:['#8A4FC2','#B4532A','#0F8378','#C9336E'],birds:['#C2552B','#2E8B57','#2F7F9E','#8A5CC9']};
const CCOL={lagoon:['#BFF3F6'],candy:['#FF8FC8','#FF5C8A','#F5C842','#5CC97A','#5CB8F0','#B98CF0'],canopy:['#FF9A3C','#F25C54','#F5B82E','#E07A2E','#9CC23A'],ocean:['#C9A7FF','#FF9AD5','#7FDBFF','#B388FF','#9DB4FF'],bows:['#FF7EB6','#B98CF0','#FF9CC8','#FF5C8A','#7FC8FF'],boba:['#4A2C1E'],birds:['#F2A54A','#D9772B','#9CC23A','#7FC8FF','#F8DFB8']};
const CUR_ICON={
  lagoon:'<svg class="ic" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8" fill="#F4EEF8" stroke="#C9BCD9" stroke-width="1.4"/><circle cx="7.4" cy="7" r="2.4" fill="#fff"/></svg>',
  candy:'<svg class="ic" viewBox="0 0 20 20" aria-hidden="true"><rect x="7" y="1" width="6" height="18" rx="3" fill="#FF5C8A" transform="rotate(30 10 10)"/></svg>',
  canopy:'<svg class="ic" viewBox="0 0 20 20" aria-hidden="true"><path d="M3 17C3 7 9 2 18 2C18 11 13 17 3 17Z" fill="#5FAF5A"/><path d="M3 17L13 7" stroke="#2E7D3A" stroke-width="1.5"/></svg>',
  ocean:'<svg class="ic" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8" fill="#E4D4FF" stroke="#9C7BFF" stroke-width="1.6"/><circle cx="7" cy="7" r="2.2" fill="#fff"/></svg>',
  bows:'<svg class="ic" viewBox="0 0 20 20" aria-hidden="true"><path d="M10 10L2 4V16Z M10 10L18 4V16Z" fill="#FF7EB6"/><circle cx="10" cy="10" r="2.6" fill="#E0559A"/></svg>',
  boba:'<svg class="ic" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8" fill="#3B2418"/><circle cx="7.2" cy="7" r="2.2" fill="#9A7A6A"/></svg>',
  birds:'<svg class="ic" viewBox="0 0 20 20" aria-hidden="true"><path d="M16 3C9 3 4 9 3 17c6-1 11-6 13-14z" fill="#D9772B"/><path d="M3 17L14 5" stroke="#B5541A" stroke-width="1.4"/></svg>'};
const starSvg=on=>`<svg viewBox="0 0 24 24" class="st${on?' on':''}" aria-hidden="true"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8z"/></svg>`;
const heartSvg='<svg viewBox="0 0 24 22" class="heart" aria-hidden="true"><path d="M12 21s-9-5.6-9-12.2C3 5.4 5.5 3 8.4 3c1.6 0 2.9.8 3.6 2 .7-1.2 2-2 3.6-2C18.5 3 21 5.4 21 8.8 21 15.4 12 21 12 21z" fill="#FF5C8A" stroke="#fff" stroke-width="1.5"/></svg>';
const curName=k=>WORLDS[k].cur;
const cap=s=>s.charAt(0).toUpperCase()+s.slice(1);
const L_MAX=30;
const HINT_RUN='← → to change lanes · swipe or tap left and right on a touch screen · P to pause';
const HINT_BOSS='1-4 or arrows + Enter to answer · tap a button on a touch screen · P to pause';

/* ---------- sound ---------- */
const Snd={ctx:null,on:true,musicOn:true,timer:null,mode:'calm',bpm:108,
  init(){try{if(!this.ctx){const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;this.ctx=new AC();this.out=this.ctx.createGain();this.out.gain.value=.55;const comp=this.ctx.createDynamicsCompressor();this.out.connect(comp);comp.connect(this.ctx.destination);this.mus=this.ctx.createGain();this.mus.gain.value=.16;this.mus.connect(this.out)}if(this.ctx.state==='suspended')this.ctx.resume()}catch(e){}},
  f(m){return 440*Math.pow(2,(m-69)/12)},
  tone(freq,dur,o={}){const c=this.ctx;if(!c)return;const dest=o.dest||this.out;if(dest===this.out&&!this.on)return;
    const when=o.when!=null?o.when:c.currentTime+(o.delay||0);const osc=c.createOscillator(),g=c.createGain();osc.type=o.type||'sine';osc.frequency.setValueAtTime(freq,when);
    if(o.slide)osc.frequency.exponentialRampToValueAtTime(Math.max(30,o.slide),when+dur);
    const v=o.vol!=null?o.vol:.25;g.gain.setValueAtTime(.0001,when);g.gain.exponentialRampToValueAtTime(v,when+(o.attack||.008));g.gain.exponentialRampToValueAtTime(.0001,when+dur);
    osc.connect(g);if(o.lp){const fl=c.createBiquadFilter();fl.type='lowpass';fl.frequency.value=o.lp;g.connect(fl);fl.connect(dest)}else g.connect(dest);
    osc.start(when);osc.stop(when+dur+.05)},
  noise(dur,o={}){const c=this.ctx;if(!c||!this.on)return;const n=Math.floor(c.sampleRate*dur);const b=c.createBuffer(1,n,c.sampleRate);const d=b.getChannelData(0);for(let i=0;i<n;i++)d[i]=(Math.random()*2-1)*(1-i/n);
    const s=c.createBufferSource();s.buffer=b;const fl=c.createBiquadFilter();fl.type='lowpass';fl.frequency.value=o.lp||2000;const g=c.createGain();g.gain.value=o.vol||.2;s.connect(fl);fl.connect(g);g.connect(this.out);s.start(c.currentTime+(o.delay||0))},
  click(){this.tone(660,.06,{type:'triangle',vol:.1})},
  swish(){this.noise(.12,{vol:.1,lp:1800});this.tone(400,.1,{type:'triangle',vol:.05,slide:700})},
  shoot(){this.tone(520,.14,{vol:.16,slide:1300});this.tone(900,.06,{type:'triangle',vol:.05,delay:.02})},
  pop(combo){this.noise(.07,{vol:.25,lp:4500});const sc=[0,2,4,7,9,12,14,16,19,21,24];const r=67+sc[Math.min(Math.max(combo,1)-1,10)];[0,4,7,12].forEach((d,i)=>this.tone(this.f(r+d),.17,{type:'triangle',vol:.18,delay:i*.055}))},
  wrong(){this.tone(196,.34,{type:'sawtooth',vol:.14,slide:98,lp:900});this.tone(207,.34,{type:'square',vol:.06,slide:104,lp:700});this.noise(.14,{vol:.12,lp:600})},
  tick(){this.tone(1200,.03,{type:'square',vol:.04,lp:3000})},
  glow(){[72,76,79,84,88,91,96].forEach((m,i)=>this.tone(this.f(m),.14,{type:'triangle',vol:.15,delay:i*.05}))},
  siren(){for(let i=0;i<5;i++)this.tone(i%2?330:440,.28,{type:'sawtooth',vol:.07,lp:1400,delay:i*.3})},
  bossHit(){this.noise(.4,{vol:.4,lp:800});this.tone(130,.45,{vol:.4,slide:45})},
  crit(){this.noise(.5,{vol:.45,lp:1200});this.tone(110,.5,{vol:.4,slide:40});[84,91,96].forEach((m,i)=>this.tone(this.f(m),.12,{type:'square',vol:.07,delay:.05+i*.06,lp:3000}))},
  special(){for(let i=0;i<6;i++)this.tone(300+i*120,.12,{vol:.12,slide:1600,delay:i*.09});this.noise(.6,{vol:.3,lp:1500,delay:.5})},
  thunder(){this.noise(.9,{vol:.5,lp:400});this.tone(90,.8,{type:'sawtooth',vol:.14,slide:35,lp:500});this.tone(1800,.08,{type:'square',vol:.06,lp:4000})},
  win(){[[72,0,.14],[76,.12,.14],[79,.24,.14],[84,.36,.3],[79,.62,.12],[84,.74,.7]].forEach(([m,d,l])=>{this.tone(this.f(m),l,{type:'triangle',vol:.2,delay:d});this.tone(this.f(m-12),l,{vol:.1,delay:d})})},
  lose(){[[67,0,.3],[66,.32,.3],[65,.64,.3],[64,.96,.9]].forEach(([m,d,l])=>this.tone(this.f(m),l,{type:'triangle',vol:.18,delay:d}))},
  coin(){this.tone(988,.09,{type:'square',vol:.07});this.tone(1319,.32,{type:'square',vol:.07,delay:.08})},
  star(i){this.tone(this.f(79+i*5),.35,{type:'triangle',vol:.2});this.tone(this.f(91+i*5),.25,{vol:.08})},
  startMusic(mode){this.mode=mode;this.bpm=mode==='boss'?126:112;if(!this.ctx||this.timer)return;this.step=0;this.next=this.ctx.currentTime+.08;this.timer=setInterval(()=>this.sched(),60)},
  stopMusic(){clearInterval(this.timer);this.timer=null},
  sched(){const c=this.ctx;if(!c)return;while(this.next<c.currentTime+.25){this.play(this.step,this.next);this.next+=60/this.bpm/2;this.step++}},
  play(i,t){if(!this.musicOn)return;const boss=this.mode==='boss';
    const prog=boss?[[57,60,64],[53,57,60],[55,59,62],[56,59,64]]:[[60,64,67],[57,60,64],[53,57,60],[55,59,62]];
    const ch=prog[Math.floor(i/8)%4],s=i%8;
    if(s===0||s===4||(boss&&s%2===0))this.tone(this.f(ch[0]-24),.32,{type:'triangle',vol:.5,when:t,dest:this.mus});
    const pat=[0,1,2,1,2,1,0,2];this.tone(this.f(ch[pat[s]]+12),.16,{type:boss?'square':'sine',vol:boss?.1:.22,when:t,dest:this.mus,lp:boss?1600:0});
    if(!boss&&s===6&&Math.random()<.5)this.tone(this.f(ch[2]+24),.3,{vol:.12,when:t,dest:this.mus})}
};
const Voice={on:true,say(t){if(!this.on)return;const s=window.speechSynthesis;if(!s)return;try{s.cancel();const u=new SpeechSynthesisUtterance(t);u.rate=.95;u.pitch=1.15;s.speak(u)}catch(e){}}};

/* ---------- worlds ---------- */
let DISP='Fredoka';
/* the world's scene, drawn by the Spelling Worlds scene functions; each level reveals more of it */
function buildScene(){const k=world();let seed={lagoon:7,candy:11,canopy:5,ocean:13,bows:17,boba:19,birds:23}[k]||7;const rnd=()=>{seed=(seed*9301+49297)%233280;return seed/233280};
  const tops={lagoon:lagoonTop,candy:candyTop,canopy:canopyTop,ocean:oceanTop,bows:bowsTop,boba:bobaTop,birds:birdsTop},bots={lagoon:lagoonBottom,candy:candyBottom,canopy:canopyBottom,ocean:oceanBottom,bows:bowsBottom,boba:bobaBottom,birds:birdsBottom};
  return '<svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMax slice" aria-hidden="true">'+tops[k](rnd)+bots[k](rnd)+extraScene(rnd)+'</svg><div class="flash"></div>'}
function charSVG(id,mood){const d=DRAW[id](K_INK);return '<svg class="axo" viewBox="-15 -15 290 270" data-mood="'+(mood||'neutral')+'" aria-hidden="true">'+d.back+d.main+'</svg>'}
function charName(k,id){const L=charListFor(k);for(const c of L)if(c[0]===id)return c[1];return L[0][1]}
function setSceneLevel(root,lv){root.querySelectorAll('[data-lv]').forEach(e=>e.classList.toggle('on',+e.getAttribute('data-lv')<=lv))}
function ambient(){const b=$('#bubbles');b.innerHTML='';for(let i=0;i<14;i++){const s=document.createElement('span');const z=8+Math.random()*22;
  s.style.cssText=`left:${(Math.random()*100).toFixed(1)}%;width:${z.toFixed(0)}px;height:${z.toFixed(0)}px;animation-duration:${(10+Math.random()*12).toFixed(1)}s;animation-delay:-${(Math.random()*20).toFixed(1)}s;--c:${RAINBOW[i%6]}`;b.append(s)}}
let shownWorld=null;
function applyWorld(k,lv){CUR_WORLD=k;document.documentElement.setAttribute('data-world',k);
  if(shownWorld!==k){shownWorld=k;$('#pageScene').innerHTML=buildScene();ambient()}
  setSceneLevel($('#pageScene'),lv||1);
  DISP=(getComputedStyle(document.documentElement).getPropertyValue('--display')||'Fredoka').trim()||'Fredoka'}
function cfont(size){return `700 ${Math.round(size)}px ${DISP}, Nunito, sans-serif`}
function cssVar(name,fallback){const v=getComputedStyle(document.documentElement).getPropertyValue(name).trim();return v||fallback}

/* ---------- saves (online only) ---------- */
let screen='menu';
let db=null,ready=false,saveMode='loading',saveQ=Promise.resolve();
const saves={};let player=null;
function blank(){return {cur:0,stars:{},best:{},facts:{},skill:{},bossLv:{},owned:[],char:{},look:null,games:0,showdown:{wins:0,played:0}}}
function normalize(d){const o=JSON.parse(JSON.stringify(d||{}));const b=Object.assign(blank(),o);
  b.cur=Math.max(0,(o.cur!=null?o.cur:o.pearls)|0);b.stars=o.stars||{};b.best=o.best||{};b.facts=o.facts||{};b.skill=o.skill||{};b.bossLv=o.bossLv||{};
  b.showdown=Object.assign({wins:0,played:0},o.showdown||{});delete b.speed;
  b.owned=Array.isArray(o.owned)?o.owned.filter(x=>typeof x==='string'&&x.includes(':')):[];b.char=(o.char&&typeof o.char==='object')?o.char:{};
  b.look=WORLDS[o.look]?o.look:null;delete b.pearls;delete b.color;delete b.hat;delete b.hats;return b}
function P(){return saves[player]||(saves[player]=blank())}
function PF(id){return saves[id]||(saves[id]=blank())}
function kid(id){return KIDS.find(k=>k.id===id)||KIDS[0]}
function lookOf(id){const p=saves[id];return p&&p.look&&WORLDS[p.look]?p.look:kid(id).theme}
function owns(p,k,id){const L=charListFor(k);return L[0][0]===id||p.owned.includes(k+':'+id)}
function charOf(p,k){const L=charListFor(k);const id=p&&p.char&&p.char[k];return id&&L.some(c=>c[0]===id)&&owns(p,k,id)?id:L[0][0]}
function totalStars(p){let s=0;if(p)for(const x in p.stars)s+=p.stars[x]|0;return s}
function sceneLevel(p){return clamp(1+Math.floor(totalStars(p)/3),1,10)}
/* the save service: the Times Table Worlds Worker when the page sets window.TT_CLOUD (GitHub Pages), otherwise the
   artifact's db on claude.ai. Progress lives only there; nothing is ever kept in the browser. Each save names the
   revision it started from plus the copy it started from (base), so the service merges saves from two devices itself. */
const CLOUD=(typeof window.TT_CLOUD==='string')?window.TT_CLOUD:null;
const Net=(()=>{
  const REV={},BASE={},DIRTY={},SENDING={},TIMERS={};let LOADED=false,fails=0,retryT=null,warned=false;
  const snap=o=>JSON.parse(JSON.stringify(o));
  async function call(method,path,body){const o={method,cache:'no-store'};if(body){o.body=JSON.stringify(body);o.headers={'Content-Type':'text/plain'};o.keepalive=o.body.length<60000}
    const r=await fetch(CLOUD+path,o);if(r.status!==200)throw new Error('HTTP '+r.status);return r.json()}
  function adopt(id,rev,state){REV[id]=rev;if(state){saves[id]=normalize(state);BASE[id]=snap(saves[id])}else{delete saves[id];BASE[id]=null}
    if(screen==='menu')renderMenu();else if(screen==='hub'&&player===id)renderHub()}
  function failed(){fails++;clearTimeout(retryT);retryT=setTimeout(retry,Math.min(30000,3000*fails));
    if(!LOADED)setReady('error');else if(!warned){warned=true;toast('Can’t reach the save server. Progress is not saved until it reconnects.')}}
  function retry(){if(!LOADED)return refresh();let any=false;for(const id in DIRTY)if(DIRTY[id]){any=true;push(id)}if(!any)refresh()}
  async function refresh(){if(!CLOUD)return;try{const r=await call('GET','/saves');fails=0;warned=false;const ps=r.players||{};
      for(const k of KIDS){const id=k.id;if(SENDING[id]||DIRTY[id]||TIMERS[id])continue;const x=ps[id];
        if(!x){if(REV[id]==null){REV[id]=0;BASE[id]=null}continue}if(REV[id]!==x.rev)adopt(id,x.rev,x.state)}
      if(!LOADED){LOADED=true;setReady('on')}else if(screen==='menu')renderMenu()}catch(e){failed()}}
  async function push(id){clearTimeout(TIMERS[id]);TIMERS[id]=null;if(SENDING[id]||!saves[id])return;
    const st=snap(saves[id]);st.updated=Date.now();const body={rev:REV[id]||0,state:st,base:BASE[id]||blank()};SENDING[id]=true;DIRTY[id]=false;
    try{const r=await call('POST','/saves/'+encodeURIComponent(id),body);SENDING[id]=false;fails=0;warned=false;
      if(r.conflict)adopt(id,r.rev,r.state);
      else{REV[id]=r.rev;if(r.state){const was=DIRTY[id];adopt(id,r.rev,r.state);DIRTY[id]=was}else BASE[id]=st}
      if(DIRTY[id])push(id)}
    catch(e){SENDING[id]=false;DIRTY[id]=true;failed()}}
  function schedule(id){if(!id||!saves[id])return;DIRTY[id]=true;clearTimeout(TIMERS[id]);TIMERS[id]=setTimeout(()=>push(id),400)}
  function flush(){for(const id in TIMERS)if(TIMERS[id])push(id)}
  document.addEventListener('visibilitychange',()=>{if(!CLOUD)return;if(document.hidden)flush();else if(LOADED)refresh()});
  window.addEventListener('pagehide',()=>{if(CLOUD)flush()});
  window.addEventListener('online',()=>{if(CLOUD)retry()});
  return {refresh,schedule,retry,idle:()=>{for(const id in SENDING)if(SENDING[id])return false;for(const id in TIMERS)if(TIMERS[id])return false;return true},rev:id=>REV[id]||0}
})();
function persistFor(id){if(!id)return;
  if(db){const body=JSON.parse(JSON.stringify(PF(id)));body.updated=Date.now();saveQ=saveQ.then(()=>db.doc('players/'+id).set(body)).catch(()=>toast('Couldn’t save just now. Check the connection.'))}
  else if(CLOUD)Net.schedule(id)}
function persist(){persistFor(player)}
function renderSaveNote(){const n=$('#saveNote');
  n.textContent=saveMode==='loading'?'Loading saves…':saveMode==='on'?'Stars, treats and characters save online for every player.':saveMode==='error'?'Can’t reach the save server. Check the connection and try again.':'Saving is off in this view, so stars and treats won’t be kept. Open the game on claude.ai while signed in to save.';
  $('#saveRetry').hidden=saveMode!=='error'}
function setReady(mode){saveMode=mode;ready=mode==='on'||mode==='off';renderSaveNote();if(screen==='menu')renderMenu()}
$('#saveRetry').onclick=()=>{Snd.init();Snd.click();saveMode='loading';renderSaveNote();Net.retry()};
(async()=>{
  if(CLOUD){Net.refresh();return}
  let d=null;try{d=window.claude&&window.claude.use?await window.claude.use('db'):null}catch(e){d=null}
  if(!d){setReady('off');return}
  db=d;let gotAny=false;
  const fallback=setTimeout(()=>{if(!ready){if(gotAny)setReady('on');else{db=null;setReady('off')}}},10000);
  try{
    db.collection('players').onSnapshot(snap=>{
      gotAny=true;
      snap.docs.forEach(doc=>{if(KIDS.some(k=>k.id===doc.id)&&doc.exists)saves[doc.id]=normalize(doc.data())});
      if(!snap.metadata.fromCache&&!ready){clearTimeout(fallback);setReady('on')}
      if(screen==='menu')renderMenu();else if(screen==='hub')renderHub();
    },()=>{clearTimeout(fallback);db=null;setReady('off')});
  }catch(e){clearTimeout(fallback);db=null;setReady('off')}
})();

/* ---------- screens ---------- */
function show(id){document.querySelectorAll('.screen').forEach(s=>s.hidden=s.id!==id);screen=id;$('#pageScene').hidden=id==='game';window.scrollTo(0,0)}
let toastT=null;
function toast(msg){document.querySelectorAll('.toast2').forEach(t=>t.remove());const t=document.createElement('div');t.className='toast2';t.textContent=msg;document.body.append(t);clearTimeout(toastT);toastT=setTimeout(()=>t.remove(),2400)}

function renderMenu(){applyWorld('lagoon',3);const box=$('#kids');box.innerHTML='';
  KIDS.forEach(k=>{const p=saves[k.id],w=lookOf(k.id);
    const b=document.createElement('button');b.type='button';b.className='profile-card';b.disabled=!ready;b.style.background=WGRAD[w];
    b.innerHTML=`${charSVG(charOf(p,w))}<span class="pc-name">${k.name}</span><span class="pc-world">${WNAME[w]}</span><span class="pc-meta"><span>${starSvg(true)} ${totalStars(p)}</span><span>${CUR_ICON[w]} ${p?p.cur:0}</span></span>`;
    b.onclick=()=>{Snd.init();Snd.click();player=k.id;openHub()};box.append(b)})}

function openHub(){show('hub');renderHub();const k=lookOf(player);
  const lines=[`Let's race!`,`Every 3 stars grows the ${WNAME[k].toLowerCase()}!`,`Ready, ${kid(player).name}? Pick a table!`,`Fast answers hit the boss harder!`,`3 in a row charges your special move!`,`Grab the ${curName(k)} between the gates!`];
  const b=$('#hubLine');b.textContent=pickOne(lines);b.classList.remove('pop');void b.offsetWidth;b.classList.add('pop')}
function bossLvOf(p,key){return clamp(p.bossLv[key]|0,1,9)||1}
function tableBtn(n,sub,onclick){const b=document.createElement('button');b.type='button';b.className='tbl';
  b.innerHTML=`<span class="tbl-n">${n}<small>×</small></span>${sub}`;b.onclick=onclick;return b}
function renderHub(){const p=P(),k=lookOf(player),lv=sceneLevel(p),ts=totalStars(p);applyWorld(k,lv);
  $('#hubBrand').textContent=WORLDS[k].brand.replace('Spelling','Times Table');
  $('#statCur').innerHTML=`${CUR_ICON[k]} ${p.cur}`;$('#statStars').innerHTML=`${starSvg(true)} ${ts}`;
  const ch=charOf(p,k);$('#hubHero').innerHTML=charSVG(ch,'happy');$('#hubName').textContent=`${kid(player).name} & ${charName(k,ch)}`;
  $('#lvTitle').textContent=`${WNAME[k]} level ${lv}`;
  if(lv<10){const need=3*lv;$('#lvBar').style.width=clamp((ts-3*(lv-1))/3*100,0,100)+'%';$('#lvNext').textContent=`Next: ${WORLDS[k].levels[lv].l} at ${need} stars`}
  else{$('#lvBar').style.width='100%';$('#lvNext').textContent='Your world is complete!'}
  const tb=$('#tables');tb.innerHTML='';
  for(let n=1;n<=TOP;n++){const st=p.stars[n]|0,best=p.best[n]|0,bl=bossLvOf(p,n);
    const b=tableBtn(n,`<span>${[0,1,2].map(i=>starSvg(i<st)).join('')}</span><span class="tbl-best">${best?`Boss ${bl} · Top ${best.toLocaleString()}`:'New!'}</span>`,()=>startRound(n));
    b.setAttribute('aria-label',`The ${n} times table, ${st} stars, boss level ${bl}`);tb.append(b)}
  const ms=p.stars.mix|0,mb=p.best.mix|0;$('#mixBest').innerHTML=`1s to 9s ${[0,1,2].map(i=>starSvg(i<ms)).join('')}${mb?` · Boss ${bossLvOf(p,'mix')} · Top ${mb.toLocaleString()}`:''}`;
  $('#charsTitle').textContent=`${WNAME[k]} characters`;
  const cb=$('#chars');cb.innerHTML='';
  charListFor(k).forEach((c,i)=>{const id=c[0],own=owns(p,k,id),on=id===ch,cost=CHAR_COST[i]||300;
    const d=document.createElement('div');d.className='ch'+(on?' on':'');d.innerHTML=`${charSVG(id,on?'happy':'neutral')}<span class="ch-name">${c[1]}</span>`;
    const btn=document.createElement('button');btn.type='button';btn.className='btn btn-sm '+(own?'btn-good':'');
    if(on){btn.textContent='Playing';btn.disabled=true}else if(own){btn.textContent='Play as'}else{btn.innerHTML=`${CUR_ICON[k]} ${cost}`;if(p.cur<cost){btn.disabled=true;btn.title=`${cost-p.cur} more ${curName(k)} needed`}}
    btn.onclick=()=>pickChar(k,id,cost);d.append(btn);cb.append(d)});
  const wb=$('#worlds');wb.innerHTML='';
  WK.forEach(w=>{const b=document.createElement('button');b.type='button';b.className='wp'+(w===k?' on':'');b.style.background=WGRAD[w];
    b.innerHTML=`<span class="wp-name">${WNAME[w]}</span>${w===kid(player).theme?'<br>home':''}`;b.onclick=()=>{Snd.click();P().look=w;persist();renderHub()};wb.append(b)});
}
function pickChar(k,id,cost){const p=P();
  if(!owns(p,k,id)){if(p.cur<cost)return;p.cur-=cost;p.owned.push(k+':'+id);Snd.coin();toast(`${charName(k,id)} joined the ${WNAME[k].toLowerCase()}!`);fxBurst(innerWidth/2,innerHeight*.4,70)}else Snd.click();
  p.char[k]=id;persist();renderHub()}

$('#switchBtn').onclick=()=>{Snd.click();show('menu');renderMenu()};
$('#mixBtn').onclick=()=>startRound('mix');
function tog(id,get,set){const b=$(id);b.onclick=()=>{Snd.init();set(!get());b.setAttribute('aria-pressed',String(get()));Snd.click()}}
tog('#tSound',()=>Snd.on,v=>Snd.on=v);
tog('#tMusic',()=>Snd.musicOn,v=>Snd.musicOn=v);
tog('#tVoice',()=>Voice.on,v=>{Voice.on=v;if(!v&&window.speechSynthesis)speechSynthesis.cancel()});

/* ---------- facts shared by every mode ---------- */
function factKey(f){return Math.min(f.a,f.b)+'x'+Math.max(f.a,f.b)}
function makeQ(f){const flip=Math.random()<.5;return {f,x:flip?f.b:f.a,y:flip?f.a:f.b,ans:f.a*f.b,key:factKey(f)}}
function choices(a,b,n){const ans=a*b;const rev=+String(ans).split('').reverse().join('');
  const pool=shuffle([a*(b+1),a*(b-1),(a+1)*b,(a-1)*b,ans+a,ans-a,ans+b,ans-b,ans+1,ans-1,ans+2,ans-2,ans+10,ans-10,rev]);
  const out=[ans];for(const v of pool){if(out.length>=n)break;if(v>0&&v<=170&&!out.includes(v))out.push(v)}
  while(out.length<n){const v=1+ri(144);if(!out.includes(v))out.push(v)}return shuffle(out)}
/* facts stay within 1x1 to 9x9 (Yan, 10/5/2026: the 10s to 12s made it too hard) */
const TOP=9;
function poolFor(mode){const pool=[];if(mode==='mix'){for(let a=1;a<=TOP;a++)for(let b=a;b<=TOP;b++)pool.push({a,b})}else for(let b=1;b<=TOP;b++)pool.push({a:mode,b});return pool}
function mixDeck(p,all){const out=[];const wts=all.map(f=>{const s=p.facts[factKey(f)];return s?clamp(1+2*s.w-.3*s.r,.4,6):1.2});
  const picked=new Set();while(out.length<15){let tot=0;all.forEach((f,i)=>{if(!picked.has(i))tot+=wts[i]});let r=Math.random()*tot;
    for(let i=0;i<all.length;i++){if(picked.has(i))continue;r-=wts[i];if(r<=0){picked.add(i);out.push(all[i]);break}}}return out}
/* S is any state with mode, pool, bag, missed and q */
function pickFact(S,p){const prev=S.q&&S.q.key;
  for(let i=0;i<S.missed.length;i++)if(factKey(S.missed[i])!==prev&&Math.random()<.6)return S.missed.splice(i,1)[0];
  for(let k=0;k<20;k++){if(!S.bag.length)S.bag=S.mode==='mix'?mixDeck(p,S.pool):shuffle(S.pool.slice());const f=S.bag.pop();if(factKey(f)!==prev||S.pool.length<2)return f}
  return S.pool[ri(S.pool.length)]}
function eqHTML(q){return `${q.x} <span class="x">×</span> ${q.y} = <b class="ans">?</b>`}
function eqDone(q){return `${q.x} <span class="x">×</span> ${q.y} = <b class="ans">${q.ans}</b>`}
function bannerOn(el,text,sub){el.innerHTML=`<span>${text}</span>${sub?`<br><small>${sub}</small>`:''}`;el.classList.remove('show');void el.offsetWidth;el.classList.add('show')}

/* ---------- the run, then the boss ---------- */
const cv=$('#cv'),cx=cv.getContext('2d'),stage=$('#stage'),heroPos=$('#heroPos'),heroBox=$('#heroBox');
let G=null,W=800,H=600,heroW=110,heroH=102,lastMode=7,moodT=null;
/* the boss ladder: each win on a table raises its boss level; every two levels the cloud grows angrier */
const BOSSES=[{name:'Grumpy Storm Cloud',col:'#A3A8CF',dark:'#7C82AE',s:1},{name:'Thunder Cloud',col:'#8E90C4',dark:'#5E6098',s:1.1,bolt:true},{name:'Hurricane Cloud',col:'#7A84BE',dark:'#4A5288',s:1.2,bolt:true,swirl:true},{name:'Storm King',col:'#6670AE',dark:'#383F72',s:1.3,bolt:true,swirl:true,crown:true}];
function bossInfo(lv){return BOSSES[Math.min(BOSSES.length-1,Math.floor((lv-1)/2))]}
function bossHP(lv){return 100+25*(lv-1)}
function askTime(lv){return clamp(10-(lv-1)*.6,5,10)}
function gateTime(L){return clamp(5.5*Math.pow(.93,L-1),2.2,5.5)}

function sizeStage(){const r=stage.getBoundingClientRect();W=Math.max(280,r.width);H=Math.max(260,r.height);const d=DPR();
  cv.width=Math.round(W*d);cv.height=Math.round(H*d);cv.style.width=W+'px';cv.style.height=H+'px';cx.setTransform(d,0,0,d,0,0);
  heroW=heroPos.getBoundingClientRect().width||110;heroH=heroW*270/290;
  if(G){const ph=W<560;G.vp={x:W/2,y:H*.3};G.laneGap=clamp(W*.3,90,240);G.nearY=H-4-heroH*.5;G.tokR=clamp(W*.05,28,46);
    G.hx=ph?Math.max(heroW/2+6,W*.2):W*.22;G.hy=G.nearY;G.bs=clamp(Math.min(W/720,H/460),.5,1.15);
    G.boss.hx=ph?W*.7:W*.72;G.boss.hy=ph?Math.max(96*G.bs+20,H*.34):Math.max(100*G.bs+30,H*.4)}}
function laneX(l){return W/2+(l-1)*G.laneGap}
function proj(lane,t){const s=.15+.85*Math.pow(1-t,1.6);return {x:G.vp.x+(laneX(lane)-G.vp.x)*s,y:G.vp.y+(G.nearY-G.vp.y)*s,s}}
function heroSvg(){return heroBox.querySelector('svg')}
function setMood(m,ms){const s=heroSvg();if(!s)return;s.setAttribute('data-mood',m);clearTimeout(moodT);moodT=setTimeout(()=>{const s2=heroSvg();if(s2)s2.setAttribute('data-mood','neutral')},ms||900)}
function heroAnim(cls){heroBox.classList.remove('jump','shake','lunge');void heroBox.offsetWidth;heroBox.classList.add(cls)}

function startRound(mode){Snd.init();Snd.click();lastMode=mode;const p=P(),k=lookOf(player),key=String(mode),lv=bossLvOf(p,key),bi=bossInfo(lv);
  applyWorld(k,sceneLevel(p));show('game');$('#pauseMenu').hidden=true;
  const sc=$('#stageScene');sc.innerHTML=buildScene();setSceneLevel(sc,sceneLevel(p));
  heroBox.innerHTML=charSVG(charOf(p,k));heroBox.classList.remove('glowing');
  G={mode,world:k,key,stage:'run',t:0,phase:'intro',phaseAt:2.6,goShown:false,q:null,opts:[],pool:poolFor(mode),bag:[],missed:[],focus:-1,
    cols:{road:cssVar('--bg-deep','#9BDCE0'),line:cssVar('--accent','#E8809B')},
    gate:null,gatesDone:0,gatesTotal:mode==='mix'?12:TOP,treats:[],collected:0,dist:0,L:3,warm:3,peakL:3,nextGateAt:-1,
    boss:Object.assign({lv,hp:bossHP(lv),max:bossHP(lv),x:0,y:0,hx:0,hy:0,hitT:0,lunge:0,dead:false,alpha:1,rise:0,angry:0},bi),
    hearts:5,score:0,streak:0,bestStreak:0,asked:0,right:0,log:[],charged:false,glowT:0,timer:0,timeMax:askTime(lv),lastTick:99,
    shots:[],bolts:[],parts:[],floats:[],rings:[],shake:0,flash:0,flashCol:'255,255,255',inv:0,bonus:0,crits:0,specials:0,
    top:p.best[key]|0,topBeaten:false,finished:false,endAt:0,hx:0,hy:0,bs:1,ax:{lane:1,x:0,vx:0},vp:{x:0,y:0},laneGap:120,nearY:0,tokR:40,paused:false};
  const saved=(p.skill&&p.skill[key])||2;G.L=Math.max(2,saved-2);G.warm=Math.max(2,saved);G.peakL=G.L;
  sizeStage();G.ax.x=laneX(1);G.boss.x=G.boss.hx;G.boss.y=-160;
  $('#hearts').innerHTML=heartSvg.repeat(5);
  $('#answers').hidden=true;$('#timerBar').hidden=true;$('#lanePad').hidden=false;$('#gameHint').textContent=HINT_RUN;
  const eq=$('#eq');eq.className='eq';eq.textContent=mode==='mix'?'Mixed Mayhem':`The ${mode}s`;
  renderAnswers();setTimer(1);updateHUD();Snd.startMusic('calm');
  banner('Ready?','Steer into the right answer');
  Voice.say(mode==='mix'?'Mixed mayhem! Get ready to race!':`The ${mode} times table! Get ready to race!`);
}
function mult(){return 1+Math.min(4,Math.floor(G.streak/3))}
function adapt(d,why){const before=Math.floor(G.L);
  if(d>0&&G.L<G.warm)d*=2.2; // catching back up to this player's usual speed
  G.L=clamp(G.L+d,1,L_MAX);G.peakL=Math.max(G.peakL,G.L);const after=Math.floor(G.L);
  if(after>before){float('Speed up!',W/2,H*.5,'#ffffff',24);Snd.tone(1175,.12,{type:'triangle',vol:.08})}
  else if(why==='slow'&&after<before)float('Slowing down a little',W/2,H*.5,'#ffffff',22);
  updateHUD()}
function checkTop(){if(G.topBeaten||G.top<=0||G.score<=G.top)return;G.topBeaten=true;banner('New top score!','Keep going!');Snd.glow();confetti(80);updateHUD()}
function banner(text,sub){bannerOn($('#banner'),text,sub)}
function updateHUD(){if(!G)return;$('#score').textContent=G.score.toLocaleString();
  const cb=$('#combo');cb.className='combo'+(G.charged?' charged':'');
  cb.textContent=G.charged?'Special ready!':G.glowT>0?`Glow · ${G.streak} in a row`:G.streak>=2?`${G.streak} in a row · ×${mult()}`:'';
  if(G.stage==='run'){$('#stageLbl').textContent=`Gate ${Math.min(G.gatesDone+1,G.gatesTotal)} of ${G.gatesTotal} · Speed ${Math.floor(G.L)}`;$('#progBar').style.width=(G.gatesDone/G.gatesTotal*100)+'%'}
  else{$('#stageLbl').textContent=`Boss Lv ${G.boss.lv}`;$('#progBar').style.width='100%'}
  const tl=$('#topLbl');tl.className='hud-small'+(G.topBeaten?' beat':'');tl.textContent=G.topBeaten?'New top score!':G.top?`Top ${G.top.toLocaleString()}`:'First game!';
  heroBox.classList.toggle('glowing',G.charged||G.glowT>0);
  document.querySelectorAll('#hearts .heart').forEach((h,i)=>h.classList.toggle('lost',i>=G.hearts))}
function float(text,x,y,col,size){G.floats.push({text,x:clamp(x,80,W-80),y:Math.max(y,W<620?185:120),col,size,life:1.4})}
function burst(x,y,n){const cols=WORLDS[G.world].confetti;for(let i=0;i<n;i++){const a=rand(0,TAU),sp=rand(80,360);G.parts.push({x,y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,life:rand(.5,1.1),r:rand(3,7),col:pickOne(cols),star:Math.random()<.45,g:200})}G.rings.push({x,y,r:10,life:.45})}
function puff(x,y){for(let i=0;i<20;i++){const a=rand(0,TAU),sp=rand(30,140);G.parts.push({x,y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,life:rand(.6,1.1),r:rand(6,12),col:['rgba(90,90,110,.7)','rgba(130,130,150,.6)','rgba(70,60,90,.6)'][ri(3)],g:-20})}}
function confetti(n){const cols=WORLDS[G.world].confetti;for(let i=0;i<n;i++)G.parts.push({x:rand(0,W),y:rand(-60,-10),vx:rand(-60,60),vy:rand(60,220),life:rand(2,3.2),r:rand(4,8),col:pickOne(cols),rect:true,rot:rand(0,6),vr:rand(-8,8),g:60})}
function sceneFlash(){const f=stage.querySelector('.flash');if(!f)return;f.classList.remove('on');void f.offsetWidth;f.classList.add('on')}
function sceneParty(ms){const sc=$('#stageScene');sc.classList.add('party');clearTimeout(sceneParty.t);sceneParty.t=setTimeout(()=>sc.classList.remove('party'),ms||3000)}
function heartPop(i){const h=document.querySelectorAll('#hearts .heart')[i];if(h){h.classList.remove('pop');void h.getBoundingClientRect();h.classList.add('pop')}}
function loseHeart(){G.hearts--;heartPop(G.hearts);
  if(G.hearts<=0){G.phase='lost';G.endAt=G.t+3;Snd.stopMusic();Snd.lose();banner('Game over',`Score ${G.score.toLocaleString()}`);Voice.say(G.topBeaten?'Game over. But you got a new top score!':'Game over. Try again!');
    if(G.gate&&G.gate.state==='live')G.gate.state='passed'}}
function endGlow(){G.glowT=0;heroBox.classList.remove('glowing')}
function milestone(){const wd=WORLDS[G.world],m=wd.milestones[G.streak];if(!m)return;G.bonus+=m.b;sceneParty(2000);
  if(G.stage==='run'&&G.streak===5){G.glowT=8;banner(m.t,`Glow Mode · double points · +${m.b} ${wd.cur}`);Snd.glow()}
  else{float(`${m.t} +${m.b} ${wd.cur}`,W/2,H*.2,'#ffffff',26);Snd.glow()}}

/* the run: gates come down the road; steer into the lane with the right answer, grab the treats in between */
function spawnGate(){const q=makeQ(pickFact(G,P()));G.q=q;const opts=choices(q.x,q.y,3);G.asked++;
  G.gate={q,opts,t:1,state:'live',ans:opts.indexOf(q.ans),passLane:-1,fade:1};
  const eq=$('#eq');eq.className='eq wait';eq.innerHTML=eqHTML(q);Voice.say(`${q.x} times ${q.y}`);
  const n=2+ri(2),cols=CCOL[G.world];for(let i=0;i<n;i++)G.treats.push({lane:ri(3),t:.42+i*.18+rand(0,.08),got:false,col:pickOne(cols)});
  updateHUD()}
function passGate(){const g=G.gate,q=g.q,wd=WORLDS[G.world],lane=G.ax.lane,pos=proj(lane,.03);g.state='passed';g.passLane=lane;G.gatesDone++;
  if(lane===g.ans){G.right++;G.streak++;G.bestStreak=Math.max(G.bestStreak,G.streak);G.log.push({key:q.key,ok:true});
    const pts=Math.round((100+10*G.L)*mult()*(G.glowT>0?2:1));G.score+=pts;checkTop();adapt(.3);
    burst(pos.x,pos.y-20,36);sceneFlash();float('+'+pts,pos.x,pos.y-70,'#ffffff',34);float(pickOne(wd.praise),pos.x,pos.y-110,'#ffffff',26);
    Snd.pop(G.streak);setMood('happy',1000);heroAnim('jump');Voice.say(`${q.ans}!`);$('#eq').className='eq ok';$('#eq').innerHTML=eqDone(q);milestone()}
  else{G.streak=0;endGlow();G.log.push({key:q.key,ok:false});G.missed.push(q.f);
    puff(pos.x,pos.y-20);G.shake=12;G.flash=.3;G.flashCol='255,110,110';Snd.wrong();setMood('oops',1500);heroAnim('shake');adapt(-.8,'slow');
    float(`${q.x} × ${q.y} = ${q.ans}`,W/2,H*.42,'#ffffff',38);$('#eq').className='eq miss';$('#eq').innerHTML=eqDone(q);
    loseHeart();if(G.hearts>0)Voice.say(`${pickOne(wd.oops)} ${q.x} times ${q.y} is ${q.ans}`)}
  updateHUD()}
function collect(tr){tr.got=true;G.collected++;G.score+=10;Snd.coin();const pos=proj(tr.lane,.05);burst(pos.x,pos.y-10,10);float('+1',pos.x,pos.y-50,'#ffffff',22)}
function toBoss(){G.phase='toBoss';G.phaseAt=G.t+2.4;G.gate=null;G.treats=[];const b=G.boss;
  if(G.hearts<5){G.hearts++;heartPop(G.hearts-1)}
  banner('Here comes the boss!',`${b.name} · level ${b.lv}`);Snd.siren();Voice.say(`Here comes the ${b.name}!`);updateHUD()}
function updateRun(dt){const T=gateTime(G.L),v=dt/T,ax=G.ax;
  if(G.phase==='intro'){if(!G.goShown&&G.t>=1.3){G.goShown=true;banner('Go!');Snd.glow()}if(G.t>=G.phaseAt){G.phase='run';spawnGate()}}
  if(G.phase==='run'||G.phase==='lost'){G.dist+=v;
    const g=G.gate;
    if(g){if(g.state==='live'){g.t-=v;if(g.t<=.03&&G.phase==='run')passGate()}else{g.fade-=dt*1.6;if(g.fade<=0)G.gate=null}}
    for(const tr of G.treats){tr.t-=v;if(!tr.got&&tr.t<=.06&&tr.lane===ax.lane&&G.phase==='run')collect(tr)}
    G.treats=G.treats.filter(tr=>tr.t>-.05&&!(tr.got&&tr.t<-.02));
    if(G.phase==='run'){if(!G.gate&&G.nextGateAt<0){if(G.gatesDone>=G.gatesTotal)toBoss();else G.nextGateAt=G.t+.45}
      if(G.nextGateAt>0&&G.t>=G.nextGateAt){G.nextGateAt=-1;spawnGate()}}}
  if(G.phase==='toBoss'&&G.t>=G.phaseAt)startBattle();
  const prev=ax.x;ax.x+=(laneX(ax.lane)-ax.x)*Math.min(1,dt*11);ax.vx=(ax.x-prev)/Math.max(dt,.001);
  if(G.glowT>0){G.glowT-=dt;if(Math.random()<.5)G.parts.push({x:ax.x+rand(-heroW*.4,heroW*.4),y:G.nearY+rand(-heroH*.4,heroH*.3),vx:rand(-20,20),vy:rand(-80,-30),life:.8,r:rand(2,4),col:`hsl(${(G.t*200)%360},90%,75%)`,star:true,g:-10});if(G.glowT<=0){endGlow();updateHUD()}}}
function laneMove(d){if(!G||G.paused||G.stage!=='run'||G.phase==='lost'||G.phase==='toBoss')return;const nl=clamp(G.ax.lane+d,0,2);if(nl===G.ax.lane)return;G.ax.lane=nl;Snd.swish()}

/* the boss battle: turn-based, four answers */
function startBattle(){G.stage='battle';G.phase='intro';G.phaseAt=G.t+2;const b=G.boss;endGlow();
  $('#answers').hidden=false;$('#timerBar').hidden=false;$('#lanePad').hidden=true;$('#gameHint').textContent=HINT_BOSS;
  const eq=$('#eq');eq.className='eq boss';eq.textContent=`${b.name} · Lv ${b.lv}`;
  G.opts=[];renderAnswers();setTimer(1);updateHUD();Snd.startMusic('boss');
  banner(`${b.name}!`,`Boss level ${b.lv} · ${b.max} HP`);Voice.say(`${b.name}, level ${b.lv}! Fight!`)}
function ask(){const q=makeQ(pickFact(G,P()));G.q=q;G.opts=choices(q.x,q.y,4);G.focus=-1;G.phase='ask';G.timer=G.timeMax;G.lastTick=99;
  const eq=$('#eq');eq.className='eq wait';eq.innerHTML=eqHTML(q);
  renderAnswers();Voice.say(`${q.x} times ${q.y}`);updateHUD()}
function renderAnswers(){const box=$('#answers');box.innerHTML='';const cols=ACOL[G.world];
  G.opts.forEach((v,i)=>{const b=document.createElement('button');b.type='button';b.className='ans-btn'+(i===G.focus?' focus':'');b.dataset.i=i;b.style.setProperty('--ac',cols[i%cols.length]);
    b.innerHTML=`<small>${i+1}</small>${v}`;b.disabled=G.phase!=='ask';b.onclick=()=>{Snd.init();pick(i)};box.append(b)})}
function markAnswers(picked){document.querySelectorAll('#answers .ans-btn').forEach((b,i)=>{b.disabled=true;b.classList.remove('focus');
  if(G.opts[i]===G.q.ans)b.classList.add('ok');else if(i===picked)b.classList.add('bad');else b.classList.add('dim')})}
function setTimer(frac){const bar=$('#timerBar');bar.firstElementChild.style.width=(frac*100).toFixed(1)+'%';bar.classList.toggle('low',frac<.3)}
function pick(i){if(!G||G.paused||G.stage!=='battle'||G.phase!=='ask')return;const q=G.q,v=G.opts[i];G.asked++;
  if(v===q.ans)attack(i);else strike(i,'wrong')}
function attack(i){const q=G.q,frac=clamp(G.timer/G.timeMax,0,1);
  let dmg=10+Math.round(10*frac);const crit=frac>.65;if(crit){dmg+=5;G.crits++}
  const special=G.charged;if(special){dmg*=2;G.charged=false;G.specials++}
  G.right++;G.streak++;G.bestStreak=Math.max(G.bestStreak,G.streak);G.log.push({key:q.key,ok:true});
  if(!special&&G.streak%3===0){G.charged=true;Snd.glow();float('Special charged!',G.ax.x,G.hy-heroH*.8,'#ffffff',24)}
  markAnswers(i);$('#eq').className='eq ok';$('#eq').innerHTML=eqDone(q);G.phase='attack';G.pending={dmg,crit,special};
  const sy=G.hy-heroH*.15,n=special?6:1;for(let k=0;k<n;k++)G.shots.push({x:G.ax.x,y:sy,sx:G.ax.x+(k?rand(-20,20):0),sy,p:0,delay:k*.1,special,arc:rand(60,140)*(k%2?1:-1)});
  heroAnim('lunge');setMood('happy',1400);if(special){Snd.special();banner('SPECIAL!',`${charName(G.world,charOf(P(),G.world))}'s big move`)}else Snd.shoot();
  Voice.say(crit?`${q.ans}! Critical hit!`:`${q.ans}!`);milestone();updateHUD()}
function impact(){const pd=G.pending;if(!pd)return;G.pending=null;const b=G.boss;
  b.hp=Math.max(0,b.hp-pd.dmg);b.hitT=.45;b.angry=1;G.shake=pd.special?16:pd.crit?12:8;burst(b.x,b.y,pd.special?70:36);sceneFlash();
  const pts=pd.dmg*10*mult()+(pd.crit?100:0);G.score+=pts;checkTop();
  float(`-${pd.dmg}`,b.x,b.y-90*G.bs*b.s,'#ffffff',44);float(`+${pts}`,b.x,b.y-130*G.bs*b.s,'#ffffff',24);
  if(pd.crit)float('CRITICAL!',b.x,b.y-170*G.bs*b.s,'#FFE24A',32);
  if(pd.special){Snd.crit();G.flash=.4;G.flashCol='255,255,255'}else if(pd.crit)Snd.crit();else Snd.bossHit();
  if(b.hp<=0){b.dead=true;G.phase='won';G.endAt=G.t+3.4;const bonus=500+G.hearts*100;G.score+=bonus;checkTop();Snd.stopMusic();Snd.win();confetti(160);burst(b.x,b.y,80);sceneParty(4000);
    banner(`${b.name} defeated!`,`+${bonus} bonus`);Voice.say(`You beat the ${b.name}!`);$('#eq').className='eq ok';$('#eq').textContent='Victory!'}
  else{G.phase='after';G.phaseAt=G.t+1.1}
  updateHUD()}
function strike(i,why){const q=G.q,wd=WORLDS[G.world];G.streak=0;G.charged=false;G.log.push({key:q.key,ok:false});G.missed.push(q.f);
  markAnswers(i);$('#eq').className='eq miss';$('#eq').innerHTML=eqDone(q);G.phase='hurt';G.boss.lunge=1;G.boltAt=G.t+.45;G.phaseAt=G.t+2.4;
  Snd.wrong();float(why==='time'?'Too slow!':`${G.opts[i]}? Not quite!`,W/2,H*.2,'#ffffff',28);
  Voice.say(why==='time'?`Too slow! ${q.x} times ${q.y} is ${q.ans}`:`${pickOne(wd.oops)} ${q.x} times ${q.y} is ${q.ans}`);updateHUD()}
function bolt(){const b=G.boss;const pts=[];const x1=b.x,y1=b.y+40*G.bs*b.s,x2=G.ax.x,y2=G.hy-heroH*.3;const n=7;
  for(let k=0;k<=n;k++){const t=k/n;pts.push([lerp(x1,x2,t)+(k&&k<n?rand(-28,28):0),lerp(y1,y2,t)+(k&&k<n?rand(-14,14):0)])}
  G.bolts.push({pts,life:.5});Snd.thunder();G.shake=16;G.flash=.45;G.flashCol='255,120,120';puff(G.ax.x,G.hy-heroH*.2);
  setMood('oops',1500);heroAnim('shake');G.inv=1.2;float(`${G.q.x} × ${G.q.y} = ${G.q.ans}`,W/2,H*.42,'#ffffff',40);
  loseHeart();updateHUD()}
function updateBattle(dt){const b=G.boss,ax=G.ax;
  if(G.phase==='intro'&&G.t>=G.phaseAt)ask();
  if(G.phase==='ask'){G.timer-=dt;const frac=G.timer/G.timeMax;setTimer(clamp(frac,0,1));
    if(frac<.3){const s=Math.ceil(G.timer);if(s<G.lastTick){G.lastTick=s;Snd.tick()}}
    if(G.timer<=0){G.timer=0;G.asked++;strike(-1,'time')}}
  if(G.phase==='after'&&G.t>=G.phaseAt)ask();
  if(G.phase==='hurt'){if(G.boltAt>0&&G.t>=G.boltAt){G.boltAt=-1;bolt()}if(G.t>=G.phaseAt&&G.phase==='hurt')ask()}
  if(!b.dead){b.x+=(b.hx-b.x)*Math.min(1,dt*2);b.y+=(b.hy-b.y)*Math.min(1,dt*2.2);b.hitT=Math.max(0,b.hitT-dt);b.angry=Math.max(0,b.angry-dt*.6);
    if(b.lunge>0)b.lunge=Math.max(0,b.lunge-dt*1.4)}
  else{b.rise+=dt;b.y-=60*dt;b.alpha=Math.max(0,b.alpha-dt*.5)}
  const prev=ax.x;ax.x+=(G.hx-ax.x)*Math.min(1,dt*6);ax.vx=(ax.x-prev)/Math.max(dt,.001);
  for(const s of G.shots){if(s.delay>0){s.delay-=dt;continue}s.p=Math.min(1,s.p+dt*(s.special?2.2:2.6));
    const e=s.p*s.p*(3-2*s.p);s.x=lerp(s.sx,b.x,e);s.y=lerp(s.sy,b.y,e)-Math.sin(s.p*Math.PI)*s.arc;
    if(Math.random()<.7)G.parts.push({x:s.x+rand(-3,3),y:s.y+rand(-3,3),vx:rand(-20,20),vy:rand(10,40),life:.35,r:rand(1.5,3),col:s.special?`hsl(${(G.t*300)%360},90%,80%)`:'#ffffff',bub:true,g:0});
    if(s.p>=1){s.dead=true;if(G.pending)impact();else burst(b.x+rand(-30,30),b.y+rand(-30,30),14)}}
  G.shots=G.shots.filter(s=>!s.dead);
  if(G.charged&&Math.random()<.5)G.parts.push({x:ax.x+rand(-heroW*.4,heroW*.4),y:G.hy+rand(-heroH*.4,heroH*.3),vx:rand(-20,20),vy:rand(-80,-30),life:.8,r:rand(2,4),col:`hsl(${(G.t*200)%360},90%,75%)`,star:true,g:-10});
  if(b.bolt&&!b.dead&&Math.random()<.04)G.parts.push({x:b.x+rand(-50,50)*G.bs*b.s,y:b.y+50*G.bs*b.s,vx:0,vy:rand(160,240),life:.5,r:2,col:'rgba(255,240,160,.9)',drop:true,g:200});
  for(const bl of G.bolts)bl.life-=dt;G.bolts=G.bolts.filter(bl=>bl.life>0)}

function update(dt){G.t+=dt;
  if(G.stage==='run')updateRun(dt);else updateBattle(dt);
  if((G.phase==='won'||G.phase==='lost')&&G.t>=G.endAt&&!G.finished){G.finished=true;finish();return}
  G.shake=Math.max(0,G.shake-dt*40);G.flash=Math.max(0,G.flash-dt*1.6);G.inv=Math.max(0,G.inv-dt);
  for(const p of G.parts){p.life-=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=(p.g||0)*dt;p.vx*=.985;if(p.rect)p.rot+=p.vr*dt}
  G.parts=G.parts.filter(p=>p.life>0);if(G.parts.length>700)G.parts.splice(0,G.parts.length-700);
  for(const r of G.rings){r.life-=dt;r.r+=260*dt}G.rings=G.rings.filter(r=>r.life>0);
  for(const f of G.floats){f.life-=dt;f.y-=46*dt}G.floats=G.floats.filter(f=>f.life>0)}

/* ---------- canvas drawing ---------- */
function dot(c,x,y,r){c.beginPath();c.arc(x,y,r,0,TAU);c.fill()}
function ell(c,x,y,rx,ry,rot){c.beginPath();c.ellipse(x,y,rx,ry,rot||0,0,TAU)}
function starPath(c,x,y,r){c.beginPath();for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,rr=i%2?r*.45:r;c.lineTo(x+Math.cos(a)*rr,y+Math.sin(a)*rr)}c.closePath()}
function heartPath(c,x,y,s){c.beginPath();c.moveTo(x,y+s*.9);c.bezierCurveTo(x-s*1.4,y,x-s*.8,y-s*1.1,x,y-s*.35);c.bezierCurveTo(x+s*.8,y-s*1.1,x+s*1.4,y,x,y+s*.9);c.closePath()}
function shade(c,r,col){const g=c.createRadialGradient(-r*.35,-r*.4,r*.1,0,0,r*1.05);g.addColorStop(0,'rgba(255,255,255,.85)');g.addColorStop(.35,col);g.addColorStop(1,col);return g}
/* a small world-flavoured shape at the origin: the run's treats and the battle's projectiles */
function drawShape(c,k,t){
  if(k==='candy'){c.rotate(t*6);c.fillStyle=RAINBOW[Math.floor(t*8)%6];c.beginPath();c.roundRect(-3.5,-10,7,20,3.5);c.fill()}
  else if(k==='canopy'){c.rotate(t*5);c.fillStyle='#5FAF5A';ell(c,0,0,10,5);c.fill();c.strokeStyle='#2E7D3A';c.lineWidth=1.5;c.beginPath();c.moveTo(-9,0);c.lineTo(9,0);c.stroke()}
  else if(k==='bows'){c.fillStyle='#FF5C8A';heartPath(c,0,0,9);c.fill()}
  else if(k==='boba'){c.fillStyle='#3B2418';dot(c,0,0,8);c.fillStyle='rgba(255,255,255,.45)';dot(c,-3,-3,2.5)}
  else if(k==='birds'){c.rotate(-.7+Math.sin(t*3)*.15);c.fillStyle='#D9772B';ell(c,0,0,5,11);c.fill();c.strokeStyle='#B5541A';c.lineWidth=1.5;c.beginPath();c.moveTo(0,-10);c.lineTo(0,12);c.stroke()}
  else{c.fillStyle=k==='ocean'?'rgba(228,212,255,.85)':'rgba(240,252,255,.85)';dot(c,0,0,9);c.strokeStyle='#fff';c.lineWidth=2;c.beginPath();c.arc(0,0,9,0,TAU);c.stroke();c.fillStyle='#fff';dot(c,-3,-3,2.5)}}
function drawShot(c,s,t){c.save();c.translate(s.x,s.y);const z=s.special?1.5:1.2;c.scale(z,z);
  if(s.special){c.shadowColor=`hsl(${(t*300)%360},90%,70%)`;c.shadowBlur=16}
  drawShape(c,G.world,t);c.restore()}
function drawTreat(c,tr,t){const p=proj(tr.lane,Math.max(0,tr.t)),z=p.s*1.7;c.save();c.translate(p.x,p.y-14*p.s);c.globalAlpha=clamp(p.s*3,0,1);
  c.fillStyle='rgba(255,255,255,.35)';dot(c,0,0,16*z);c.scale(z,z);drawShape(c,G.world,t+tr.lane);c.restore()}
/* an answer token in the world's style: bubble, wrapped candy, fruit, jellyfish, bow or boba pearl */
function drawToken(c,x,y,r,v,col,state,t){const k=G.world;c.save();c.translate(x,y);c.lineCap='round';c.lineJoin='round';
  if(state==='bad')c.globalAlpha=.6;
  if(state==='hint'||state==='ok'){const p=1+Math.sin(t*8)*.08;c.strokeStyle=state==='ok'?'#3FCB98':'rgba(255,255,255,.95)';c.lineWidth=Math.max(3,r*.12);c.beginPath();c.arc(0,0,r*1.3*p,0,TAU);c.stroke()}
  if(k==='lagoon'){const g=c.createRadialGradient(-r*.35,-r*.4,r*.1,0,0,r);g.addColorStop(0,'rgba(255,255,255,.9)');g.addColorStop(.5,'rgba(190,240,246,.6)');g.addColorStop(1,'rgba(120,205,220,.6)');c.fillStyle=g;dot(c,0,0,r);
    c.strokeStyle='rgba(255,255,255,.95)';c.lineWidth=Math.max(1.5,r*.07);c.beginPath();c.arc(0,0,r,0,TAU);c.stroke()}
  else if(k==='candy'){c.fillStyle=col;c.beginPath();c.moveTo(-r*.85,0);c.lineTo(-r*1.45,-r*.5);c.lineTo(-r*1.45,r*.5);c.closePath();c.fill();c.beginPath();c.moveTo(r*.85,0);c.lineTo(r*1.45,-r*.5);c.lineTo(r*1.45,r*.5);c.closePath();c.fill();
    c.fillStyle=shade(c,r,col);dot(c,0,0,r);c.strokeStyle='rgba(255,255,255,.6)';c.lineWidth=Math.max(1.5,r*.09);c.beginPath();c.arc(0,0,r*.7,-.4,1.2);c.stroke()}
  else if(k==='canopy'){c.strokeStyle='#7A5236';c.lineWidth=Math.max(1.5,r*.09);c.beginPath();c.moveTo(0,-r*.9);c.lineTo(r*.12,-r*1.25);c.stroke();c.fillStyle='#4F9D55';ell(c,r*.38,-r*1.12,r*.42,r*.18,-.5);c.fill();
    c.fillStyle=shade(c,r,col);dot(c,0,0,r)}
  else if(k==='ocean'){c.strokeStyle=col;c.lineWidth=Math.max(1.5,r*.08);
    for(let i=0;i<5;i++){const tx=-r*.6+i*r*.3;c.beginPath();c.moveTo(tx,r*.3);for(let m=1;m<=4;m++)c.lineTo(tx+Math.sin(t*4+i+m)*r*.12,r*.3+m*r*.26);c.stroke()}
    c.fillStyle=shade(c,r,col);c.beginPath();c.moveTo(-r*1.05,r*.3);c.bezierCurveTo(-r*1.05,-r*1.35,r*1.05,-r*1.35,r*1.05,r*.3);
    for(let i=0;i<4;i++){const x1=r*1.05-i*r*.525,x2=r*1.05-(i+1)*r*.525;c.quadraticCurveTo((x1+x2)/2,r*.52,x2,r*.3)}c.closePath();c.fill()}
  else if(k==='bows'){c.fillStyle=shade(c,r,col);ell(c,0,0,r,r*1.1);c.fill();c.fillStyle='#E0559A';c.beginPath();c.moveTo(0,r*1.1);c.lineTo(-r*.35,r*.92);c.lineTo(-r*.35,r*1.3);c.closePath();c.fill();c.beginPath();c.moveTo(0,r*1.1);c.lineTo(r*.35,r*.92);c.lineTo(r*.35,r*1.3);c.closePath();c.fill()}
  else if(k==='birds'){c.fillStyle=shade(c,r,col);ell(c,0,0,r*.88,r*1.08);c.fill();c.fillStyle='rgba(120,70,30,.35)';[[-r*.4,-r*.5],[r*.35,-r*.2],[-r*.1,r*.55],[r*.45,r*.5]].forEach(p=>dot(c,p[0],p[1],r*.12))}
  else{const g=c.createRadialGradient(-r*.35,-r*.4,r*.1,0,0,r);g.addColorStop(0,'#9A7A6A');g.addColorStop(.6,'#4A2C1E');g.addColorStop(1,'#2E1A10');c.fillStyle=g;dot(c,0,0,r);c.fillStyle='rgba(255,255,255,.35)';ell(c,-r*.38,-r*.45,r*.28,r*.15,-.6);c.fill()}
  const txt=String(v),fs=Math.max(14,r*(txt.length>2?.78:.95)),dy=k==='ocean'?-r*.1:r*.04;c.font=cfont(fs);c.textAlign='center';c.textBaseline='middle';
  c.lineWidth=Math.max(3,fs*.16);c.strokeStyle='rgba(25,30,55,.8)';c.strokeText(txt,0,dy);c.fillStyle='#fff';c.fillText(txt,0,dy);
  if(state==='bad'){c.globalAlpha=1;c.strokeStyle='#FF5C8A';c.lineWidth=Math.max(3,r*.14);c.beginPath();c.moveTo(-r*.7,-r*.7);c.lineTo(r*.7,r*.7);c.moveTo(r*.7,-r*.7);c.lineTo(-r*.7,r*.7);c.stroke()}
  c.restore()}
function drawRoad(c,t){const vp=G.vp,hw=G.laneGap*1.5+30,nx=.14;c.save();
  c.globalAlpha=.5;c.fillStyle=G.cols.road;c.beginPath();c.moveTo(vp.x-hw*nx,vp.y);c.lineTo(vp.x+hw*nx,vp.y);c.lineTo(W/2+hw*1.08,H);c.lineTo(W/2-hw*1.08,H);c.closePath();c.fill();
  c.strokeStyle='#ffffff';c.globalAlpha=.55;c.lineWidth=3;
  for(const off of [-1.5,-.5,.5,1.5]){const xb=W/2+off*G.laneGap;c.beginPath();c.moveTo(vp.x+(xb-vp.x)*nx,vp.y);c.lineTo(vp.x+(xb-vp.x)*1.08,H);c.stroke()}
  c.strokeStyle=G.cols.line;
  for(let k=0;k<12;k++){const tt=(((k/12)-G.dist)%1+1)%1,s=.15+.85*Math.pow(1-tt,1.6),y=vp.y+(G.nearY-vp.y)*s,half=hw*(nx+(1-nx)*s);c.globalAlpha=.3*s;c.lineWidth=2+3*s;c.beginPath();c.moveTo(vp.x-half,y);c.lineTo(vp.x+half,y);c.stroke()}
  c.restore()}
function drawGate(c,g,t){const tt=Math.max(0,g.t),p1=proj(1,tt),hw=(G.laneGap*1.5+30)*(.14+.86*p1.s);c.save();c.globalAlpha=g.state==='live'?1:clamp(g.fade,0,1);
  c.fillStyle='rgba(255,255,255,.35)';c.fillRect(G.vp.x-hw,p1.y-4*p1.s-2,hw*2,8*p1.s+4);
  const cols=CCOL[G.world];
  g.opts.forEach((v,lane)=>{const p=proj(lane,tt),r=G.tokR*(.25+.75*p.s);if(p.s<.22)return;let state='live';
    if(g.state==='passed'){if(lane===g.ans)state=g.passLane===g.ans?'ok':'hint';else if(lane===g.passLane)state='bad'}
    drawToken(c,p.x,p.y-r*.9,r,v,cols[(lane*2+g.q.ans)%cols.length],state,t)});
  c.restore()}
function drawBoss(c,b,t){c.save();const lx=b.lunge>0?-Math.sin(b.lunge*Math.PI)*(b.x-G.ax.x)*.45:0,ly=b.lunge>0?Math.sin(b.lunge*Math.PI)*(G.hy-b.y)*.3:0;
  c.translate(b.x+lx,b.y+ly+Math.sin(t*2.2)*6);c.globalAlpha=b.alpha;const k=G.bs*b.s*(1+Math.sin(t*3)*.02)*(b.hitT>0?1.12:1)*(b.dead?Math.max(.3,1-b.rise*.25):1);c.scale(k,k);
  if(b.dead)c.rotate(b.rise*1.5);
  if(b.swirl){c.save();c.strokeStyle='rgba(255,255,255,.35)';c.lineWidth=6;c.lineCap='round';for(let i=0;i<3;i++){c.beginPath();c.arc(0,4,96+i*14,t*1.5+i*2.1,t*1.5+i*2.1+1.6);c.stroke()}c.restore()}
  const puffs=[[-62,10,34],[-30,-14,40],[12,-24,44],[52,-4,38],[74,18,28],[-6,18,40],[38,22,34],[-44,26,30]];
  c.fillStyle=b.dark;puffs.forEach(p=>dot(c,p[0],p[1]+8,p[2]));
  c.fillStyle=b.hitT>0?'#ffffff':b.col;puffs.forEach(p=>dot(c,p[0],p[1],p[2]));
  c.fillStyle='rgba(255,255,255,.3)';dot(c,-24,-28,16);dot(c,14,-40,14);
  if(b.crown){c.fillStyle='#F2C94C';c.beginPath();c.moveTo(-30,-52);c.lineTo(-32,-86);c.lineTo(-15,-68);c.lineTo(0,-94);c.lineTo(15,-68);c.lineTo(32,-86);c.lineTo(30,-52);c.closePath();c.fill();c.fillStyle='#FF5C8A';dot(c,0,-64,5);c.fillStyle='#7FE0CF';dot(c,-18,-60,4);dot(c,18,-60,4)}
  const look=clamp((G.ax.x-b.x)/300,-1,1)*4,ang=b.angry;
  c.fillStyle='#fff';dot(c,-22,0,13);dot(c,22,0,13);c.fillStyle='#262A44';dot(c,-22+look,3,6+ang);dot(c,22+look,3,6+ang);
  c.strokeStyle='#3A3F66';c.lineWidth=5;c.lineCap='round';c.beginPath();c.moveTo(-38,-24-ang*4);c.lineTo(-8,-10);c.stroke();c.beginPath();c.moveTo(38,-24-ang*4);c.lineTo(8,-10);c.stroke();
  if(b.dead){c.beginPath();c.arc(0,40,12,0,Math.PI);c.stroke();c.lineWidth=3;[-22,22].forEach(x=>{c.beginPath();c.moveTo(x-7,-5);c.lineTo(x+7,9);c.moveTo(x+7,-5);c.lineTo(x-7,9);c.stroke()})}
  else if(b.hitT>0){c.fillStyle='#3A3F66';ell(c,0,36,10,12);c.fill()}
  else{c.beginPath();c.arc(0,42,12,Math.PI*1.15,Math.PI*1.85);c.stroke()}
  if(b.bolt&&!b.dead&&Math.floor(t*3)%4===0){c.fillStyle='#FFE24A';c.beginPath();c.moveTo(-10,40);c.lineTo(6,40);c.lineTo(-2,58);c.lineTo(10,58);c.lineTo(-12,90);c.lineTo(-4,64);c.lineTo(-16,64);c.closePath();c.fill()}
  c.restore();
  if(!b.dead){const w=clamp(170*G.bs*b.s,120,220),y=b.y+ly-(100*b.s+16)*G.bs,x=b.x+lx-w/2;
    c.font=cfont(clamp(16*G.bs,13,18));c.textAlign='center';c.textBaseline='bottom';c.lineWidth=5;c.strokeStyle='rgba(25,30,55,.75)';c.strokeText(b.name,b.x+lx,y-4);c.fillStyle='#fff';c.fillText(b.name,b.x+lx,y-4);
    c.fillStyle='rgba(25,30,55,.4)';c.beginPath();c.roundRect(x-2,y-2,w+4,16,8);c.fill();c.fillStyle='rgba(255,255,255,.35)';c.beginPath();c.roundRect(x,y,w,12,6);c.fill();
    c.fillStyle=b.hp/b.max>.5?'#3FCB98':b.hp/b.max>.25?'#F5C842':'#FF5C8A';c.beginPath();c.roundRect(x,y,w*b.hp/b.max,12,6);c.fill();
    c.font=cfont(clamp(13*G.bs,11,14));c.textBaseline='middle';c.lineWidth=4;c.strokeText(`${b.hp} / ${b.max}`,b.x+lx,y+6);c.fillStyle='#fff';c.fillText(`${b.hp} / ${b.max}`,b.x+lx,y+6)}}
function draw(){const c=cx,t=G.t;c.setTransform(DPR(),0,0,DPR(),0,0);c.clearRect(0,0,W,H);c.save();
  let sx=0;if(G.shake>0){sx=rand(-1,1)*G.shake*.6;c.translate(sx,rand(-1,1)*G.shake*.6)}
  if(G.stage==='run'){drawRoad(c,t);
    const far=[...G.treats].sort((a,b)=>b.t-a.t);for(const tr of far)if(!tr.got&&(!G.gate||tr.t>G.gate.t))drawTreat(c,tr,t);
    if(G.gate)drawGate(c,G.gate,t);
    for(const tr of far)if(!tr.got&&G.gate&&tr.t<=G.gate.t)drawTreat(c,tr,t)}
  else{if(G.boss.alpha>0)drawBoss(c,G.boss,t);
    for(const bl of G.bolts){c.save();c.lineCap='round';c.lineJoin='round';c.globalAlpha=clamp(bl.life*2,0,1);
      c.strokeStyle='rgba(190,170,255,.9)';c.lineWidth=14;c.beginPath();bl.pts.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.stroke();
      c.strokeStyle='#fff';c.lineWidth=5;c.stroke();c.restore()}
    for(const s of G.shots)if(s.delay<=0)drawShot(c,s,t)}
  if(G.charged||G.glowT>0){const rg=c.createRadialGradient(G.ax.x,G.hy,10,G.ax.x,G.hy,heroW);rg.addColorStop(0,`hsla(${(t*120)%360},90%,75%,.45)`);rg.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=rg;dot(c,G.ax.x,G.hy,heroW)}
  for(const p of G.parts){c.globalAlpha=clamp(p.life*1.6,0,1);c.fillStyle=p.col;
    if(p.rect){c.save();c.translate(p.x,p.y);c.rotate(p.rot);c.fillRect(-p.r/2,-p.r,p.r,p.r*2);c.restore()}
    else if(p.star){starPath(c,p.x,p.y,p.r*1.4);c.fill()}
    else if(p.drop){c.fillRect(p.x,p.y,2,8)}
    else if(p.bub){c.strokeStyle=p.col;c.lineWidth=1.5;c.beginPath();c.arc(p.x,p.y,p.r,0,TAU);c.stroke()}
    else dot(c,p.x,p.y,p.r)}
  c.globalAlpha=1;
  for(const r of G.rings){c.strokeStyle=`rgba(255,255,255,${r.life*1.6})`;c.lineWidth=4;c.beginPath();c.arc(r.x,r.y,r.r,0,TAU);c.stroke()}
  c.textAlign='center';c.textBaseline='middle';
  for(const f of G.floats){c.globalAlpha=clamp(f.life*1.5,0,1);c.font=cfont(f.size);c.lineWidth=6;c.strokeStyle='rgba(25,30,55,.75)';c.strokeText(f.text,f.x,f.y);c.fillStyle=f.col;c.fillText(f.text,f.x,f.y)}
  c.globalAlpha=1;
  if(G.flash>0){c.fillStyle=`rgba(${G.flashCol},${G.flash*.45})`;c.fillRect(-20,-20,W+40,H+40)}
  c.restore();
  heroPos.style.opacity=G.inv>0&&Math.floor(G.t*12)%2?'.35':'1';
  heroPos.style.transform=`translate(${(G.ax.x-heroW/2+sx).toFixed(1)}px,0) rotate(${clamp(G.ax.vx/2600,-.18,.18).toFixed(3)}rad)`}

function finish(){Snd.stopMusic();endGlow();const p=P(),k=G.world,wd=WORLDS[k],b=G.boss,won=b.dead,reached=G.stage==='battle';
  const stars=won?(G.hearts>=5?3:G.hearts>=3?2:1):0;
  const lvBefore=sceneLevel(p);
  const earned=G.right*2+G.collected+(won?10:0)+stars*5+G.bonus,key=G.key,prevBest=p.best[key]|0,newBest=G.score>prevBest&&G.score>0;
  p.cur=(p.cur|0)+earned;p.stars[key]=Math.max(p.stars[key]|0,stars);if(newBest)p.best[key]=G.score;
  p.skill[key]=Math.round(clamp(G.L*.5+G.peakL*.5-.5,1,L_MAX)*100)/100;
  if(won)p.bossLv[key]=Math.min(9,Math.max(p.bossLv[key]|0,b.lv+1));
  for(const l of G.log){const f=p.facts[l.key]||(p.facts[l.key]={r:0,w:0});if(l.ok)f.r++;else f.w++}
  p.games=(p.games|0)+1;persist();
  const lvAfter=sceneLevel(p);applyWorld(k,lvAfter);
  $('#resHero').innerHTML=charSVG(charOf(p,k),won||newBest?'happy':'oops');
  $('#resTitle').textContent=won?(stars===3?'Flawless victory!':stars===2?wd.sumTitles[1]:'Boss beaten!'):newBest?'New top score!':reached?'The boss won this time':'Game over';
  const next=bossInfo(Math.min(9,b.lv+1)),table=G.mode==='mix'?'Mixed Mayhem':`The ${G.mode}s`;
  $('#resSub').textContent=table+(reached?` · ${b.name} level ${b.lv} ${won?'defeated':`had ${b.hp} HP left`}`:` · the run ended at gate ${G.gatesDone} of ${G.gatesTotal}`)+(won&&b.lv<9?` · next up: ${next.name} level ${b.lv+1}`:'');
  $('#resStars').innerHTML=starSvg(false).repeat(3);
  $('#resBest').innerHTML=(newBest&&prevBest?`<span class="newbest">Beat your old top of ${prevBest.toLocaleString()}!</span> `:'')+(lvAfter>lvBefore?`<span class="newbest">New in your world: ${wd.levels[lvAfter-1].l}!</span>`:'');
  $('#rScore').textContent=G.score.toLocaleString();$('#rFirst').textContent=`${G.right}/${G.asked}`;$('#rCombo').textContent=G.bestStreak;$('#rCur').innerHTML=`${CUR_ICON[k]} +${earned}`;$('#rCurL').textContent=cap(wd.cur);
  const miss=[...new Set(G.log.filter(l=>!l.ok).map(l=>l.key))];
  $('#practice').innerHTML=practiceHTML(miss,G.asked?'Every answer right!':'');
  G=null;show('results');
  const sv=document.querySelectorAll('#resStars .st');for(let i=0;i<stars;i++)setTimeout(()=>{sv[i].classList.add('on');Snd.star(i);const r=sv[i].getBoundingClientRect();fxBurst(r.left+r.width/2,r.top+r.height/2,30)},500+i*450);
  if(won||newBest)setTimeout(()=>fxConfetti(160),300);
  Voice.say(won?`${stars} star${stars===1?'':'s'}! You earned ${earned} ${wd.cur}.`:`You earned ${earned} ${wd.cur}. Try again!`)}
function practiceHTML(miss,allRight){return miss.length?`<h3 style="margin:8px 0">Facts to practice</h3><div class="chips">${miss.map(k2=>{const [a,c2]=k2.split('x').map(Number);return `<span class="chip">${a} × ${c2} = ${a*c2}</span>`}).join('')}</div>`:(allRight?`<h3 style="margin:8px 0">${allRight}</h3>`:'')}
$('#againBtn').onclick=()=>startRound(lastMode);
$('#hubBtn').onclick=()=>{Snd.click();openHub()};

/* pause */
function setPause(on){if(!G)return;G.paused=on;$('#pauseMenu').hidden=!on;try{if(Snd.ctx){on?Snd.ctx.suspend():Snd.ctx.resume()}}catch(e){}if(on&&window.speechSynthesis)speechSynthesis.cancel()}
$('#pauseBtn').onclick=()=>setPause(!(G&&G.paused));
$('#resumeBtn').onclick=()=>setPause(false);
$('#quitBtn').onclick=()=>{setPause(false);if(window.speechSynthesis)speechSynthesis.cancel();if(G&&!G.finished){G.finished=true;finish()}};
document.addEventListener('visibilitychange',()=>{if(document.hidden&&G&&!G.paused&&screen==='game')setPause(true);if(document.hidden&&S2&&!S2.paused&&screen==='duel')duelPause(true)});

/* controls for the run: arrow keys / A D, swipe or tap on the stage, the lane buttons. Touching the stage only ever changes lanes.
   Battle: 1-4, arrows + Enter/Space, or tap a button. */
let down=null;
cv.addEventListener('pointerdown',e=>{if(!G||G.paused)return;Snd.init();e.preventDefault();if(e.pointerType!=='mouse')document.body.classList.add('touch');down={x:e.clientX,id:e.pointerId}});
cv.addEventListener('pointerup',e=>{if(!down||down.id!==e.pointerId||!G)return;const dx=e.clientX-down.x;down=null;
  if(Math.abs(dx)>30)laneMove(dx<0?-1:1);else laneMove((e.clientX-cv.getBoundingClientRect().left)<W/2?-1:1)});
cv.addEventListener('pointercancel',()=>{down=null});
function holdBtn(el,on){el.addEventListener('pointerdown',e=>{e.preventDefault();Snd.init();el.classList.add('held');on()});const up=()=>el.classList.remove('held');el.addEventListener('pointerup',up);el.addEventListener('pointercancel',up);el.addEventListener('pointerleave',up);el.addEventListener('contextmenu',e=>e.preventDefault())}
holdBtn($('#padL'),()=>laneMove(-1));holdBtn($('#padR'),()=>laneMove(1));
window.addEventListener('touchstart',()=>document.body.classList.add('touch'),{passive:true,once:true});
function setFocus(i){if(!G||G.phase!=='ask')return;G.focus=clamp(i,0,3);document.querySelectorAll('#answers .ans-btn').forEach((b,k)=>b.classList.toggle('focus',k===G.focus))}
window.addEventListener('keydown',e=>{const k=e.key;
  if(screen==='duel'&&S2){if(k==='Escape'||k==='p'||k==='P'){duelPause(!S2.paused);return}if(S2.paused)return;
    const A={w:0,W:0,a:1,A:1,d:2,D:2,s:3,S:3},B={ArrowUp:0,ArrowLeft:1,ArrowRight:2,ArrowDown:3};
    if(k in A){e.preventDefault();if(!e.repeat){Snd.init();duelPick('a',A[k])}}else if(k in B){e.preventDefault();if(!e.repeat){Snd.init();duelPick('b',B[k])}}return}
  if(screen!=='game'||!G)return;
  if(k==='Escape'||k==='p'||k==='P'){setPause(!G.paused);return}
  if(G.paused)return;
  if(G.stage==='run'){if(k==='ArrowLeft'||k==='a'||k==='A'){e.preventDefault();if(!e.repeat)laneMove(-1)}else if(k==='ArrowRight'||k==='d'||k==='D'){e.preventDefault();if(!e.repeat)laneMove(1)}return}
  if(/^[1-4]$/.test(k)){e.preventDefault();Snd.init();pick(+k-1)}
  else if(k==='ArrowLeft'){e.preventDefault();setFocus(G.focus<0?0:G.focus-1)}
  else if(k==='ArrowRight'){e.preventDefault();setFocus(G.focus<0?0:G.focus+1)}
  else if(k==='ArrowUp'){e.preventDefault();setFocus(G.focus<0?0:G.focus-2)}
  else if(k==='ArrowDown'){e.preventDefault();setFocus(G.focus<0?0:G.focus+2)}
  else if(k==='Enter'||k===' '){e.preventDefault();if(G.focus>=0){Snd.init();pick(G.focus)}}});
window.addEventListener('resize',()=>{if(screen==='game'&&G)sizeStage()});

/* ---------- sibling showdown: two kids, one screen, same problem ---------- */
let S2=null,duelOpp=null;
const KEYS_A=['W','A','D','S'],KEYS_B=['↑','←','→','↓'];
function openDuelSetup(){Snd.click();show('duelSetup');const others=KIDS.filter(k=>k.id!==player);if(!others.some(k=>k.id===duelOpp))duelOpp=others[0].id;renderDuelSetup()}
function renderDuelSetup(){const box=$('#duelKids');box.innerHTML='';
  KIDS.filter(k=>k.id!==player).forEach(k=>{const p=saves[k.id],w=lookOf(k.id);const b=document.createElement('button');b.type='button';b.className='profile-card'+(k.id===duelOpp?' on':'');b.style.background=WGRAD[w];
    b.innerHTML=`${charSVG(charOf(p,w))}<span class="pc-name">${k.name}</span><span class="pc-world">${WNAME[w]}</span>`;b.onclick=()=>{Snd.click();duelOpp=k.id;renderDuelSetup()};box.append(b)});
  $('#duelWho').textContent=`${kid(player).name} vs ${kid(duelOpp).name}`;
  const tb=$('#duelTables');tb.innerHTML='';for(let n=1;n<=TOP;n++)tb.append(tableBtn(n,'',()=>startDuel(n)))}
$('#duelBtn').onclick=openDuelSetup;
$('#duelBack').onclick=()=>{Snd.click();openHub()};
$('#duelMix').onclick=()=>startDuel('mix');
function sideEl(s){return $(s==='a'?'#sideA':'#sideB')}
function duelBanner(text,sub){bannerOn($('#duelBanner'),text,sub)}
function setDuelTimer(frac){const bar=$('#duelTimer');bar.firstElementChild.style.width=(frac*100).toFixed(1)+'%';bar.classList.toggle('low',frac<.3)}
function startDuel(mode){Snd.init();Snd.click();const a=player,b=duelOpp,k=lookOf(a);applyWorld(k,sceneLevel(P()));show('duel');
  S2={a,b,mode,key:String(mode),world:k,round:0,total:10,score:{a:0,b:0},q:null,opts:{a:[],b:[]},locked:{a:false,b:false},timer:0,timeMax:10,phase:'intro',phaseAt:1.8,t:0,log:{a:[],b:[]},pool:poolFor(mode),bag:[],missed:[],paused:false,lastTick:99};
  for(const s of ['a','b']){const id=S2[s],w=lookOf(id);$(s==='a'?'#axoA':'#axoB').innerHTML=charSVG(charOf(saves[id],w));$(s==='a'?'#nameA':'#nameB').textContent=kid(id).name;$(s==='a'?'#scoreA':'#scoreB').textContent='0'}
  $('#sideA').className='duel-side flip';$('#sideB').className='duel-side';
  renderPads();const eq=$('#duelEq');eq.className='eq';eq.textContent=mode==='mix'?'Mixed Mayhem':`The ${mode}s`;$('#duelRound').textContent='Best of 10';$('#duelMsg').textContent='';setDuelTimer(1);
  Snd.startMusic('boss');duelBanner('Showdown!',`${kid(a).name} vs ${kid(b).name}`);Voice.say(`Showdown! ${kid(a).name} versus ${kid(b).name}. First right answer wins the point!`)}
function renderPads(){for(const s of ['a','b']){const pad=$(s==='a'?'#padA':'#padB');pad.innerHTML='';const cols=ACOL[lookOf(S2[s])],keys=s==='a'?KEYS_A:KEYS_B;
    S2.opts[s].forEach((v,i)=>{const b=document.createElement('button');b.type='button';b.className='ans-btn k'+i;b.style.setProperty('--ac',cols[i]);b.innerHTML=`<small>${keys[i]}</small>${v}`;
      b.disabled=S2.phase!=='ask'||S2.locked[s];b.onclick=()=>{Snd.init();duelPick(s,i)};pad.append(b)});
    const eq=document.createElement('div');eq.className='side-eq';eq.innerHTML=S2.q?`${S2.q.x}<span class="x">×</span>${S2.q.y}`:'';pad.append(eq)}}
function duelAsk(){S2.round++;if(S2.round>S2.total){duelEnd();return}
  const q=makeQ(pickFact(S2,P()));S2.q=q;const base=choices(q.x,q.y,4);S2.opts.a=shuffle(base.slice());S2.opts.b=shuffle(base.slice());
  S2.locked.a=S2.locked.b=false;S2.phase='ask';S2.timer=S2.timeMax;S2.lastTick=99;
  for(const s of ['a','b'])sideEl(s).classList.remove('locked','winner','hit');
  renderPads();const eq=$('#duelEq');eq.className='eq wait';eq.innerHTML=eqHTML(q);$('#duelRound').textContent=`Round ${S2.round} of ${S2.total}`;$('#duelMsg').textContent='';
  Voice.say(`${q.x} times ${q.y}`)}
function duelMark(){for(const s of ['a','b'])sideEl(s).querySelectorAll('.ans-btn').forEach((b,i)=>{b.disabled=true;if(S2.opts[s][i]===S2.q.ans)b.classList.add('ok');else if(!b.classList.contains('bad'))b.classList.add('dim')})}
function duelPick(s,i){if(!S2||S2.paused||S2.phase!=='ask'||S2.locked[s])return;const q=S2.q,v=S2.opts[s][i];
  if(v===q.ans)duelPoint(s,i);else duelMiss(s,i)}
function duelPoint(s,i){const o=s==='a'?'b':'a',name=kid(S2[s]).name;S2.phase='after';S2.phaseAt=S2.t+1.6;S2.score[s]++;S2.log[s].push({key:S2.q.key,ok:true});
  $(s==='a'?'#scoreA':'#scoreB').textContent=S2.score[s];duelMark();sideEl(s).classList.add('winner');
  const sv=sideEl(s).querySelector('.axo'),ov=sideEl(o).querySelector('.axo');if(sv)sv.setAttribute('data-mood','happy');if(ov)ov.setAttribute('data-mood','oops');
  const r=sideEl(s).querySelector('.duel-axo').getBoundingClientRect();fxBurst(r.left+r.width/2,r.top+r.height/2,40);
  Snd.pop(S2.score[s]);$('#duelMsg').textContent=`${name} takes the point!`;$('#duelEq').className='eq ok';$('#duelEq').innerHTML=eqDone(S2.q);Voice.say(`${name}! ${S2.q.ans}!`)}
function duelMiss(s,i){const name=kid(S2[s]).name,q=S2.q;S2.locked[s]=true;S2.log[s].push({key:q.key,ok:false});S2.missed.push(q.f);
  const el=sideEl(s);el.classList.add('locked');el.classList.remove('hit');void el.offsetWidth;el.classList.add('hit');
  el.querySelectorAll('.ans-btn').forEach((b,k)=>{b.disabled=true;if(k===i)b.classList.add('bad')});
  const sv=el.querySelector('.axo');if(sv)sv.setAttribute('data-mood','oops');Snd.wrong();$('#duelMsg').textContent=`${name}: ${S2.opts[s][i]} isn't it`;
  if(S2.locked.a&&S2.locked.b)duelReveal('Nobody got it.');else Voice.say(`${name}, not quite.`)}
function duelReveal(msg){const q=S2.q;S2.phase='after';S2.phaseAt=S2.t+2;duelMark();$('#duelMsg').textContent=`${msg} ${q.x} × ${q.y} = ${q.ans}`;$('#duelEq').className='eq miss';$('#duelEq').innerHTML=eqDone(q);Voice.say(`${msg} ${q.x} times ${q.y} is ${q.ans}`)}
function updateDuel(dt){S2.t+=dt;
  if(S2.phase==='intro'&&S2.t>=S2.phaseAt)duelAsk();
  else if(S2.phase==='ask'){S2.timer-=dt;const frac=S2.timer/S2.timeMax;setDuelTimer(clamp(frac,0,1));
    if(frac<.3){const s=Math.ceil(S2.timer);if(s<S2.lastTick){S2.lastTick=s;Snd.tick()}}
    if(S2.timer<=0){S2.timer=0;Snd.miss?Snd.miss():Snd.wrong();duelReveal('Too slow!')}}
  else if(S2.phase==='after'&&S2.t>=S2.phaseAt)duelAsk()}
function duelPause(on){if(!S2)return;S2.paused=on;$('#duelMsg').textContent=on?'Paused. Press P to keep going.':'';try{if(Snd.ctx){on?Snd.ctx.suspend():Snd.ctx.resume()}}catch(e){}if(on&&window.speechSynthesis)speechSynthesis.cancel()}
function duelEnd(){S2.phase='end';Snd.stopMusic();const sa=S2.score.a,sb=S2.score.b,tie=sa===sb,win=tie?null:sa>sb?'a':'b';
  const treats={};for(const s of ['a','b']){const id=S2[s],p=PF(id);const pts=(tie?10:win===s?15:8)+2*S2.score[s];treats[s]=pts;p.cur=(p.cur|0)+pts;p.showdown.played++;if(win===s)p.showdown.wins++;
    for(const l of S2.log[s]){const f=p.facts[l.key]||(p.facts[l.key]={r:0,w:0});if(l.ok)f.r++;else f.w++}p.games=(p.games|0)+1;persistFor(id)}
  const na=kid(S2.a).name,nb=kid(S2.b).name,table=S2.mode==='mix'?'Mixed Mayhem':`the ${S2.mode}s`;
  $('#duelTitle').textContent=tie?"It's a tie!":`${kid(S2[win]).name} wins!`;
  $('#duelSub').textContent=`${na} ${sa} – ${sb} ${nb} on ${table}`;
  const pair=$('#duelPair');pair.innerHTML='';
  for(const s of ['a','b']){const id=S2[s],w=lookOf(id),big=tie||win===s;const d=document.createElement('div');
    d.innerHTML=`<div class="axo-box${big?'':' small'}">${charSVG(charOf(saves[id],w),big?'happy':'oops')}</div>${kid(id).name}<br>${CUR_ICON[w]} +${treats[s]} ${curName(w)}`;pair.append(d)}
  const miss=[...new Set([...S2.log.a,...S2.log.b].filter(l=>!l.ok).map(l=>l.key))];$('#duelPractice').innerHTML=practiceHTML(miss,'');
  show('duelEnd');Snd.win();setTimeout(()=>fxConfetti(160),300);
  Voice.say(tie?`It's a tie, ${sa} to ${sb}!`:`${kid(S2[win]).name} wins, ${Math.max(sa,sb)} to ${Math.min(sa,sb)}!`)}
$('#duelQuit').onclick=()=>{Snd.click();Snd.stopMusic();S2=null;if(window.speechSynthesis)speechSynthesis.cancel();openHub()};
$('#duelAgain').onclick=()=>{const m=S2?S2.mode:lastMode;startDuel(m)};
$('#duelHub').onclick=()=>{Snd.click();S2=null;openHub()};

/* page-level effects (results, unlocks) */
const fxc=$('#fx');let FX=[];
function fxCols(){return WORLDS[CUR_WORLD].confetti}
function fxFit(){const d=DPR(),w=innerWidth,h=innerHeight;if(fxc.width!==Math.round(w*d)||fxc.height!==Math.round(h*d)){fxc.width=Math.round(w*d);fxc.height=Math.round(h*d)}const c=fxc.getContext('2d');c.setTransform(d,0,0,d,0,0);return {c,w,h}}
function fxBurst(x,y,n){const cols=fxCols();for(let i=0;i<n;i++){const a=rand(0,TAU),sp=rand(120,420);FX.push({x,y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,life:rand(.6,1.1),r:rand(3,6),col:pickOne(cols),star:true,g:400})}}
function fxConfetti(n){const cols=fxCols();for(let i=0;i<n;i++)FX.push({x:rand(0,innerWidth),y:rand(-120,-10),vx:rand(-60,60),vy:rand(80,260),life:rand(2.5,4),r:rand(5,9),col:pickOne(cols),rect:true,rot:rand(0,6),vr:rand(-8,8),g:40})}
let fxOn=false;
function drawFX(dt){if(!FX.length){if(fxOn){const {c,w,h}=fxFit();c.clearRect(0,0,w,h);fxOn=false}return}
  fxOn=true;const {c,w,h}=fxFit();c.clearRect(0,0,w,h);
  for(const p of FX){p.life-=dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.vy+=p.g*dt;p.vx*=.99;if(p.rect)p.rot+=p.vr*dt;c.globalAlpha=clamp(p.life*1.5,0,1);c.fillStyle=p.col;
    if(p.rect){c.save();c.translate(p.x,p.y);c.rotate(p.rot);c.fillRect(-p.r/2,-p.r,p.r,p.r*2);c.restore()}else{starPath(c,p.x,p.y,p.r*1.4);c.fill()}}
  c.globalAlpha=1;FX=FX.filter(p=>p.life>0&&p.y<h+40)}

let last=performance.now();
function frame(now){const dt=Math.min(.05,(now-last)/1000);last=now;
  if(screen==='game'&&G){if(!G.paused)update(dt);if(G)draw()}
  else if(screen==='duel'&&S2&&!S2.paused&&S2.phase!=='end')updateDuel(dt);
  drawFX(dt);requestAnimationFrame(frame)}

renderMenu();renderSaveNote();
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>{DISP=(getComputedStyle(document.documentElement).getPropertyValue('--display')||'Fredoka').trim()||'Fredoka'}).catch(()=>{});
requestAnimationFrame(frame);
window.__ttw={get G(){return G},get S2(){return S2},get saves(){return saves},pick,laneMove,duelPick,startDuel,setOpp:id=>{duelOpp=id},net:Net,cloud:CLOUD};
})();
