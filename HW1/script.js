/* Edit these eight objects to change the words, times, or serving ideas. */
const eggs = [
  { minutes: 5, name: "The Dipper", texture: "Very runny, bright yolk with a soft white.", serving: "Dip warm toast fingers into the golden center.", color: "#f49a2d", edge: "#f8bd4f", yolk: "M85 79 C111 68 136 89 134 117 C133 142 117 149 111 162 C105 175 92 171 84 161 C68 164 51 149 49 130 C45 106 62 84 85 79 Z" },
  { minutes: 6, name: "The Jammy One", texture: "A runny, jammy center inside a set white.", serving: "Spoon it over a bowl of rice with a pinch of salt.", color: "#ee922f", edge: "#fac560", yolk: "M90 77 C117 77 136 98 135 124 C134 148 116 164 91 163 C65 163 48 145 49 121 C50 96 65 78 90 77 Z" },
  { minutes: 7, name: "The Soft Set", texture: "A thicker yolk that is softly set.", serving: "Halve it over a leafy salad.", color: "#eaa13e", edge: "#f7ca71", yolk: "M90 79 C113 78 132 97 132 121 C132 146 114 160 90 160 C65 160 50 143 50 121 C50 98 67 80 90 79 Z" },
  { minutes: 8, name: "The Mellow Middle", texture: "Mostly set, with a slightly moist center.", serving: "Add it to a cozy bowl of noodle soup.", color: "#e9ac52", edge: "#f3d28a", yolk: "M90 80 C113 80 130 97 130 121 C130 144 113 159 90 159 C67 159 50 144 50 121 C50 98 67 80 90 80 Z" },
  { minutes: 9, name: "The Tender One", texture: "Tender yolk, fully set from edge to center.", serving: "Slice it onto avocado toast.", color: "#e8b65e", edge: "#f0d594", yolk: "M90 81 C112 81 129 98 129 121 C129 144 112 158 90 158 C68 158 51 144 51 121 C51 98 68 81 90 81 Z" },
  { minutes: 10, name: "The Classic", texture: "A firm, sunny yolk.", serving: "Sprinkle with paprika for a simple snack.", color: "#dfad54", edge: "#ebcf83", yolk: "M90 82 C111 82 128 99 128 121 C128 143 111 157 90 157 C69 157 52 143 52 121 C52 99 69 82 90 82 Z" },
  { minutes: 11, name: "The Crumbly One", texture: "Firmer yolk with a slightly drier bite.", serving: "Chop it into a potato salad.", color: "#d6a654", edge: "#e6cb8c", yolk: "M90 82 C111 82 127 99 127 121 C127 142 111 156 90 156 C69 156 53 142 53 121 C53 99 69 82 90 82 Z" },
  { minutes: 12, name: "The Fully Done", texture: "Fully firm yolk, ready for anything.", serving: "Mash it with a little mayo for a sandwich.", color: "#cfa25a", edge: "#e0c792", yolk: "M90 83 C110 83 126 99 126 121 C126 142 110 155 90 155 C70 155 54 142 54 121 C54 99 70 83 90 83 Z" }
];

const choicesView = document.getElementById("choices-view");
const cookingView = document.getElementById("cooking-view");
const resultView = document.getElementById("result-view");
const grid = document.getElementById("egg-grid");
const quickDemo = document.getElementById("quick-demo");
const countdownNumber = document.getElementById("countdown-number");
const timerNumber = document.getElementById("timer-number");
const stageTitle = document.getElementById("stage-title");
const stageStatus = document.getElementById("stage-status");

let selectedEgg = null;
let isDemo = false;
let phase = "choices";
let clockId = null;
let countdownEndsAt = 0;
let cookingEndsAt = 0;

function eggSVG(egg, size) {
  const id = "yolk-" + egg.minutes + "-" + size;
  const highlight = egg.minutes <= 8
    ? '<ellipse cx="77" cy="104" rx="14" ry="8" fill="#fff5bd" opacity=".55" transform="rotate(-25 77 104)"/>'
    : '';
  const speckles = egg.minutes >= 11
    ? '<circle cx="74" cy="107" r="2.5" fill="#fff1b7" opacity=".75"/><circle cx="106" cy="132" r="3" fill="#fff1b7" opacity=".7"/><circle cx="91" cy="144" r="2" fill="#fff1b7" opacity=".7"/>'
    : '';
  return '<svg viewBox="0 0 180 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<defs><radialGradient id="' + id + '" cx="45%" cy="40%" r="65%">' +
    '<stop offset="0%" stop-color="' + egg.edge + '"/>' +
    '<stop offset="100%" stop-color="' + egg.color + '"/></radialGradient></defs>' +
    '<path d="M90 13 C128 13 166 65 168 116 C170 174 137 209 90 209 C43 209 10 174 12 116 C14 65 52 13 90 13 Z" fill="#f4e9d5" stroke="#e6d3b9" stroke-width="3"/>' +
    '<path d="M90 22 C123 22 158 68 159 117 C160 168 132 199 90 199 C48 199 20 168 21 117 C22 68 57 22 90 22 Z" fill="#fffefa"/>' +
    '<path d="' + egg.yolk + '" fill="url(#' + id + ')" stroke="' + egg.color + '" stroke-width="2"/>' +
    highlight + speckles + '</svg>';
}

