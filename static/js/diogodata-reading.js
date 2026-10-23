/* DiogoDATA — Reading controls v4.
 * Progressive enhancement only on single posts. No site menu changes.
 * Keeps the original Toha scripts and article content intact.
 */
(function () {
  'use strict';
  var LOG = '[DiogoDATA Reading v4]';
  var initialized = false;
  window.diogodataReadingDebug = {
    version: '4.0', loaded: true, status: 'pending',
    pathname: location.pathname, leftFound: false, rightFound: false,
    mainFound: false, bodyFound: false
  };

  function isPost() {
    return /\/posts\/[^/]+/.test(location.pathname) &&
      !/\/(tags|categories|page)\//.test(location.pathname);
  }
  function rect(el) {
    if (!el || !el.getBoundingClientRect) return null;
    var r = el.getBoundingClientRect();
    return (r.width > 0 && r.height > 0) ? r : null;
  }
  function locateColumn(start, side) {
    if (!start) return null;
    var vw = window.innerWidth, chosen = null;
    for (var el = start; el && el !== document.body; el = el.parentElement) {
      var r = rect(el);
      if (!r || r.width < 130 || r.width > Math.min(550, vw * .49) || r.height < 75) continue;
      if (side === 'left' && r.left > vw * .36) continue;
      if (side === 'right' && r.right < vw * .64) continue;
      if (!chosen || r.width >= rect(chosen).width - 5) chosen = el;
    }
    if (!chosen && vw < 992) {
      // Some Toha sidebars are display:none before the mobile drawer is opened.
      var mobileWrap = start.closest('aside,[id*=\"sidebar\"],[class*=\"sidebar\"],[class*=\"col-lg-3\"],[class*=\"col-md-3\"]');
      if (mobileWrap && !mobileWrap.contains(document.querySelector('h1'))) return mobileWrap;
    }
    return chosen;
  }
  function findToc() {
    var selectors = [
      '#TableOfContents', '#toc', '.toc-section', '.toc-container',
      '.table-of-contents', '[class*="toc-menu"]', '[class*="toc-content"]'
    ];
    for (var i = 0; i < selectors.length; i++) {
      var el = document.querySelector(selectors[i]);
      if (rect(el) || innerWidth < 992) return el;
    }
    var headings = document.querySelectorAll('h2,h3,h4,h5,strong,.card-header');
    for (var j = 0; j < headings.length; j++) {
      var label = (headings[j].textContent || '').trim().toLowerCase();
      if (/^(table of contents|tabela de conte[uú]dos|sum[aá]rio)$/.test(label)) return headings[j];
    }
    return null;
  }
  function findSearch() {
    var inputs = document.querySelectorAll('input[type="search"],input[placeholder],input[id*="search"]');
    for (var i = 0; i < inputs.length; i++) {
      var el = inputs[i], r = rect(el);
      var txt = ((el.getAttribute('placeholder') || '') + ' ' + el.id).toLowerCase();
      if ((r && r.left < innerWidth * .37 || innerWidth < 992) && /search|pesquis/.test(txt)) return el;
    }
    var items = document.querySelectorAll('#sidebar,.sidebar-section,.sidebar-menu,.sidebar');
    for (var j = 0; j < items.length; j++) {
      var a = rect(items[j]);
      if (a && a.left < innerWidth * .37 && a.width < innerWidth * .5) return items[j];
    }
    return null;
  }
  function findMain(left, right) {
    var items = document.querySelectorAll('main,article,#post-content,.post-content,.post-section');
    for (var i = 0; i < items.length; i++) {
      var el = items[i], r = rect(el);
      if (!r || r.width < 240 || (left && el.contains(left)) || (right && el.contains(right))) continue;
      var mid = r.left + r.width / 2;
      if (mid < innerWidth * .28 || mid > innerWidth * .74) continue;
      for (var p = el.parentElement; p && p !== document.body; p = p.parentElement) {
        var pr = rect(p);
        if (!pr || pr.width > innerWidth * .78 || (left && p.contains(left)) || (right && p.contains(right))) break;
        el = p;
      }
      return el;
    }
    return null;
  }
  function findProse(main) {
    if (!main) return null;
    var h2 = main.querySelector('h2');
    if (!h2) return null;
    // Prefer the shared markdown body; a fallback that contains the article headings
    // is safer than styling only the first section.
    var fallback = null;
    for (var a = h2.parentElement; a && a !== main; a = a.parentElement) {
      if (a.querySelectorAll('h2').length < 2) continue;
      if (!fallback) fallback = a;
      if (!a.querySelector('h1')) return a;
    }
    return fallback || h2.closest('.post-content,.markdown-body,#post-content,article') || h2.parentElement;
  }
  function initialize() {
    if (initialized || !isPost()) return;
    var debug = window.diogodataReadingDebug;
    var left = locateColumn(findSearch(), 'left');
    var right = locateColumn(findToc(), 'right');
    debug.leftFound = !!left;
    debug.rightFound = !!right;
    if (left && right && (left === right || left.contains(right) || right.contains(left))) {
      debug.status = 'overlap';
      console.warn(LOG, 'Overlapping sidebar candidates; no modifications applied.');
      return;
    }
    if (!left && !right) {
      debug.status = 'panels-not-found';
      return;
    }
    var main = findMain(left, right);
    debug.mainFound = !!main;
    if (!main) { debug.status = 'article-not-found'; return; }
    var prose = findProse(main);
    debug.bodyFound = !!prose;
    main.setAttribute('data-dd-reading-main', '');
    if (prose) {
      prose.setAttribute('data-dd-reading-prose', '');
      // Narrow nested Bootstrap columns can prevent centered reading text.
      for (var parent = prose.parentElement; parent && parent !== main; parent = parent.parentElement) {
        if (/(^|\s)col(?:-|\b)/.test(parent.className || ''))
          parent.setAttribute('data-dd-reading-inner-col', '');
      }
    }
    document.body.classList.add('dd-reading-page');
    initialized = true;
    debug.status = 'ready';
    var pt = /^\/pt-br(?:\/|$)/.test(location.pathname);
    var labels = pt ? {
      left: 'Categorias', right: 'Sumário', focus: 'Modo leitura',
      close: 'Fechar painel', group: 'Ferramentas do artigo'
    } : {
      left: 'Browse', right: 'Contents', focus: 'Reading mode',
      close: 'Close panel', group: 'Article tools'
    };
    var mobile = function () { return innerWidth < 992; };
    var state = { left: !mobile() && !!left, right: !mobile() && !!right, focus: false };
    var columns = {left: left, right: right};
    var buttons = {};
    var lastButton = null;
    var bar = document.createElement('nav');
    bar.className = 'dd-reading-toolbar';
    bar.setAttribute('aria-label', labels.group);
    var backdrop = document.createElement('div');
    backdrop.className = 'dd-reading-backdrop';

    function render() {
      ['left','right'].forEach(function (side) {
        var p = columns[side];
        if (!p) return;
        p.hidden = !state[side];
        buttons[side].setAttribute('aria-expanded', String(state[side]));
        buttons[side].setAttribute('aria-pressed', String(state[side]));
      });
      buttons.focus.setAttribute('aria-pressed', String(state.focus));
      document.body.classList.toggle('dd-reading-focus', state.focus);
      document.body.classList.toggle('dd-reading-expanded', !state.left || !state.right);
      document.body.classList.toggle('dd-reading-drawer-open', mobile() && (state.left || state.right));
    }
    function dismissMobile() {
      if (!mobile()) return;
      state.left = false;
      state.right = false;
      render();
      if (lastButton) lastButton.focus();
    }
    function addButton(which, handler) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'dd-reading-toolbar__button';
      b.textContent = labels[which];
      b.addEventListener('click', function () { lastButton = b; handler(); render(); });
      bar.appendChild(b);
      buttons[which] = b;
      return b;
    }
    ['left','right'].forEach(function (side) {
      var panel = columns[side];
      if (!panel) return;
      panel.setAttribute('data-dd-reading-panel', side);
      if (!panel.id) panel.id = 'dd-reading-' + side;
      var toggle = addButton(side, function () {
        var next = !state[side];
        if (mobile() && next) state[side === 'left' ? 'right' : 'left'] = false;
        state[side] = next;
        if (next) state.focus = false;
      });
      toggle.setAttribute('aria-controls', panel.id);
      var closer = document.createElement('button');
      closer.type = 'button';
      closer.className = 'dd-reading-panel__close';
      closer.textContent = '\u00d7 ' + labels.close;
      closer.addEventListener('click', dismissMobile);
      panel.insertBefore(closer, panel.firstChild);
    });
    var focusToggle = addButton('focus', function () {
      state.focus = !state.focus;
      if (state.focus) { state.left = false; state.right = false; }
      else if (!mobile()) { state.left = !!left; state.right = !!right; }
    });
    focusToggle.setAttribute('title', pt ? 'Centralizar o texto e ocultar as laterais' : 'Center the article and hide sidebars');
    backdrop.addEventListener('click', dismissMobile);
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') dismissMobile();
    });
    var wasMobile = mobile();
    addEventListener('resize', function () {
      if (mobile() === wasMobile) return;
      wasMobile = mobile();
      state.left = !wasMobile && !!left;
      state.right = !wasMobile && !!right;
      state.focus = false;
      render();
    });
    // Insert the toolbar next to the article body, not fixed at the bottom.
    var firstSection = prose && prose.querySelector('h2');
    if (firstSection && firstSection.parentElement) {
      firstSection.parentElement.insertBefore(bar, firstSection);
    } else {
      main.insertBefore(bar, main.firstChild);
    }
    document.body.appendChild(backdrop);
    render();
    console.info(LOG, 'Article tools ready:', debug);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialize);
  else initialize();
  addEventListener('load', initialize);
})();
