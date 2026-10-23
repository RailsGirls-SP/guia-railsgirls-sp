---
title: "09. All done! What's next?"
parent: Message Board notes
grand_parent: Project notes
nav_order: 10
translation_of: mentoras/projetos/mural-de-recados/09-terminei-e-agora.md
translated_from: e40e2a1
---

# 09. All done! What's next?

[See chapter]({{ site.baseurl }}{% link projects/message-board/09-whats-next/index.md %})

This chapter wraps up the day for **everyone**, whatever chapter the person stopped at. It's worth doing it together, at the beginning of the closing, before the presentations.

## At the end of the day

- **Check that the last commit went to GitHub.** Progress is only really saved after **Sync Changes**. Ask each person to open their repository on GitHub and see the last commit there.
- **Shutting down the codespace** saves the free Codespaces hours. If someone forgets, GitHub shuts it down on its own after a while without use, so it's not serious.
- **Whoever stopped in the middle of a chapter** can make a commit anyway, with a message like `Start chapter 05`. It makes it easier to continue at home.
- **Reinforce that they can keep going.** The guide stays online, and so does the codespace. Show where the list is at [github.com/codespaces](https://github.com/codespaces).

## Common confusions

- **"I deleted the codespace by accident."** The code is on GitHub (if the last Sync was done). They can create a new codespace from the repository. The test messages are lost, because the database doesn't go to GitHub, and they need to run `bin/rails db:migrate` again.
- **"The online message board stopped after I shut down."** It shouldn't: the online app runs on Render. The most likely thing is that the app "went to sleep" (free plan); the first visit takes about a minute.

## Next notes

[Extra challenges notes]({{ site.baseurl }}{% link mentors/projects/message-board/extra-challenges.md %})
