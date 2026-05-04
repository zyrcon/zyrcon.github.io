(function () {
  "use strict";

  function localeCompareLabel(a, b) {
    return String(a).localeCompare(String(b), undefined, { sensitivity: "base" });
  }

  function findInsertBefore(pool, label) {
    var ch = pool.children;
    for (var i = 0; i < ch.length; i++) {
      if (localeCompareLabel(ch[i].textContent, label) > 0) return ch[i];
    }
    return null;
  }

  function moveWithFlip(el, newParent, insertBefore) {
    var rect = el.getBoundingClientRect();
    if (insertBefore) newParent.insertBefore(el, insertBefore);
    else newParent.appendChild(el);
    var newRect = el.getBoundingClientRect();
    var dx = rect.left - newRect.left;
    var dy = rect.top - newRect.top;
    el.style.transition = "none";
    el.style.transform = "translate(" + dx + "px," + dy + "px)";
    void el.offsetWidth;
    el.style.transition = "transform 0.32s cubic-bezier(0.22, 1, 0.36, 1)";
    el.style.transform = "translate(0,0)";
    function cleanup() {
      el.removeEventListener("transitionend", cleanup);
      el.style.transition = "";
      el.style.transform = "";
    }
    el.addEventListener("transitionend", cleanup);
  }

  function returnToPool(btn, poolLeft, poolRight) {
    var pool = btn.dataset.side === "left" ? poolLeft : poolRight;
    var ib = findInsertBefore(pool, btn.textContent);
    moveWithFlip(btn, pool, ib);
  }

  function placeInSlot(slot, btn, poolLeft, poolRight) {
    var occ = slot.firstChild;
    if (occ && occ !== btn) {
      returnToPool(occ, poolLeft, poolRight);
    }
    if (btn.parentElement !== slot) {
      moveWithFlip(btn, slot, null);
    }
  }

  var params = new URLSearchParams(window.location.search);
  var q = params.get("q");
  var n = parseInt(q, 10);
  if (!q || String(n) !== String(q) || n < 1 || n > 8) {
    document.getElementById("match-root").innerHTML =
      '<p class="error-banner">Missing or invalid quiz. Use links from <a href="index.html">the home page</a>.</p>';
    return;
  }

  var bundle = typeof window !== "undefined" ? window.NELLA_MATCH_QUIZZES : null;
  var isFile = location.protocol === "file:";
  var root = document.getElementById("match-root");

  function showLoadError() {
    root.innerHTML =
      '<p class="error-banner">Could not load this quiz. From disk you need <code>js/match-quizzes-data.js</code>. Over HTTP, ensure <code>data/match-' +
      n +
      '.json</code> exists.</p>';
  }

  function render(data) {
    var pairs = data.pairs || [];
    var items = pairs.map(function (p, i) {
      return { left: p[0], right: p[1], index: i };
    });
    var leftSorted = items.slice().sort(function (a, b) {
      return localeCompareLabel(a.left, b.left);
    });
    var rightSorted = items.slice().sort(function (a, b) {
      return localeCompareLabel(a.right, b.right);
    });

    var wrap = document.createElement("div");
    wrap.className = "match-board";

    var gh = document.createElement("div");
    gh.className = "quiz-header";
    var h1 = document.createElement("h1");
    h1.textContent = data.title;
    gh.appendChild(h1);

    var gp = document.createElement("p");
    gp.className = "global-prompt";
    gp.textContent = data.prompt;

    wrap.appendChild(gh);
    wrap.appendChild(gp);

    var pools = document.createElement("div");
    pools.className = "match-pools";

    var leftWrap = document.createElement("div");
    leftWrap.className = "match-pool-wrap";
    var leftTitle = document.createElement("h3");
    leftTitle.textContent = "Group A";
    var poolLeft = document.createElement("div");
    poolLeft.className = "match-pool match-pool--left";
    poolLeft.dataset.zone = "pool";
    leftWrap.appendChild(leftTitle);
    leftWrap.appendChild(poolLeft);

    var rightWrap = document.createElement("div");
    rightWrap.className = "match-pool-wrap";
    var rightTitle = document.createElement("h3");
    rightTitle.textContent = "Group B";
    var poolRight = document.createElement("div");
    poolRight.className = "match-pool match-pool--right";
    poolRight.dataset.zone = "pool";
    rightWrap.appendChild(rightTitle);
    rightWrap.appendChild(poolRight);

    pools.appendChild(leftWrap);
    pools.appendChild(rightWrap);
    wrap.appendChild(pools);

    function makeBtn(side, text, pairIndex) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "term-btn term-btn--" + side;
      b.dataset.side = side;
      b.dataset.pairIndex = String(pairIndex);
      b.textContent = text;
      return b;
    }

    leftSorted.forEach(function (it) {
      poolLeft.appendChild(makeBtn("left", it.left, it.index));
    });
    rightSorted.forEach(function (it) {
      poolRight.appendChild(makeBtn("right", it.right, it.index));
    });

    var staging = document.createElement("div");
    staging.className = "match-staging";
    var stLabel = document.createElement("p");
    stLabel.className = "match-staging-label";
    stLabel.textContent = "Pick one term from each group to compare. Click a term in a slot to put it back.";
    staging.appendChild(stLabel);

    var slotsRow = document.createElement("div");
    slotsRow.className = "match-slots";

    var slotLeft = document.createElement("div");
    slotLeft.className = "match-slot match-slot--left";
    slotLeft.dataset.zone = "slot";

    var conn = document.createElement("span");
    conn.className = "match-slot-connector";
    conn.textContent = "↔";

    var slotRight = document.createElement("div");
    slotRight.className = "match-slot match-slot--right";
    slotRight.dataset.zone = "slot";

    slotsRow.appendChild(slotLeft);
    slotsRow.appendChild(conn);
    slotsRow.appendChild(slotRight);
    staging.appendChild(slotsRow);
    wrap.appendChild(staging);

    var solvedBlock = document.createElement("div");
    solvedBlock.className = "match-solved-block";
    var solvedH = document.createElement("h3");
    solvedH.textContent = "Matched pairs";
    var solvedList = document.createElement("div");
    solvedList.className = "match-solved-list";
    solvedBlock.appendChild(solvedH);
    solvedBlock.appendChild(solvedList);
    wrap.appendChild(solvedBlock);

    var win = document.createElement("div");
    win.className = "match-win";
    win.hidden = true;
    win.textContent = "All pairs matched — well done.";
    wrap.appendChild(win);

    var solvedCount = 0;
    var totalPairs = items.length;

    function flashStaging(kind) {
      staging.classList.remove("match-staging--ok", "match-staging--bad");
      void staging.offsetWidth;
      if (kind === "ok") staging.classList.add("match-staging--ok");
      else if (kind === "bad") staging.classList.add("match-staging--bad");
      window.setTimeout(function () {
        staging.classList.remove("match-staging--ok", "match-staging--bad");
      }, kind === "bad" ? 520 : 380);
    }

    function maybeValidate() {
      var L = slotLeft.firstChild;
      var R = slotRight.firstChild;
      if (!L || !R) return;
      var li = parseInt(L.dataset.pairIndex, 10);
      var ri = parseInt(R.dataset.pairIndex, 10);
      if (li === ri) {
        flashStaging("ok");
        var row = document.createElement("div");
        row.className = "solved-pair";
        solvedList.appendChild(row);
        L.classList.add("term-btn--solved");
        R.classList.add("term-btn--solved");
        L.disabled = true;
        R.disabled = true;
        moveWithFlip(L, row, null);
        moveWithFlip(R, row, null);
        solvedCount++;
        if (solvedCount >= totalPairs) win.hidden = false;
      } else {
        flashStaging("bad");
        returnToPool(L, poolLeft, poolRight);
        returnToPool(R, poolLeft, poolRight);
      }
    }

    wrap.addEventListener("click", function (ev) {
      var btn = ev.target.closest(".term-btn");
      if (!btn || btn.disabled) return;

      var par = btn.parentElement;
      if (par.classList.contains("match-slot")) {
        returnToPool(btn, poolLeft, poolRight);
        return;
      }

      if (par.classList.contains("match-pool")) {
        if (btn.dataset.side === "left") placeInSlot(slotLeft, btn, poolLeft, poolRight);
        else placeInSlot(slotRight, btn, poolLeft, poolRight);
        maybeValidate();
      }
    });

    root.appendChild(wrap);
  }

  if (isFile) {
    var emb = bundle ? bundle[n] : null;
    if (!emb) {
      showLoadError();
      return;
    }
    render(emb);
    return;
  }

  var loading = document.createElement("p");
  loading.className = "loading";
  loading.textContent = "Loading…";
  root.appendChild(loading);

  fetch("data/match-" + n + ".json")
    .then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    })
    .then(function (data) {
      root.removeChild(loading);
      render(data);
    })
    .catch(function () {
      root.removeChild(loading);
      var emb = bundle ? bundle[n] : null;
      if (emb) render(emb);
      else showLoadError();
    });
})();
