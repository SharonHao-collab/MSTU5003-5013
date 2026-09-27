# The Little Egg Lab

A small browser-based interactive experience for an individual class assignment.

## My original idea

> A visitor sees eight cartoon boiled eggs with different yolk textures. Each option has a short description and a “Boil me” button. When the visitor selects an egg, the page shows a large 3, 2, 1 starting countdown. Immediately after 1, a large timer appears in the center and automatically starts counting down from the full time of the selected egg. At 00:00, the page reveals a larger cartoon illustration of that egg, its texture, and one way to enjoy it.

The intended flow is: choose an egg → watch 3–2–1 → watch its full cooking timer → see the finished egg → try another egg.

## Open and use it

1. Open the HW1 folder and double-click `index.html`. It works in a browser without installation, a server, or an internet connection.
2. Choose an egg and click **Boil me**.
3. For a quick test, turn on **Quick demo** before choosing an egg. The 3–2–1 countdown stays the same, but the cooking timer lasts about 10 seconds. It is only a simulation.
4. Leave Quick demo off for the illustrative 5–12 minute timer.

You can also open this folder in VS Code and use its integrated terminal. No build step is needed.

## Files and easy edits

- `index.html` — the page sections, labels, and buttons.
- `style.css` — colors, layout, sizing, and responsive design. Start with the color variables at the top.
- `script.js` — the eight egg descriptions, serving suggestions, illustrations, and timer behavior. Edit the `eggs` list near the top. The `minutes` value sets the real timer duration. To change the Quick demo duration, find `isDemo ? 10` in `startCooking()`.
- `README.md` — this explanation and reflection prompts.

The egg drawings are original inline SVG made from simple shapes. Times and textures are illustrative; actual results vary with egg size, temperature, and altitude. No reference egg image was available in this session, so the written descriptions guided the drawings.

## AI tool and selected prompts

AI tool used: **Codex**.

Selected important prompts from my request:

> “Keep the code simple enough for me to understand, test, and revise.”

> “When someone chooses an egg style and clicks ‘Boil me,’ the experience should show a 3–2–1 countdown, immediately start a centered timer from that egg’s selected number of minutes, and then reveal the finished cartoon egg with its texture and a serving suggestion.”

> “Add a clearly labeled, optional Quick demo switch on the opening page. Leave it off by default.”

> “Prevent duplicate timers and mixed-up results if someone clicks rapidly.”

## My reflection — write this section yourself

**What I wanted visitors to experience:** [Write your own 1–2 paragraph reflection here. What feeling or question motivated your design?]

**What I observed when I tested it:** [Describe your own tests, surprises, problems, and changes. Do not fill this in until you personally try the page.]

**What I would improve next:** [Optional: explain one change you would make with more time.]

## Before pushing to your GitHub repository

- [ ] Open `index.html` in your own browser and check all eight cards.
- [ ] Test Quick demo from start to finish, then **Try another egg**.
- [ ] Turn Quick demo off and confirm a selected egg begins at its full time (for example, 07:00).
- [ ] Try keyboard navigation and a narrow mobile-sized window.
- [ ] Write your own reflection above and revise any text you want to sound more like you.
