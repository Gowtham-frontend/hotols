'use strict';
/* ==========================================================
   1. ORIGINAL INTERIOR VISUALS
   Every <img data-scene="..."> gets a self-made illustration.
   To use a real, authorized photo: put it in /images and set
   data-photo="images/yourfile.jpg" in index.html. It replaces
   the illustration automatically once it loads.
   ========================================================== */
const PALETTES = [
  ['#3a4a41', '#e9e2cf', '#6b8070'],
  ['#2a322e', '#d8cfb6', '#4d6354'],
  ['#44524a', '#efe8d6', '#7a8f7e']
];

const lamp = x => `<circle cx="${x}" cy="440" r="95" fill="url(#g)"/><rect x="${x-4}" y="455" width="8" height="75" fill="#b89b5e"/><path d="M${x-32} 455L${x+32} 455L${x+22} 408L${x-22} 408Z" fill="#f5e8c2"/>`;
const win = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#d6e6e2" opacity=".85"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#g)" opacity=".35"/><path d="M${x+w/2} ${y}V${y+h}M${x} ${y+h/2}H${x+w}" stroke="#2a322e" stroke-width="6"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#2a322e" stroke-width="8"/>`;
const art = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#e9e2cf" stroke="#b89b5e" stroke-width="6"/><circle cx="${x+w/2}" cy="${y+h/2}" r="${Math.min(w,h)/4}" fill="#6b8070"/>`;
const bed = (x, w, c) => `<rect x="${x}" y="320" width="${w}" height="220" rx="8" fill="#37443c"/><rect x="${x-25}" y="500" width="${w+50}" height="140" rx="10" fill="#f3efe4"/><rect x="${x-25}" y="565" width="${w+50}" height="85" rx="8" fill="${c}"/><rect x="${x+20}" y="470" width="${w/2-30}" height="50" rx="14" fill="#fff"/><rect x="${x+w/2+10}" y="470" width="${w/2-30}" height="50" rx="14" fill="#fff"/>`;
const stand = x => `<rect x="${x}" y="520" width="90" height="110" fill="#2a322e"/><rect x="${x}" y="520" width="90" height="8" fill="#b89b5e"/>`;
const chandelier = x => `<path d="M${x} 0V90" stroke="#b89b5e" stroke-width="3"/><circle cx="${x}" cy="105" r="70" fill="url(#g)"/><ellipse cx="${x}" cy="100" rx="38" ry="16" fill="#f5e8c2"/>`;
const rtable = (x, y, s) => `<ellipse cx="${x}" cy="${y}" rx="${90*s}" ry="${28*s}" fill="#f3efe4"/><rect x="${x-6*s}" y="${y}" width="${12*s}" height="${70*s}" fill="#2a322e"/>` +
  [-1.2, 0, 1.2].map(k => `<circle cx="${x+k*85*s}" cy="${y+22*s}" r="${14*s}" fill="#4d6354"/>`).join('');

const SCENES = {
  double:  c => win(70, 120, 250, 300) + art(780, 140, 200, 150) + bed(400, 360, c) + stand(290) + stand(790) + lamp(335) + lamp(835),
  double2: c => win(850, 110, 270, 320) + art(120, 150, 220, 160) + bed(330, 400, c) + stand(215) + stand(745) + lamp(260) + lamp(790),
  twin:    c => win(480, 110, 240, 280) + art(120, 160, 170, 130) + art(910, 160, 170, 130) + bed(100, 300, c) + bed(780, 300, c) + stand(500) + lamp(545),
  twin2:   c => win(60, 110, 250, 300) + art(880, 150, 190, 150) + bed(380, 270, c) + bed(720, 270, c) + stand(640) + lamp(685),
  suite:   c => win(700, 100, 400, 330) + art(120, 150, 200, 140) +
    `<rect x="80" y="470" width="420" height="160" rx="14" fill="${c}"/><rect x="80" y="410" width="420" height="90" rx="14" fill="#5d7264"/><rect x="560" y="560" width="200" height="22" fill="#b89b5e"/><rect x="580" y="580" width="12" height="55" fill="#2a322e"/><rect x="730" y="580" width="12" height="55" fill="#2a322e"/>` + lamp(560),
  dining:  c => [150, 600, 1020].map((x, i) => chandelier(x)).join('') + rtable(300, 560, 1.3) + rtable(850, 560, 1.3) + rtable(580, 470, .8) + win(450, 160, 300, 180),
  event:   c => `<rect x="300" y="250" width="600" height="110" fill="#2a322e"/><rect x="340" y="270" width="520" height="60" fill="${c}"/>` + [200, 600, 1000].map(chandelier).join('') + rtable(240, 520, 1.1) + rtable(600, 560, 1.4) + rtable(960, 520, 1.1),
  lobby:   c => [150, 450, 750, 1050].map(x => `<path d="M${x-100} 640V260Q${x} 120 ${x+100} 260V640Z" fill="#2a322e"/><path d="M${x-70} 640V275Q${x} 170 ${x+70} 275V640Z" fill="#cfe0da" opacity=".25"/>`).join('') +
    chandelier(300) + chandelier(900) + `<rect x="420" y="520" width="360" height="110" fill="#f3efe4"/><rect x="420" y="520" width="360" height="12" fill="#b89b5e"/><rect x="440" y="545" width="320" height="85" fill="${c}"/>` +
    [90, 1110].map(x => `<rect x="${x-20}" y="580" width="40" height="50" fill="#b89b5e"/><circle cx="${x}" cy="540" r="40" fill="#4d6354"/>`).join('')
};

