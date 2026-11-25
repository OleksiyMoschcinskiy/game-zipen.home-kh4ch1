(function () {
  var form = document.querySelector('.app-form');
  var WRONG = {
    1: ['greens','pineapple','ketchup','mushrooms','olives','yolk'],
    2: ['pineapple','mushrooms','ketchup','olives','butter'],
    3: ['cheese','pineapple','greens','olives','butter'],
    4: ['pineapple','ketchup','mushrooms','cheese','greens','butter','yolk']
  };
  var LVL_TIME = { 1: 45, 2: 40, 3: 35, 4: 30 };
  var S, KEY = 'zipen_best_hard', MUTE = 'zipen_mute';
  function fresh() {
    S = { t0: 0, mist: {1:0,2:0,3:0,4:0}, stars: {}, pend: null, lvl: 0, left: 0, max: 0, iv: null, pause: false };
  }
  fresh();
  var muted = false;
  try { muted = localStorage.getItem(MUTE) === '1'; } catch (e) {}

  // --- звук (WebAudio, без файлів) ---
  var ac;
  function tone(f, d, type, vol, delay) {
    if (muted) return;
    try {
      ac = ac || new (window.AudioContext || window.webkitAudioContext)();
      var o = ac.createOscillator(), g = ac.createGain(), t = ac.currentTime + (delay || 0);
      o.type = type || 'sine'; o.frequency.setValueAtTime(f, t);
      g.gain.setValueAtTime(vol || .12, t); g.gain.exponentialRampToValueAtTime(.0001, t + d);
      o.connect(g); g.connect(ac.destination); o.start(t); o.stop(t + d);
    } catch (e) {}
  }
  var sfx = {
    tap: function () { tone(620, .07, 'triangle', .1); },
    tick: function () { tone(880, .04, 'sine', .06); },
    bad: function () { tone(150, .25, 'sawtooth', .12); },
    win: function (n) { [523, 659, 784, 1047].slice(0, n + 1).forEach(function (f, i) { tone(f, .22, 'triangle', .14, i * .1); }); },
    lose: function () { [330, 262, 196].forEach(function (f, i) { tone(f, .3, 'square', .08, i * .16); }); }
  };
  function buzz(p) { try { navigator.vibrate && navigator.vibrate(p); } catch (e) {} }

  // --- таймер на рівень ---
  function stopLvlTimer() {
    if (S.iv) { clearInterval(S.iv); S.iv = null; }
  }
  function paintLvlTimer() {
    if (!S.lvl) return;
    var pct = Math.max(0, (S.left / S.max) * 100);
    var urg = S.left <= 8;
    document.querySelectorAll('[data-lvl-timer="' + S.lvl + '"]').forEach(function (el) {
      el.textContent = '⏱ ' + Math.max(0, S.left).toFixed(1) + 'с';
      el.classList.toggle('urgent', urg);
    });
    document.querySelectorAll('[data-lvl-bar="' + S.lvl + '"]').forEach(function (el) {
      el.style.width = pct + '%';
      el.style.backgroundColor = urg ? 'var(--danger)' : (pct < 45 ? 'var(--accent)' : 'var(--success)');
    });
  }
  function startLvlTimer(n) {
    stopLvlTimer();
    S.lvl = n;
    S.max = LVL_TIME[n] || 40;
    S.left = S.max;
    S.pause = false;
    paintLvlTimer();
    var lastSec = Math.ceil(S.left);
    S.iv = setInterval(function () {
      if (S.pause) return;
      S.left = Math.max(0, S.left - 0.1);
      paintLvlTimer();
      var sec = Math.ceil(S.left);
      if (sec <= 5 && sec > 0 && sec !== lastSec) { lastSec = sec; sfx.tick(); }
      if (S.left <= 0) {
        stopLvlTimer();
        var loseRadio = document.getElementById('scr-lose-time');
        if (loseRadio) { loseRadio.checked = true; loseRadio.dispatchEvent(new Event('change', { bubbles: true })); }
      }
    }, 100);
  }

  // --- кнопка звуку ---
  var mb = document.createElement('button');
  mb.type = 'button'; mb.className = 'mute-btn'; mb.setAttribute('aria-label', 'Звук');
  function paintMute() { mb.textContent = muted ? '🔇' : '🔊'; }
  mb.onclick = function () { muted = !muted; try { localStorage.setItem(MUTE, muted ? '1' : '0'); } catch (e) {} paintMute(); sfx.tap(); };
  paintMute(); document.body.appendChild(mb);

  // --- рекорд ---
  function bestKey() { return KEY + (window.zipenUid ? '_' + window.zipenUid : ''); }
  function getBest() { try { return JSON.parse(localStorage.getItem(bestKey())); } catch (e) { return null; } }
  function fmt(s) { var m = Math.floor(s / 60), r = Math.round(s % 60); return m + ':' + (r < 10 ? '0' : '') + r; }
  function paintBest() {
    var b = getBest(), box = document.querySelectorAll('.metric-box')[2];
    if (!box) return;
    box.querySelector('strong').textContent = b ? b.stars + '/12 ★' : '— ★';
    box.querySelector('span').textContent = b ? 'Рекорд • ' + fmt(b.time) : 'Рекорд';
  }
  paintBest();
  window.zipenPaintBest = paintBest;

  // --- події печі та подачі зі зняттям чека ---
  var ownClick = false;
  document.addEventListener('pointerdown', function (e) {
    var serveBtn = e.target.closest && e.target.closest('[data-serve-ticket]');
    if (serveBtn && !e.button) {
      e.preventDefault();
      S.pause = true;
      var scr = serveBtn.closest('.screen'), ticket = scr && scr.querySelector('.order-ticket-paper');
      var targetId = serveBtn.htmlFor, radio = document.getElementById(targetId);
      if (ticket) ticket.classList.add('ticket-discarding');
      sfx.tap();
      setTimeout(function () {
        if (ticket) ticket.classList.remove('ticket-discarding');
        if (radio) { radio.checked = true; radio.dispatchEvent(new Event('change', { bubbles: true })); }
      }, 520);
      return;
    }

    var oc = e.target.closest && e.target.closest('.oven-controls');
    if (!oc || e.button) return;
    e.preventDefault();
    var sc = oc.closest('.screen'), n = (sc.className.match(/screen-lvl(\d)-oven/) || [])[1];
    var ndl = sc.querySelector('.timer-needle').getBoundingClientRect(),
        z = sc.querySelector('.zone-perfect').getBoundingClientRect(),
        c = ndl.left + ndl.width / 2, labs = oc.querySelectorAll('label'),
        lab = c < z.left ? labs[0] : (c > z.right ? labs[2] : labs[1]);
    if (lab === labs[1]) S.pend = { n: +n, dist: Math.min(1, Math.abs(c - (z.left + z.width / 2)) / (z.width / 2)) };
    ownClick = true; lab.click(); ownClick = false;
  }, true);
  document.addEventListener('click', function (e) {
    if (!ownClick && e.target.closest('.oven-controls, [data-serve-ticket]')) e.preventDefault();
  }, true);

  form.addEventListener('change', function (e) {
    var id = e.target.id || '', m;
    if (e.target.type === 'checkbox' && (m = id.match(/^l(\d)-([a-z]+)$/))) {
      var n = +m[1];
      if (e.target.checked && WRONG[n].indexOf(m[2]) > -1) { S.mist[n]++; sfx.bad(); buzz(40); }
      else sfx.tap();
      return;
    }
    if (e.target.name !== 'screen') return;
    if (id === 'scr-lvl1-prep' && !S.t0) S.t0 = Date.now();
    var prepM = id.match(/^scr-lvl(\d)-prep$/);
    if (prepM) { startLvlTimer(+prepM[1]); return; }
    if (/^scr-lose/.test(id)) { stopLvlTimer(); sfx.lose(); buzz([120, 60, 200]); return; }
    var w = id.match(/^scr-lvl(\d)-win$/) || (id === 'scr-final-win' ? [0, 4] : null);
    if (!w || !S.pend) return;
    stopLvlTimer();
    var n2 = +w[1], acc = Math.round((1 - S.pend.dist) * 100), st = 3;
    if (S.pend.dist > .35) st--;
    if (S.mist[n2] >= 1) st--;
    st = Math.max(1, st);
    S.stars[n2] = st;
    var scr = document.querySelector('.screen-' + (id === 'scr-final-win' ? 'final-win' : 'lvl' + n2 + '-win')),
        title = scr.querySelector('.result-title');
    var row = document.createElement('div'); row.className = 'star-row';
    row.innerHTML = [1,2,3].map(function (i) { return '<span class="' + (i > st ? 'off' : '') + '">★</span>'; }).join('');
    var note = document.createElement('div'); note.className = 'star-note';
    note.textContent = 'Точність печі: ' + acc + '% • Залишок часу: ' + S.left.toFixed(1) + 'с • Помилок: ' + S.mist[n2];
    title.parentNode.insertBefore(row, title); title.parentNode.insertBefore(note, title);
    sfx.win(st); buzz(st === 3 ? [60, 40, 60, 40, 120] : 60);
    if (id === 'scr-final-win') finish(scr);
  });

  function finish(scr) {
    var total = 0; for (var k in S.stars) total += S.stars[k];
    var secs = (Date.now() - S.t0) / 1000, b = getBest(), rec = !b || total > b.stars || (total === b.stars && secs < b.time);
    if (rec) {
      try { localStorage.setItem(bestKey(), JSON.stringify({ stars: total, time: secs })); } catch (e) {}
      if (window.zipenSaveBest) window.zipenSaveBest({ stars: total, time: secs });
    }
    var info = document.createElement('div'); info.className = 'final-stats';
    info.textContent = '⭐ ' + total + '/12 • ⏱ ' + fmt(secs) + (rec ? ' • 🏆 Новий рекорд!' : '');
    var share = document.createElement('button'); share.type = 'button'; share.className = 'btn btn-outline'; share.style.maxWidth = '320px';
    share.textContent = 'Поділитись результатом 📤';
    share.onclick = function () {
      var text = window.I18N ? I18N.share(total, fmt(secs), location.href) : 'Я пройшов Hardcore зміну в zipen.home Kitchen Simulator: ' + total + '/12 ⭐ за ' + fmt(secs) + '! Зможеш краще? ' + location.href;
      if (navigator.share) navigator.share({ text: text }).catch(function () {});
      else if (navigator.clipboard) navigator.clipboard.writeText(text).then(function () { share.textContent = 'Скопійовано ✅'; });
    };
    var desc = scr.querySelector('.result-desc');
    desc.parentNode.insertBefore(info, desc.nextSibling); desc.parentNode.insertBefore(share, info.nextSibling);
    paintBest();
  }

  form.addEventListener('reset', function () {
    setTimeout(function () {
      stopLvlTimer();
      fresh();
      document.querySelectorAll('.star-row,.star-note,.final-stats').forEach(function (n) { n.remove(); });
      document.querySelectorAll('.screen-final-win .btn-outline').forEach(function (n) { n.remove(); });
      paintBest();
    }, 0);
  });
})();
