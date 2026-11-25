/* ручка пічки: вмикає світло та показує поля (працює незалежно від Firebase) */
(function () {
  var gate = document.getElementById('auth-gate'), btn = document.getElementById('oven-power');
  btn.addEventListener('click', function () {
    if (gate.classList.contains('oven-on')) return;
    gate.classList.add('oven-on');
    btn.setAttribute('aria-pressed', 'true');
    btn.setAttribute('aria-label', 'Пічка увімкнена');
    setTimeout(function () {
      var f = document.querySelector('#form-email:not([hidden]) #em-email');
      if (f && window.matchMedia('(hover: hover)').matches) { try { f.focus({ preventScroll: true }); } catch (e) {} }
    }, 2600);
  });
})();
