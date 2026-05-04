/* Mirrors data/quiz-1.json … quiz-8.json so index.html works from file:// (browsers block fetch on local files). When you edit the JSON files, update this object to match. */
window.NELLA_QUIZZES = {
  1: {
    id: "quiz-1",
    title: "Hrvatska",
    prompt: "Name all countries that share a land border with Croatia.",
    questions: [
      {
        text: "List every neighboring country (use common English names).",
        slots: [
          { accepted: ["Italy"] },
          { accepted: ["Slovenia"] },
          { accepted: ["Hungary"] },
          { accepted: ["Serbia"] },
          { accepted: ["Bosnia and Herzegovina", "Bosnia", "BiH"] },
          { accepted: ["Montenegro"] },
        ],
      },
    ],
  },
  2: {
    id: "quiz-2",
    title: "Founding Six",
    prompt: "Which six countries were the original members of the European Economic Community (1957)?",
    questions: [
      {
        text: "Name all six founding members.",
        slots: [
          { accepted: ["Belgium"] },
          { accepted: ["France"] },
          { accepted: ["West Germany", "Germany", "Federal Republic of Germany"] },
          { accepted: ["Italy"] },
          { accepted: ["Luxembourg"] },
          { accepted: ["Netherlands", "The Netherlands", "Holland"] },
        ],
      },
    ],
  },
  3: {
    id: "quiz-3",
    title: "Baltic trio",
    prompt: "Name the three sovereign countries on the Baltic Sea that are commonly called the Baltic states.",
    questions: [
      {
        text: "All three countries, please.",
        slots: [{ accepted: ["Estonia"] }, { accepted: ["Latvia"] }, { accepted: ["Lithuania"] }],
      },
    ],
  },
  4: {
    id: "quiz-4",
    title: "Great Lakes",
    prompt: "Name the five Great Lakes of North America.",
    questions: [
      {
        text: "List all five lakes.",
        slots: [
          { accepted: ["Lake Superior", "Superior"] },
          { accepted: ["Lake Michigan", "Michigan"] },
          { accepted: ["Lake Huron", "Huron"] },
          { accepted: ["Lake Erie", "Erie"] },
          { accepted: ["Lake Ontario", "Ontario"] },
        ],
      },
    ],
  },
  5: {
    id: "quiz-5",
    title: "Swiss tongues",
    prompt: "Switzerland has four official languages at the federal level — name them.",
    questions: [
      {
        text: "List the four official languages.",
        slots: [
          { accepted: ["German"] },
          { accepted: ["French"] },
          { accepted: ["Italian"] },
          { accepted: ["Romansh", "Romansch", "Rumantsch"] },
        ],
      },
    ],
  },
  6: {
    id: "quiz-6",
    title: "Solar family",
    prompt: "Name the eight planets of the Solar System in any order (Pluto not included).",
    questions: [
      {
        text: "List all eight planets.",
        slots: [
          { accepted: ["Mercury"] },
          { accepted: ["Venus"] },
          { accepted: ["Earth"] },
          { accepted: ["Mars"] },
          { accepted: ["Jupiter"] },
          { accepted: ["Saturn"] },
          { accepted: ["Uranus"] },
          { accepted: ["Neptune"] },
        ],
      },
    ],
  },
  7: {
    id: "quiz-7",
    title: "Around Germany",
    prompt: "Name all countries that share a land border with Germany.",
    questions: [
      {
        text: "List each neighboring country.",
        slots: [
          { accepted: ["Denmark"] },
          { accepted: ["Poland"] },
          { accepted: ["Czech Republic", "Czechia"] },
          { accepted: ["Austria"] },
          { accepted: ["Switzerland"] },
          { accepted: ["France"] },
          { accepted: ["Luxembourg"] },
          { accepted: ["Belgium"] },
          { accepted: ["Netherlands", "Holland", "The Netherlands"] },
        ],
      },
    ],
  },
  8: {
    id: "quiz-8",
    title: "Seven summits",
    prompt: "The Seven Summits are the highest peaks on each continent — name those mountains.",
    questions: [
      {
        text: "List all seven peaks (common English names accepted).",
        slots: [
          { accepted: ["Everest", "Mount Everest"] },
          { accepted: ["Aconcagua", "Mount Aconcagua"] },
          { accepted: ["Denali", "Mount McKinley", "McKinley"] },
          { accepted: ["Kilimanjaro", "Mount Kilimanjaro"] },
          { accepted: ["Elbrus", "Mount Elbrus"] },
          { accepted: ["Vinson Massif", "Mount Vinson", "Vinson"] },
          {
            accepted: [
              "Kosciuszko",
              "Mount Kosciuszko",
              "Kosciusko",
              "Puncak Jaya",
              "Carstensz Pyramid",
              "Carstensz",
            ],
          },
        ],
      },
    ],
  },
};
