# The Little Egg Lab

The Little Egg Lab is a small, browser-based interactive experience for an individual class assignment. Visitors can explore eight boiled-egg styles, from 5 to 12 minutes, and see how the yolk changes over time.

## My original idea

I wanted visitors to see eight illustrated boiled eggs with different yolk textures. Each choice would have a short description and a **Boil me** button. After choosing an egg, the visitor would see a large 3–2–1 countdown, followed immediately by a centered timer that starts at the egg's full cooking time. When the timer reaches 00:00, the page would reveal a larger illustration, the egg's texture, and a serving suggestion.

The intended flow is: **choose an egg → watch 3–2–1 → watch the cooking timer → see the finished egg → try another egg**.

## How to open and use it

1. Open the `HW1` folder and double-click `index.html`. The page runs in a browser without installation, a server, or an internet connection.
2. Choose an egg and click **Boil me**.
3. To test the interaction quickly, turn on **Quick demo** before choosing an egg. The 3–2–1 countdown stays the same, but the cooking timer lasts about 10 seconds. Quick demo is a simulation, not the full cooking timer.
4. Leave Quick demo off to see the selected egg's illustrative 5–12 minute timer.
5. When the result appears, click **Try another egg** to return to the choices.

You can also open the folder in VS Code to inspect or edit the files. There is no build step.

## Project files

- `index.html` — page structure, text, controls, and buttons.
- `style.css` — colors, layout, sizing, and responsive styles. The color variables near the top are a good place to start editing.
- `script.js` — egg data, serving suggestions, SVG illustrations, and countdown behavior. The `eggs` list near the top contains the eight choices; each `minutes` value sets its full timer duration. The Quick demo duration is set by `isDemo ? 10` in `startCooking()`.
- `README.md` — project idea, usage instructions, AI process, and reflection.

The illustrations are custom inline SVGs built from shapes in the project. The cooking times and textures are illustrative: actual results can vary with egg size, starting temperature, and altitude.

## AI tool and selected prompts

I used **Codex** to help write and revise the HTML, CSS, JavaScript, and SVG illustrations. These are selected prompts from my requests:

> “Keep the code simple enough for me to understand, test, and revise.”

> “When someone chooses an egg style and clicks ‘Boil me,’ the experience should show a 3–2–1 countdown, immediately start a centered timer from that egg’s selected number of minutes, and then reveal the finished cartoon egg with its texture and a serving suggestion.”

> “Add a clearly labeled, optional Quick demo switch on the opening page. Leave it off by default.”

> “Prevent duplicate timers and mixed-up results if someone clicks rapidly.”

During the illustration revisions, I also asked Codex to use a soft, realistic digital food illustration style. I then specified a yolk color palette for the 10-, 11-, and 12-minute eggs and requested subtle hairline cracks instead of scattered dots or deep lines. I used a visual reference to communicate the style, then judged and revised the generated result.

## My reflection

**What I wanted visitors to experience:** I wanted the eight choices to feel playful and easy to compare. The large countdown and timer would make the wait feel like part of the interaction, while the finished illustration and serving suggestion would make each choice feel rewarding.

**What I observed when I tested it:** I tested the 5-minute egg with Quick demo turned off and the other seven options with Quick demo turned on. I expected the page to show the 3–2–1 sequence, start the timer, and then display “[egg name] is ready!” with the matching illustration, serving suggestion, and **Try another egg** button. The interaction worked as expected, but I noticed that the 10-, 11-, and 12-minute eggs looked less appetizing than the softer eggs.

I revised those illustrations several times. First, I asked Codex for warmer colors and softer shapes, but the yolks still looked strange and their textures were unclear. I then provided a visual reference and requested a soft, realistic digital food illustration style. The shapes became cleaner, but the yolks still looked slightly mustard-colored or greenish. General words such as “warm” and “appetizing” were not precise enough. For the final revision, I specified a color palette that moved from warm golden yellow at 10 minutes to lighter creamy yellow at 12 minutes. I also asked for a few subtle hairline cracks. In my final check, the three yolks looked warmer, and the gradual change from firm to fully cooked remained clear.

Codex helped me build the countdown and timer, connect each choice to its result, and turn my visual directions into SVG and CSS. I still had to evaluate what appeared on the page, identify what felt wrong, and decide how the colors and textures should change. Giving exact visual directions brought the result much closer to my original intention.

**What I would improve next:** I would add a small sound or animation when the egg is ready. That would make the end of the countdown clearer and the experience more playful and rewarding.
