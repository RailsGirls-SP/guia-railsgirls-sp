---
title: Mentoring guide
nav_order: 7
has_children: true
translation_of: mentoras/index.md
translated_from: 1e3f998
---

# Mentoring guide

Thank you for mentoring at Rails Girls São Paulo! 💜 This part of the guide is for you: how to support the participants, the schedule for the day and notes for each chapter of the project.

Participants follow the guide on their own, at their own pace. Your role isn't to teach a class: it's to help when someone gets stuck, ask good questions and remind them that making mistakes is part of it.

## Code of conduct

Before the workshop, read the Rails Girls São Paulo [code of conduct](https://railsgirls.com.br/codigo-de-conduta/) (in Portuguese). It applies to everyone involved, and it has a part just for mentors: encourage autonomy, respect participants' boundaries and never use the mentoring role to embarrass or pressure anyone.

If you witness or hear about a situation that may violate the code, find someone from the organizing team or write to **conduta@railsgirls.com.br**. You don't need to be sure it's a violation to ask for help.

## Mentoring approach

- **Understanding matters more than finishing.** The goal isn't to reach the end of the guide as fast as possible, but for each person to leave the workshop understanding what they built. If you have to choose, prefer one chapter less and an idea that really sank in.
- **Mentoring is an exchange.** You learn from the participants too: an unexpected question, a new way to explain something, an error you had never seen. Learning from beginners is also part of mentoring.
- **Teach them to look for answers.** Instead of giving the answer, show where to look: the error message, the glossary, the chapter's "What happened?". Little by little, the person learns to find answers on their own, and that's worth more than any ready-made answer.
- **Don't take the keyboard.** Even when it would be faster. Whoever types learns; whoever watches forgets. If you need to show something, point at the screen and let the person do it.
- **Ask before answering.** "What do you think happened?", "What does the error message say?", "What did you expect to see?". Often, the answer comes up while they explain.
- **Read the errors together.** Error screens are part of the guide, and several show up on purpose. Instead of fixing it, ask "what's missing?". When a new error shows up, celebrate: it means there was progress.
- **There are no silly questions.** Answer calmly, without "that's easy" or "you just…". For a beginner, nothing is obvious.
- **Use the guide's words.** The commands written out in full (`bin/rails server`, not `rails s`) and the technical terms (model, controller, migration). See [Commands written out in full]({{ site.baseurl }}{% link mentors/projects/message-board/index.md %}#commands-written-out-in-full).
- **Follow the guide, even if you'd do it differently.** The guide avoids, on purpose, the scaffold, automated tests and other common everyday paths. The notes for each chapter explain why. If you have a suggestion, write it down and send it to the organizing team afterwards.
- **Respect each person's pace.** Nobody needs to finish every chapter. Whoever stops halfway still leaves with an app that works.
- **AI as a tutor, not as the author.** If the person wants to use an AI, encourage asking for explanations, and not for ready-made code. See [Using AI as a tutor]({{ site.baseurl }}{% link start-here/ai-as-a-tutor.md %}).

## Group formats

![Three people side by side at the same table, each with their own laptop, talking]({{ '/assets/images/equipe.svg' | relative_url }})
{: .ilustracao .ilustracao-secao }

Illustration: [unDraw](https://undraw.co/)
{: .fs-2 .text-center }

The Message Board project is a sequence: each chapter depends on the previous one, and all of them change the same files. That's why you can't split the project among the people in a group, each doing one part.

**The recommended format is: each person builds their own app, in their own codespace and at their own pace, in small groups of 3 or 4 people with a mentor.** That way, each person leaves the workshop with their own repository and can keep going at home. The guide was written for this format: the commits, the deploy and the "everyone at their own pace".

Within this format, it's worth having group moments:

- **Chapter 00 as a group.** Planning is even better as a conversation: the group discusses the screens, the information and what could go wrong, each person on their own paper.
- **Errors as a group.** When someone gets stuck on an error, the group stops and reads the message together, for about 5 minutes. Then each person goes back to their app.
- **Celebrations as a group.** When the first message shows up on someone's screen, it's worth showing the group.

| Format | When to use it | Things to watch for |
|---|---|---|
| **Each person on their own app** | Whenever possible. It's the workshop's default. | Different paces in the same group: whoever is faster can help read the errors of whoever got stuck, without taking the keyboard. |
| **Pair programming** (a pair on a single app) | When two people prefer to do it together, or for someone without a computer. | One person types and the other guides, and they switch every chapter. The app lives in one of their repositories; at the end, the other person can make a **fork** to have their own copy. |
| **Mob programming** (the whole group on a single app) | Plan B, when several computers have problems or the group asks for it. | Whoever types switches every 10 or 15 minutes (use a timer). Whoever types only writes what the group decides out loud. Make sure everyone gets a turn at the keyboard, including the shyer people. |

In pair and mob programming, the app lives in a single person's repository. For the others to have the app too, each one can make a fork: in the repository on GitHub, click **Fork** and then **Create fork**. The copy lives in the account of whoever made the fork, with the whole history, and they can open a codespace on it and continue the project. Redoing the project at home, following the guide, is also a great option, and it'll be much faster the second time.

## Schedule for the day

The workshop lasts one day, with about **4h30 of hands-on time**. The rest of the time is for the opening, lunch, breaks and the closing.

| Moment | Duration | What happens |
|---|---|---|
| Opening | about 30 min | Welcome and project presentation. Check that everyone already has a GitHub account. |
| Hands-on (morning) | about 2h | Planning (chapter 00) and the first chapters. Goal: reach chapter 03 or 04. |
| Lunch | about 1h | |
| Hands-on (afternoon) | about 2h30 | From chapter 04 on. Goal: reach chapter 05 (🛴: post, see, fix and delete). |
| Breaks | about 30 min in total | One in the morning and one in the afternoon. |
| Closing | about 1h30 | Each person shows their message board, a conversation about next steps and thank-yous. |

Some tips for the day:

- **The goal is the 🛴 stage (chapter 05).** Chapters 06 and 07 are for whoever moves faster, and 08 (publishing on Render) is optional. The extra challenges are for whoever finishes everything. Each set of notes for chapters 06, 07 and 08 has an "If time is short" section, with the minimum for each one.
- **"What happened?" can be left for home.** On the day, it's worth doing the Hands-on and reading each chapter's "Remember".
- **Keep an eye on whoever has been stuck on the same step for a long time.** More than 10 minutes on the same step is a sign to come closer, without waiting for them to ask for help.
- **At the closing, every message board counts.** Whoever reached chapter 03 also has an app that works. Celebrate the path, not just the finish line.

## In this part

- [Common errors]({{ site.baseurl }}{% link mentors/common-errors.md %}): the problems that show up most, with the environment and with the code, and how to solve them.
- [Project notes]({{ site.baseurl }}{% link mentors/projects/index.md %}): questions for "Think before you code", common confusions and technical context for each chapter.
