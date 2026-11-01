/* Master's English — 인터랙션 (모바일 메뉴 · 청크독해 데모 · 어근 탐험) */
(function () {
  'use strict';

  /* ---------- 모바일 메뉴 ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('main-nav');
  if (toggle && nav) {
    var icoOpen = toggle.querySelector('.ico-open');
    var icoClose = toggle.querySelector('.ico-close');
    var setOpen = function (open) {
      nav.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
      if (icoOpen) icoOpen.style.display = open ? 'none' : '';
      if (icoClose) icoClose.style.display = open ? '' : 'none';
    };
    toggle.addEventListener('click', function () {
      setOpen(!nav.classList.contains('is-open'));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
  }

  /* ---------- 5품사 청크독해 데모 ---------- */
  var NOTES = {
    all: ['다섯 덩어리, 한 문장', '단어 16개가 아니라 덩어리 8개로 보입니다. 명사·동사로 뼈대를 세우고, 접속사로 이어지는 흐름을 잡고, 형용사구·부사구로 살을 붙이면 문장 전체가 한 번에 들어옵니다.'],
    n: ['명사 — 누가, 무엇을', '“The boy”와 “the old door”. 주어와 목적어 자리를 차지하는 덩어리입니다. 명사 덩어리를 찾으면 문장의 주인공이 보입니다.'],
    v: ['동사 — 문장의 심장', '“opened”와 “smiled”. 동사를 찾는 순간 그 앞은 주어, 그 뒤는 목적어·보어로 자연스럽게 나뉩니다. 동사가 두 개라면, 둘을 잇는 무언가가 있다는 신호입니다.'],
    c: ['접속사 — 문장과 문장을 잇는 다리', '“and”는 두 동작 “opened …”와 “smiled …”를 대등하게 이어 줍니다. 접속사를 먼저 찾으면 긴 문장도 몇 개의 단위로 깔끔하게 나뉩니다.'],
    a: ['형용사구 — 명사를 꾸민다', '“(in the red cap)”은 바로 앞 명사 “The boy”를 꾸밉니다. 괄호로 묶어 두면 긴 주어도 헷갈리지 않습니다.'],
    d: ['부사구 — 동사와 문장을 꾸민다', '“[quietly]”, “[at his mother]”는 어떻게, 어디를 향해 했는지를 말해 줍니다. 대괄호로 묶어 덜어내면 뼈대만 남습니다.']
  };

  var filterWrap = document.querySelector('[data-chunk-filters]');
  var chunkWrap = document.querySelector('[data-chunks]');
  var focusTitle = document.querySelector('[data-focus-title]');
  var focusNote = document.querySelector('[data-focus-note]');

  if (filterWrap && chunkWrap) {
    var chunks = chunkWrap.querySelectorAll('.chunk');
    var buttons = filterWrap.querySelectorAll('button[data-focus]');

    var applyFocus = function (focus) {
      buttons.forEach(function (b) {
        b.setAttribute('aria-pressed', b.getAttribute('data-focus') === focus ? 'true' : 'false');
      });
      chunkWrap.classList.toggle('is-focused', focus !== 'all');
      chunks.forEach(function (c) {
        c.classList.toggle('is-on', focus !== 'all' && c.getAttribute('data-k') === focus);
      });
      var note = NOTES[focus] || NOTES.all;
      if (focusTitle) focusTitle.textContent = note[0];
      if (focusNote) focusNote.textContent = note[1];
    };

    filterWrap.addEventListener('click', function (e) {
      var btn = e.target.closest('button[data-focus]');
      if (btn) applyFocus(btn.getAttribute('data-focus'));
    });
  }

  /* ---------- 어근 탐험 ---------- */
  var ROOTS = [
    { root: 'port', mean: '나르다 (carry)', words: [
      ['transport', 'trans(가로질러) + port', '수송하다'],
      ['import', 'im(안으로) + port', '수입하다'],
      ['export', 'ex(밖으로) + port', '수출하다'],
      ['portable', 'port + able(할 수 있는)', '휴대용의'],
      ['support', 'sup(아래에서) + port', '지탱하다, 지지하다']
    ] },
    { root: 'spect', mean: '보다 (look)', words: [
      ['inspect', 'in(안을) + spect', '점검하다'],
      ['respect', 're(다시) + spect', '존경하다'],
      ['spectator', 'spect + ator(사람)', '관중'],
      ['prospect', 'pro(앞을) + spect', '전망'],
      ['perspective', 'per(꿰뚫어) + spect', '관점']
    ] },
    { root: 'dict', mean: '말하다 (say)', words: [
      ['predict', 'pre(미리) + dict', '예측하다'],
      ['dictionary', 'dict + ionary(모음집)', '사전'],
      ['contradict', 'contra(반대로) + dict', '반박하다'],
      ['verdict', 'ver(진실) + dict', '평결'],
      ['dictate', 'dict + ate(하다)', '받아쓰게 하다, 지시하다']
    ] }
  ];

  var rootWrap = document.querySelector('[data-root-chips]');
  var rootName = document.querySelector('[data-root-name]');
  var rootMean = document.querySelector('[data-root-mean]');
  var wordList = document.querySelector('[data-word-list]');

  if (rootWrap && wordList) {
    var rootBtns = rootWrap.querySelectorAll('button[data-root]');

    var renderRoot = function (i) {
      var r = ROOTS[i];
      if (!r) return;
      rootBtns.forEach(function (b) {
        b.setAttribute('aria-pressed', b.getAttribute('data-root') === String(i) ? 'true' : 'false');
      });
      if (rootName) rootName.textContent = r.root;
      if (rootMean) rootMean.textContent = r.mean;

      var frag = document.createDocumentFragment();
      r.words.forEach(function (w) {
        var li = document.createElement('li');
        var word = document.createElement('span');
        word.className = 'w';
        word.lang = 'en';
        word.textContent = w[0];
        var parts = document.createElement('span');
        parts.className = 'p';
        parts.appendChild(document.createTextNode(w[1] + ' → '));
        var ko = document.createElement('strong');
        ko.textContent = w[2];
        parts.appendChild(ko);
        li.appendChild(word);
        li.appendChild(parts);
        frag.appendChild(li);
      });
      wordList.innerHTML = '';
      wordList.appendChild(frag);
    };

    rootWrap.addEventListener('click', function (e) {
      var btn = e.target.closest('button[data-root]');
      if (btn) renderRoot(parseInt(btn.getAttribute('data-root'), 10));
    });
  }
})();
