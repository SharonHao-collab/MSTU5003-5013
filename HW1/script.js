/* Edit these eight objects to change the words, times, or serving ideas. */
const eggs = [
  { minutes: 5, name: "The Dipper", texture: "Very runny, bright yolk with a soft white.", serving: "Dip warm toast fingers into the golden center." },
  { minutes: 6, name: "The Jammy One", texture: "A runny, jammy center inside a set white.", serving: "Spoon it over a bowl of rice with a pinch of salt." },
  { minutes: 7, name: "The Soft Set", texture: "A thicker yolk that is softly set.", serving: "Halve it over a leafy salad." },
  { minutes: 8, name: "The Mellow Middle", texture: "Mostly set, with a slightly moist center.", serving: "Add it to a cozy bowl of noodle soup." },
  { minutes: 9, name: "The Tender One", texture: "Tender yolk, fully set from edge to center.", serving: "Slice it onto avocado toast." },
  { minutes: 10, name: "The Classic", texture: "A firm, sunny yolk.", serving: "Sprinkle with paprika for a simple snack." },
  { minutes: 11, name: "The Crumbly One", texture: "Firmer yolk with a slightly drier bite.", serving: "Chop it into a potato salad." },
  { minutes: 12, name: "The Fully Done", texture: "Fully firm yolk, ready for anything.", serving: "Mash it with a little mayo for a sandwich." }
];

