---
title: Asking an AI for code
parent: Extras
nav_order: 2
translation_of: extras/como-pedir-codigo-para-uma-ia.md
translated_from: d273cf2
---

# Asking an AI for code

Asking an AI for code seems simple: you just write what you want. But the way you ask changes a lot about what comes back. This page shows two things to watch for that make a difference, with examples from the [Message Board]({{ site.baseurl }}{% link projects/message-board/index.md %}) project. It makes more sense after the project, when you already know the pieces of a Rails app.

Want to use AI to **learn**, asking for explanations instead of ready-made code? See [Using AI as a tutor]({{ site.baseurl }}{% link getting-started/ai-as-a-tutor.md %}).

## Asking in small stages

![A person checking off stages as done, one at a time, on a timeline]({{ '/assets/images/etapas-concluidas.svg' | relative_url }})
{: .ilustracao .ilustracao-secao }

Illustration: [unDraw](https://undraw.co/)
{: .fs-2 .text-center }

If you ask an AI to "make a message board", it will hand over dozens of files at once. It's hard to know whether everything is right, and even harder to find the problem when something goes wrong.

Programmers prefer to build in **small stages**: first the minimum that already works, then the rest, one part at a time. That way, you can check each stage before moving on. It's the skateboard-to-car idea, in [How projects grow]({{ site.baseurl }}{% link projects/index.md %}#how-projects-grow), and it also applies to the requests you make to an AI.

**A request that's too big:**

> Make a message board in Rails, where people post, fix and delete messages.
{: .pedido-ia }

**The same project, in stages.** You can ask for one part at a time, in the project's order:

> In my Rails app, create the `Message` model, with `author` and `content`.
{: .pedido-ia }

And, only after checking that it worked:

> Now, show all the messages on the home page.
{: .pedido-ia }

**Or ask the AI to plan the stages with you:**

> I want to build a message board in Rails. Before writing code, propose the stages to me, from the smallest version that already works to the complete one. Then we'll do one stage at a time: only move on to the next one when I ask.
{: .pedido-ia }

Between one stage and the next, check that the app works and make a commit. If the next stage goes wrong, just go back to the save point (see [Git basics]({{ site.baseurl }}{% link extras/git-basics.md %})).

## Knowing the name of each piece

![A person fitting the last piece of a puzzle]({{ '/assets/images/quebra-cabeca.svg' | relative_url }})
{: .ilustracao .ilustracao-secao }

Illustration: [unDraw](https://undraw.co/)
{: .fs-2 .text-center }

A Rails app has pieces with their own names: **route**, **controller**, **view**, **model**, **migration**. You'll get to know each one in the project. Knowing these names changes the way you ask for help, from an AI or from a person:

**1. A vague request:**

> Make my app accept messages.
{: .pedido-ia }

**2. A better request, knowing what the app needs to do:**

> I want people to be able to post messages on my app. Each message has the name of the person who wrote it and the text, and it needs to stay there even after the person closes the browser. A message without a name or without text can't be accepted.
{: .pedido-ia }

**3. An even more precise request, also knowing the name of each piece:**

> In my Rails app, create the `create` action in `MessagesController`, which stores the message with `author` and `content` and goes back to the list of messages. In the `Message` model, validate that `author` and `content` are required.
{: .pedido-ia }

The first request leaves almost everything for the AI to guess.

The second one already says what matters to the people who will use it: the messages are stored (programmers call this **[data persistence]({{ site.baseurl }}{% link glossary.md %}#persistence)**) and there are rules for accepting a message (the **[validations]({{ site.baseurl }}{% link glossary.md %}#validation)**). It's the kind of request that someone who knows the problem well, but doesn't program, can make.

The third one is better when you already have an app and want to add a part to it, like in the project. Why?

- **The AI doesn't need to guess how your app is organized.** It uses the names that already exist (`Message`, `author`, `content`), instead of making up others, like a `Post` with `title` and `body`, which don't match the rest of your code.
- **The change stays small and in the right place.** You ask for one action and one rule. Without that, it's common for the AI to change several files at once, or create pages you didn't ask for.
- **It's easy to check.** You know exactly what should change: the `create` action in the controller and the validation in the model. If the answer changes something else, you notice right away.

Knowing the names of the pieces also helps you understand what the AI answers.

## Ask for a test too

After the workshop, when you already understand the code, it's worth also asking for an **[automated test]({{ site.baseurl }}{% link glossary.md %}#automated-test)**: a small program that checks on its own whether what you asked for works. For example, together with the request for the validations:

> Also write a test for the `Message` model that checks that a message without `author` or without `content` is rejected.
{: .pedido-ia }

Run the test before trusting the code, with `bin/rails test`. If it passes, you have a check that repeats itself with every change. And read the test too: it's code like any other, and the AI can write a test that checks the wrong thing.
