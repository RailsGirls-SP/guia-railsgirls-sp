---
title: "02. How do we store the messages?"
parent: Workshop mode
nav_order: 2
search_exclude: true
translation_of: modo-workshop/02-como-guardar-os-recados.md
translated_from: 1e3f998
---

# 02. How do we store the messages?

## The challenge

{% include message-board/02/challenge.md %}

At the end of this chapter, the messages will be stored in the [database]({{ site.baseurl }}{% link glossary.md %}#database), in a table like this one:

| id | author | content | created_at |
|---|---|---|---|
| 1 | Ana | My first message! | 2026-10-03 09:00 |
| 2 | Bia | I loved the workshop! | 2026-10-03 09:05 |

## Hands-on

{% include message-board/02/hands-on.md %}

## Done?

Go on to [03. How do we see all the messages?]({{ site.baseurl }}{% link workshop-mode/03-see-all-the-messages.md %}).

Want to understand what each step did? Read [What happened?]({{ site.baseurl }}{% link projects/message-board/02-store-the-messages/what-happened.md %}), in the full version of the chapter.
