---
title: "04. How do we post a message?"
parent: Message Board
grand_parent: Projects
nav_order: 5
has_children: true
translation_of: projetos/mural-de-recados/04-postar-um-recado/index.md
translated_from: 1e3f998
---

# 04. How do we post a message?

Time: about 60 minutes.
{: .fs-5 }

## The challenge

{% include message-board/04/challenge.md %}

## Think before you code

Set aside about 5 minutes. There is no wrong answer.

- Go back to the screen drawings you made in [Planning the app]({{ site.baseurl }}{% link projects/message-board/00-planning-the-app.md %}). Where is the form to post? How does the person get to it?
- What fields does the form need? Is each one a short text or a long text?
- What happens on the screen after the person clicks the button to post?
- What's the minimum the form needs to already be useful? What can wait?

## Compare with our plan

<details markdown="1">
<summary>Open our plan</summary>

At the end of this chapter, anyone who opens the app will see this:

![A page with the title Message Board, the New message link and, below it, two messages: first "I loved the workshop!", by Bia, and then "My first message!", by Ana]({{ '/assets/images/mural-de-recados/04/resultado-final.png' | relative_url }})
{: .ilustracao }

![A page with the title New message, a form with the Your name and Message fields, the Post message button and the Back link]({{ '/assets/images/mural-de-recados/04/novo-recado.png' | relative_url }})
{: .ilustracao }

- **Where it lives:** the form is on a page of its own, **New message**. On the home page, a **New message** link, above the messages, leads there.
- **The fields:** **Your name** (a short text, for the author) and **Message** (a long text, for the text of the message), and the **Post message** button.
- **After posting:** the app goes back to the message board, with the new message first.
- **The minimum:** the link, the two fields, the button and a link to go back. It still looks as simple as possible, and an empty message is still accepted: those come in the next chapters.

</details>

## Hands-on

Now it's your turn: follow the steps in [Hands-on]({{ site.baseurl }}{% link projects/message-board/04-post-a-message/hands-on.md %}). When you're done, go on to [What happened?]({{ site.baseurl }}{% link projects/message-board/04-post-a-message/what-happened.md %}).

## What happened?

Finished the steps? In [What happened?]({{ site.baseurl }}{% link projects/message-board/04-post-a-message/what-happened.md %}) you understand each step, break the app on purpose, see whether you need AI and answer a quiz.
