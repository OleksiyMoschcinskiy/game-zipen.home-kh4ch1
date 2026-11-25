(function () {
  var P = {}, G = null, CUT = null, CUTS = { 2: 0, 3: 0, 4: 0 }, GLAZE = { yolk: 1, butter: 1, 'post-butter': 1 };
  var NEED = { dough: 115, knead: 520, sculpt: 7.2 };
  var TXT = { dough: 'Затисни і потягни тісто на стіл', knead: 'Водь пальцем туди-сюди, щоб розкачати', sculpt: 'Обведи пальцем по колу, щоб зліпити борт' };

  document.querySelectorAll('.board-click-zone').forEach(function (z) {
    var k = z.htmlFor.split('-')[1], pill = z.querySelector('.board-prompt-pill');
    if (pill && TXT[k]) pill.textContent = TXT[k];
  });
  function toast(m) {
    var t = document.createElement('div'); t.className = 'g-toast'; t.textContent = m;
    document.body.appendChild(t); setTimeout(function () { t.remove(); }, 1700);
  }
  function setCb(cb, v) { cb.checked = v; cb.dispatchEvent(new Event('change', { bubbles: true })); }
  function buzz(p) { try { navigator.vibrate && navigator.vibrate(p); } catch (e) {} }

  document.addEventListener('click', function (e) {
    if (e.target.closest('.board-click-zone, .ing-card')) e.preventDefault();
  }, true);

  document.addEventListener('pointerdown', function (e) {
    var cz = e.target.closest('.cut-zone');
    if (cz) {
      e.preventDefault();
      CUT = { cz: cz, n: +cz.dataset.cutLvl, sx: e.clientX, sy: e.clientY };
      return;
    }

    var z = e.target.closest('.board-click-zone'), c = e.target.closest('.ing-card');
    var lab = z || c; if (!lab) return;
    e.preventDefault();
    var id = lab.htmlFor, dash = id.indexOf('-'), parts = [id.slice(0, dash), id.slice(dash + 1)], cb = document.getElementById(id);
    if (z && window.ZR && !ZR.can(parts[0].slice(1), parts[1])) { toast(ZR.msg(parts[0].slice(1), parts[1])); return; }
    G = { z: z, c: c, id: id, key: parts[1], n: parts[0].slice(1), cb: cb, x: e.clientX, y: e.clientY, path: 0, sweep: 0, ang: null, over: 0, moved: 0 };
    if (z) {
      var m = z.querySelector('.g-meter');
      if (!m) { m = document.createElement('span'); m.className = 'g-meter'; m.innerHTML = '<i></i>'; z.appendChild(m); }
      m.firstChild.style.width = ((P[id] || 0) * 100) + '%';
    } else if (!cb.checked) {
      G.sx = e.clientX; G.sy = e.clientY;
      if (e.pointerType === 'touch') { var gg = G; G.timer = setTimeout(function () { if (G === gg) pick(gg); }, 170); }
      else pick(G);
    }
  }, { passive: false });
  function pick(g) {
    var d = document.createElement('div'); d.className = 'ing-ghost';
    d.textContent = g.c.querySelector('.emoji').textContent;
    d.style.left = g.x + 'px'; d.style.top = g.y + 'px';
    document.body.appendChild(d); g.ghost = d; g.c.classList.add('dragging'); buzz(15);
  }
  document.addEventListener('touchmove', function (e) { if ((G && G.ghost || CUT) && e.cancelable) e.preventDefault(); }, { passive: false });

  function dough(el) { return el.closest('.screen').querySelector('.dough-entity'); }
  function hit(d, x, y) { var r = d.getBoundingClientRect(); return x > r.left - 30 && x < r.right + 30 && y > r.top - 30 && y < r.bottom + 30; }

  document.addEventListener('pointermove', function (e) {
    if (CUT) {
      var dist = Math.hypot(e.clientX - CUT.sx, e.clientY - CUT.sy);
      if (dist > 85 && CUTS[CUT.n] < 4) {
        var idx = CUTS[CUT.n]++;
        var lines = CUT.cz.parentElement.querySelectorAll('.slice-lines i');
        if (lines[idx]) lines[idx].classList.add('cut-done');
        var pill = CUT.cz.querySelector('.board-prompt-pill');
        if (pill) pill.textContent = '🔪 Проведи ножем по коржу (' + CUTS[CUT.n] + ' / 4 розрізи)';
        buzz(25);
        CUT.sx = e.clientX; CUT.sy = e.clientY;
        if (CUTS[CUT.n] >= 4) {
          var cbCut = document.getElementById('l' + CUT.n + '-post-cut');
          CUT = null;
          if (cbCut) setCb(cbCut, true);
        }
      }
      return;
    }
    if (!G) return;
    if (G.timer && !G.ghost) { if (Math.hypot(e.clientX - G.sx, e.clientY - G.sy) > 9) { clearTimeout(G.timer); G = null; } return; }
    var dx = e.clientX - G.x, dy = e.clientY - G.y, d = Math.hypot(dx, dy);
    G.x = e.clientX; G.y = e.clientY; G.moved += d;
    if (G.z) {
      var prog = P[G.id] || 0;
      if (G.key === 'sculpt') {
        var r = G.z.getBoundingClientRect(), cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        if (Math.hypot(e.clientX - cx, e.clientY - cy) > 25) {
          var a = Math.atan2(e.clientY - cy, e.clientX - cx);
          if (G.ang !== null) { var da = a - G.ang; if (da > Math.PI) da -= 2 * Math.PI; if (da < -Math.PI) da += 2 * Math.PI; prog += Math.abs(da) / NEED.sculpt; }
          G.ang = a;
        }
      } else prog += d / NEED[G.key];
      P[G.id] = prog = Math.min(1, prog);
      var m = G.z.querySelector('.g-meter'); if (m) m.firstChild.style.width = (prog * 100) + '%';
      if (prog >= 1) { var cb = G.cb; G = null; buzz(40); setCb(cb, true); }
    } else if (G.ghost) {
      G.ghost.style.left = e.clientX + 'px'; G.ghost.style.top = e.clientY + 'px';
      var dg = dough(G.c), on = hit(dg, e.clientX, e.clientY);
      dg.classList.toggle('drop-hot', on);
      if (on) G.over += d;
    }
  });

  function end(cancel) {
    if (CUT) { CUT = null; return; }
    if (!G) return;
    var g = G; G = null;
    if (g.timer) clearTimeout(g.timer);
    if (!g.c) return;
    g.c.classList.remove('dragging');
    if (g.ghost) {
      g.ghost.remove();
      var dg = g.c.closest('.screen').querySelector('.dough-entity'); dg.classList.remove('drop-hot');
      if (cancel || !hit(dg, g.x, g.y)) { if (!cancel && g.moved < 10) toast('Утримуй і перетягни на тісто'); return; }
      if (window.ZR && !ZR.can(g.n, g.key)) return toast(ZR.msg(g.n, g.key));
      var needBrush = GLAZE[g.key] && !(g.n === '1' && g.key === 'post-yolk');
      if (needBrush && g.over < 220) return toast('Ретельніше змащуй пензликом по поверхні!');
      buzz(30); setCb(g.cb, true);
    } else if (g.cb.checked && g.moved < 10 && !cancel) {
      if (window.ZR && !ZR.removable(g.n, g.key)) toast('Цей крок уже виконано'); else setCb(g.cb, false);
    } else if (!g.cb.checked && g.moved < 10 && !cancel) toast('Утримуй і перетягни на тісто');
  }
  document.addEventListener('pointerup', function () { end(false); });
  document.addEventListener('pointercancel', function () { end(true); });
  document.querySelector('.app-form').addEventListener('reset', function () {
    P = {}; CUTS = { 2: 0, 3: 0, 4: 0 };
    document.querySelectorAll('.slice-lines i').forEach(function (i) { i.classList.remove('cut-done'); });
    document.querySelectorAll('.cut-zone .board-prompt-pill').forEach(function (p) { p.textContent = '🔪 Проведи ножем по коржу (0 / 4 розрізи)'; });
  });
})();
