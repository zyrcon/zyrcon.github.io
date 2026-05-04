(function () {
  "use strict";

  var textGrid = document.getElementById("quiz-grid");
  var matchGrid = document.getElementById("match-quiz-grid");
  var groupGrid = document.getElementById("group-quiz-grid");
  var quickGrid = document.getElementById("quick-quiz-grid");
  if (!textGrid || !matchGrid || !groupGrid || !quickGrid) return;

  var textIds = [1, 2, 3, 4, 5, 6, 7, 8];
  var matchIds = [1, 2, 3, 4, 5, 6, 7, 8];
  var groupIds = [1, 2, 3, 4, 5, 6, 7, 8];
  var quickIds = [1, 2, 3, 4, 5, 6, 7, 8];
  var textBundle = typeof window !== "undefined" ? window.NELLA_QUIZZES : null;
  var matchBundle = typeof window !== "undefined" ? window.NELLA_MATCH_QUIZZES : null;
  var groupBundle = typeof window !== "undefined" ? window.NELLA_GROUP_QUIZZES : null;
  var quickBundle = typeof window !== "undefined" ? window.NELLA_QUICK_QUIZZES : null;
  var isFile = location.protocol === "file:";

  function renderCards(grid, items, page, emptyMsg) {
    grid.innerHTML = "";
    if (!items || items.length === 0) {
      grid.innerHTML = '<p class="error-banner">' + (emptyMsg || "Nothing to show.") + "</p>";
      return;
    }
    items.forEach(function (item) {
      var a = document.createElement("a");
      a.className = "card-link";
      a.href = page + "?q=" + item.id;

      var h2 = document.createElement("h2");
      h2.className = "card-title";
      h2.textContent = item.data.title;

      var p = document.createElement("p");
      p.className = "card-prompt";
      p.textContent = item.data.prompt;

      a.appendChild(h2);
      a.appendChild(p);
      grid.appendChild(a);
    });
  }

  function textItemsFromBundle() {
    if (!textBundle) return null;
    var out = [];
    for (var i = 0; i < textIds.length; i++) {
      var id = textIds[i];
      if (!textBundle[id]) return null;
      out.push({ id: id, data: textBundle[id] });
    }
    return out;
  }

  function matchItemsFromBundle() {
    if (!matchBundle) return null;
    var out = [];
    for (var j = 0; j < matchIds.length; j++) {
      var mid = matchIds[j];
      if (!matchBundle[mid]) return null;
      out.push({ id: mid, data: matchBundle[mid] });
    }
    return out;
  }

  function groupItemsFromBundle() {
    if (!groupBundle) return null;
    var out = [];
    for (var k = 0; k < groupIds.length; k++) {
      var gid = groupIds[k];
      if (!groupBundle[gid]) return null;
      out.push({ id: gid, data: groupBundle[gid] });
    }
    return out;
  }

  function quickItemsFromBundle() {
    if (!quickBundle) return null;
    var out = [];
    for (var m = 0; m < quickIds.length; m++) {
      var qid = quickIds[m];
      if (!quickBundle[qid]) return null;
      out.push({ id: qid, data: quickBundle[qid] });
    }
    return out;
  }

  function fetchJsonList(ids, prefix) {
    return Promise.all(
      ids.map(function (id) {
        return fetch("data/" + prefix + id + ".json")
          .then(function (r) {
            if (!r.ok) throw new Error(String(r.status));
            return r.json();
          })
          .then(function (data) {
            return { id: id, data: data };
          });
      })
    );
  }

  function showTextBundleMissing() {
    textGrid.innerHTML =
      '<p class="error-banner">Missing <code>js/quizzes-data.js</code> (or it failed to load). Required for <code>file://</code> text quizzes.</p>';
  }

  function showMatchBundleMissing() {
    matchGrid.innerHTML =
      '<p class="error-banner">Missing <code>js/match-quizzes-data.js</code> (or it failed to load). Required for <code>file://</code> pair quizzes.</p>';
  }

  function showTextFetchHelp() {
    textGrid.innerHTML =
      '<p class="error-banner">Could not load text quizzes over HTTP. Include <code>js/quizzes-data.js</code> before <code>js/index.js</code>, or fix <code>data/quiz-*.json</code>.</p>';
  }

  function showMatchFetchHelp() {
    matchGrid.innerHTML =
      '<p class="error-banner">Could not load pair quizzes over HTTP. Include <code>js/match-quizzes-data.js</code>, or fix <code>data/match-*.json</code>.</p>';
  }

  function showGroupBundleMissing() {
    groupGrid.innerHTML =
      '<p class="error-banner">Missing <code>js/group-quizzes-data.js</code> (or it failed to load). Required for <code>file://</code> grouping quizzes.</p>';
  }

  function showGroupFetchHelp() {
    groupGrid.innerHTML =
      '<p class="error-banner">Could not load grouping quizzes over HTTP. Include <code>js/group-quizzes-data.js</code>, or fix <code>data/group-*.json</code>.</p>';
  }

  function showQuickBundleMissing() {
    quickGrid.innerHTML =
      '<p class="error-banner">Missing <code>js/quick-quizzes-data.js</code> (or it failed to load). Required for <code>file://</code> quick quizzes.</p>';
  }

  function showQuickFetchHelp() {
    quickGrid.innerHTML =
      '<p class="error-banner">Could not load quick quizzes over HTTP. Include <code>js/quick-quizzes-data.js</code>, or fix <code>data/quick-*.json</code>.</p>';
  }

  if (isFile) {
    var tb = textItemsFromBundle();
    if (tb) renderCards(textGrid, tb, "quiz.html");
    else showTextBundleMissing();

    var mb = matchItemsFromBundle();
    if (mb) renderCards(matchGrid, mb, "match.html");
    else showMatchBundleMissing();

    var gb = groupItemsFromBundle();
    if (gb) renderCards(groupGrid, gb, "group.html");
    else showGroupBundleMissing();

    var qb = quickItemsFromBundle();
    if (qb) renderCards(quickGrid, qb, "quick.html");
    else showQuickBundleMissing();
    return;
  }

  fetchJsonList(textIds, "quiz-")
    .then(function (items) {
      renderCards(textGrid, items, "quiz.html");
    })
    .catch(function () {
      var fb = textItemsFromBundle();
      if (fb) renderCards(textGrid, fb, "quiz.html");
      else showTextFetchHelp();
    });

  fetchJsonList(matchIds, "match-")
    .then(function (items) {
      renderCards(matchGrid, items, "match.html");
    })
    .catch(function () {
      var fb = matchItemsFromBundle();
      if (fb) renderCards(matchGrid, fb, "match.html");
      else showMatchFetchHelp();
    });

  fetchJsonList(groupIds, "group-")
    .then(function (items) {
      renderCards(groupGrid, items, "group.html");
    })
    .catch(function () {
      var fb = groupItemsFromBundle();
      if (fb) renderCards(groupGrid, fb, "group.html");
      else showGroupFetchHelp();
    });

  fetchJsonList(quickIds, "quick-")
    .then(function (items) {
      renderCards(quickGrid, items, "quick.html");
    })
    .catch(function () {
      var fb = quickItemsFromBundle();
      if (fb) renderCards(quickGrid, fb, "quick.html");
      else showQuickFetchHelp();
    });
})();
