(function () {
  "use strict";

  var params = new URLSearchParams(window.location.search);
  var q = params.get("q");
  var quizNum = parseInt(q, 10);
  if (!q || String(quizNum) !== String(q) || quizNum < 1 || quizNum > 8) {
    document.getElementById("group-root").innerHTML =
      '<p class="error-banner">Missing or invalid quiz. Use links from <a href="index.html">the home page</a>.</p>';
    return;
  }

  var bundle = typeof window !== "undefined" ? window.NELLA_GROUP_QUIZZES : null;
  var isFile = location.protocol === "file:";
  var root = document.getElementById("group-root");

  function showLoadError() {
    root.innerHTML =
      '<p class="error-banner">Could not load this quiz. Opening from disk requires <code>js/group-quizzes-data.js</code>. Over HTTP, ensure <code>data/group-' +
      quizNum +
      '.json</code> exists, or update the embedded data.</p>';
  }

  function renderQuiz(data) {
    var wrap = document.createElement("div");

    var title = document.createElement("h1");
    title.textContent = data.title;
    var gh = document.createElement("div");
    gh.className = "quiz-header";
    gh.appendChild(title);

    var gp = document.createElement("p");
    gp.className = "global-prompt";
    gp.textContent = data.prompt;

    wrap.appendChild(gh);
    wrap.appendChild(gp);

    var cats = Array.isArray(data.categories) ? data.categories.slice() : [];
    var rows = Array.isArray(data.triples) ? data.triples.slice() : [];

    rows.forEach(function (triple, idx) {
      var item = triple[0];
      var correct = triple[1];
      var explanation = triple[2];

      var block = document.createElement("div");
      block.className = "group-row";

      var top = document.createElement("div");
      top.className = "group-row-top";

      var itemCol = document.createElement("div");
      itemCol.className = "group-item";
      itemCol.textContent = item;

      var btnCol = document.createElement("div");
      btnCol.className = "group-buttons";

      var allButtons = [];
      cats.forEach(function (cat) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "group-btn";
        btn.textContent = cat;
        btn.addEventListener("click", function () {
          if (btnCol.dataset.done === "1") return;
          btnCol.dataset.done = "1";

          var isCorrect = cat === correct;
          btn.classList.add(isCorrect ? "group-btn--ok" : "group-btn--bad");
          btn.innerHTML = (isCorrect ? "✓ " : "✗ ") + cat;

          allButtons.forEach(function (other) {
            other.disabled = true;
            if (other !== btn) other.classList.add("group-btn--muted");
          });

          expl.hidden = false;
          expl.classList.remove("group-expl--show");
          void expl.offsetWidth;
          expl.classList.add("group-expl--show");
        });

        allButtons.push(btn);
        btnCol.appendChild(btn);
      });

      top.appendChild(itemCol);
      top.appendChild(btnCol);
      block.appendChild(top);

      var expl = document.createElement("div");
      expl.className = "group-expl";
      expl.id = "group-exp-" + idx;
      expl.hidden = true;
      expl.textContent = explanation;
      block.appendChild(expl);

      wrap.appendChild(block);
    });

    root.appendChild(wrap);
  }

  if (isFile) {
    var embedded = bundle ? bundle[quizNum] : null;
    if (!embedded) {
      showLoadError();
      return;
    }
    renderQuiz(embedded);
    return;
  }

  var loading = document.createElement("p");
  loading.className = "loading";
  loading.textContent = "Loading quiz…";
  root.appendChild(loading);

  fetch("data/group-" + quizNum + ".json")
    .then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    })
    .then(function (data) {
      root.removeChild(loading);
      renderQuiz(data);
    })
    .catch(function () {
      root.removeChild(loading);
      var embedded = bundle ? bundle[quizNum] : null;
      if (embedded) renderQuiz(embedded);
      else showLoadError();
    });
})();