function makeScene(name, variant = 0) {
  const [a, b, c] = PALETTES[variant % PALETTES.length];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}" stop-opacity=".55"/></linearGradient>
<radialGradient id="g"><stop offset="0" stop-color="#f6dc8e" stop-opacity=".95"/><stop offset="1" stop-color="#f6dc8e" stop-opacity="0"/></radialGradient></defs>
<rect width="1200" height="800" fill="url(#w)"/><rect y="630" width="1200" height="170" fill="#1b211e"/><rect y="630" width="1200" height="5" fill="#b89b5e" opacity=".7"/>
${(SCENES[name] || SCENES.double)(c)}</svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

document.querySelectorAll('img[data-scene]').forEach((img, i) => {
  img.src = makeScene(img.dataset.scene, +img.dataset.v || i);
  const photo = img.dataset.photo;
  if (photo) { // swap in a real photo only if the file exists
    const test = new Image();
    test.onload = () => { img.src = photo; };
    test.src = photo;
  }
});

/* ==========================================================
   2. NAVIGATION: scroll state + mobile menu
   ========================================================== */
const nav = document.getElementById('nav'), burger = document.getElementById('burger'), menu = document.getElementById('menu');
const onScroll = () => nav.classList.toggle('solid', window.scrollY > 60);
window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

function setMenu(open) {
  menu.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
  burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}
burger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

/* ==========================================================
   3. REVEAL ON SCROLL
   ========================================================== */
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ==========================================================
   4. GALLERY LIGHTBOX
   ========================================================== */
const lb = document.getElementById('lb'), lbImg = lb.querySelector('img');
let lastFocus = null;
function openLB(src, alt) {
  lastFocus = document.activeElement;
  lbImg.src = src; lbImg.alt = alt; lb.hidden = false;
  requestAnimationFrame(() => lb.classList.add('open'));
  document.getElementById('lbx').focus();
}
function closeLB() {
  lb.classList.remove('open');
  setTimeout(() => { lb.hidden = true; lastFocus && lastFocus.focus(); }, 350);
}
document.querySelectorAll('[data-full]').forEach(b => b.addEventListener('click', () => {
  const im = b.querySelector('img'); openLB(im.src, im.alt);
}));
document.getElementById('lbx').addEventListener('click', closeLB);
lb.addEventListener('click', e => { if (e.target === lb) closeLB(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !lb.hidden) closeLB(); });

/* ==========================================================
   5. ENQUIRY FORM (frontend only – demo)
   ========================================================== */
const form = document.getElementById('form'), ok = document.getElementById('ok');
const today = new Date().toISOString().split('T')[0];
form.in.min = today; form.out.min = today;

// Room / message prefill from card buttons
document.querySelectorAll('[data-room]').forEach(a => a.addEventListener('click', () => { form.room.value = a.dataset.room; }));
document.querySelectorAll('[data-msg]').forEach(a => a.addEventListener('click', () => { form.msg.value = a.dataset.msg; }));

function setErr(field, msg) {
  document.getElementById('e-' + field.name).textContent = msg;
  field.setAttribute('aria-invalid', msg ? 'true' : 'false');
  return !msg;
}
function validate() {
  const f = form, v = n => f[n].value.trim();
  const res = [
    setErr(f.name, v('name').length < 2 ? 'Please enter your full name.' : ''),
    setErr(f.email, /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v('email')) ? '' : 'Enter a valid email address.'),
    setErr(f.mobile, /^(\+91[\s-]?)?[6-9]\d{9}$/.test(v('mobile').replace(/\s+/g, '')) ? '' : 'Enter a valid 10-digit Indian mobile number.'),
    setErr(f.guests, (+v('guests') >= 1 && +v('guests') <= 10) ? '' : 'Guests must be between 1 and 10.'),
    setErr(f.in, !f.in.value ? 'Select a check-in date.' : f.in.value < today ? 'Check-in cannot be in the past.' : ''),
    setErr(f.out, !f.out.value ? 'Select a check-out date.' : f.out.value <= f.in.value ? 'Check-out must be after check-in.' : '')
  ];
  return res.every(Boolean);
}
form.addEventListener('submit', e => {
  e.preventDefault(); ok.hidden = true;
  if (validate()) { // No backend: nothing is sent.
    ok.hidden = false; form.reset(); form.guests.value = 2; ok.focus && ok.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } else {
    const bad = form.querySelector('[aria-invalid="true"]'); bad && bad.focus();
  }
});
form.addEventListener('input', () => { if (!ok.hidden) ok.hidden = true; });
