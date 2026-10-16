// One observed relationship: a glance can coexist with speech; sustained phone use can pause it.
// Times are measured from the visitor's click. The call scene includes 12 seconds of silence.

const scene = document.querySelector("#scene");
const progress = document.querySelector("#scene-progress");
const speaker = document.querySelector("#speaker");
const spokenLine = document.querySelector("#spoken-line");
const sceneNote = document.querySelector("#scene-note");
const phone = document.querySelector("#phone");
const phoneScreen = document.querySelector("#phone-screen");
const gazeValue = document.querySelector("#gaze-value");
const speechValue = document.querySelector("#speech-value");
const conversationValue = document.querySelector("#conversation-value");
const startButton = document.querySelector("#start-button");
const soundButton = document.querySelector("#sound-button");
const otherButton = document.querySelector("#other-button");
const choices = [...document.querySelectorAll('input[name="scenario"]')];
const reflection = document.querySelector("#reflection");
const reflectionText = document.querySelector("#reflection-text");

const question = "Where should we go this weekend?";
let pendingTimers = [];
let selected = "casual";
let soundEnabled = true;
let audioContext;

const scenarios = {
  casual: {
    total: 7000,
    reflection: "They looked down at the phone but still finished their thought. When did you notice their gaze shift? Did the conversation feel interrupted to you?",
    moments: [
      { at: 0, progress: "You asked a question", speaker: "You", line: question, note: "They are about to answer.", gaze: "Looking at you", speech: "Waiting to answer", conversation: "In progress", pose: "you" },
      { at: 1000, progress: "They begin to answer", speaker: "Them", line: "I think we could…", note: "They look at you and begin speaking.", gaze: "Looking at you", speech: "Answering", conversation: "In progress" },
      { at: 2000, progress: "Notification arrives", speaker: "Phone", line: "Ding! An app notification appears.", note: "The screen lights up briefly.", phone: "ping", phoneText: "New alert", sound: "ping", speech: "Still responding", conversation: "In progress" },
      { at: 3000, progress: "They glance at the phone", speaker: "Them", line: "I think we could…", note: "They glance down at the phone.", pose: "phone", gaze: "At the phone", speech: "Still responding", conversation: "Still in progress" },
      { at: 4000, progress: "Looking and talking", speaker: "Them", line: "I think we could grab a coffee first,", note: "They are still looking at the phone, but keep answering.", phone: "none", phoneText: "Phone", speech: "Still responding", conversation: "Still in progress" },
      { at: 5500, progress: "The answer continues", speaker: "Them", line: "I think we could grab a coffee first, then take a walk in the park.", note: "They finish their thought.", speech: "Full answer", conversation: "Still in progress" },
      { at: 7000, progress: "Conversation continues", speaker: "Them", line: "I think we could grab a coffee first, then take a walk in the park.", note: "They look back at you.", pose: "you", gaze: "Looking at you", speech: "Answer complete", conversation: "Stayed continuous", finish: true }
    ]
  },
  call: {
    total: 18000,
    reflection: "They eventually answered, but you waited about 12 seconds in the middle. When did you begin to feel left out of the conversation?",
    moments: [
      { at: 0, progress: "You asked a question", speaker: "You", line: question, note: "They are about to answer.", gaze: "Looking at you", speech: "Waiting to answer", conversation: "In progress", pose: "you" },
      { at: 1000, progress: "They begin to answer", speaker: "Them", line: "I think… um…", note: "They have not finished the sentence.", gaze: "Looking at you", speech: "Hesitating", conversation: "In progress" },
      { at: 2000, progress: "Incoming call", speaker: "Phone", line: "Ring, ring… An incoming call appears.", note: "The phone keeps ringing.", phone: "ring", phoneText: "Call", sound: "ring", speech: "Answer stops", conversation: "Being interrupted" },
      { at: 3000, progress: "Call declined", speaker: "Them", line: "I think… um…", note: "They look down and decline the call.", pose: "phone", gaze: "At the phone", phone: "none", phoneText: "Declined", speech: "Hesitating", conversation: "Being interrupted" },
      { at: 4000, progress: "Attention shifts", speaker: "Them", line: "Um…", note: "They are still looking at the phone.", phone: "typing", phoneText: "Typing…", speech: "Hesitating", conversation: "Being interrupted" },
      { at: 5000, progress: "Conversation pauses", speaker: "In the moment", line: "…", note: "They begin typing quickly and stop answering your question.", phone: "typing", phoneText: "Typing··", speech: "Paused", conversation: "Paused" },
      { at: 9000, progress: "Still waiting", speaker: "In the moment", line: "…", note: "They are still typing. Your question has not been answered.", phoneText: "Typing···", speech: "Paused", conversation: "Paused" },
      { at: 13000, progress: "Still waiting", speaker: "In the moment", line: "…", note: "You are still waiting. They have not looked back at you.", phoneText: "Typing·", speech: "Paused", conversation: "Paused" },
      { at: 17000, progress: "They return", speaker: "Them", line: "Let's grab a coffee first…", note: "They look up and return to the earlier topic.", pose: "you", gaze: "Looking at you", phone: "none", phoneText: "Phone", speech: "Answering again", conversation: "Resuming" },
      { at: 18000, progress: "Conversation resumes", speaker: "Them", line: "Let's grab a coffee first, then go to the park?", note: "They finally answer your original question.", speech: "Answer complete", conversation: "Resumed after pause", finish: true }
    ]
  }
};

