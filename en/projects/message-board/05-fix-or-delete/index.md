---
title: "05. Oops! How do we fix or delete a message?"
parent: Message Board
grand_parent: Projects
nav_order: 6
has_children: true
translation_of: projetos/mural-de-recados/05-corrigir-ou-apagar/index.md
translated_from: 1e3f998
---

# 05. Oops! How do we fix or delete a message?

Time: about 50 minutes.
{: .fs-5 }

## The challenge

{% include message-board/05/challenge.md %}

## Think before you code

Set aside about 5 minutes. There is no wrong answer.

- How does the Message Board app know **which** message you want to fix or delete? Remember the columns of the messages spreadsheet, in [chapter 02]({{ site.baseurl }}{% link projects/message-board/02-store-the-messages/index.md %}).
- Where do the buttons to fix and delete go? Draw them on the card.
- To fix a message, what shows up on the screen? An empty form or one that's already filled in?
- What if the person clicks delete by accident?

## Compare with our plan

<details markdown="1">
<summary>Open our plan</summary>

At the end of this chapter, each message gets an **Edit** link and a **Delete** button:

![A page with the title Message Board, the New message link and two messages: "I loved the worksop!", by Bia, and "My first message!", by Ana; below each one, the Edit link and the Delete button]({{ '/assets/images/mural-de-recados/05/editar-e-apagar.png' | relative_url }})
{: .ilustracao }

**Edit** opens a page just for fixing that message, with the form already filled in:

![A page with the title Edit message, the form with the Your name and Message fields already filled in with Bia and "I loved the worksop!", the Save button and the Back link]({{ '/assets/images/mural-de-recados/05/corrigir-recado.png' | relative_url }})
{: .ilustracao }

**Delete** asks before deleting:

![A browser window, with the codespace's address, the question "Do you really want to delete this message?" and the Cancel and OK buttons]({{ '/assets/images/mural-de-recados/05/confirmar-apagar.png' | relative_url }})
{: .ilustracao }

- **Which message:** each message has a number of its own, the `id`, which Rails created on its own. That's how the app knows which message to fix or delete.
- **Fixing** has two parts: opening the filled-in form and then saving the fix.
- **Deleting** asks for confirmation, because a deleted message never comes back.
- **Who can do it:** anyone can fix or delete any message. As you saw in [Planning the app]({{ site.baseurl }}{% link projects/message-board/00-planning-the-app.md %}), we accept this risk for now.

</details>

## Hands-on

Now it's your turn: follow the steps in [Hands-on]({{ site.baseurl }}{% link projects/message-board/05-fix-or-delete/hands-on.md %}). When you're done, go on to [What happened?]({{ site.baseurl }}{% link projects/message-board/05-fix-or-delete/what-happened.md %}).

## What happened?

Finished the steps? In [What happened?]({{ site.baseurl }}{% link projects/message-board/05-fix-or-delete/what-happened.md %}) you understand each step, break the app on purpose, see whether you need AI and answer a quiz.
