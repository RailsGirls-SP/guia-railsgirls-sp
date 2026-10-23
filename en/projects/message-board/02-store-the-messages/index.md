---
title: "02. How do we store the messages?"
parent: Message Board
grand_parent: Projects
nav_order: 3
has_children: true
translation_of: projetos/mural-de-recados/02-como-guardar-os-recados/index.md
translated_from: 1e3f998
---

# 02. How do we store the messages?

Time: about 30 minutes.
{: .fs-5 }

## The challenge

{% include message-board/02/challenge.md %}

## Think before you code

Set aside about 5 minutes. There is no wrong answer.

- What information does each message have? Go back to your plan from [Planning the app]({{ site.baseurl }}{% link projects/message-board/00-planning-the-app.md %}).
- Is each piece of information a short text, a long text or a choice between options?
- If you were writing down several messages in a spreadsheet, what would it look like? Draw the columns and fill in two example rows.

## Compare with our plan

<details markdown="1">
<summary>Open our plan</summary>

The messages will live in a **[database]({{ site.baseurl }}{% link glossary.md %}#database)**, which works like a well-organized spreadsheet. Each kind of information gets a **table**: ours is called `messages`. Each message is a **row**, and each piece of information in the message is a **column**:

| id | author | content | created_at |
|---|---|---|---|
| 1 | Ana | Welcome to the message board! | 2026-10-03 09:00 |
| 2 | Bia | I loved the workshop | 2026-10-03 09:05 |

- **author**: short text, the name of the person who wrote it.
- **content**: long text, the text of the message.

You didn't need to come up with the `id` and `created_at` columns: Rails creates them on its own. The `id` is a unique number for each message, and `created_at` stores when it was created. That way you can tell which message is which, even if two people write the same thing.

</details>

## Hands-on

Now it's your turn: follow the steps in [Hands-on]({{ site.baseurl }}{% link projects/message-board/02-store-the-messages/hands-on.md %}). When you're done, go on to [What happened?]({{ site.baseurl }}{% link projects/message-board/02-store-the-messages/what-happened.md %}).

## What happened?

Finished the steps? In [What happened?]({{ site.baseurl }}{% link projects/message-board/02-store-the-messages/what-happened.md %}) you understand each step, break the app on purpose, see whether you need AI and answer a quiz.
