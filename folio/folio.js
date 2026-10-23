/*! folio v1.0.0 | MIT License | https://github.com/theagitist/folio */
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

    el.tabIndex = 0;
    el.setAttribute('role', 'region');
    el.setAttribute('aria-label', title + ', online reader');
    el.innerHTML =
      '<div class="folio-stage"></div>' +
      '<div class="folio-bar">' +
      '<button type="button" class="folio-prev" aria-label="Previous page">&larr;</button>' +
      '<span class="folio-count" aria-live="polite"></span>' +
      '<button type="button" class="folio-next" aria-label="Next page">&rarr;</button>' +
      '<button type="button" class="folio-full" aria-label="Full screen">&#x26F6;</button>' +
      '</div>';

    var stage = el.querySelector('.folio-stage');
    var prev = el.querySelector('.folio-prev');
    var next = el.querySelector('.folio-next');
    var full = el.querySelector('.folio-full');
    var label = el.querySelector('.folio-count');

    function url(n) { return src.replace('{n}', n); }
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
      label.textContent = (v.length > 1 ? 'Pages ' + v[0] + '–' + v[1] : 'Page ' + v[0]) + ' of ' + count;
      prev.disabled = i === 0;
      next.disabled = i === list.length - 1;
      // Warm the cache for the neighbouring views.
      [list[i - 1], list[i + 1]].forEach(function (w) {
        if (w) w.forEach(function (n) { new Image().src = url(n); });
      });
    }

    function go(d) {
      var i = at() + d;
      if (i < 0 || i >= list.length) return;
      page = list[i][0];
      render();
      if (el.id) history.replaceState(null, '', '#' + el.id + '-' + page);
    }

    function layout() {
      var s = el.clientWidth >= 600;
      if (s === spread) return;
      spread = s;
      el.classList.toggle('folio-single', !s);
      list = views(count, s);
      render();
    }

    prev.onclick = function () { go(-1); };
    next.onclick = function () { go(1); };
    if (el.requestFullscreen) {
      full.onclick = function () {
        document.fullscreenElement ? document.exitFullscreen() : el.requestFullscreen();
      };
    } else {
      full.hidden = true; // ponytail: iPhone Safari has no element fullscreen; inline reader still works
    }

    el.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') go(-1);
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

    var m = el.id && location.hash.match(new RegExp('^#' + el.id + '-(\\d+)$'));
    if (m) page = Math.min(Math.max(+m[1], 1), count);

    layout();
    if (window.ResizeObserver) new ResizeObserver(layout).observe(el);
  }

  window.Folio = { views: views, mount: mount };
  if (typeof document !== 'undefined') {
    Array.prototype.forEach.call(document.querySelectorAll('.folio[data-src][data-count]'), mount);
  }
})();
