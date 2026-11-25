/* =====================================================================
   FIREBASE: вставте сюди свої ключі
   Firebase Console → Project settings → Your apps → Web app → firebaseConfig
   ===================================================================== */
const firebaseConfig = {
  apiKey: "AIzaSyBoXSgzrmvm2ZbUMy1smjqoDMnZqMEjErw",
  authDomain: "kh4ch1-813d9.firebaseapp.com",
  projectId: "kh4ch1-813d9",
  storageBucket: "kh4ch1-813d9.firebasestorage.app",
  messagingSenderId: "1056961125503",
  appId: "1:1056961125503:web:02ba88873f1ce0db03734a"
};
/* ===================================================================== */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
  getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  sendPasswordResetEmail, sendEmailVerification, updateProfile, signOut,
  RecaptchaVerifier, signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, serverTimestamp }
  from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const $ = (s) => document.querySelector(s);
const gate = $('#auth-gate');

if (!firebaseConfig.apiKey || firebaseConfig.apiKey.startsWith('ВСТАВТЕ')) {
  $('#auth-loading').hidden = true;
  $('#auth-config-warn').hidden = false;
  gate.classList.remove('is-pending');
} else {
  start();
}

function start() {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  auth.languageCode = (window.I18N && I18N.lang) || 'uk';
  window.addEventListener('zipen:lang', (e) => { auth.languageCode = e.detail; });
  const db = getFirestore(app);

  const ERR = {
    'auth/invalid-email': 'Невірна адреса пошти.',
    'auth/missing-email': 'Введіть адресу пошти.',
    'auth/missing-password': 'Введіть пароль.',
    'auth/email-already-in-use': 'Ця пошта вже зареєстрована — увійдіть.',
    'auth/weak-password': 'Пароль закороткий — мінімум 6 символів.',
    'auth/invalid-credential': 'Невірна пошта або пароль.',
    'auth/user-not-found': 'Невірна пошта або пароль.',
    'auth/wrong-password': 'Невірна пошта або пароль.',
    'auth/too-many-requests': 'Забагато спроб. Зачекайте кілька хвилин і спробуйте знову.',
    'auth/invalid-phone-number': 'Невірний номер. Формат: +380501234567.',
    'auth/missing-phone-number': 'Введіть номер телефону.',
    'auth/invalid-verification-code': 'Невірний код.',
    'auth/missing-verification-code': 'Введіть код із SMS.',
    'auth/code-expired': 'Код прострочено — запросіть новий.',
    'auth/quota-exceeded': 'Ліміт SMS вичерпано. Спробуйте пізніше або увійдіть через пошту.',
    'auth/captcha-check-failed': 'Не вдалося пройти перевірку reCAPTCHA. Спробуйте ще раз.',
    'auth/network-request-failed': 'Немає з’єднання з інтернетом.',
    'auth/operation-not-allowed': 'Цей спосіб входу ще не увімкнено у Firebase.',
    'auth/unauthorized-domain': 'Цей домен не додано до дозволених у Firebase (Authentication → Settings).'
  };
  const errText = (e) => ERR[e && e.code] || 'Щось пішло не так. Спробуйте ще раз.';
  const msg = (t, ok) => { const m = $('#auth-msg'); m.textContent = t || ''; m.className = 'auth-msg' + (ok ? ' ok' : ''); };
  const busy = (on) => gate.querySelectorAll('.auth-btn').forEach((b) => { b.disabled = on; });

  /* --- вкладки --- */
  gate.querySelectorAll('.auth-tab').forEach((t) => t.addEventListener('click', () => {
    gate.querySelectorAll('.auth-tab').forEach((x) => x.classList.toggle('is-on', x === t));
    const phone = t.dataset.tab === 'phone';
    $('#form-email').hidden = phone;
    $('#form-phone').hidden = !phone;
    msg('');
  }));

  /* --- пошта: вхід / реєстрація --- */
  let regMode = false;
  function paintMode() {
    $('#em-name-wrap').hidden = !regMode;
    $('#em-submit').textContent = regMode ? 'Створити акаунт' : 'Увійти';
    $('#em-toggle').textContent = regMode ? 'Вже є акаунт? Увійти' : 'Немає акаунта? Зареєструватися';
    $('#em-pass').autocomplete = regMode ? 'new-password' : 'current-password';
    msg('');
  }
  $('#em-toggle').addEventListener('click', () => { regMode = !regMode; paintMode(); });

  $('#form-email').addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const email = $('#em-email').value.trim(), pass = $('#em-pass').value;
    if (!email) return msg('Введіть адресу пошти.');
    if (!pass) return msg('Введіть пароль.');
    busy(true); msg('');
    try {
      if (regMode) {
        const cred = await createUserWithEmailAndPassword(auth, email, pass);
        const name = $('#em-name').value.trim();
        if (name) { try { await updateProfile(cred.user, { displayName: name }); } catch (e) {} }
        try { await sendEmailVerification(cred.user); } catch (e) {}
        paintChip(auth.currentUser);
      } else {
        await signInWithEmailAndPassword(auth, email, pass);
      }
    } catch (e) { msg(errText(e)); }
    busy(false);
  });

  $('#em-forgot').addEventListener('click', async () => {
    const email = $('#em-email').value.trim();
    if (!email) return msg('Спочатку введіть пошту у поле вище.');
    try {
      await sendPasswordResetEmail(auth, email);
      msg('Якщо така пошта зареєстрована, ми надіслали лист для скидання пароля.', true);
    } catch (e) { msg(errText(e)); }
  });

  /* --- телефон: SMS-код --- */
  let verifier = null, confirmation = null;
  const normPhone = (v) => {
    v = v.replace(/[\s()\-.]/g, '');
    if (/^0\d{9}$/.test(v)) return '+38' + v;
    if (/^380\d{9}$/.test(v)) return '+' + v;
    return v;
  };
  function resetVerifier() {
    try { if (verifier) verifier.clear(); } catch (e) {}
    verifier = null;
    $('#recaptcha-container').innerHTML = '';
  }
  function phoneStep(n) { $('#ph-step1').hidden = n !== 1; $('#ph-step2').hidden = n !== 2; }

  $('#form-phone').addEventListener('submit', async (ev) => {
    ev.preventDefault();
    if (!$('#ph-step2').hidden) {
      const code = $('#ph-code').value.trim();
      if (!code) return msg('Введіть код із SMS.');
      busy(true); msg('');
      try { await confirmation.confirm(code); } catch (e) { msg(errText(e)); }
      busy(false);
      return;
    }
    const phone = normPhone($('#ph-num').value);
    if (!/^\+\d{8,15}$/.test(phone)) return msg('Введіть номер у форматі +380501234567.');
    busy(true); msg('');
    try {
      if (!verifier) verifier = new RecaptchaVerifier(auth, 'recaptcha-container', { size: 'invisible' });
      confirmation = await signInWithPhoneNumber(auth, phone, verifier);
      phoneStep(2);
      msg('Код надіслано на ' + phone + '.', true);
      $('#ph-code').focus();
    } catch (e) { resetVerifier(); msg(errText(e)); }
    busy(false);
  });
  $('#ph-back').addEventListener('click', () => { confirmation = null; resetVerifier(); phoneStep(1); msg(''); });

  /* --- рекорди: локально + Firestore (players/{uid}) --- */
  const better = (a, b) => !!a && (!b || a.stars > b.stars || (a.stars === b.stars && a.time < b.time));
  const nameOf = (u) => u.displayName || u.email || u.phoneNumber || 'Гравець';

  function saveCloud(user, rec) {
    return setDoc(doc(db, 'players', user.uid),
      { stars: rec.stars, time: rec.time, name: String(nameOf(user)).slice(0, 40), updatedAt: serverTimestamp() },
      { merge: true }).catch((e) => console.warn('Не вдалося зберегти рекорд у хмару:', e));
  }
  window.zipenSaveBest = (rec) => { const u = auth.currentUser; if (u) saveCloud(u, rec); };

  async function syncBest(user) {
    const key = 'zipen_best_hard_' + user.uid;
    let local = null, cloud = null;
    try { local = JSON.parse(localStorage.getItem(key)); } catch (e) {}
    try {
      const s = await getDoc(doc(db, 'players', user.uid));
      if (s.exists()) cloud = { stars: s.data().stars, time: s.data().time };
    } catch (e) { console.warn('Не вдалося прочитати рекорд із хмари:', e); }
    const best = better(cloud, local) ? cloud : local;
    if (best) { try { localStorage.setItem(key, JSON.stringify(best)); } catch (e) {} }
    if (better(local, cloud)) saveCloud(user, local);
  }

  /* --- чіп «Вийти» у шапці --- */
  const chip = $('#auth-chip');
  function paintChip(user) {
    chip.hidden = !user;
    if (user) chip.querySelector('.auth-chip-name').textContent = nameOf(user);
  }
  chip.addEventListener('click', async () => { try { await signOut(auth); } finally { location.reload(); } });

  /* --- стан входу --- */
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      window.zipenUid = user.uid;
      await syncBest(user);
      paintChip(user);
      if (window.zipenPaintBest) window.zipenPaintBest();
      gate.hidden = true;
    } else {
      window.zipenUid = null;
      paintChip(null);
      $('#auth-loading').hidden = true;
      $('#auth-panel').hidden = false;
      gate.classList.remove('is-pending');
      gate.hidden = false;
    }
  });
}
