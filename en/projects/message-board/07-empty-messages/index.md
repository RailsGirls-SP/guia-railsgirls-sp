---
title: "07. What if someone sends an empty message?"
parent: Message Board
grand_parent: Projects
nav_order: 8
has_children: true
translation_of: projetos/mural-de-recados/07-e-se-o-recado-vier-vazio/index.md
translated_from: 1e3f998
---

# 07. What if someone sends an empty message? <span class="label label-opcional">Optional</span>

Time: about 45 minutes.
{: .fs-5 }

## The challenge

{% include message-board/07/challenge.md %}

## Think before you code

Set aside about 5 minutes. There is no wrong answer.

- Go back to the "What could go wrong" table in your plan, in [Planning the app]({{ site.baseurl }}{% link projects/message-board/00-planning-the-app.md %}). Which messages shouldn't be accepted?
- Is a message with only blank spaces an empty message?
- Can a message be any length? What would be a reasonable limit to fit on a sticky note?
- When a message is rejected, what does the person see on the screen? Does what they wrote disappear or stay there?
- And when fixing a message: can you delete a message's text and save it?

## Compare with our plan

<details markdown="1">
<summary>Open our plan</summary>

At the end of this chapter, anyone who tries to post an empty message will see this:

![The New message page with the form: below the Your name field, in red, the message "Write your name."; below the Message field, "Write your message."; then, the Post message button and the Back link]({{ '/assets/images/mural-de-recados/07/recado-recusado.png' | relative_url }})
{: .ilustracao }

**The rules for a message:**

| Rule | What the person sees if it isn't met |
|---|---|
| It needs the name of the person who wrote it | Write your name. |
| It needs the text of the message | Write your message. |
| The text can have at most 280 characters | The message can have at most 280 characters. |

- **The 280-character limit** is just an example, based on the limit for a post on X (formerly Twitter). It can be different from group to group: if your plan has a different number, use yours.
- **Blank spaces** don't count: a name with only spaces is an empty name.
- **When the message is rejected,** the page comes back with the warning below the missing field, and what the person already wrote stays in the form.
- **Fixing follows the same rules:** you can't save a message without text.
- **The minimum:** these three rules. Others, like rejecting swear words, are left out.

</details>

## Hands-on

Now it's your turn: follow the steps in [Hands-on]({{ site.baseurl }}{% link projects/message-board/07-empty-messages/hands-on.md %}). When you're done, go on to [What happened?]({{ site.baseurl }}{% link projects/message-board/07-empty-messages/what-happened.md %}).

## What happened?

Finished the steps? In [What happened?]({{ site.baseurl }}{% link projects/message-board/07-empty-messages/what-happened.md %}) you understand each step, break the app on purpose, see whether you need AI and answer a quiz.
