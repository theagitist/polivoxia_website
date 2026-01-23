(function () {
    'use strict';

    var tabList = document.querySelector('.tab-list');
    if (!tabList) return;

    var buttons = tabList.querySelectorAll('.tab-btn');
    var panels = document.querySelectorAll('.tab-panel');

    function showPanel(id) {
        panels.forEach(function (panel) {
            if (panel.id === id) {
                panel.removeAttribute('hidden');
            } else {
                panel.setAttribute('hidden', '');
            }
        });
        buttons.forEach(function (btn) {
            var isActive = btn.getAttribute('data-tab') === id;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });
    }

    function handleClick(e) {
        var btn = e.target.closest('.tab-btn');
        if (!btn) return;
        e.preventDefault();
        var id = btn.getAttribute('data-tab');
        if (id) showPanel(id);
    }

    function handleKeydown(e) {
        var btn = e.target.closest('.tab-btn');
        if (!btn || btn.getAttribute('role') !== 'tab') return;

        var idx = Array.prototype.indexOf.call(buttons, btn);
        var prev = idx - 1;
        var next = idx + 1;

        if (e.key === 'ArrowLeft' && prev >= 0) {
            e.preventDefault();
            buttons[prev].focus();
            showPanel(buttons[prev].getAttribute('data-tab'));
        } else if (e.key === 'ArrowRight' && next < buttons.length) {
            e.preventDefault();
            buttons[next].focus();
            showPanel(buttons[next].getAttribute('data-tab'));
        }
    }

    tabList.addEventListener('click', handleClick);
    tabList.addEventListener('keydown', handleKeydown);

    // Handle links that open tabs (e.g. "Here" links)
    document.addEventListener('click', function(e) {
        var link = e.target.closest('.open-tab-link');
        if (!link) return;
        e.preventDefault();
        var tabId = link.getAttribute('data-tab');
        if (tabId) {
            showPanel(tabId);
            // Scroll to top of content area
            var main = document.querySelector('main.book-content');
            if (main) {
                main.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });

    // Support hash on load (e.g. #game-board)
    var hash = window.location.hash.slice(1);
    if (hash && document.getElementById(hash)) {
        showPanel(hash);
    }
})();
