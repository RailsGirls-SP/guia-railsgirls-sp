---
title: Using AI as a tutor
parent: Getting started
nav_order: 5
translation_of: comece-aqui/ia-como-tutora.md
translated_from: 80ff4f1
---

# Using AI as a tutor

![Two people, each at their own computer, using AI tools, with the logos of two of them above]({{ '/assets/images/usando-ferramentas-de-ia.svg' | relative_url }})
{: .ilustracao .ilustracao-secao }

Illustration: [unDraw](https://undraw.co/)
{: .fs-2 .text-center }

An [AI]({{ site.baseurl }}{% link glossary.md %}#ai) tool can help you learn a lot, as long as you use it as a **tutor**: someone who explains and asks questions, and not someone who does the work for you. The one who learns is the one who does it.

Want to ask an AI for **code**, and not explanations? After the workshop, see [Asking an AI for code]({{ site.baseurl }}{% link extras/asking-ai-for-code.md %}), in the Extras.

## Start by saying who the AI should be

The AI answers better when it knows who it's talking to and what you expect from it. At the beginning of the conversation, give it a role and tell it you're a beginner. For example:

```
You are a patient and welcoming programming tutor. I'm a beginner and have never programmed before.
I'm learning Ruby on Rails with the Rails Girls São Paulo guide
(https://guide.railsgirls.com.br/), building a message board app.
My goal is to learn to program, and not just to make the app work.

When I ask a question:
- answer briefly and directly, with simple words and everyday examples;
- if you use a technical term, explain what it means;
- don't write the code for me: give me hints and ask me questions, one step at a time;
- if I get stuck, increase the help little by little;
- if I have an error, first ask me what I was trying to do and help me understand the message;
- if you suggest a command, explain what it does first;
- follow the guide's way of doing things, without advanced concepts I don't need yet.
```

Copy it, paste it at the beginning of the conversation and adjust it your way. The guide's link helps the AI know which material you're talking about; some tools can open the link and look at the guide, others can't. Without this, the AI usually answers as if you already knew how to program, with terms you don't know yet and with the finished code.

## Questions that help you learn

- "What does this command do?" (and paste the command)
- "What does this error message mean?" (and paste the message)
- "Can you explain this line of code, piece by piece?"
- "What's the difference between a model and a migration?"
- "Ask me three questions to see if I understood."

## Be careful

![A document with warning and question notes around it, like in a review]({{ '/assets/images/revisando.svg' | relative_url }})
{: .ilustracao .ilustracao-secao }

Illustration: [unDraw](https://undraw.co/)
{: .fs-2 .text-center }

- **Check what it says.** An AI can [make things up]({{ site.baseurl }}{% link glossary.md %}#hallucination) with total confidence. If something doesn't match the guide, trust the guide or ask someone on the mentoring team.
- **Never run a command you didn't understand.** Ask what it does first.
- **Don't let the AI change files or run commands on its own.** In the codespace's chat panel, prefer the question mode (**Ask**) to the **Agent** mode, which can change your project on its own.
- **Don't paste passwords, keys or personal data** into the conversation.

See also the kinds of tools in [AI tools for programming]({{ site.baseurl }}{% link glossary.md %}#ai-tools).
