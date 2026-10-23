/*! folio v1.2.0 | MIT License | https://github.com/theagitist/folio */
(function () {
  'use strict';

  // Group pages into views. Spread mode: cover alone, then facing pairs
  // (2-3, 4-5, ...), so an even page count ends on a lone back cover.
  function views(count, spread) {
    var out = [], p;
    if (!spread) {
      for (p = 1; p <= count; p++) out.push([p]);
      return out;
    }
    out.push([1]);
    for (p = 2; p <= count; p += 2) out.push(p + 1 <= count ? [p, p + 1] : [p]);
    return out;
  }

  function mount(el) {
    var src = el.getAttribute('data-src');
    var count = parseInt(el.getAttribute('data-count'), 10);
    var title = el.getAttribute('data-title') || 'Zine';
    var page = 1, list = [], spread = null;

    function url(n) { return src.replace('{n}', n); }

    // Inline launcher: the cover, opening the reader in a modal dialog.
    el.innerHTML =
      '<button type="button" class="folio-open">' +
      '<img alt="">' +
      '<span class="folio-label"></span>' +
      '</button>' +
      '<dialog class="folio-modal">' +
      '<div class="folio-stage"></div>' +
      '<div class="folio-bar">' +
      '<button type="button" class="folio-first" aria-label="First page">&#x21E4;</button>' +
      '<button type="button" class="folio-prev" aria-label="Previous page">&larr;</button>' +
      '<span class="folio-count" aria-live="polite"><span></span> ' +
      '<input class="folio-page" type="number" min="1" inputmode="numeric" aria-label="Go to page">' +
      '<span></span></span>' +
      '<button type="button" class="folio-next" aria-label="Next page">&rarr;</button>' +
      '<button type="button" class="folio-full" aria-label="Full screen">&#x26F6;</button>' +
      '<button type="button" class="folio-close" aria-label="Close reader">&times;</button>' +
      '</div>' +
      '</dialog>';

    var open = el.querySelector('.folio-open');
    var dialog = el.querySelector('dialog');
    var stage = el.querySelector('.folio-stage');
    var prev = el.querySelector('.folio-prev');
    var next = el.querySelector('.folio-next');
    var full = el.querySelector('.folio-full');
    var first = el.querySelector('.folio-first');
    var input = el.querySelector('.folio-page');
    var parts = el.querySelectorAll('.folio-count > span');
    input.max = count;

    open.querySelector('img').src = url(1);
    open.querySelector('.folio-label').textContent = el.getAttribute('data-label') || 'Read online';
    open.setAttribute('aria-label', 'Read ' + title + ' online');
    dialog.setAttribute('aria-label', title);
    dialog.tabIndex = -1;

    function at() {
      for (var i = 0; i < list.length; i++) if (list[i].indexOf(page) >= 0) return i;
      return 0;
    }

    function render() {
      var i = at(), v = list[i];
      stage.innerHTML = '';
      v.forEach(function (n) {
        var img = document.createElement('img');
        img.src = url(n);
        img.alt = title + ', page ' + n + ' of ' + count;
        img.draggable = false;
        stage.appendChild(img);
      });
      parts[0].textContent = v.length > 1 ? 'Pages' : 'Page';
      input.value = v[0];
      parts[1].textContent = (v.length > 1 ? '–' + v[1] : '') + ' of ' + count;
      prev.disabled = first.disabled = i === 0;
      next.disabled = i === list.length - 1;
      // Warm the cache for the neighbouring views.
      [list[i - 1], list[i + 1]].forEach(function (w) {
        if (w) w.forEach(function (n) { new Image().src = url(n); });
      });
    }

    function jump(n) {
      page = Math.min(Math.max(n, 1), count);
      render();
      if (el.id) history.replaceState(null, '', '#' + el.id + '-' + page);
    }

    function go(d) {
      var i = at() + d;
      if (i >= 0 && i < list.length) jump(list[i][0]);
    }

    // Spreads when the screen is wide enough for two pages side by side.
    function layout() {
      var s = dialog.clientWidth >= 600 && dialog.clientWidth > dialog.clientHeight;
      if (s === spread) return;
      spread = s;
      dialog.classList.toggle('folio-single', !s);
      list = views(count, s);
      render();
    }

    function show() {
      dialog.showModal();
      dialog.focus(); // so arrow keys work right away
      spread = null;
      layout();
      if (el.id) history.replaceState(null, '', '#' + el.id + '-' + page);
    }

    open.onclick = show;
    first.onclick = function () { jump(1); };
    prev.onclick = function () { go(-1); };
    input.onchange = function () {
      var n = parseInt(input.value, 10);
      n ? jump(n) : render();
    };
    next.onclick = function () { go(1); };
    el.querySelector('.folio-close').onclick = function () { dialog.close(); };
    dialog.addEventListener('close', function () {
      if (document.fullscreenElement) document.exitFullscreen();
      if (el.id) history.replaceState(null, '', location.pathname + location.search);
    });
    // A modal dialog cannot itself go fullscreen, so fullscreen the page;
    // the dialog stays on top of it.
    var root = document.documentElement;
    if (root.requestFullscreen) {
      full.onclick = function () {
        document.fullscreenElement ? document.exitFullscreen() : root.requestFullscreen();
      };
    } else {
      full.hidden = true; // iPhone Safari has no element fullscreen; the modal already fills the screen
    }

    dialog.addEventListener('keydown', function (e) {
      if (e.target === input) return;
      if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'Home') jump(1);
      else if (e.key === 'End') jump(count);
      else if (e.key === 'ArrowRight') go(1);
      else return;
      e.preventDefault();
    });

    // Tap a page half to turn, or swipe.
    var x0 = null;
    stage.addEventListener('pointerdown', function (e) { x0 = e.clientX; });
    stage.addEventListener('pointerup', function (e) {
      if (x0 === null) return;
      var dx = e.clientX - x0, r = stage.getBoundingClientRect();
      x0 = null;
      if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
      else go(e.clientX < r.left + r.width / 2 ? -1 : 1);
    });

    if (window.ResizeObserver) new ResizeObserver(function () { if (dialog.open) layout(); }).observe(dialog);

    var m = el.id && location.hash.match(new RegExp('^#' + el.id + '-(\\d+)$'));
    if (m) {
      page = Math.min(Math.max(+m[1], 1), count);
      show();
    }
  }

  window.Folio = { views: views, mount: mount };
  if (typeof document !== 'undefined') {
    Array.prototype.forEach.call(document.querySelectorAll('.folio[data-src][data-count]'), mount);
  }
})();