function renderCards() {
  eggs.forEach(function (egg, index) {
    const card = document.createElement("article");
    card.className = "egg-card";
    card.innerHTML =
      '<div class="card-top"><span class="minute-badge">' + egg.minutes + ' minutes</span><span class="card-number">0' + (index + 1) + ' / 08</span></div>' +
      '<div class="egg-art">' + eggSVG(egg, "small") + '</div>' +
      '<h3>' + egg.name + '</h3>' +
      '<p>' + egg.texture + '</p>' +
      '<button class="card-button" type="button" data-minutes="' + egg.minutes + '" aria-label="Boil the ' + egg.minutes + '-minute egg, ' + egg.name + '">Boil me <span aria-hidden="true">↗</span></button>';
    grid.appendChild(card);
  });
}

function showView(view) {
  choicesView.hidden = view !== choicesView;
  cookingView.hidden = view !== cookingView;
  resultView.hidden = view !== resultView;
}

function stopClock() {
  if (clockId !== null) {
    clearInterval(clockId);
    clockId = null;
  }
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return String(minutes).padStart(2, "0") + ":" + String(remainingSeconds).padStart(2, "0");
}

function startEgg(egg) {
  // Once a choice is made, ignore extra clicks until the visitor returns.
  if (phase !== "choices") return;
  stopClock();
  selectedEgg = egg;
  isDemo = quickDemo.checked;
  phase = "countdown";
  countdownEndsAt = Date.now() + 3000;
  stageTitle.textContent = "Ready, set, boil!";
  document.getElementById("selected-label").textContent = egg.minutes + "-minute egg · " + egg.name;
  document.getElementById("demo-note").hidden = !isDemo;
  countdownNumber.hidden = false;
  timerNumber.hidden = true;
  countdownNumber.textContent = "3";
  stageStatus.textContent = "Starting in 3 seconds";
  showView(cookingView);
  stageTitle.focus();
  clockId = setInterval(tick, 100);
}

function startCooking() {
  phase = "cooking";
  const duration = isDemo ? 10 : selectedEgg.minutes * 60;
  // Set the cooking deadline only after 3–2–1, so no cooking time is lost.
  cookingEndsAt = Date.now() + duration * 1000;
  countdownNumber.hidden = true;
  timerNumber.hidden = false;
  timerNumber.textContent = formatTime(duration);
  stageTitle.textContent = "Cooking " + selectedEgg.name;
  stageStatus.textContent = isDemo ? "Quick demo timer is running" : "Cooking timer is running";
}

function finishEgg() {
  stopClock();
  phase = "result";
  timerNumber.textContent = "00:00";
  document.getElementById("result-title").textContent = selectedEgg.name + " is ready!";
  document.getElementById("result-art").innerHTML = eggSVG(selectedEgg, "large");
  document.getElementById("result-minutes").textContent = selectedEgg.minutes + "-minute egg";
  document.getElementById("result-texture").textContent = selectedEgg.texture;
  document.getElementById("result-serving").textContent = selectedEgg.serving;
  showView(resultView);
  document.getElementById("result-title").focus();
}

function tick() {
  const now = Date.now();
  if (phase === "countdown") {
    const secondsLeft = Math.ceil((countdownEndsAt - now) / 1000);
    if (secondsLeft <= 0) {
      startCooking();
    } else {
      countdownNumber.textContent = String(secondsLeft);
      stageStatus.textContent = "Starting in " + secondsLeft + (secondsLeft === 1 ? " second" : " seconds");
    }
  } else if (phase === "cooking") {
    // Date.now keeps the timer accurate if a background tab slows intervals.
    const secondsLeft = Math.max(0, Math.ceil((cookingEndsAt - now) / 1000));
    timerNumber.textContent = formatTime(secondsLeft);
    if (secondsLeft === 0) finishEgg();
  }
}

grid.addEventListener("click", function (event) {
  const button = event.target.closest("button[data-minutes]");
  if (!button) return;
  const egg = eggs.find(function (item) {
    return item.minutes === Number(button.dataset.minutes);
  });
  if (egg) startEgg(egg);
});

document.getElementById("try-another").addEventListener("click", function () {
  stopClock();
  phase = "choices";
  selectedEgg = null;
  showView(choicesView);
  window.scrollTo(0, 0);
  document.getElementById("page-title").setAttribute("tabindex", "-1");
  document.getElementById("page-title").focus();
});

renderCards();
