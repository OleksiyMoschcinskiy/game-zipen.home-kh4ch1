(function () {
  var form = document.querySelector('.app-form'), R = Math.random, TAU = Math.PI * 2, DEG = 180 / Math.PI;
  var SKIN = '#efbd91', LINE = '#b9794d';
  var BOWL = '<svg viewBox="0 0 58 46" width="58" height="46"><ellipse cx="29" cy="14" rx="26" ry="8" fill="#5a4030"/>' +
    '<ellipse class="bowl-dough" cx="29" cy="12" rx="19" ry="11" fill="#f1d9a0" stroke="#d8b878"/>' +
    '<path d="M3 14 Q4 42 29 43 Q54 42 55 14 Q42 24 29 24 Q16 24 3 14Z" fill="#9a6b46" stroke="#6b4a2b"/>' +
    '<ellipse cx="29" cy="14" rx="26" ry="8" fill="none" stroke="#c28a5a" stroke-width="2"/></svg>';
  var FING = [[13.5, 10, 26], [21.5, 4, 32], [29.5, 6, 30], [37.5, 12, 24]];
  var HAND = '<svg viewBox="0 0 56 78" width="56" height="78" style="left:0;top:0;overflow:visible">' +
    '<rect x="14" y="54" width="28" height="300" rx="4" fill="#facc15" stroke="#b45309" stroke-width="1.5"/><rect x="14" y="54" width="28" height="7" fill="#fff"/>' +
    '<g class="th"><rect x="3" y="34" width="12" height="24" rx="6" fill="' + SKIN + '" stroke="' + LINE + '" stroke-width="1.5" transform="rotate(-28 9 56)"/></g>' +
    FING.map(function (f) { return '<g class="f"><rect x="' + f[0] + '" y="' + f[1] + '" width="7" height="' + f[2] + '" rx="3.5" fill="' + SKIN + '" stroke="' + LINE + '" stroke-width="1.5"/></g>'; }).join('') +
    '<rect x="13" y="30" width="30" height="28" rx="10" fill="' + SKIN + '" stroke="' + LINE + '" stroke-width="1.5"/></svg>';
  var BRUSH = '<i style="left:25px;top:-4px;width:6px;height:44px;border-radius:3px;background:#8a5a2b"></i>' +
    '<i style="left:24px;top:-12px;width:8px;height:9px;border-radius:2px;background:#9ca3af"></i>' +
    '<i style="left:22px;top:-26px;width:12px;height:15px;border-radius:5px 5px 2px 2px;background:#f2c46d"></i>';
  var SPR = {
    imeretian: { n: 22, c: ['#fffbea', '#f5efd8', '#fff7d6'], w: 6, h: 5, r: 2 },
    mozzarella: { n: 28, c: ['#ffffff', '#f8fafc', '#fefce8'], w: 14, h: 4, r: 2 },
    lobio: { n: 20, c: ['#7f1d1d', '#991b1b', '#b45309'], w: 9, h: 6, r: '50%' },
    cheese: { n: 26, c: ['#fff4b8', '#fde68a', '#fef9c3'], w: 11, h: 3, r: 2 },
    greens: { n: 14, c: ['#4ade80', '#16a34a', '#22c55e'], w: 13, h: 6, r: '100% 0' },
    meat: { n: 15, c: ['#92400e', '#7c2d12', '#b45309'], w: 8, h: 8, r: 4 },
    onion: { n: 14, c: ['#f5f3ff', '#e9d5ff'], w: 11, h: 11, r: 6, ring: 1 },
    spices: { n: 24, c: ['#dc2626', '#f97316', '#facc15'], w: 4, h: 4, r: 2 },
    pineapple: { n: 6, c: ['#fde047'], w: 11, h: 11, r: 3 }, ketchup: { n: 6, c: ['#dc2626'], w: 10, h: 7, r: '50%' },
    mushrooms: { n: 6, c: ['#e7d9c4'], w: 12, h: 9, r: '50% 50% 25% 25%' }, olives: { n: 7, c: ['#27272a'], w: 9, h: 9, r: '50%', ring: 1 }
  };

  function mk(P, css, html) { var e = document.createElement('div'); e.style.cssText = css; if (html) e.innerHTML = html; P.appendChild(e); return e; }
  function bowls() {
    document.querySelectorAll('.interactive-board:not(.post-board)').forEach(function (b) {
      if (!b.querySelector('.fx-bowl')) { var d = document.createElement('div'); d.className = 'fx-bowl'; d.innerHTML = BOWL; b.appendChild(d); }
    });
  }
  bowls();

  function hand(P, brush, mirror) {
    var ay = brush ? -26 : 8, h = mk(P, 'left:0;top:0;width:56px;height:78px;opacity:0;transform-origin:28px ' + ay + 'px', (brush ? BRUSH : '') + HAND);
    h._ay = ay; if (mirror) h.querySelector('svg').style.transform = 'scaleX(-1)';
    return h;
  }
  function run(h, pts, T, ease) {
    h.animate(pts.map(function (p) {
      return { transform: 'translate(' + (p.x - 28) + 'px,' + (p.y - h._ay) + 'px) rotate(' + (p.d || 0) + 'deg)', opacity: p.o == null ? 1 : p.o, offset: p.t / T };
    }), { duration: T, fill: 'both', easing: ease || 'ease-in-out' });
  }
  function curl(h, delay, n) {
    h.querySelectorAll('.f').forEach(function (f, i) {
      f.animate([{ transform: 'scaleY(1)' }, { transform: 'scaleY(' + (.66 + i * .04) + ')' }, { transform: 'scaleY(1)' }], { duration: 380, delay: delay + i * 30, iterations: n, easing: 'ease-in-out' });
    });
    var t = h.querySelector('.th');
    if (t) t.animate([{ transform: 'rotate(0)' }, { transform: 'rotate(16deg)' }, { transform: 'rotate(0)' }], { duration: 380, delay: delay, iterations: n });
  }
  function later(fn, ms) { setTimeout(fn, ms); }

  // --- 1. тісто з миски на стіл ---
  function doDough(c) {
    var T = 1200, bx = 35, by = c.H / 2, cs = getComputedStyle(c.dg);
    c.dg.classList.add('fx-wait'); later(function () { c.dg.classList.remove('fx-wait'); }, 920);
    later(function () { c.board.classList.add('bowl-empty'); }, 350);
    var ball = mk(c.L, 'left:0;top:0;width:82px;height:82px;border-radius:50%;transform-origin:41px 41px');
    ball.style.backgroundColor = cs.backgroundColor; ball.style.backgroundImage = cs.backgroundImage;
    ball.style.border = cs.borderTopWidth + ' ' + cs.borderTopStyle + ' ' + cs.borderTopColor; ball.style.boxShadow = cs.boxShadow;
    var bf = [[bx, by - 4, .5, 0], [bx, by - 4, .5, 350], [c.cx, c.cy, 1, 920], [c.cx, c.cy, 1, T]];
    ball.animate(bf.map(function (p) { return { transform: 'translate(' + (p[0] - 41) + 'px,' + (p[1] - 41) + 'px) scale(' + p[2] + ')', offset: p[3] / T }; }), { duration: T, fill: 'both', easing: 'ease-in-out' });
    later(function () { ball.remove(); }, 1300);
    var h = hand(c.L, false, false);
    run(h, [{ x: bx, y: c.H + 80, o: 0, t: 0 }, { x: bx, y: c.H + 80, t: 25 }, { x: bx, y: by + 8, t: 350 }, { x: bx, y: by + 8, t: 450 },
            { x: c.cx, y: c.cy + 10, t: 920 }, { x: c.cx, y: c.cy + 10, t: 1020 }, { x: c.cx + 36, y: c.H + 90, t: 1180 }, { x: c.cx + 36, y: c.H + 90, o: 0, t: T }], T);
    curl(h, 320, 1);
    return 1250;
  }

  // --- 2. розкатування скалкою ---
  function doKnead(c) {
    var T = 1400, gw = c.rx * 2 + 46;
    c.dg.classList.add('fx-hold'); later(function () { c.dg.classList.remove('fx-hold'); }, 280);
    var g = mk(c.L, 'left:0;top:0;width:' + gw + 'px;height:16px',
      '<i style="left:0;top:0;width:100%;height:16px;border-radius:8px;background:linear-gradient(#ecc994,#a8743a);box-shadow:0 5px 8px rgba(0,0,0,.45)"></i>' +
      '<i style="left:-14px;top:-3px;width:22px;height:22px;border-radius:50%;background:#8a5a2b"></i><i style="right:-14px;top:-3px;width:22px;height:22px;border-radius:50%;background:#8a5a2b"></i>');
    [10, gw - 66].forEach(function (x, i) { var hh = hand(g, false, i === 1); hh.style.left = x + 'px'; hh.style.top = '-56px'; hh.style.opacity = 1; });
    var ys = [[0, c.H + 60], [280, c.cy + c.ry * .8], [700, c.cy - c.ry * .8], [1100, c.cy + c.ry * .8], [T, c.H + 60]];
    g.animate(ys.map(function (p) { return { transform: 'translate(' + (c.cx - gw / 2) + 'px,' + (p[1] - 8) + 'px)', offset: p[0] / T }; }), { duration: T, fill: 'both', easing: 'ease-in-out' });
    return T;
  }

  // --- 3. ліпка по контуру двома руками ---
  function doSculpt(c) {
    var T = 2100, N = 26, boat = c.n === '1', rx = boat ? 112 : 74, ry = boat ? 52 : 74, s0 = boat ? 620 : 300, s1 = 1850;
    c.dg.classList.add('fx-hold'); later(function () { c.dg.classList.remove('fx-hold'); }, 400);
    [[180, 360], [0, 180]].forEach(function (arc, k) {
      var h = hand(c.L, false, k === 1), pts = [], prev = null;
      function pt(a, o, t, op) {
        var r = a / DEG, nx = -Math.cos(r) / rx, ny = -Math.sin(r) / ry, d = Math.atan2(nx, -ny) * DEG;
        if (prev !== null) { while (d - prev > 180) d -= 360; while (d - prev < -180) d += 360; }
        prev = d;
        pts.push({ x: c.cx + Math.cos(r) * (rx + o), y: c.cy + Math.sin(r) * (ry + o), d: d, o: op, t: t });
      }
      pt(arc[0], 70, 0, 0); pt(arc[0], 70, 30, 1); pt(arc[0], 0, 300, 1);
      if (boat) { pt(arc[0], 0, 380, 1); pt(arc[0], 18, 540, 1); pt(arc[0], 0, s0, 1); }
      for (var i = 0; i <= N; i++) pt(arc[0] + (arc[1] - arc[0]) * i / N, 0, s0 + (s1 - s0) * i / N, 1);
      pt(arc[1], 70, 2020, 1); pt(arc[1], 70, T, 0);
      run(h, pts, T);
      if (boat) curl(h, 380, 1);
      curl(h, s0, Math.round((s1 - s0) / 360));
    });
    return T + 80;
  }

  // --- анімація розбивання яйця та додавання жовтка в Аджарське ---
  function doCrackYolk(c) {
    var T = 1150;
    var leftShell = mk(c.L, 'left:' + (c.cx - 24) + 'px;top:' + (c.cy - 54) + 'px;width:24px;height:34px;background:linear-gradient(135deg,#fffaf0,#e7d7c1);border:1.5px solid #cbd5e1;border-radius:24px 0 0 24px;clip-path:polygon(0 0, 100% 0, 82% 28%, 100% 52%, 80% 76%, 100% 100%, 0 100%);transform-origin:top right');
    var rightShell = mk(c.L, 'left:' + c.cx + 'px;top:' + (c.cy - 54) + 'px;width:24px;height:34px;background:linear-gradient(225deg,#fffaf0,#e7d7c1);border:1.5px solid #cbd5e1;border-radius:0 24px 24px 0;clip-path:polygon(0 0, 100% 0, 100% 100%, 0 100%, 18% 76%, 0 52%, 18% 28%);transform-origin:top left');

    leftShell.animate([
      { transform: 'translate(70px,-65px) rotate(12deg)', opacity: 0 },
      { transform: 'translate(0,0) rotate(0deg)', opacity: 1, offset: .28 },
      { transform: 'translate(0,0) rotate(0deg)', opacity: 1, offset: .42 },
      { transform: 'translate(-22px,-8px) rotate(-38deg)', opacity: 1, offset: .72 },
      { transform: 'translate(-55px,-35px) rotate(-55deg)', opacity: 0 }
    ], { duration: T, easing: 'ease-in-out', fill: 'both' });

    rightShell.animate([
      { transform: 'translate(70px,-65px) rotate(12deg)', opacity: 0 },
      { transform: 'translate(0,0) rotate(0deg)', opacity: 1, offset: .28 },
      { transform: 'translate(0,0) rotate(0deg)', opacity: 1, offset: .42 },
      { transform: 'translate(22px,-8px) rotate(38deg)', opacity: 1, offset: .72 },
      { transform: 'translate(55px,-35px) rotate(55deg)', opacity: 0 }
    ], { duration: T, easing: 'ease-in-out', fill: 'both' });

    var dropYolk = mk(c.L, 'left:' + c.cx + 'px;top:' + (c.cy - 34) + 'px;width:30px;height:30px;border-radius:50%;background:radial-gradient(circle at 30% 30%,#fde047,#f97316);box-shadow:0 4px 10px rgba(180,83,9,.5)');
    dropYolk.animate([
      { transform: 'translate(-50%,-50%) scale(.4)', opacity: 0, offset: 0 },
      { transform: 'translate(-50%,-50%) scale(.6)', opacity: 0, offset: .42 },
      { transform: 'translate(-50%, 6px) scale(1.05)', opacity: 1, offset: .62 },
      { transform: 'translate(-50%, 34px) scale(1.12, .9)', opacity: 1, offset: .82 },
      { transform: 'translate(-50%, 34px) scale(1)', opacity: 0, offset: 1 }
    ], { duration: T, easing: 'cubic-bezier(.34,1.3,.64,1)', fill: 'both' });

    return T;
  }

  // --- посипання ---
  function sprinkle(c, k) {
    var sp = SPR[k]; if (!sp) return;
    for (var i = 0; i < sp.n; i++) {
      var a = R() * TAU, r = Math.sqrt(R()) * .8, rot = R() * 360, col = sp.c[i % sp.c.length];
      mk(c.L, 'left:' + (c.cx + Math.cos(a) * c.rx * r) + 'px;top:' + (c.cy + Math.sin(a) * c.ry * r) + 'px;width:' + sp.w + 'px;height:' + sp.h + 'px;border-radius:' + (typeof sp.r === 'number' ? sp.r + 'px' : sp.r) + ';' + (sp.ring ? 'border:3px solid ' + col : 'background:' + col) + ';box-shadow:0 1px 2px rgba(0,0,0,0.35)')
        .animate([{ transform: 'translate(-50%,-150px) rotate(0)', opacity: 0 }, { transform: 'translate(-50%,-110px) rotate(' + rot / 4 + 'deg)', opacity: 1, offset: .15 },
                  { transform: 'translate(-50%,-50%) rotate(' + rot + 'deg)', opacity: 1, offset: .75 }, { transform: 'translate(-50%,-50%) rotate(' + rot + 'deg)', opacity: 0 }],
          { duration: 1000, delay: i * 24, easing: 'cubic-bezier(.35,.1,.7,1)', fill: 'both' });
    }
  }

  // --- змащування пензликом: бортик (аджарське) або вся поверхня ---
  var NS = 'http://www.w3.org/2000/svg';
  function glaze(c, k) {
    var boat = c.n === '1', w = boat ? 224 : 148, h = boat ? 104 : 148, pts = [], i, a;
    if (boat) for (i = 0; i <= 72; i++) { a = -Math.PI / 2 + TAU * i / 72; pts.push([w / 2 + Math.cos(a) * (w / 2 - 6), h / 2 + Math.sin(a) * (h / 2 - 6)]); }
    else for (i = 0; i <= 130; i++) { a = TAU * 3 * i / 130 - Math.PI / 2; var r = (w / 2 - 7) * (1 - .9 * i / 130); pts.push([w / 2 + Math.cos(a) * r, h / 2 + Math.sin(a) * r]); }
    var gs = c.board.querySelector('.gloss');
    if (!gs) {
      gs = document.createElementNS(NS, 'svg'); gs.setAttribute('class', 'gloss'); gs.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
      gs.style.cssText = 'position:absolute;z-index:6;pointer-events:none;overflow:visible;left:' + (c.cx - w / 2) + 'px;top:' + (c.cy - h / 2) + 'px;width:' + w + 'px;height:' + h + 'px';
      c.board.appendChild(gs);
    }
    var path = document.createElementNS(NS, 'path');
    path.setAttribute('d', 'M' + pts.map(function (q) { return q[0].toFixed(1) + ' ' + q[1].toFixed(1); }).join(' L'));
    path.setAttribute('fill', 'none'); path.setAttribute('stroke', k === 'yolk' ? 'rgba(245,158,11,.5)' : 'rgba(254,240,138,.5)');
    path.setAttribute('stroke-width', boat ? 11 : 20); path.setAttribute('stroke-linecap', 'round'); path.setAttribute('stroke-linejoin', 'round');
    gs.appendChild(path);
    var len = path.getTotalLength(), D = boat ? 1500 : 1900, base = 240, M = 56, ox = c.cx - w / 2, oy = c.cy - h / 2, P = [];
    path.style.strokeDasharray = len;
    path.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }], { duration: D, delay: base, fill: 'both', easing: 'linear' });
    for (i = 0; i <= M; i++) { var q = path.getPointAtLength(len * i / M); P.push({ x: ox + q.x, y: oy + q.y, d: -20, t: base + D * i / M }); }
    var p0 = P[0];
    var hd = hand(c.L, true, false), ex = p0.x + 90, ey = p0.y - 30, last = P[M], T = base + D + 240;
    run(hd, [{ x: ex, y: ey, o: 0, d: -20, t: 0 }, { x: ex, y: ey, d: -20, t: 30 }].concat(P, [{ x: last.x + 90, y: last.y - 30, d: -20, t: T - 20 }, { x: last.x + 90, y: last.y - 30, o: 0, d: -20, t: T }]), T, 'linear');
    return T;
  }

  // --- рецепти: порядок кроків до печі та після печі ---
  var SEQ = {
    1: [['dough'], ['knead'], ['sculpt'], ['cheese', 'butter']],
    2: [['dough'], ['knead'], ['cheese'], ['sculpt'], ['yolk'], ['greens']],
    3: [['dough'], ['knead'], ['meat'], ['sculpt'], ['yolk']],
    4: [['dough'], ['knead'], ['meat'], ['sculpt']]
  };
  var POST_SEQ = {
    1: [['post-yolk'], ['post-butter']],
    2: [['post-butter'], ['post-cut']],
    3: [['post-butter'], ['post-cut']],
    4: [['post-butter'], ['post-cut']]
  };

  function step(n, k) {
    var o = {
      dough: 'покласти тісто',
      knead: 'розкачати тісто',
      sculpt: 'заліпити',
      yolk: 'змастити яйцем',
      butter: 'змастити маслом',
      'post-yolk': 'розбити жовток у центр',
      'post-butter': 'змастити маслом',
      'post-cut': 'розрізати на 8 частин'
    };
    if (k === 'cheese') return n === 1 ? 'сулугуні' : 'імеретинський сир';
    if (k === 'greens') return 'моцарела';
    if (k === 'meat') return n === 4 ? 'лобіо' : "м'ясо";
    return o[k];
  }
  function ck(n, k) { var e = document.getElementById('l' + n + '-' + k); return !!(e && e.checked); }
  function inSeq(n, k) {
    return SEQ[n].some(function (g) { return g.indexOf(k) > -1; }) ||
           POST_SEQ[n].some(function (g) { return g.indexOf(k) > -1; });
  }
  function stage(n, list) {
    for (var i = 0; i < list.length; i++) {
      var open = list[i].filter(function (k) { return !ck(n, k); });
      if (open.length) return open;
    }
    return null;
  }
  window.ZR = {
    can: function (n, k) {
      n = +n;
      if (k.indexOf('post-') === 0) {
        var po = stage(n, POST_SEQ[n]);
        return !!po && po.indexOf(k) > -1;
      }
      if (inSeq(n, k)) { var o = stage(n, SEQ[n]); return !!o && o.indexOf(k) > -1; }
      return ck(n, 'knead');
    },
    removable: function (n, k) { return !inSeq(+n, k); },
    msg: function (n, k) {
      n = +n;
      if (k.indexOf('post-') === 0) {
        var po = stage(n, POST_SEQ[n]);
        return po ? 'Далі: ' + po.map(function (x) { return step(n, x); }).join(' / ') : 'Готово до подачі';
      }
      if (!inSeq(n, k)) return 'Спершу розкачай тісто';
      var o = stage(n, SEQ[n]); return o ? 'Зараз за рецептом: ' + o.map(function (x) { return step(n, x); }).join(' / ') : 'Усе готово: відправляй у піч';
    }
  };
  function update() {
    for (var n = 1; n <= 4; n++) {
      var scr = document.querySelector('.screen-lvl' + n + '-prep');
      if (scr) {
        var o = stage(n, SEQ[n]), bad = [].slice.call(scr.querySelectorAll('.ing-card')).filter(function (l) { var key = l.htmlFor.split('-')[1]; return !inSeq(n, key) && ck(n, key); });
        scr.classList.toggle('is-ready', !o && !bad.length);
        scr.classList.toggle('await-fill', !(o && o.indexOf('sculpt') > -1));
        var h = scr.querySelector('.hint-text'), nn = n;
        if (h) h.textContent = bad.length ? 'Зайвий інгредієнт: торкнись його, щоб прибрати' : (o ? 'Далі: ' + o.map(function (x) { return step(nn, x); }).join(' / ') : '');
      }

      var pscr = document.querySelector('.screen-lvl' + n + '-post');
      if (pscr) {
        var po = stage(n, POST_SEQ[n]);
        pscr.classList.toggle('is-ready', !po);
        pscr.classList.toggle('await-cut', !!(po && po.indexOf('post-cut') > -1));
        var ph = pscr.querySelector('.hint-text'), pnn = n;
        if (ph) ph.textContent = po ? 'Далі: ' + po.map(function (x) { return step(pnn, x); }).join(' / ') : '';
      }
    }
  }
  update();
  form.addEventListener('change', update);

  form.addEventListener('change', function (e) {
    var cb = e.target, m = cb.type === 'checkbox' && cb.checked && (cb.id || '').match(/^l(\d)-([a-z-]+)$/);
    if (!m) return;
    var k = m[2], isPost = k.indexOf('post-') === 0;
    var scr = document.querySelector('.screen-lvl' + m[1] + (isPost ? '-post' : '-prep')), board = scr && scr.querySelector('.interactive-board');
    if (!board) return;
    var br = board.getBoundingClientRect(), dg = scr.querySelector('.dough-entity'), dr = dg.getBoundingClientRect();
    var c = { n: m[1], board: board, dg: dg, W: br.width, H: br.height, cx: br.width / 2, cy: br.height / 2, rx: Math.max(dr.width / 2, 60), ry: Math.max(dr.height / 2, 40) };
    if (k === 'knead') { c.rx = 98; c.ry = 62; }
    c.L = document.createElement('div'); c.L.className = 'fx-layer'; board.appendChild(c.L);
    var dur = 1200;
    if (k === 'dough') dur = doDough(c);
    else if (k === 'knead') dur = doKnead(c);
    else if (k === 'sculpt') dur = doSculpt(c);
    else if (k === 'post-yolk' && m[1] === '1') dur = doCrackYolk(c);
    else if (k === 'yolk' || k === 'butter' || k === 'post-butter') dur = glaze(c, k === 'post-butter' ? 'butter' : k);
    else if (k === 'post-cut') dur = 250;
    else sprinkle(c, k === 'cheese' && m[1] === '2' ? 'imeretian' : k === 'greens' && m[1] === '2' ? 'mozzarella' : k === 'meat' && m[1] === '4' ? 'lobio' : k);
    if (/dough|knead|sculpt|yolk|butter/.test(k)) { scr.classList.add('fx-busy'); later(function () { scr.classList.remove('fx-busy'); }, dur); }
    later(function () { c.L.remove(); }, dur + 500);
  });

  form.addEventListener('reset', function () {
    setTimeout(function () {
      document.querySelectorAll('.bowl-empty').forEach(function (b) { b.classList.remove('bowl-empty'); });
      document.querySelectorAll('.fx-hold,.fx-wait,.fx-busy').forEach(function (b) { b.classList.remove('fx-hold', 'fx-wait', 'fx-busy'); });
      document.querySelectorAll('.fx-layer,.gloss').forEach(function (b) { b.remove(); });
      update();
    }, 0);
  });
})();
