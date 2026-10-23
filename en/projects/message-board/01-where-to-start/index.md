---
title: "01. Where do we start?"
parent: Message Board
grand_parent: Projects
nav_order: 2
has_children: true
translation_of: projetos/mural-de-recados/01-por-onde-comecar/index.md
translated_from: 1e3f998
---

# 01. Where do we start?

Time: about 30 minutes.
{: .fs-5 }

## The challenge

{% include message-board/01/challenge.md %}

## Think before you code

Set aside about 5 minutes. There is no wrong answer.

- Look at the diagram: what needs to exist for an order to be served? Make a list.
- The browser is on your computer. What about the rest: where could it be?

## Compare with our plan

<details markdown="1">
<summary>Open our plan</summary>

For the app to work, we need four things:

| What we need | Role | Where it lives |
|---|---|---|
| The files with the code | Say what the app should do | In a **repository** on GitHub |
| A computer that understands Ruby | Reads and runs the code | On your computer, on **GitHub Codespaces** or on another computer on the internet |
| A place for the data | Stores the Message Board app's information, like the messages | In a **database** (coming up in the next chapter) |
| A program that handles the conversation with the browser | Receives what the browser asks for and sends back the pages | On the same computer that runs Ruby and Rails: it comes ready when you create the app |

When you open a website on the internet, its code isn't on your computer: it's on a computer somewhere else, which sends the pages to you. The Message Board app will work the same way, except that the "somewhere else", for now, is your codespace.

All of this could live on your own computer: you just need to install Ruby and Rails. In this guide, we use a codespace, a borrowed computer in the cloud that comes already set up, so you can start programming without spending time on installation.

</details>

## Hands-on

Now it's your turn: follow the steps in [Hands-on]({{ site.baseurl }}{% link projects/message-board/01-where-to-start/hands-on.md %}). When you're done, go on to [What happened?]({{ site.baseurl }}{% link projects/message-board/01-where-to-start/what-happened.md %}).

## What happened?

Finished the steps? In [What happened?]({{ site.baseurl }}{% link projects/message-board/01-where-to-start/what-happened.md %}) you understand each step, break the app on purpose, see what changes when AI generates the code and answer a quiz.
