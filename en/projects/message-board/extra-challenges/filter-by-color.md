---
title: "Filter messages by color 🔎"
parent: Extra challenges
grand_parent: Message Board
nav_order: 4
translation_of: projetos/mural-de-recados/desafios-extras/filtrar-por-cor.md
translated_from: 98afcfc
---

# Filter messages by color 🔎

This challenge only works after the challenge [Message colors]({{ site.baseurl }}{% link projects/message-board/extra-challenges/message-colors.md %}).
{: .fs-5 }

## The challenge

The message board is colorful now. Next, above the cards, links show up with the name of each color: **All**, **Yellow**, **Pink**, **Blue** and **Green**. When you click a color, the message board shows only the messages of that color. When you click **All**, it shows all of them again.

This time, there are no hints: just the problem. Use what you learned in the chapters and the other challenges, the documentation and, if you like, an AI as a tutor. You can do it! 💪

## Think before you code

- What changes in the address when the person chooses a color? How does the controller find out which color was chosen?
- Which controller action looks up the messages? What changes in it?
- What does the message board show when no message has the chosen color?
- Do you need a new route, or can you use the one that already exists?

## You'll practice

- Passing a piece of information through the address, like `/?color=pink`, and reading it in the controller with `params`.
- Looking up only some of the messages in the database, with a condition.
- Planning and solving a problem on your own, from start to finish.

If you get stuck, ask someone on the mentoring team for help or read [Using AI as a tutor]({{ site.baseurl }}{% link getting-started/ai-as-a-tutor.md %}) and ask for an explanation, not the ready-made answer. A word that helps when searching the Rails documentation: `where`.
