```markdown
# Are You Still Listening?

A single-page interactive model built with HTML, CSS, and JavaScript. It explores how a face-to-face conversation may continue or pause after a phone notification appears.

## How to Open

Double-click `index.html` to open it in a browser. Choose a notification, click “Ask your question,” and then use “Try the other scenario” to compare the two experiences. Keep these three code files in the same folder:

- `index.html`: Page structure and text
- `style.css`: Characters, phone, layout, and animations
- `script.js`: Timing, states, and notification sounds for both scenarios

The page uses no external assets and does not collect or send data. If the browser blocks sound, the visual experience still works. In the incoming-call scenario, the pause between the person stopping and resuming their answer lasts about 12 seconds. The full scenario lasts about 18 seconds.

## Assignment Materials

- `docs/design.md`: The phenomenon, computational thinking, expected behavior, and test results
- `docs/sketch.md`: Design sketches for the page and both scenarios
- `docs/ai-process.md`: AI prompts and feedback, along with my own decisions and revisions
- `docs/submission-draft.md`: An English draft for the Google Doc submission; add the public URL and screenshots after publishing the webpage

## Design Focus

Both scenarios begin with the same question. With an ordinary app notification, the other person looks at the phone but continues answering. With an incoming call, they decline the call, type, pause, and answer later. The model focuses on three observable features: gaze, verbal response, and waiting time. It does not show who sent the notification or what it says, so it cannot establish that the notification type caused the difference in behavior.
```
