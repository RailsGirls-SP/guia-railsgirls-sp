---
title: Projects
nav_order: 5
has_children: true
translation_of: projetos/index.md
translated_from: 1e3f998
---

# Projects

This is where you learn to program by building a real app, from start to finish. Each project is split into short chapters, and each chapter starts with a problem: first you plan, then you code.

## The projects

| Project | What you build | Who it's for |
|---|---|---|
| [Message Board]({{ site.baseurl }}{% link projects/message-board/index.md %}) | A message board on the web, where anyone can leave a message that shows up as a sticky note. You can post, see, fix and delete messages. | People who have never programmed. It's the workshop project. |

New projects will show up here, each one a little more advanced than the last.

## Where to start

If this is your first time, start with the [Message Board]({{ site.baseurl }}{% link projects/message-board/index.md %}). It doesn't require any programming knowledge, and it introduces, one chapter at a time, the pieces that almost every Rails app has. Before that, check that you already have what you need in [Getting started]({{ site.baseurl }}{% link getting-started/index.md %}).

## How projects grow

![A winding road, with a car arriving at a point marked on the map]({{ '/assets/images/caminho-ate-o-destino.png' | relative_url }})
{: .ilustracao .ilustracao-secao }

Illustration: [unDraw](https://undraw.co/)
{: .fs-2 .text-center }

Imagine that someone needs to get from home to work, and you are going to build a way to take them there. There are two paths.

**Build the car piece by piece.** First a wheel, then the axle, then the body. All this time, the person keeps walking: a wheel on its own doesn't take anyone anywhere. They can only use something at the very end.

**Build something that works at every stage:**

🛹 → 🛴 → 🚲 → 🏍️ → 🚗

First a skateboard: simple, but it already gets the person to work. Then a scooter, which is more comfortable. Then a bicycle, a motorcycle and, finally, the car. At every stage, the person can already get there. And, at every stage, you learn what they really need: maybe the bicycle is already enough.

The projects in this guide follow the second path. Each project starts with the **smallest version that already solves the problem** and improves with every chapter. If time runs out halfway, you don't end up with half a project: you end up with a project that works, just a simpler one.

{: .pensando }
Choosing the minimum that already solves the problem (which part is the skateboard) and what can wait is one of the most important decisions a programmer makes. In the industry, this first version is called an **MVP**, short for *minimum viable product*. See the [glossary]({{ site.baseurl }}{% link glossary.md %}).

{: .ia }
> Building in stages also matters when AI writes the code. If you ask for the whole car at once, you get a lot of code at once, which is hard to read and to check. If you ask for the skateboard first, you get a small piece: you can test it, understand it and fix it before asking for the next one. When something goes wrong, you know which stage to look at.
>
> Big requests also make it more likely that the AI will **hallucinate**, that is, make up something that looks right but isn't, like a command that doesn't exist or a rule you never asked for. Everything the AI has to take into account at the same time (your request, the code that already exists, the decisions made so far) is called the **context**. Think of a person who gets thirty instructions at once: they are more likely to forget or mix up one of them than if they got three. AI is similar: the more things in the context, the easier it is for something to get lost or made up. Small stages keep the context small.
>
> And there's the cost. Every request to an AI costs money or part of your usage limit, and every answer costs your time to read and test. If you ask for the whole project and the result isn't what you wanted, that's a lot to throw away. If you only ask for the skateboard and it comes out wrong, the loss is small: you adjust the request and try again.

### References

- **The concept:** [Minimum viable product](https://en.wikipedia.org/wiki/Minimum_viable_product), on Wikipedia.
- **The skateboard-to-car analogy:** [Making sense of MVP](https://blog.crisp.se/2016/01/25/henrikkniberg/making-sense-of-mvp), by Henrik Kniberg.