function playTone(frequency, duration, startOffset = 0) {
  if (!soundEnabled) return;
  try {
    audioContext ??= new (window.AudioContext || window.webkitAudioContext)();
    if (audioContext.state === "suspended") audioContext.resume();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    const time = audioContext.currentTime + startOffset;
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, time);
    gain.gain.setValueAtTime(0.0001, time);
    gain.gain.exponentialRampToValueAtTime(0.1, time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
    oscillator.connect(gain).connect(audioContext.destination);
    oscillator.start(time);
    oscillator.stop(time + duration + 0.02);
  } catch {
    // The visible scene still works if this browser blocks audio.
  }
}

function playAlert(kind) {
  if (kind === "ping") {
    playTone(880, 0.18);
    playTone(1175, 0.2, 0.13);
  } else if (kind === "ring") {
    playTone(660, 0.24);
    playTone(780, 0.24, 0.32);
    playTone(660, 0.24, 0.64);
  }
}

function clearMoments() {
  pendingTimers.forEach(clearTimeout);
  pendingTimers = [];
}

function resetScene() {
  clearMoments();
  scene.dataset.phase = "ready";
  scene.dataset.gaze = "you";
  progress.textContent = "Ready to begin";
  speaker.textContent = "Ready?";
  spokenLine.textContent = "Choose a notification, then ask your question.";
  sceneNote.textContent = "You are sitting face to face. The conversation is about to begin.";
  phone.dataset.alert = "none";
  phoneScreen.textContent = "Phone";
  gazeValue.textContent = "Looking at you";
  speechValue.textContent = "Not started";
  conversationValue.textContent = "Ready to begin";
  reflection.hidden = true;
  choices.forEach(choice => { choice.disabled = false; });
  startButton.disabled = false;
  startButton.innerHTML = 'Ask your question <span aria-hidden="true">↗</span>';
}

function applyMoment(moment) {
  if (moment.progress) progress.textContent = moment.progress;
  if (moment.speaker) speaker.textContent = moment.speaker;
  if (moment.line) spokenLine.textContent = moment.line;
  if (moment.note) sceneNote.textContent = moment.note;
  if (moment.pose) scene.dataset.gaze = moment.pose;
  if (moment.gaze) gazeValue.textContent = moment.gaze;
  if (moment.speech) speechValue.textContent = moment.speech;
  if (moment.conversation) conversationValue.textContent = moment.conversation;
  if (moment.phone) phone.dataset.alert = moment.phone;
  if (moment.phoneText) phoneScreen.textContent = moment.phoneText;
  if (moment.sound) playAlert(moment.sound);
  if (moment.finish) finishScene();
}

function finishScene() {
  scene.dataset.phase = "finished";
  choices.forEach(choice => { choice.disabled = false; });
  startButton.disabled = false;
  startButton.innerHTML = 'Replay this scenario <span aria-hidden="true">↗</span>';
  reflectionText.textContent = scenarios[selected].reflection;
  reflection.hidden = false;
}

function startScene() {
  clearMoments();
  resetScene();
  // Initialize audio during the button click, while the browser allows sound.
  if (soundEnabled) {
    try {
      audioContext ??= new (window.AudioContext || window.webkitAudioContext)();
      if (audioContext.state === "suspended") audioContext.resume();
    } catch {
      // The visual sequence remains usable without Web Audio support.
    }
  }
  scene.dataset.phase = "playing";
  choices.forEach(choice => { choice.disabled = true; });
  startButton.disabled = true;
  reflection.hidden = true;
  scenarios[selected].moments.forEach(moment => {
    if (moment.at === 0) applyMoment(moment);
    else pendingTimers.push(setTimeout(() => applyMoment(moment), moment.at));
  });
}

choices.forEach(choice => choice.addEventListener("change", () => {
  selected = choice.value;
  resetScene();
}));
startButton.addEventListener("click", startScene);
otherButton.addEventListener("click", () => {
  selected = selected === "casual" ? "call" : "casual";
  document.querySelector(`input[value="${selected}"]`).checked = true;
  resetScene();
  startButton.focus();
});
soundButton.addEventListener("click", () => {
  soundEnabled = !soundEnabled;
  soundButton.textContent = `Sound: ${soundEnabled ? "On" : "Off"}`;
  soundButton.setAttribute("aria-pressed", String(soundEnabled));
});
