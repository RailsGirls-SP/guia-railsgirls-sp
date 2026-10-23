---
title: Why learn the technical terms?
parent: Start here
nav_order: 6
translation_of: comece-aqui/termos-em-ingles.md
translated_from: 52a4d4b
---

# Why learn the technical terms?

![A woman looking at a planet with the world map]({{ '/assets/images/ao-redor-do-mundo.svg' | relative_url }})
{: .ilustracao .ilustracao-secao }

Illustration: [unDraw](https://undraw.co/)
{: .fs-2 .text-center }

In this guide, the technical terms show up with their real names, like **model**, **migration**, **controller** and **view**, with an explanation the first time. The names in the code are the ones programmers use too: the Message Board's message is called `Message`, and the author, `author`.

It seems harder at first, but it helps a lot:

- **It's how you'll hear and read them outside this guide.** Programmers say "model", "migration" and "commit" all the time. The commands (`bin/rails generate model`, `bin/rails db:migrate`), the error messages and the documentation use the same words. By learning the right terms, you understand what shows up in the terminal.
- **It's easier to find help.** Searching for an error message or a term by its real name brings many more answers, and you can talk to other programmers anywhere in the world.
- **You ask for exactly what you want.** By using the name of each part of the app, like model and controller, your request is clearer, to an AI or to a person, and you understand the answer better.
- **The code follows Rails's conventions.** Rails builds names from other names: the `Message` model uses the `messages` table, and the `MessagesController` lives in `messages_controller.rb`. Knowing the terms helps you see how the pieces connect.

You don't need to memorize anything: the [glossary]({{ site.baseurl }}{% link glossary.md %}) explains each term.
