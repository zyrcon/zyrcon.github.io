(function () {
  "use strict";

  function normalizeAnswer(str) {
    return String(str)
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{M}/gu, "")
      .replace(/['’]/g, "'")
      .replace(/&/g, " and ")
      .replace(/[^\p{L}\p{N}\s'-]/gu, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function tokensMatch(tokenNorm, acceptedNorm) {
    if (tokenNorm === acceptedNorm) return true;
    if (tokenNorm.length < 2 || acceptedNorm.length < 2) return tokenNorm === acceptedNorm;
    return tokenNorm.includes(acceptedNorm) || acceptedNorm.includes(tokenNorm);
  }

  function matchesSlotNorm(slots, slotIndex, nt) {
    var slot = slots[slotIndex];
    for (var a = 0; a < slot.accepted.length; a++) {
      if (tokensMatch(nt, normalizeAnswer(slot.accepted[a]))) return true;
    }
    return false;
  }

  function classifySubmission(slots, matched, raw) {
    var trimmed = String(raw).trim();
    if (!trimmed) return { kind: "empty" };
    var nt = normalizeAnswer(trimmed);
    if (!nt) return { kind: "empty" };

    for (var u = 0; u < slots.length; u++) {
      if (matched[u]) continue;
      if (matchesSlotNorm(slots, u, nt)) {
        return { kind: "correct", display: trimmed, slotIndex: u };
      }
    }

    return { kind: "wrong", display: trimmed };
  }

  function remainingCount(slots, matched) {
    var n = 0;
    for (var i = 0; i < matched.length; i++) {
      if (!matched[i]) n++;
    }
    return n;
  }

  function placeholderForRemaining(rem) {
    if (rem <= 0) return "All required answers found.";
    return (
      rem +
      " correct answer" +
      (rem === 1 ? "" : "s") +
      " still to enter — type one, then Submit."
    );
  }

  function prependAttemptChip(container, display, ok) {
    var chip = document.createElement("div");
    chip.className = "attempt-chip " + (ok ? "attempt-chip--ok" : "attempt-chip--bad");
    chip.setAttribute("role", "status");

    var mark = document.createElement("span");
    mark.className = "attempt-chip__mark";
    mark.setAttribute("aria-hidden", "true");
    mark.textContent = ok ? "✓" : "✗";

    var text = document.createElement("span");
    text.className = "attempt-chip__text";
    text.textContent = display;

    chip.appendChild(mark);
    chip.appendChild(text);
    if (container.firstChild) container.insertBefore(chip, container.firstChild);
    else container.appendChild(chip);
  }

  function wireAlreadyGuessedToast(overlay, pill) {
    function onAnimEnd(ev) {
      if (ev.target !== pill) return;
      pill.removeEventListener("animationend", onAnimEnd);
      overlay.classList.remove("already-guessed-overlay--anim");
    }

    return function show() {
      pill.removeEventListener("animationend", onAnimEnd);
      overlay.classList.remove("already-guessed-overlay--anim");
      void overlay.offsetWidth;
      overlay.classList.add("already-guessed-overlay--anim");
      pill.addEventListener("animationend", onAnimEnd);
    };
  }

  var params = new URLSearchParams(window.location.search);
  var q = params.get("q");
  var quizNum = parseInt(q, 10);
  if (!q || String(quizNum) !== String(q) || quizNum < 1 || quizNum > 8) {
    document.getElementById("quiz-root").innerHTML =
      '<p class="error-banner">Missing or invalid quiz. Use links from <a href="index.html">the home page</a>.</p>';
    return;
  }

  var bundle = typeof window !== "undefined" ? window.NELLA_QUIZZES : null;
  var isFile = location.protocol === "file:";
  var root = document.getElementById("quiz-root");

  function showLoadError() {
    root.innerHTML =
      '<p class="error-banner">Could not load this quiz. Opening from disk requires <code>js/quizzes-data.js</code>. Over HTTP, ensure <code>data/quiz-' +
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

    data.questions.forEach(function (question, qi) {
      var slots = question.slots || [];
      var block = document.createElement("div");
      block.className = "question-block";

      var ql = document.createElement("p");
      ql.className = "question-label";
      ql.textContent =
        data.questions.length > 1 ? "Question " + (qi + 1) + " of " + data.questions.length : "Your answer";

      var qt = document.createElement("p");
      qt.className = "question-text";
      qt.textContent = question.text;

      var area = document.createElement("div");
      area.className = "answer-area";

      var lbl = document.createElement("label");
      lbl.setAttribute("for", "answer-" + qi);
      lbl.textContent = "Type one answer, then click Submit (or press Enter).";

      var attempts = document.createElement("div");
      attempts.className = "answer-attempts";

      var row = document.createElement("div");
      row.className = "answer-row-fixed answer-row-fixed--toast-host";

      var inp = document.createElement("input");
      inp.type = "text";
      inp.className = "answer-input-single";
      inp.id = "answer-" + qi;
      inp.autocomplete = "off";
      inp.spellcheck = true;

      var submitBtn = document.createElement("button");
      submitBtn.type = "button";
      submitBtn.className = "btn btn-primary";
      submitBtn.textContent = "Submit";

      var overlay = document.createElement("div");
      overlay.className = "already-guessed-overlay";
      overlay.setAttribute("aria-hidden", "true");
      var pill = document.createElement("span");
      pill.className = "already-guessed-overlay__pill";
      pill.textContent = "Already guessed";
      overlay.appendChild(pill);
      row.appendChild(inp);
      row.appendChild(submitBtn);
      row.appendChild(overlay);

      var showAlreadyGuessed = wireAlreadyGuessedToast(overlay, pill);

      var matched = slots.map(function () {
        return false;
      });
      var guessedNorm = {};

      function syncPlaceholderAndControls() {
        var rem = slots.length === 0 ? 0 : remainingCount(slots, matched);
        inp.placeholder = slots.length === 0 ? "No answers required for this question." : placeholderForRemaining(rem);
        var done = slots.length === 0 || rem === 0;
        inp.disabled = done;
        submitBtn.disabled = done;
      }

      function submit() {
        if (inp.disabled) return;
        var raw = inp.value;
        var trimmed = String(raw).trim();
        if (!trimmed) return;
        var nt = normalizeAnswer(trimmed);
        if (!nt) return;

        if (Object.prototype.hasOwnProperty.call(guessedNorm, nt)) {
          inp.value = "";
          showAlreadyGuessed();
          return;
        }

        var result = classifySubmission(slots, matched, raw);
        if (result.kind === "empty") return;

        inp.value = "";

        if (result.kind === "correct") {
          matched[result.slotIndex] = true;
          guessedNorm[nt] = true;
          prependAttemptChip(attempts, result.display, true);
        } else {
          guessedNorm[nt] = true;
          prependAttemptChip(attempts, result.display, false);
        }

        syncPlaceholderAndControls();
      }

      submitBtn.addEventListener("click", submit);
      inp.addEventListener("keydown", function (ev) {
        if (ev.key === "Enter") {
          ev.preventDefault();
          submit();
        }
      });

      area.appendChild(lbl);
      area.appendChild(attempts);
      area.appendChild(row);

      block.appendChild(ql);
      block.appendChild(qt);
      block.appendChild(area);

      wrap.appendChild(block);

      syncPlaceholderAndControls();
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

  var container = document.createElement("div");
  container.className = "loading";
  container.textContent = "Loading quiz…";
  root.appendChild(container);

  fetch("data/quiz-" + quizNum + ".json")
    .then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    })
    .then(function (data) {
      root.removeChild(container);
      renderQuiz(data);
    })
    .catch(function () {
      root.removeChild(container);
      var embedded = bundle ? bundle[quizNum] : null;
      if (embedded) renderQuiz(embedded);
      else showLoadError();
    });
})();
