---
title: "09. All done! What's next?"
parent: Message Board
grand_parent: Projects
nav_order: 10
translation_of: projetos/mural-de-recados/09-terminei-e-agora/index.md
translated_from: 09001c3
---

# 09. All done! What's next?

Time: about 10 minutes.
{: .fs-5 }

Congratulations! 🎉 You built an app from scratch, with Ruby on Rails. It doesn't matter which chapter you stopped at: your message board works, and the code is saved in your GitHub repository.

This chapter wraps up the day: shutting down what was left running, knowing how to get back to the project and choosing what to do next.

<details class="passo" markdown="1" open>
<summary>1. Shut down the server and the codespace</summary>

The server and the codespace only need to be running while you're coding.

**The server.** Click the terminal where the server is running and press **Ctrl+C**. The server shuts down, and the terminal goes back to the place where you type.

**The codespace.** Open the editor's command palette (**Cmd+Shift+P** on a Mac, **Ctrl+Shift+P** on Windows and Linux), type `Stop Current Codespace` and choose **Codespaces: Stop Current Codespace**.

If you prefer, you can shut it down from the list of codespaces, at [github.com/codespaces](https://github.com/codespaces): click the **…** next to your codespace and choose **Stop codespace**.

- Shutting it down doesn't delete anything: the code and the codespace's database are still there.
- GitHub also shuts the codespace down on its own after a while without use, but shutting it down right away saves your free Codespaces hours.

**Make a guess:** did you do chapter 08 and put the message board online? With the codespace shut down, does it keep working?

**Check:** it does. The online app runs on Render, not in your codespace.

**What about the app on Render?** This part is only for people who did chapter 08, [How do we show the message board to the world?]({{ site.baseurl }}{% link projects/message-board/08-show-it-to-the-world/index.md %}), and put the message board online. If you didn't, you can skip it. The app can stay online: that's what it's there for, and on the free plan it doesn't cost anything. But it doesn't stay there forever: the free database is deleted after 30 days, and the app starts showing errors. When you no longer need the online message board (at the latest, close to the 30 days), delete both, so you don't leave a broken app on the internet or messages stored with no use:

1. On Render, open the `message-board` app, click **Settings** and, at the end of the page, **Delete Web Service**.
2. Open the database `message_board_db` and, at the end of the **Info** page, click **Delete Database**.

Deleting on Render doesn't touch your code: it stays on GitHub, and you can put it online again by following chapter 08.

<!-- TODO: confirm the names of the delete buttons on Render (the app's menu shows "Delete or suspend"). -->

{: .dica }
Using your own computer, and not Codespaces? Just shut down the server with **Ctrl+C**.

Done? Open step **2. How to get back to the project**

</details>

<details class="passo" markdown="1">
<summary>2. How to get back to the project</summary>

When you want to continue, at home or on another day:

1. Open [github.com/codespaces](https://github.com/codespaces), signing in with your GitHub account.
2. Click your codespace, the one for the message board's repository. It starts up again, the way you left it.
3. In the terminal, start the server with `bin/rails server`, and continue in the guide from where you stopped.

Your code is also in your repository, on GitHub, with all the commits you made. If the codespace is ever deleted (GitHub deletes the ones that go unused for a long time), you can create a new codespace from the repository, and only the test messages are lost: they live in the codespace's database, which doesn't go to GitHub.

Done? Open step **3. And after that?**

</details>

<details class="passo" markdown="1">
<summary>3. And after that?</summary>

Some ideas to keep going:

- **Finish the project.** If you stopped before the end, continue from the chapter you were on. The guide stays online, and you can follow it at your own pace.
- **Put the message board online,** if you haven't yet: see the chapter [How do we show the message board to the world?]({{ site.baseurl }}{% link projects/message-board/08-show-it-to-the-world/index.md %}).
- **Do the extra challenges.** In [Extra challenges]({{ site.baseurl }}{% link projects/message-board/extra-challenges/index.md %}), there are challenges to show the date of the messages, choose the color of each message and more.
- **Code on your own computer.** See how to install everything in [Installing on your computer]({{ site.baseurl }}{% link extras/on-your-computer.md %}).
- **Show what you made.** Share the link to your GitHub repository, or to your online message board, with anyone you like.

Thank you for taking part! 💜

</details>
