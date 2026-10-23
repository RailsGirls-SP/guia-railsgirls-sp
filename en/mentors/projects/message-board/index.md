---
title: Message Board notes
parent: Project notes
grand_parent: Mentoring guide
nav_order: 1
has_children: true
translation_of: mentoras/projetos/mural-de-recados/index.md
translated_from: 8fea355
---

# Message Board notes

<!-- TODO: explain how to use the `passo-NN` tags of the reference repository (RailsGirls-SP/mural-de-recados), once they exist. -->

## How to run "Think before you code"

Every chapter starts with a few minutes of planning, before any code. It's the easiest part to skip, and one of the most important: it's where the participant practices thinking about the problem before the solution, which still matters with or without AI.

- **Give real time.** The guide suggests about 5 minutes (10 to 15 in chapter 00). Agree on the time and respect it, even if it feels like too much silence.
- **Ask instead of answering.** Each notes page has some questions for "Think before you code". Use them to get things moving, not to give the answer.
- **There is no wrong answer.** The person's plan doesn't need to be the same as ours. Value what was thought through, even if it's different.
- **Only open "our plan" afterwards.** The comparison is the part where people learn the most: "why is our plan different from yours?".
- **Pen and paper.** Drawing by hand takes away the pressure to "make it pretty" and frees up thinking.
- **If the person wants to skip it,** it's fine to do a short "Think before you code", out loud, with one or two questions. Short is better than none.

## No automated tests for now

In this first project, don't encourage participants to write automated tests. Tests are important, but here the focus is something else: understanding the path of a request, planning before coding and reaching an app that works within the day. Writing tests at the same time doubles what they need to learn at once.

- `rails new` creates a `test` folder with example files. If someone asks, explain in one sentence: they're programs that check on their own whether the app works; we're leaving them for later.
- In this project, checking is manual: the **Check** and **Break it on purpose** sections of each chapter.
- If a participant already has experience and finishes early, tests can become an extra challenge.

## No scaffold

In this project, don't use `bin/rails generate scaffold`, or `scaffold_controller`, and don't encourage participants to use them. Each part of the app (model, routes, controller and views) shows up in a chapter of its own. Small generators, like `generate model` and `generate controller`, can be used, but the participant reviews and adjusts what they created: in chapter 03, for example, the participant deletes the route the generator added and rewrites the view.

- **Understanding each piece.** The scaffold creates dozens of files at once. It works, but the participant doesn't see how each part connects to the others, which is exactly what the project wants to teach.
- **Small stages, like in the MVP.** Building one piece per chapter follows the same skateboard-to-car idea: the app works at the end of each stage, and you can check what changed.
- **The same goes for AI.** Asking for the whole app at once, from a generator or from an AI, is the opposite of what the guide teaches.

If a participant already knows the scaffold and asks, explain that it exists and is useful day to day, but that here the goal is to see each piece being born. It stays as a challenge for after the project: generate a scaffold and compare it with what was written by hand.

## Commands written out in full

When helping a participant, use the full commands, the same way they are in the guide: `bin/rails server`, not `rails s`; `bin/rails console`, not `rails c`; `bin/rails generate`, not `rails g`.

- **The name helps you remember what each command does.** "server" starts the server, "console" opens the console, "generate" generates files. `s`, `c` and `g` mean nothing to a beginner.
- **It matches the guide.** If the mentor types one thing and the guide shows another, the participant isn't sure which one is right.
- **The same goes for terms.** Prefer "the controller", "the migration" and "the model" to nicknames or abbreviations.

If someone discovers the shortcuts on their own, that's fine: confirm that they work and that they're just abbreviations of the full commands.

## Notes by chapter

Each chapter has its own notes page, with the same number as the chapter. They show up in the menu, below this page.
