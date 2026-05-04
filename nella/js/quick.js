(function () {
  "use strict";

  function normalize(str) {
    return String(str)
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{M}/gu, "")
      .replace(/['’]/g, "'")
      .replace(/[^\p{L}\p{N}\s'-]/gu, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  var params = new URLSearchParams(window.location.search);
  var q = params.get("q");
  var quizNum = parseInt(q, 10);
  if (!q || String(quizNum) !== String(q) || quizNum < 1 || quizNum > 8) {
    document.getElementById("quick-root").innerHTML =
      '<p class="error-banner">Missing or invalid quiz. Use links from <a href="index.html">the home page</a>.</p>';
    return;
  }

  var bundle = typeof window !== "undefined" ? window.NELLA_QUICK_QUIZZES : null;
  var isFile = location.protocol === "file:";
  var root = document.getElementById("quick-root");

  function showLoadError() {
    root.innerHTML =
      '<p class="error-banner">Could not load this quiz. Opening from disk requires <code>js/quick-quizzes-data.js</code>. Over HTTP, ensure <code>data/quick-' +
      quizNum +
      '.json</code> exists.</p>';
  }

  function addWrongChip(container, value) {
    var chip = document.createElement("div");
    chip.className = "quick-wrong";
    chip.textContent = "✗ " + value;
    if (container.firstChild) container.insertBefore(chip, container.firstChild);
    else container.appendChild(chip);
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

    var pairs = Array.isArray(data.pairs) ? data.pairs : [];
    pairs.forEach(function (pair, i) {
      var left = pair[0];
      var answer = pair[1];

      var row = document.createElement("div");
      row.className = "quick-row";

      var label = document.createElement("p");
      label.className = "quick-label";
      label.textContent = String.fromCharCode(97 + (i % 26)) + ") " + left;

      var input = document.createElement("input");
      input.type = "text";
      input.className = "quick-input";
      input.placeholder = "Write the correct title";
      input.autocomplete = "off";

      var wrongs = document.createElement("div");
      wrongs.className = "quick-wrongs";

      function check() {
        if (input.disabled) return;
        var raw = input.value.trim();
        if (!raw) return;
        if (normalize(raw) === normalize(answer)) {
          input.value = answer;
          input.classList.add("quick-input--ok");
          input.disabled = true;
          input.setAttribute("aria-label", "Correct answer");
        } else {
          addWrongChip(wrongs, raw);
          input.classList.add("quick-input--bad");
          window.setTimeout(function () {
            input.classList.remove("quick-input--bad");
          }, 350);
          input.value = "";
        }
      }

      input.addEventListener("keydown", function (ev) {
        if (ev.key === "Enter") {
          ev.preventDefault();
          check();
        }
      });
      input.addEventListener("change", check);

      row.appendChild(label);
      row.appendChild(input);
      row.appendChild(wrongs);
      wrap.appendChild(row);
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

  fetch("data/quick-" + quizNum + ".json")
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
