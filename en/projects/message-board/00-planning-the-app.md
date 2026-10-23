---
title: "00. Planning the app"
parent: Message Board
grand_parent: Projects
nav_order: 1
translation_of: projetos/mural-de-recados/00-planejando-o-mural.md
translated_from: 8abe08f
---

# 00. Planning the app

Time: about 20 minutes. All you need is pen and paper.
{: .fs-5 }

## The challenge

Imagine the end of the workshop. Everyone wants to leave a message: a thank-you to the mentoring team, an "I did it!" after their first app, a hello to whoever comes to the next edition.

On a wall, each person would grab a sticky note, write the message, sign it and stick it up. Your challenge today is to build this **message board**, but on the web: each message shows up as a card, and anyone can leave one.

![A person sticking a piece of paper on a board that already has other messages]({{ '/assets/images/mural-fisico.svg' | relative_url }})
{: .ilustracao .ilustracao-secao }

Illustration: [unDraw](https://undraw.co/)
{: .fs-2 .text-center }

{: .pensando }
Before writing a single line of code, a programmer does two things: **understands the problem** and **plans the solution**. That's what you're going to do now.

## Think before you code

![A woman arranging colorful notes on a board]({{ '/assets/images/organizando-ideias.svg' | relative_url }})
{: .ilustracao .ilustracao-secao }

Illustration: [unDraw](https://undraw.co/)
{: .fs-2 .text-center }

Grab pen and paper and set aside 10 to 15 minutes. There is no wrong answer: the goal is for you to think, not to get it right.

**1. Which screens does the message board need?**
Draw each screen with boxes, fields and buttons. It doesn't need to look nice. Think about the path of someone who opens the message board for the first time: what do they see? Where do they click to post a message?

**2. What information does a message have?**
Think about the sticky note: what is written on it? Who wrote it? What else does a message need to have? For each piece of information, write down whether it is a short text, a long text or a choice between a few options.

**3. What can a person do with a message?**
Posting a new message is one action. What other actions make sense? Think about what you would do if you wrote something wrong.

**4. What could go wrong?**
Which messages shouldn't show up on the message board? Imagine someone in a hurry, someone distracted, someone trying to test the limits.

{: .dica }
Keep your paper. You'll come back to it in every chapter.

## Compare with our plan

![A woman at a whiteboard, explaining a plan with one path that works and another that doesn't]({{ '/assets/images/explicando-o-plano.svg' | relative_url }})
{: .ilustracao .ilustracao-secao }

Illustration: [unDraw](https://undraw.co/)
{: .fs-2 .text-center }

Only open it after you've made yours. If your plan is different, that's fine: compare them and think about the reason for each difference.

<details markdown="1">
<summary>Open our plan</summary>

### The screens

The main screen shows the message board, with the cards, and a button to post a new message. Each card has buttons to edit and delete:

<div aria-hidden="true" markdown="1">

```
┌────────────────────────────────────────────────┐
│  Message Board                                 │
│                                                │
│  ( New message )                               │
│                                                │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐  │
│  │ Welcome to │ │ I loved    │ │ My 1st app │  │
│  │ the board! │ │ the        │ │ in Rails!  │  │
│  │            │ │ workshop   │ │            │  │
│  │ — Ana      │ │ — Bia      │ │ — Carla    │  │
│  │            │ │            │ │            │  │
│  │ edit       │ │ edit       │ │ edit       │  │
│  │ delete     │ │ delete     │ │ delete     │  │
│  └────────────┘ └────────────┘ └────────────┘  │
│                                                │
└────────────────────────────────────────────────┘
```

</div>

Description of the main screen: at the top, the title Message Board. Below it, the New message button. Further down, three cards side by side, each with a message, the name of the person who wrote it (Ana, Bia and Carla) and the edit and delete links.
{: .sr-only }

The **New message** button opens a second screen, with just the form to write the message:

<div aria-hidden="true" markdown="1">

```
┌────────────────────────────────────────────────┐
│  New message                                   │
│                                                │
│  Your name: [__________________]               │
│  Message:   [__________________]               │
│             [__________________]               │
│             ( Post message )  back             │
│                                                │
└────────────────────────────────────────────────┘
```

</div>

Description of the new message screen: the title New message, the form with the Your name and Message fields, both empty, the Post message button and the back link.
{: .sr-only }

To fix a message, a third screen shows the same form, already filled in with the chosen message:

<div aria-hidden="true" markdown="1">

```
┌────────────────────────────────────────────────┐
│  Edit message                                  │
│                                                │
│  Your name: [ Bia______________]               │
│  Message:   [ I loved the worksop]             │
│             [__________________]               │
│             ( Save )  back                     │
│                                                │
└────────────────────────────────────────────────┘
```

</div>

Description of the edit screen: the title Edit message, the form with the Your name and Message fields already filled in with Bia's message, with the typo "I loved the worksop", the Save button and the back link.
{: .sr-only }

### The information in a message

| Information | Example | Type |
|---|---|---|
| Author | Bia | short text |
| Message | I loved the workshop! | long text |

### The actions

- **Post** a new message.
- **See** all the messages on the board.
- **Fix** a message.
- **Delete** a message.

### What could go wrong

| The problem | What we do about it |
|---|---|
| A message with no text, or without the name of the person who wrote it | solved in chapter 07 |
| A huge message that doesn't fit on the card | solved in chapter 07 |
| Deleting a message by accident | solved in chapter 05 |
| Someone deleting another person's message | accepted for now |

We solve some of these in this project. Others we decide to accept for now, and that is also a decision programmers make: no system solves everything at once.

For example: to stop someone from deleting another person's message, the Message Board app would need to know who is who. Each person would have to create an account and log in with an email and password, and each message would have to store who owns it. That's almost a whole project. For a workshop message board, where everyone is in the same room, we accept this risk and leave it for later.

</details>

## The plan guides the rest of the project

Each chapter from here on solves a piece of this plan:

| From the plan | Chapter |
|---|---|
| A place for the message board to exist | [Where do we start?]({{ site.baseurl }}{% link projects/message-board/01-where-to-start/index.md %}) |
| The information in a message | [How do we store the messages?]({{ site.baseurl }}{% link projects/message-board/02-store-the-messages/index.md %}) |
| See all the messages | [How do we see all the messages?]({{ site.baseurl }}{% link projects/message-board/03-see-all-the-messages/index.md %}) |
| Post a message | [How do we post a message?]({{ site.baseurl }}{% link projects/message-board/04-post-a-message/index.md %}) |
| Fix and delete | [Oops! How do we fix or delete a message?]({{ site.baseurl }}{% link projects/message-board/05-fix-or-delete/index.md %}) |
| How the cards look | [How do we make the message board look nicer?]({{ site.baseurl }}{% link projects/message-board/06-make-it-look-nicer/index.md %}) |
| What could go wrong | [What if someone sends an empty message?]({{ site.baseurl }}{% link projects/message-board/07-empty-messages/index.md %}) |
| Other people using the message board | [How do we show the message board to the world?]({{ site.baseurl }}{% link projects/message-board/08-show-it-to-the-world/index.md %}) |

The four actions in the plan (post, see, fix and delete) show up in almost every system that stores information: a social network, a shop, a calendar. Programmers call this set **CRUD**, from the initials of create, read, update and delete. See the [glossary]({{ site.baseurl }}{% link glossary.md %}).

### A message board that works at every stage

We are not going to build the whole message board at once. It grows in stages, and **at the end of each one the message board already works**:

| [MVP stage]({{ site.baseurl }}{% link projects/index.md %}#how-projects-grow) | What the message board already does | Chapters |
|---|---|---|
| 🛹 | Post and see messages | 01 to 04 |
| 🛴 | Fix and delete messages | 05 |
| 🚲 | Cards that look like sticky notes | 06 |
| 🏍️ | Doesn't accept empty messages | 07 |
| 🚗 | Online, for anyone to use | 08 (optional) |

If time runs out halfway, you don't end up with half a message board: you end up with a message board that works, just a simpler one.

And starting with the minimum helps you spend time only on what makes a difference to the people who will use it: the message board is ready sooner, people can already leave their messages, and you find out with them what is worth doing next.

## What if you used AI?

<details markdown="1">
<summary>Open</summary>

Compare these two requests to an AI tool.

**Request 1: without a plan**

> Make a message board in Rails.
{: .pedido-ia }

**Request 2: with your plan**

> Make a message board in Rails. Each message has an author (short text) and a message (long text). The main page shows the messages as cards, each with edit and delete buttons, and a "New message" button, which opens a page with the form to post. Don't accept messages without an author or without text, or messages longer than 280 characters.
{: .pedido-ia }

Both will generate code. But with request 1, the AI has to **make up** every decision you made in your plan: what information a message has, how the screen is organized, whether an empty message is accepted. It will choose something, and it might not be what you wanted.

Request 2 is your plan written as sentences. With it, you can **check** the result: is everything the plan asks for there? Is an empty message rejected?

**Try it:** read request 1 again and list three decisions the AI would have to make up. Then check: does your plan answer all of them?

</details>

## Remember

- Before you code, understand the problem: who will use it, what they want to do, what could go wrong.
- A good plan answers three questions: **how people will use it** (for the message board, the screens), **what information** and **what rules**.
- Post, see, fix and delete make up CRUD, which shows up in almost every system.
- Deciding what to leave out, or leave for later, is also part of the plan.
- The message board grows in stages, and it works at the end of each one.
- With or without AI, the plan is what lets you check whether the result is right.
