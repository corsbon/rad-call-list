(function () {
  'use strict';

  var D = window.RADCALL_DATA;
  var KEY = 'radcall.state';
  var RKEY = 'radcall.recent';
  var TYPES = [['tech', 'Talk to the tech'], ['provider', 'Talk to a provider'], ['other', 'Other']];

  var ICON_PHONE = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>';
  var ICON_BACK = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>';
  var ICON_CHEV = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>';
  var ICON_PLUS = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>';
  var ICON_X = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>';

  // ---------- helpers ----------
  function el(tag, props, kids) {
    var e = document.createElement(tag);
    var p = props || {};
    Object.keys(p).forEach(function (k) {
      var v = p[k];
      if (k === 'class') e.className = v;
      else if (k === 'text') e.textContent = v;
      else if (k.slice(0, 2) === 'on') e.addEventListener(k.slice(2), v);
      else if (v !== false && v != null) e.setAttribute(k, v);
    });
    (kids || []).forEach(function (c) {
      if (c) e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    });
    return e;
  }
  function icon(svg) {
    var s = document.createElement('span');
    s.setAttribute('aria-hidden', 'true');
    s.style.display = 'inline-flex';
    s.innerHTML = svg; // static strings defined above, never user input
    return s;
  }
  function telHref(num) { return 'tel:' + (hide ? '*67' : '') + num.replace(/[^0-9+,]/g, ''); }
  function disp(num) { return num.replace(',', ' ext '); }

  // ---------- state ----------
  function buildNums(site) {
    return site.nums.map(function (n, i) {
      return { id: site.id + '-' + i, label: n[0], num: n[1], g: n[2], on: !!n[3], custom: false };
    });
  }
  function buildAll() {
    return D.sites.map(function (s) {
      return { id: s.id, code: s.code, name: s.name, group: s.group, nums: buildNums(s) };
    });
  }
  var sites = null;
  var recent = [];
  var HKEY = 'radcall.hide';
  var hide = true; // default: block caller ID by dialing *67 first
  try { var hv = localStorage.getItem(HKEY); if (hv !== null) hide = hv === '1'; } catch (e) {}
  function setHide(v) { hide = v; try { localStorage.setItem(HKEY, v ? '1' : '0'); } catch (e) {} }
  try {
    var st = JSON.parse(localStorage.getItem(KEY));
    if (st && st.version === D.version && Array.isArray(st.sites)) sites = st.sites;
  } catch (e) {}
  if (!sites) sites = buildAll();
  try { recent = JSON.parse(localStorage.getItem(RKEY)) || []; } catch (e) { recent = []; }

  function save() {
    try { localStorage.setItem(KEY, JSON.stringify({ version: D.version, sites: sites })); } catch (e) {}
  }
  function pushRecent(id) {
    recent = [id].concat(recent.filter(function (x) { return x !== id; })).slice(0, 3);
    try { localStorage.setItem(RKEY, JSON.stringify(recent)); } catch (e) {}
  }
  function find(id) {
    for (var i = 0; i < sites.length; i++) if (sites[i].id === id) return sites[i];
    return null;
  }

  var app = document.getElementById('app');
  var ui = { edit: false, adding: false, q: '' };

  function hideToggle(rerender) {
    return el('button', {
      class: 'hide' + (hide ? ' hide-on' : ''), type: 'button', 'aria-pressed': String(hide),
      onclick: function () { setHide(!hide); rerender(); }
    }, [
      el('span', { class: 'hide-txt' }, [
        el('b', { text: hide ? 'Your number is hidden' : 'Your number is visible' }),
        el('span', { text: hide ? 'Calls dial *67 first to block caller ID' : 'Calls show your real caller ID' })
      ]),
      el('span', { class: 'sw' + (hide ? ' sw-on' : ''), 'aria-hidden': 'true' }, [el('span', { class: 'knob' })])
    ]);
  }

  // ---------- list screen ----------
  function siteRow(s) {
    var shown = s.nums.filter(function (n) { return n.on; }).length;
    return el('a', { class: 'site', href: '#/s/' + encodeURIComponent(s.id) }, [
      el('span', { class: 'badge', text: s.code }),
      el('span', { class: 'nm' }, [
        el('b', { text: s.name }),
        el('span', { text: shown + (shown === 1 ? ' number' : ' numbers') })
      ]),
      icon(ICON_CHEV)
    ]);
  }

  function renderList() {
    app.textContent = '';
    var res = el('div', { class: 'list' });

    function fill() {
      res.textContent = '';
      var q = ui.q.trim().toLowerCase();
      var vis = sites.filter(function (s) {
        return !q || s.name.toLowerCase().indexOf(q) > -1 || s.code.toLowerCase().indexOf(q) > -1;
      });
      if (!q) {
        var rec = recent.map(find).filter(Boolean);
        if (rec.length) {
          res.appendChild(el('h2', { class: 'sec', text: 'Recent' }));
          rec.forEach(function (s) { res.appendChild(siteRow(s)); });
        }
      }
      var prev = null;
      vis.forEach(function (s) {
        if (s.group !== prev) { prev = s.group; res.appendChild(el('h2', { class: 'sec', text: s.group })); }
        res.appendChild(siteRow(s));
      });
      if (!vis.length) res.appendChild(el('p', { class: 'empty', text: 'No site matches that search.' }));
    }

    var input = el('input', {
      class: 'search', type: 'search', placeholder: 'Search name or code', 'aria-label': 'Search sites',
      autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false', value: ui.q,
      oninput: function () { ui.q = input.value; fill(); }
    });
    app.appendChild(el('div', { class: 'top' }, [
      el('h1', { text: 'Call list' }),
      el('p', { class: 'sub', text: 'Pick the site from your PACS screen' }),
      input,
      hideToggle(renderList)
    ]));
    app.appendChild(res);
    fill();
    app.appendChild(el('p', { class: 'foot' }, [
      'Numbers copied from the Dartmouth regional radiology groups page. Verify before relying on them. ',
      el('button', {
        class: 'link inline', type: 'button', text: 'Reset all my changes',
        onclick: function () {
          if (confirm('Reset every site to the default numbers? Your on/off choices and added numbers will be lost.')) {
            sites = buildAll(); save(); renderList();
          }
        }
      })
    ]));
  }

  // ---------- site screen ----------
  function callRow(n) {
    return el('a', { class: 'num', href: telHref(n.num) }, [
      el('span', { class: 'num-main' }, [
        el('span', { class: 'num-label', text: n.label }),
        el('span', { class: 'num-digits', text: disp(n.num) })
      ]),
      el('span', { class: 'call', 'aria-hidden': 'true' }, [icon(ICON_PHONE)])
    ]);
  }

  function editRow(s, n) {
    var kids = [
      el('button', {
        class: 'toggle', type: 'button', 'aria-pressed': String(n.on),
        onclick: function () { n.on = !n.on; save(); renderSite(s); }
      }, [
        el('span', { class: 'num-main' }, [
          el('span', { class: 'num-label', text: n.label }),
          el('span', { class: 'num-digits', text: disp(n.num) })
        ]),
        el('span', { class: 'sw' + (n.on ? ' sw-on' : ''), 'aria-hidden': 'true' }, [el('span', { class: 'knob' })])
      ])
    ];
    if (n.custom) {
      kids.push(el('button', {
        class: 'rm', type: 'button', 'aria-label': 'Remove ' + n.label,
        onclick: function () { s.nums = s.nums.filter(function (x) { return x.id !== n.id; }); save(); renderSite(s); }
      }, [icon(ICON_X)]));
    }
    return el('div', { class: 'erow' }, kids);
  }

  function addForm(s) {
    var label = el('input', { type: 'text', placeholder: 'Label, e.g. CT tech', 'aria-label': 'Label', autocomplete: 'off' });
    var num = el('input', { type: 'tel', placeholder: 'Number, e.g. 603-555-0123', 'aria-label': 'Phone number', autocomplete: 'off' });
    var type = el('select', { 'aria-label': 'Type' }, TYPES.map(function (t) { return el('option', { value: t[0], text: t[1] }); }));
    return el('form', {
      class: 'form',
      onsubmit: function (ev) {
        ev.preventDefault();
        var l = label.value.trim(), p = num.value.trim();
        if (!l || p.replace(/[^0-9]/g, '').length < 7) { alert('Add a label and a phone number (at least 7 digits).'); return; }
        s.nums.push({ id: s.id + '-c' + Date.now(), label: l, num: p, g: type.value, on: true, custom: true });
        save(); ui.adding = false; renderSite(s);
      }
    }, [
      label, num, type,
      el('div', { class: 'row' }, [
        el('button', { type: 'button', text: 'Cancel', onclick: function () { ui.adding = false; renderSite(s); } }),
        el('button', { class: 'go', type: 'submit', text: 'Add' })
      ])
    ]);
  }

  function renderSite(s) {
    var y = window.scrollY;
    app.textContent = '';
    var shown = s.nums.filter(function (n) { return n.on; }).length;
    app.appendChild(el('div', { class: 'top' }, [
      el('div', { class: 'bar' }, [
        el('a', { class: 'back', href: '#/' }, [icon(ICON_BACK), 'All sites']),
        el('button', {
          class: 'pill' + (ui.edit ? ' pill-on' : ''), type: 'button', text: ui.edit ? 'Done' : 'Edit',
          onclick: function () { ui.edit = !ui.edit; ui.adding = false; renderSite(s); }
        })
      ]),
      el('div', { class: 'title' }, [el('span', { class: 'badge', text: s.code }), el('h1', { text: s.name })]),
      el('p', {
        class: 'sub',
        text: ui.edit
          ? 'Switch on the numbers you want on this screen. ' + shown + ' of ' + s.nums.length + ' shown.'
          : shown + (shown === 1 ? ' number' : ' numbers') + ' · tap to call'
      }),
      ui.edit ? null : hideToggle(function () { renderSite(s); })
    ]));

    var body = el('div', { class: 'body' });
    TYPES.forEach(function (t) {
      var rows = s.nums.filter(function (n) { return n.g === t[0] && (ui.edit || n.on); });
      if (!rows.length) return;
      body.appendChild(el('h2', { class: 'sec', text: t[1] }));
      rows.forEach(function (n) { body.appendChild(ui.edit ? editRow(s, n) : callRow(n)); });
    });
    if (!ui.edit && shown === 0) {
      body.appendChild(el('p', { class: 'empty', text: 'No numbers selected for this site. Tap Edit to choose some.' }));
    }
    if (ui.edit) {
      if (ui.adding) {
        body.appendChild(addForm(s));
      } else {
        body.appendChild(el('button', { class: 'add', type: 'button', onclick: function () { ui.adding = true; renderSite(s); } }, [icon(ICON_PLUS), 'Add a number']));
      }
      body.appendChild(el('button', {
        class: 'link', type: 'button', text: 'Reset this site to the default list',
        onclick: function () {
          var d = D.sites.filter(function (x) { return x.id === s.id; })[0];
          if (d && confirm('Reset ' + s.name + ' to the default numbers? Changes here will be lost.')) {
            s.nums = buildNums(d); save(); renderSite(s);
          }
        }
      }));
    }
    app.appendChild(body);
    window.scrollTo(0, y);
  }

  // ---------- routing ----------
  function route() {
    var m = /^#\/s\/(.+)$/.exec(location.hash);
    var s = m ? find(decodeURIComponent(m[1])) : null;
    ui.edit = false; ui.adding = false;
    if (s) { pushRecent(s.id); renderSite(s); } else { renderList(); }
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', route);
  route();

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () {}); });
  }
})();
