/* Daily Mood Tracker — saves one editable check-in per local calendar day. */
"use strict";

const STORAGE_KEY = "daily-mood-tracker.entries.v1";
const MOODS = Object.freeze({
  happy: { label: "Happy", emoji: "😊" },
  calm: { label: "Calm", emoji: "😌" },
  okay: { label: "Okay", emoji: "😐" },
  low: { label: "Low", emoji: "😔" },
  overwhelmed: { label: "Overwhelmed", emoji: "😵‍💫" }
});

const form = document.getElementById("mood-form");
const journal = document.getElementById("journal-entry");
const status = document.getElementById("form-status");
const entriesList = document.getElementById("entry-list");
const emptyState = document.getElementById("empty-state");
const saveButtonText = document.getElementById("save-button-text");
const headerDate = document.getElementById("header-date");

let entries = [];
let storageAvailable = true;

function localDateKey(date = new Date()) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function formatDate(key) {
  const date = new Date(`${key}T12:00:00`);
  return Number.isNaN(date.getTime())
    ? key
    : new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(date);
}

function loadEntries() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (!Array.isArray(stored)) return [];
    return stored.filter(item =>
      item &&
      typeof item.date === "string" &&
      /^\d{4}-\d{2}-\d{2}$/.test(item.date) &&
      Object.hasOwn(MOODS, item.mood) &&
      typeof item.note === "string"
    ).slice(0, 365);
  } catch (error) {
    storageAvailable = false;
    console.warn("Mood entries couldn't be loaded:", error);
    return [];
  }
}

function persistEntries() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    storageAvailable = true;
    return true;
  } catch (error) {
    storageAvailable = false;
    console.warn("Mood entries couldn't be saved:", error);
    return false;
  }
}

function message(text) {
  status.textContent = text;
}

function renderEntries() {
  entriesList.replaceChildren();
  entries.sort((a, b) => b.date.localeCompare(a.date));
  emptyState.hidden = entries.length > 0;

  entries.forEach(entry => {
    const mood = MOODS[entry.mood];
    const li = document.createElement("li");
    li.className = "entry-card";

    const content = document.createElement("div");
    const top = document.createElement("div");
    top.className = "entry-top";

    const moodLabel = document.createElement("span");
    moodLabel.className = "entry-mood";
    moodLabel.textContent = `${mood.emoji} ${mood.label}`;

    const date = document.createElement("span");
    date.className = "entry-date";
    date.textContent = formatDate(entry.date);
    top.append(moodLabel, date);
    content.append(top);

    if (entry.note.trim()) {
      const note = document.createElement("p");
      note.className = "entry-note";
      // textContent prevents journal input from being interpreted as HTML.
      note.textContent = entry.note;
      content.append(note);
    }

    const remove = document.createElement("button");
    remove.className = "remove-button";
    remove.type = "button";
    remove.textContent = "Remove";
    remove.setAttribute("aria-label", `Remove entry from ${formatDate(entry.date)}`);
    remove.addEventListener("click", () => {
      const previousEntries = entries;
      entries = entries.filter(item => item.date !== entry.date);
      if (!persistEntries()) {
        entries = previousEntries;
        message("This browser couldn't update your saved entries.");
        return;
      }
      if (entry.date === localDateKey()) {
        form.reset();
        journal.value = "";
      }
      updateSaveLabel();
      renderEntries();
      message("The entry was removed.");
    });

    li.append(content, remove);
    entriesList.append(li);
  });
}

function updateSaveLabel() {
  saveButtonText.textContent = entries.some(entry => entry.date === localDateKey())
    ? "Update My Mood"
    : "Save My Mood";
}

function loadTodaysCheckIn() {
  const today = entries.find(entry => entry.date === localDateKey());
  if (!today) return;
  const option = form.querySelector(`input[name="mood"][value="${today.mood}"]`);
  if (option) option.checked = true;
  journal.value = today.note;
}

function updateDisplayedDate() {
  headerDate.textContent = new Intl.DateTimeFormat("en-US", {
    weekday: "short", month: "short", day: "numeric"
  }).format(new Date());
}

form.addEventListener("submit", event => {
  event.preventDefault();
  const selection = form.querySelector('input[name="mood"]:checked');

  if (!selection) {
    message("Choose whichever mood feels closest before saving.");
    form.querySelector('input[name="mood"]').focus();
    return;
  }

  const date = localDateKey();
  const nextEntry = {
    date,
    mood: selection.value,
    note: journal.value.trim(),
    updatedAt: new Date().toISOString()
  };
  const previousEntries = entries;
  entries = [nextEntry, ...entries.filter(item => item.date !== date)];

  if (!persistEntries()) {
    entries = previousEntries;
    message("Saving isn't available in this browser right now. Your writing is still on this page.");
    return;
  }

  renderEntries();
  updateSaveLabel();
  message("Your check-in has been saved. Thank you for making space for yourself. 🤍");
});

form.addEventListener("input", () => { if (status.textContent) message(""); });
form.addEventListener("change", () => { if (status.textContent) message(""); });

entries = loadEntries();
updateDisplayedDate();
loadTodaysCheckIn();
updateSaveLabel();
renderEntries();
if (!storageAvailable) {
  message("Saved entries aren't accessible in this browser right now.");
}
