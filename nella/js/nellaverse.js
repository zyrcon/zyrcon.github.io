(function () {
  "use strict";

  var app = document.getElementById("app-root");
  if (!app) return;

  var flow = [
    {
      type: "match",
      id: "match-1",
      title: "It all started with the good old Barbie movies",
      prompt: "Connect these characters with a Barbie movie they belong to.",
      pairs: [
        ["Serafina", "Barbie as the Princess and the Pauper"],
        ["Sparkle", "Barbie and the Diamond Castle"],
        ["Penelope", "Barbie as Rapunzel"],
        ["Bibble", "Barbie Fairytopia"],
        ["Twyla", "Barbie in the 12 Dancing Princesses"],
      ],
      reward: {
        text: "Good job! You have won this gift!",
        image: "media/1.jpg",
        button: "Click here for more gifts!",
      },
    },
    {
      type: "quick",
      id: "quick-1",
      title: "I did something bad fren...",
      prompt: "I wrote the opposite names for these songs titles. Write them correctly.",
      pairs: [
        ["Shut-up later", "Speak Now"],
        ["Front to January", "Back to December"],
        ["Fat", "Skinny"],
        ["The Taker", "The Giver"],
        ["I Hate You, I'm Not Sorry", "I Love You, I'm Sorry"],
        ["Rise alive", "Drop dead"],
        ["Womangrownup", "Manchild"],
        ["Youngest Son", "Eldest Daughter"],
        ["Happy ugly comic", "Sad beautiful tragic"],
        ["The Biggest Woman Who Never Died", "The Smallest Man Who Ever Lived"],
        ["But Mommy I Hate Her", "But Daddy I Love Him"],
        ["Up Good", "Down Bad"],
        ["Everybody's Daughter", "Nobody's Son"],
        ["Good idea left?", "Bad idea right?"],
      ],
      reward: {
        text: "Great job! You have won this gift!",
        image: "media/2.jpg",
        button: "Click here for more gifts!",
      },
    },
    {
      type: "group",
      id: "group-1",
      title: "These songs belong with me-ee-ee - or not?",
      prompt: "Choose the right album (Reputation or Lover)",
      categories: ["Reputation", "Lover"],
      triples: [
        ["I Did Something Bad", "Reputation", "They're burning all the witches, even if you aren't one."],
        ["All Of The Girls You Loved Before", "Lover", "Crying in the bathroom for some dude, whose name I cannot remember now."],
        ["Miss Americana & The Heartbreak Prince", "Lover", "It's been a long time coming, but it's you and me, that's my whole world."],
        ["The Man", "Lover", "If I was out flashing my dollars, I'd be a bitch, not a baller, they paint me out to be bas, so it's okay that I'm mad."],
        ["This Is Why We Can't Have Nice Things", "Reputation", "This is why we can't have nice things, darlin'. Because you break them, I had to take them away."],
        ["King Of My Heart", "Reputation", "Salute to me, I'm your American queen and you move to me like I'm a Motown beat."],
        ["Getaway Car", "Reputation", "X marks the spot where we fell apart, he poisoned the well, every man for himself."],
        ["Cornelia Street", "Lover", "And baby, I get mystified by how this city screams your name."],
      ],
      reward: {
        text: "WoOoW! You have won this gift!",
        image: "media/3.jpg",
        button: "Click here for more gifts!",
      },
    },
    {
      type: "quiz",
      id: "quiz-1",
      title: "You're a wizard, Nella.",
      prompt: "If you are a wizard, you'll know all Harry Potter books",
      questions: [
        {
          text: "Name all 7 Harry Potter books either in Croatian or English.",
          slots: [
            { accepted: ["Philosopher's Stone", "Kamen mudraca"] },
            { accepted: ["Chamber of Secrets", "Odaja tajni"] },
            { accepted: ["Prisoner of Azkaban", "Zatočenik Azkabana"] },
            { accepted: ["Goblet of Fire", "Plameni pehar"] },
            { accepted: ["Order of the Phoenix", "Red feniksa"] },
            { accepted: ["Half-Blood Prince", "Princ miješane krvi"] },
            { accepted: ["Deathly Hallows", "Darovi smrti"] },
          ],
        },
      ],
      reward: {
        text: "Amazing! You have won this gift!",
        image: "media/4.jpg",
        button: "Click here for more gifts!",
      },
    },
    {
      type: "quiz",
      id: "quiz-2",
      title: "Chez Remy",
      prompt: "Gusteau says that anyone can cook.. if that is true, can you make your famous Dreamlight Valley souffle for me?",
      questions: [
        {
          text: "Name the 4 ingredients for the souffle:",
          slots: [{ accepted: ["Cheese"] }, { accepted: ["Milk"] }, { accepted: ["Egg", "Eggs"] }, { accepted: ["Butter"] }],
        },
      ],
      reward: {
        text: "Awesome! You have won this gift!",
        image: "media/5.jpg",
        button: "Click here for more gifts!",
      },
    },
    {
      type: "group",
      id: "group-2",
      title: "Once upon a time..",
      prompt: "Nothing beats one and only - Disney! But there is also Dreamworks... so, which is which?",
      categories: ["Disney", "Dreamworks"],
      triples: [
        ["Shrek", "Dreamworks", ""],
        ["Snow White", "Disney", ""],
        ["Ratatouille", "Disney", ""],
        ["Inside Out", "Disney", ""],
        ["Madagascar", "Dreamworks", ""],
        ["Kung Fu panda", "Dreamworks", ""],
        ["Finding Nemo", "Disney", ""],
        ["Antz", "Dreamworks", ""],
        ["A Bug's Life", "Disney", ""],
        ["Zootopia", "Disney", ""],
        ["Trolls", "Dreamworks", ""],
        ["How to Train Your Dragon", "Dreamworks", ""],
        ["Monsters Inc.", "Disney", ""],
      ],
      reward: {
        text: "Amaze! Amaze! Amaze! You have won this gift!",
        image: "media/6.jpg",
        button: "Click here for more gifts!",
      },
    },
    {
      type: "match",
      id: "match-2",
      title: "Why settle for a duke when one can have a prince?",
      prompt: "Match each Bridgerton sibling to their partner.",
      pairs: [
        ["Daphne Bridgerton", "Simon Basset"],
        ["Anthony Bridgerton", "Kate Sheffield"],
        ["Benedict Bridgerton", "Sophie Beckett"],
        ["Colin Bridgerton", "Penelope Featherington"],
        ["Eloise Bridgerton", "Sir Phillip Crane"],
        ["Francesca Bridgerton", "Michael Stirling"],
        ["Hyacinth Bridgerton", "Gareth St. Clair"],
        ["Gregory Bridgerton", "Lucy Abernathy"],
      ],
      reward: {
        text: "Wunderbar! You have won this gift!",
        image: "media/7.jpg",
        button: "Click here for more gifts!",
      },
    },
    {
      type: "quiz",
      id: "quiz-3",
      title: "I deserve presents just for breathing.",
      prompt: "Just like Lisa, you deserve presents just for breathing, so this present is going to be easy to get.",
      questions: [
        {
          text: "Name 6 main characters from The Real Housewives of Salt Lake City (Season 1).",
          slots: [
            { accepted: ["Lisa Barlow", "Lisa"] },
            { accepted: ["Mary Cosby", "Mary"] },
            { accepted: ["Heather Gay", "Heather"] },
            { accepted: ["Meredith Marks", "Meredith"] },
            { accepted: ["Whitney Rose", "Whitney"] },
            { accepted: ["Jen Shah", "Jen"] },
          ],
        },
      ],
      reward: {
        text: "Bravo! You have won this gift!",
        image: "media/8.jpg",
        button: "Click here for the final page!",
      },
    },
  ];

  var stepIndex = -1;

  function normalize(str) {
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

  function localeCompareLabel(a, b) {
    return String(a).localeCompare(String(b), undefined, { sensitivity: "base" });
  }

  function clearApp(extraClass) {
    app.className = "nellaverse-root";
    if (extraClass) app.classList.add(extraClass);
    app.innerHTML = "";
  }

  function makePrimaryButton(text, onClick) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn btn-primary nellaverse-main-btn";
    btn.textContent = text;
    btn.addEventListener("click", onClick);
    return btn;
  }

  function showLanding() {
    clearApp();
    var card = document.createElement("section");
    card.className = "nella-card";

    var h1 = document.createElement("h1");
    h1.className = "nella-title";
    h1.textContent = "Whealcum Nella";

    // Add subtitle below the title, above the button
    var subtitle = document.createElement("div");
    subtitle.className = "nella-subtitle";
    subtitle.textContent = "I promise you this will last longer than 2 seconds ;)";
    subtitle.style.textAlign = "center";

    var btn = makePrimaryButton("Click here to enter the Nellaverse", function () {
      stepIndex = 0;
      renderStep();
    });

    card.appendChild(h1);
    card.appendChild(subtitle);
    card.appendChild(btn);
    app.appendChild(card);
  }

  function showGiftScreen(reward, onContinue) {
    clearApp();
    var card = document.createElement("section");
    card.className = "nella-card gift-card";

    var msg = document.createElement("h2");
    msg.className = "gift-title";
    msg.textContent = reward.text;

    var img = document.createElement("img");
    img.className = "gift-image";
    img.src = reward.image;
    img.alt = "Gift image";

    var btn = makePrimaryButton(reward.button, onContinue);

    card.appendChild(msg);
    card.appendChild(img);
    card.appendChild(btn);
    app.appendChild(card);
  }

  function showFinalPage() {
    clearApp("retro-final");

    var starLayer = document.createElement("div");
    starLayer.className = "star-layer";
    var colors = ["#ff00ff", "#00ffff", "#ffff00", "#ff5500", "#7dff00", "#00a2ff", "#ff3399"];
    for (var i = 0; i < 170; i++) {
      var star = document.createElement("span");
      star.className = "retro-star";
      star.style.left = Math.random() * 100 + "%";
      star.style.top = Math.random() * 100 + "%";
      star.style.color = colors[i % colors.length];
      star.style.fontSize = 10 + Math.floor(Math.random() * 16) + "px";
      star.textContent = "★";
      starLayer.appendChild(star);
    }

    var card = document.createElement("section");
    card.className = "final-card";

    var img = document.createElement("img");
    img.className = "gift-image";
    img.src = "media/9.jpg";
    img.alt = "Final gift image";

    var text = document.createElement("p");
    text.className = "final-text";
    text.textContent =
      "You made it! you have all the answeres in the world! You won this fair and square!";

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "final-scam-btn";
    btn.textContent = "CLICK ON THE BUTTON BELOW TO SEND YOUR GIFT!";
    btn.appendChild(document.createElement("br"));
    btn.appendChild(document.createTextNode("totally not a scam!!!"));

    card.appendChild(img);
    card.appendChild(text);
    card.appendChild(btn);

    app.appendChild(starLayer);
    app.appendChild(card);
  }

  function buildGameHeader(step) {
    var wrap = document.createElement("section");
    wrap.className = "nella-card";
    var head = document.createElement("div");
    head.className = "quiz-header";
    var title = document.createElement("h1");
    title.textContent = step.title;
    head.appendChild(title);
    var prompt = document.createElement("p");
    prompt.className = "global-prompt";
    prompt.textContent = step.prompt;
    wrap.appendChild(head);
    wrap.appendChild(prompt);
    return wrap;
  }

  function nextFromStep(step) {
    showGiftScreen(step.reward, function () {
      stepIndex++;
      if (stepIndex >= flow.length) showFinalPage();
      else renderStep();
    });
  }

  function renderMatch(step) {
    var card = buildGameHeader(step);
    var pairs = step.pairs || [];
    var items = pairs.map(function (p, i) {
      return { left: p[0], right: p[1], index: i };
    });

    var leftSorted = items.slice().sort(function (a, b) {
      return localeCompareLabel(a.left, b.left);
    });
    var rightSorted = items.slice().sort(function (a, b) {
      return localeCompareLabel(a.right, b.right);
    });

    var pools = document.createElement("div");
    pools.className = "match-pools";

    var leftWrap = document.createElement("div");
    leftWrap.className = "match-pool-wrap";
    var leftTitle = document.createElement("h3");
    leftTitle.textContent = "Group A";
    var poolLeft = document.createElement("div");
    poolLeft.className = "match-pool";
    leftWrap.appendChild(leftTitle);
    leftWrap.appendChild(poolLeft);

    var rightWrap = document.createElement("div");
    rightWrap.className = "match-pool-wrap";
    var rightTitle = document.createElement("h3");
    rightTitle.textContent = "Group B";
    var poolRight = document.createElement("div");
    poolRight.className = "match-pool";
    rightWrap.appendChild(rightTitle);
    rightWrap.appendChild(poolRight);

    pools.appendChild(leftWrap);
    pools.appendChild(rightWrap);
    card.appendChild(pools);

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
    stLabel.textContent = "Pick one from each group.";
    staging.appendChild(stLabel);

    var slotsRow = document.createElement("div");
    slotsRow.className = "match-slots";
    var slotLeft = document.createElement("div");
    slotLeft.className = "match-slot match-slot--left";
    var connector = document.createElement("span");
    connector.className = "match-slot-connector";
    connector.textContent = "↔";
    var slotRight = document.createElement("div");
    slotRight.className = "match-slot match-slot--right";
    slotsRow.appendChild(slotLeft);
    slotsRow.appendChild(connector);
    slotsRow.appendChild(slotRight);
    staging.appendChild(slotsRow);
    card.appendChild(staging);

    var solvedList = document.createElement("div");
    solvedList.className = "match-solved-list";
    card.appendChild(solvedList);

    var solvedCount = 0;
    var totalPairs = items.length;

    function moveWithFlip(el, newParent, insertBefore) {
      var rect = el.getBoundingClientRect();
      if (insertBefore) newParent.insertBefore(el, insertBefore);
      else newParent.appendChild(el);
      var nextRect = el.getBoundingClientRect();
      var dx = rect.left - nextRect.left;
      var dy = rect.top - nextRect.top;
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

    function findInsertBefore(pool, label) {
      var ch = pool.children;
      for (var i = 0; i < ch.length; i++) {
        if (localeCompareLabel(ch[i].textContent, label) > 0) return ch[i];
      }
      return null;
    }

    function returnToPool(btn) {
      var pool = btn.dataset.side === "left" ? poolLeft : poolRight;
      var before = findInsertBefore(pool, btn.textContent);
      moveWithFlip(btn, pool, before);
    }

    function placeInSlot(slot, btn) {
      var occ = slot.firstChild;
      if (occ && occ !== btn) returnToPool(occ);
      if (btn.parentElement !== slot) moveWithFlip(btn, slot, null);
    }

    function flashStaging(kind) {
      staging.classList.remove("match-staging--ok", "match-staging--bad");
      void staging.offsetWidth;
      if (kind === "ok") staging.classList.add("match-staging--ok");
      if (kind === "bad") staging.classList.add("match-staging--bad");
      window.setTimeout(function () {
        staging.classList.remove("match-staging--ok", "match-staging--bad");
      }, kind === "bad" ? 520 : 380);
    }

    function checkPair() {
      var L = slotLeft.firstChild;
      var R = slotRight.firstChild;
      if (!L || !R) return;
      if (L.dataset.pairIndex === R.dataset.pairIndex) {
        flashStaging("ok");
        var row = document.createElement("div");
        row.className = "solved-pair";
        L.disabled = true;
        R.disabled = true;
        L.classList.add("term-btn--solved");
        R.classList.add("term-btn--solved");
        moveWithFlip(L, row, null);
        moveWithFlip(R, row, null);
        solvedList.appendChild(row);
        solvedCount++;
        if (solvedCount >= totalPairs) nextFromStep(step);
      } else {
        flashStaging("bad");
        returnToPool(L);
        returnToPool(R);
      }
    }

    card.addEventListener("click", function (ev) {
      var btn = ev.target.closest(".term-btn");
      if (!btn || btn.disabled) return;
      var parent = btn.parentElement;
      if (parent === slotLeft || parent === slotRight) {
        returnToPool(btn);
        return;
      }
      if (parent === poolLeft) placeInSlot(slotLeft, btn);
      if (parent === poolRight) placeInSlot(slotRight, btn);
      checkPair();
    });

    app.appendChild(card);
  }

  function renderQuick(step) {
    var card = buildGameHeader(step);
    var pairs = step.pairs || [];
    var solved = 0;

    pairs.forEach(function (pair, i) {
      var row = document.createElement("div");
      row.className = "quick-row";

      var label = document.createElement("p");
      label.className = "quick-label";
      label.textContent = String.fromCharCode(97 + (i % 26)) + ") " + pair[0];

      var input = document.createElement("input");
      input.type = "text";
      input.className = "quick-input";
      input.placeholder = "Write the correct title";

      var wrongs = document.createElement("div");
      wrongs.className = "quick-wrongs";

      function check() {
        if (input.disabled) return;
        var value = input.value.trim();
        if (!value) return;
        if (normalize(value) === normalize(pair[1])) {
          input.value = pair[1];
          input.classList.add("quick-input--ok");
          input.disabled = true;
          solved++;
          if (solved >= pairs.length) nextFromStep(step);
        } else {
          var chip = document.createElement("div");
          chip.className = "quick-wrong";
          chip.textContent = "✗ " + value;
          wrongs.insertBefore(chip, wrongs.firstChild);
          input.classList.add("quick-input--bad");
          input.value = "";
          window.setTimeout(function () {
            input.classList.remove("quick-input--bad");
          }, 350);
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
      card.appendChild(row);
    });

    app.appendChild(card);
  }

  function renderGroup(step) {
    var card = buildGameHeader(step);
    var triples = step.triples || [];
    var categories = step.categories || [];
    var solved = 0;

    triples.forEach(function (triple) {
      var row = document.createElement("div");
      row.className = "group-row";
      var top = document.createElement("div");
      top.className = "group-row-top";
      var item = document.createElement("div");
      item.className = "group-item";
      item.textContent = triple[0];
      var buttons = document.createElement("div");
      buttons.className = "group-buttons";
      var done = false;

      categories.forEach(function (cat) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "group-btn";
        btn.textContent = cat;
        btn.addEventListener("click", function () {
          if (done) return;
          done = true;
          var isCorrect = cat === triple[1];
          if (isCorrect) {
            btn.classList.add("group-btn--ok");
            btn.innerHTML = "✓ " + cat;
            var all = buttons.querySelectorAll("button");
            for (var i = 0; i < all.length; i++) {
              all[i].disabled = true;
              if (all[i] !== btn) all[i].classList.add("group-btn--muted");
            }
          } else {
            done = false;
            btn.classList.add("group-btn--bad");
            window.setTimeout(function () {
              btn.classList.remove("group-btn--bad");
            }, 320);
          }
          if (isCorrect) {
            solved++;
            if (solved >= triples.length) nextFromStep(step);
          }
        });
        buttons.appendChild(btn);
      });

      top.appendChild(item);
      top.appendChild(buttons);
      row.appendChild(top);
      card.appendChild(row);
    });

    app.appendChild(card);
  }

  function slotMatchesAnswer(slot, normalizedAnswer) {
    for (var i = 0; i < slot.accepted.length; i++) {
      if (normalize(slot.accepted[i]) === normalizedAnswer) return true;
    }
    return false;
  }

  function renderQuiz(step) {
    var card = buildGameHeader(step);
    var question = step.questions[0];
    var slots = question.slots || [];

    var block = document.createElement("div");
    block.className = "question-block";
    var qText = document.createElement("p");
    qText.className = "question-text";
    qText.textContent = question.text;
    block.appendChild(qText);

    var attempts = document.createElement("div");
    attempts.className = "answer-attempts";

    var row = document.createElement("div");
    row.className = "answer-row-fixed";

    var input = document.createElement("input");
    input.type = "text";
    input.className = "answer-input-single";
    input.placeholder = "Type one answer, then submit";
    input.autocomplete = "off";

    var matched = slots.map(function () {
      return false;
    });
    var guessed = {};

    function remainingCount() {
      var count = 0;
      for (var i = 0; i < matched.length; i++) {
        if (!matched[i]) count++;
      }
      return count;
    }

    function addAttemptChip(value, isCorrect) {
      var chip = document.createElement("div");
      chip.className = "attempt-chip " + (isCorrect ? "attempt-chip--ok" : "attempt-chip--bad");
      var mark = document.createElement("span");
      mark.className = "attempt-chip__mark";
      mark.textContent = isCorrect ? "✓" : "✗";
      var text = document.createElement("span");
      text.className = "attempt-chip__text";
      text.textContent = value;
      chip.appendChild(mark);
      chip.appendChild(text);
      if (attempts.firstChild) attempts.insertBefore(chip, attempts.firstChild);
      else attempts.appendChild(chip);
    }

    function submitGuess() {
      if (input.disabled) return;
      var raw = input.value.trim();
      if (!raw) return;
      var normalized = normalize(raw);
      if (!normalized) return;

      if (Object.prototype.hasOwnProperty.call(guessed, normalized)) {
        input.value = "";
        return;
      }

      guessed[normalized] = true;

      var foundSlot = -1;
      for (var i = 0; i < slots.length; i++) {
        if (matched[i]) continue;
        if (slotMatchesAnswer(slots[i], normalized)) {
          foundSlot = i;
          break;
        }
      }

      if (foundSlot !== -1) {
        matched[foundSlot] = true;
        addAttemptChip(raw, true);
      } else {
        addAttemptChip(raw, false);
      }

      input.value = "";
      if (remainingCount() === 0) {
        input.disabled = true;
        submitBtn.disabled = true;
        nextFromStep(step);
      }
    }

    var submitBtn = makePrimaryButton("Submit", submitGuess);
    submitBtn.classList.remove("nellaverse-main-btn");

    input.addEventListener("keydown", function (ev) {
      if (ev.key === "Enter") {
        ev.preventDefault();
        submitGuess();
      }
    });

    row.appendChild(input);
    row.appendChild(submitBtn);
    block.appendChild(attempts);
    block.appendChild(row);
    card.appendChild(block);
    app.appendChild(card);
  }

  function renderStep() {
    clearApp();
    if (stepIndex < 0 || stepIndex >= flow.length) {
      showFinalPage();
      return;
    }
    var step = flow[stepIndex];
    if (step.type === "match") renderMatch(step);
    else if (step.type === "quick") renderQuick(step);
    else if (step.type === "group") renderGroup(step);
    else if (step.type === "quiz") renderQuiz(step);
  }

  showLanding();
})();
