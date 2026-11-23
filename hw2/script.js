const app = document.querySelector('#app');
const voiceChoices = document.querySelectorAll('input[name="voice"]');
const approachButton = document.querySelector('#approach');
const response = document.querySelector('#response-text');

// One variable remembers the location; the selected microphone is the other input.
let approached = false;

function updateScene() {
  const voice = document.querySelector('input[name="voice"]:checked').value;

  if (!approached) {
    app.dataset.mood = 'watching';
    response.textContent = voice === 'loud'
      ? 'Miso hears your loud voice and stays across the room, keeping an eye on you.'
      : 'Miso watches from across the room, waiting to see what you do.';
  } else if (voice === 'whisper') {
    app.dataset.mood = 'relaxed';
    response.textContent = 'You whisper. Miso closes her eyes, comes close, and gently rubs against you.';
  } else if (voice === 'normal') {
    app.dataset.mood = 'excited';
    response.textContent = 'Miso perks up! She bounces toward you, paws up, eager to play.';
  } else {
    app.dataset.mood = 'startled';
    response.textContent = 'The loud voice scares Miso. Her eyes go wide and she leaps far away.';
  }

  approachButton.setAttribute('aria-pressed', String(approached));
  approachButton.querySelector('.pin-text').textContent = approached ? 'Step back' : 'Go closer to Miso';
}

voiceChoices.forEach(choice => choice.addEventListener('change', updateScene));
approachButton.addEventListener('click', () => {
  approached = !approached;
  updateScene();
});
updateScene();