/* One illustration recipe; only these texture settings change by cooking time. */
const eggArtStyles = [
  { center: "#ef7a0d", middle: "#e96b0b", rim: "#f6ae3d", wet: "#ec650a", wetEdge: "#d94d0b", wetRadius: 31, gloss: 0.9, grain: 0, label: "deep orange, very glossy liquid yolk" },
  { center: "#f18a18", middle: "#ed7c11", rim: "#f6b849", wet: "#e9710d", wetEdge: "#df5d0d", wetRadius: 27, gloss: 0.72, grain: 0, label: "glossy orange jammy yolk" },
  { center: "#ef9825", middle: "#e98b1d", rim: "#f6c157", wet: "#e58217", wetEdge: "#df7416", wetRadius: 20, gloss: 0.43, grain: 0, label: "thick creamy orange yolk" },
  { center: "#eda737", middle: "#e99b2a", rim: "#f6c969", wet: "#df8d1c", wetEdge: "#da8318", wetRadius: 11, gloss: 0.17, grain: 0, label: "mostly set golden yolk with a small moist center" },
  { center: "#edb64c", middle: "#e6aa3b", rim: "#f5d27c", wet: "", wetEdge: "", wetRadius: 0, gloss: 0, grain: 0, label: "smooth, tender, fully set golden yolk" },
  { center: "#FFE08A", middle: "#F4C44E", rim: "#DFA12C", wet: "", wetEdge: "", wetRadius: 0, gloss: 0, grain: 0, label: "smooth firm golden-yellow yolk with a soft highlight" },
  { center: "#FFE7A3", middle: "#F2CD67", rim: "#DCA83E", wet: "", wetEdge: "", wetRadius: 0, gloss: 0, grain: 0, label: "warm matte-yellow yolk with two delicate hairline marks" },
  { center: "#FFF0BE", middle: "#F0D58A", rim: "#D7B65B", wet: "", wetEdge: "", wetRadius: 0, gloss: 0, grain: 0, label: "fully firm creamy-yellow yolk with three fine hairline marks" }
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
  const art = eggArtStyles[egg.minutes - 5];
  const id = egg.minutes + "-" + size;
  const imageText = egg.minutes + "-minute boiled egg half; " + art.label + ".";
  const yolkOutline = egg.minutes >= 10 ? art.rim : "#e0af62";
  const yolkShade = egg.minutes >= 10 ? art.rim : "#a96925";

  // The same egg is used on the card and result view; only its display size changes.
  let texture = "";
  if (egg.minutes === 10) {
    texture = '<ellipse cx="76" cy="103" rx="17" ry="8" fill="' + art.center +
      '" opacity="0.35" filter="url(#soft-' + id + ')"/>';
  } else if (egg.minutes === 11) {
    texture = '<path d="M79 112 C82 111 82 114 86 112 M95 129 C97 126 99 128 101 125" fill="none" stroke="' +
      art.rim + '" stroke-width="1.2" stroke-linecap="round" opacity="0.3"/>';
  } else if (egg.minutes === 12) {
    texture = '<path d="M77 112 C80 110 81 113 84 110 M92 123 C95 121 96 124 99 121 M84 136 C87 134 88 136 91 133" fill="none" stroke="' +
      art.rim + '" stroke-width="1.3" stroke-linecap="round" opacity="0.37"/>';
  }

  const moistCenter = art.wetRadius
    ? '<ellipse cx="90" cy="121" rx="' + art.wetRadius + '" ry="' +
      (art.wetRadius * 0.94).toFixed(1) + '" fill="url(#wet-' + id +
      ')" opacity="0.95" filter="url(#soft-' + id + ')"/>'
    : '';
  const shine = art.gloss
    ? '<path d="M65 106 C71 96 82 91 93 93" fill="none" stroke="#fff8d8" stroke-width="5" stroke-linecap="round" opacity="' +
      art.gloss + '"/><ellipse cx="73" cy="107" rx="9" ry="4" fill="#fff8d8" opacity="' +
      (art.gloss * 0.34).toFixed(2) + '" filter="url(#soft-' + id + ')"/>'
    : '';

  return [
    '<svg viewBox="0 0 180 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title-' + id + '">',
    '<title id="title-' + id + '">' + imageText + '</title>',
    '<defs>',
    '<linearGradient id="edge-' + id + '" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff8e8"/><stop offset="0.65" stop-color="#f0dcc0"/><stop offset="1" stop-color="#d7b993"/></linearGradient>',
    '<radialGradient id="white-' + id + '" cx="35%" cy="27%" r="78%"><stop offset="0" stop-color="#fffef6"/><stop offset="0.63" stop-color="#fff7e8"/><stop offset="1" stop-color="#ead9be"/></radialGradient>',
    '<radialGradient id="yolk-' + id + '" cx="42%" cy="35%" r="67%"><stop offset="0" stop-color="' + art.center + '"/><stop offset="0.7" stop-color="' + art.middle + '"/><stop offset="1" stop-color="' + art.rim + '"/></radialGradient>',
    '<radialGradient id="wet-' + id + '" cx="40%" cy="31%" r="70%"><stop offset="0" stop-color="' + art.wet + '"/><stop offset="1" stop-color="' + art.wetEdge + '"/></radialGradient>',
    '<filter id="soft-' + id + '" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="2"/></filter>',
    '<clipPath id="yolk-clip-' + id + '"><ellipse cx="90" cy="121" rx="42" ry="40"/></clipPath>',
    '</defs>',
    '<path d="M90 12 C128 12 160 55 166 103 C173 160 144 207 90 210 C36 207 7 160 14 103 C20 55 52 12 90 12 Z" fill="url(#edge-' + id + ')" stroke="#c9aa82" stroke-width="1.5"/>',
    '<path d="M90 22 C123 22 151 59 156 105 C163 156 136 197 90 199 C44 197 17 156 24 105 C29 59 57 22 90 22 Z" fill="url(#white-' + id + ')" stroke="#fff9ec" stroke-width="2"/>',
    '<path d="M30 100 C35 61 60 29 91 27" fill="none" stroke="#ffffff" stroke-width="4" opacity="0.45" stroke-linecap="round"/>',
    '<ellipse cx="91" cy="124" rx="48" ry="46" fill="#ad7a43" opacity="0.15" filter="url(#soft-' + id + ')"/>',
    '<ellipse cx="90" cy="121" rx="43" ry="41" fill="#f8e5b3" opacity="0.78"/>',
    '<ellipse cx="90" cy="121" rx="42" ry="40" fill="url(#yolk-' + id + ')" stroke="' + yolkOutline + '" stroke-width="1.2"/>',
    '<g clip-path="url(#yolk-clip-' + id + ')">',
    moistCenter,
    '<path d="M109 91 C127 103 130 131 113 148" fill="none" stroke="' + yolkShade + '" stroke-width="7" opacity="0.11" stroke-linecap="round" filter="url(#soft-' + id + ')"/>',
    texture,
    shine,
    '</g>',
    '</svg>'
  ].join("");
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
