---
title: "00. Planning the app"
parent: Message Board notes
grand_parent: Project notes
nav_order: 1
translation_of: mentoras/projetos/mural-de-recados/00-planejando-o-mural.md
translated_from: 1238896
---

# 00. Planning the app

[See chapter]({{ site.baseurl }}{% link projects/message-board/00-planning-the-app.md %})

## Questions for "Think before you code"

- "You open the message board for the first time. What do you see? Where do you click?" Helps draw the screens from the point of view of whoever uses it, and not from the code.
- "Think of a real sticky note: what's written on it?" Leads to the message's information: who wrote it and the text.
- "You wrote something wrong. Now what?" Leads to the fix and delete actions.
- "Someone in a hurry clicked post without writing anything. What happens?" Leads to the "What could go wrong" table.

Give real time: 10 to 15 minutes, in silence, before any answer. Ask more than you answer. And only open "our plan" after the participant has their own plan.

## Common confusions

- **Thinking there's a right answer.** The person's plan doesn't need to be the same as ours. The value is in comparing and understanding the reason for each difference.
- **Drawing too much.** Colors, fonts, icons and logos aren't the focus. Boxes, fields and buttons are enough.
- **Thinking about code too early.** If words like "table" or "database" come up, great, but the chapter is about the problem and the people, not about Rails.
- **Wanting to solve everything.** See "Focus on the MVP", below.
- **"I can't draw."** Nobody needs to. Rectangles with names inside are a great screen drawing.

## Focus on the MVP

The most important point of this chapter is the part of "our plan" that says some problems we solve and others we **accept for now** (the example is someone deleting another person's message). Reinforce this idea: the plan's goal isn't to predict every detail of the whole project, it's to reach the skateboard, the smallest version that already works (see [How projects grow]({{ site.baseurl }}{% link projects/index.md %}#how-projects-grow)).

It's common for ideas like login, likes, replies to messages, photos or emojis to come up while planning. They're great ideas: value them, but don't let the plan grow with them.

- **The key question:** "does the message board work without it?". If it does, it's for later.
- **Write it down on a "later" list,** on the paper itself. Nobody needs to give up the idea, just the order. Many of them become extra challenges.
- **Respect the 10 to 15 minutes** of "Think before you code". A simple, finished plan is worth more than a complete plan that's half done.
- **Accepting a risk is a decision, not carelessness.** If someone insists on solving everything, use the example of the deleted message: solving it would require accounts, passwords and messages with owners, almost a whole project, for a message board in a room where everyone knows each other.

## Technical debt

{: .atencao }
Context for mentors only. **You don't need to bring this to the participants**: the term "technical debt" doesn't show up in the chapter or in the glossary. Only use it if the conversation gets there.

In "our plan", we decide to accept for now that anyone can delete another person's message. If the conversation gets there, it's a good moment to introduce the term **technical debt**: a shortcut we take now, knowing it will cost more later.

The metaphor, created by Ward Cunningham, is that of a loan: you gain time now (you borrow the money), you pay interest while you don't fix it (every change gets harder because of the shortcut) and one day you pay off the debt (you redo it the right way).

**Not everything left for later is technical debt.** Leaving a feature out is a scope decision. It becomes debt when today's decision makes the future change more expensive. In the Message Board app, both things show up together: today the messages don't have owners; when login arrives, besides creating the accounts, you'll have to decide what to do with all the old messages, which don't have owners. That extra work is the interest.

**Technical debt isn't a synonym for mistake.** When it's conscious and well thought out, like here, it's a legitimate tool: Martin Fowler calls it "deliberate and prudent" debt. The problem is the debt nobody noticed they took on, or that never gets paid.

References:

- [Technical Debt](https://martinfowler.com/bliki/TechnicalDebt.html), by Martin Fowler.
- [Technical Debt Quadrant](https://martinfowler.com/bliki/TechnicalDebtQuadrant.html), by Martin Fowler: deliberate or accidental, prudent or reckless debt.
- [The WyCash Portfolio Management System](http://c2.com/doc/oopsla92.html), by Ward Cunningham (1992): where the metaphor showed up for the first time.

## Next notes

[01. Where do we start?]({{ site.baseurl }}{% link mentors/projects/message-board/01-where-to-start.md %})
