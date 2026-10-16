# Submission draft · Represent a Phenomenon with Code and AI

> 将下面内容放进 Google Doc，并在发布网页后补入公开网页 URL 与截图。若课堂测试有新发现，请修改反思；不要把“可能发生”写成已观察到的事实。

## Observed phenomenon

During a face-to-face conversation over a meal, I noticed two different responses to phone notifications. With an ordinary app notification, the other person glanced at the phone but continued answering my question. After an incoming call, the person declined it, typed quickly, stopped answering for about 10–20 seconds, and then returned to our earlier topic. I became interested in how a conversation can be interrupted even when the other person eventually gives an answer.

## Computational thinking

I decomposed the interaction into a question, a notification, a change in gaze, speech that continues or pauses, and a return to the conversation. I noticed a possible pattern: looking at a phone does not always stop a conversation, but sustained phone use can interrupt verbal response. For the prototype, I kept gaze, speech, and elapsed waiting time. I left out the sender's identity, the content of the message, and individual habits. The code follows a repeatable event sequence and branches according to the selected scenario.

## How I used AI

One useful prompt was: “I observed that an ordinary app notification led to a brief glance while the person kept speaking, whereas an incoming call was followed by fast typing and 10–20 seconds without an answer. Identify an assumption in my explanation, suggest an alternative, and tell me what I could observe to distinguish them. Do not write code yet.”

AI pointed out that the caller's identity or expected message might matter more than the notification format. I accepted this limitation and revised the model's claim. The prototype explores two observed situations; it does not prove that calls always interrupt conversations.

I also corrected an AI design suggestion. Initially, the ordinary-notification scene had the person look back before answering. In my observation, the person continued speaking *while still looking at the phone*. I changed the scene so speech continues during the glance, and the person looks back at second 7. This distinction became the model's central idea.

## Design and code

The visitor plays the person sitting across the table. Both scenes begin with the same question: “Where should we go this weekend?” In the ordinary-notification scene, the other person glances down but answers continuously. In the call scene, the person declines the call, types, and leaves the visitor waiting for about 12 seconds before finishing the answer. The page displays gaze, speech, and conversation state. HTML provides the structure, CSS provides the visual representation, and JavaScript controls the timed events and interactions.

**Published prototype URL:** [add URL]

**Design sketch:** [add screenshot or link to `docs/sketch.md`]

**Code screenshot or link:** [add screenshot or link to `index.html`, `style.css`, and `script.js`]

## Reflection and limitation

Computational thinking helped me separate “looking at a phone” from “stopping a verbal response.” Decomposition gave me observable pieces; abstraction helped me focus on gaze, speech, and time; the algorithm made me decide exactly when each state should change. I learned that a finished answer does not necessarily mean the conversation remained continuous. The prototype simplifies two personal observations and cannot establish what caused the difference. Next, I would ask someone unfamiliar with the project to try both scenes and describe the moment they felt the conversation was interrupted.
