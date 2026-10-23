{% comment %}translation_of: _includes/mural-de-recados/01/mao-na-massa.md translated_from: 1e3f998 {% endcomment %}
You'll need a GitHub account. If you don't have one yet, see [Creating a GitHub account]({{ site.baseurl }}{% link start-here/github-account.md %}).

Stuck on a step? See [Stuck?](#stuck), at the end of the page.

<details class="passo" markdown="1" open>
<summary>1. Create your repository</summary>

A **repository** is a folder on GitHub that holds all the files of a project. Rails Girls SP prepared a repository template that gets your codespace ready, with Ruby and Rails installed. It doesn't have the app yet: you'll create the app in step 4.

1. Open the template: [github.com/RailsGirls-SP/codespaces-rails](https://github.com/RailsGirls-SP/codespaces-rails).
2. Click the **Use this template** button and then **Create a new repository**.
3. In **Repository name**, type `message-board`.
4. In **Choose visibility**, choose **Public**. That way, the mentoring team can see your code through the link, and your app shows up on your GitHub profile. You can change this later if you want.
5. Click **Create repository**.

![The Create a new repository form with the RailsGirls-SP/codespaces-rails template selected, the name message-board in Repository name, Public in Choose visibility and the Create repository button]({{ '/assets/images/mural-de-recados/01/criar-repositorio-template.png' | relative_url }})

{: .atencao }
Public repositories can be seen by anyone: never put passwords or personal data in the project files.

**Check:** you're on your repository's page, with your username before `/message-board`.

Done? Open step **2. Open your codespace**

</details>

<details class="passo" markdown="1">
<summary>2. Open your codespace</summary>

A **codespace** is a computer in the cloud, connected to your repository. You use it through the browser.

1. On the repository page, click the green **Code** button.
2. Choose the **Codespaces** tab.
3. Click **Create codespace on main**.

![The message-board repository page with the Code button menu open: 1 marks the Code button, 2 marks the Codespaces tab and 3 marks the Create codespace on main button]({{ '/assets/images/mural-de-recados/01/criar-codespace.png' | relative_url }})

**Make a guess:** what do you think is going to open?

The first time, the codespace takes a few minutes to get ready: it's installing Rails for you. Meanwhile, the message **Building codespace…** shows up in the bottom right corner.

![A codespace opening in the browser, with the terminal still empty and the message Setting up remote connection: Building codespace in the bottom right corner]({{ '/assets/images/mural-de-recados/01/codespace-carregando.png' | relative_url }})

You might see the question **Do you trust the authors of the files in this folder?**. The files came from the Rails Girls SP template, so click **Trust Folder & Continue**.

![The Do you trust the authors of the files in this folder? window with the Manage, Cancel and Trust Folder & Continue buttons, the last one highlighted]({{ '/assets/images/mural-de-recados/01/codespace-confiar.png' | relative_url }})

When the codespace finishes loading, the [terminal]({{ site.baseurl }}{% link glossary.md %}#terminal) shows a welcome message and is ready to take commands.

**Check:** the screen has three areas.

- On the left, the **Explorer**: the list of the project's files.
- In the middle, the **editor**: where files open when you click on them.
- At the bottom, the **terminal**: where you type commands. If it doesn't show up, open it from the ☰ menu → **Terminal** → **New Terminal**. See more about the terminal in [Terminal basics]({{ site.baseurl }}{% link extras/terminal-basics.md %}).

![The codespace ready: the Explorer on the left with .devcontainer, LICENSE and README.md, the template's README open in the middle, the terminal with the Welcome to Codespaces message at the bottom and the chat panel on the right]({{ '/assets/images/mural-de-recados/01/codespace-aberto.png' | relative_url }})

On the right, an AI chat panel might show up. You can close it by clicking the **X**.

Done? Open step **3. Check the tools**

</details>

<details class="passo" markdown="1">
<summary>3. Check the tools</summary>

In the terminal, type:

```
ruby -v
```

And then:

```
rails -v
```

**Check:** the result of each command shows up right below it. The first one shows the Ruby version, and the second one, the Rails version. If version numbers show up, the tools are ready.

![A codespace with the terminal area highlighted, showing the commands ruby -v and rails -v and the results ruby 4.0.6 and Rails 8.1.4]({{ '/assets/images/mural-de-recados/01/terminal-versoes.png' | relative_url }})

Done? Open step **4. Create the app**

</details>

<details class="passo" markdown="1">
<summary>4. Create the app</summary>

**Make a guess:** the command is called `rails new`. What do you think it's going to create?

In the terminal, type (the dot at the end is part of the command):

```
rails new .
```

The command takes a minute or two. It creates the files and then downloads the libraries Rails uses.

Right at the beginning, Rails will ask whether it can overwrite the `README.md` file, which came from the template. Type **Y** (for *yes*) and press **Enter** to confirm: the template's README is replaced by your app's README.

![The terminal after the rails new command, showing conflict README.md and the question Overwrite README.md with the options Ynaqdhm, waiting for an answer]({{ '/assets/images/mural-de-recados/01/rails-new-conflito-readme.png' | relative_url }})

**Check:** the terminal showed a huge list of lines starting with `create`, and the Explorer now has several new folders, like `app`, `config` and `db`. Is that what you expected?

![The codespace after rails new: the Explorer shows the new folders and files, like app, bin, config, db and Gemfile, and the terminal shows the command's lines ending with create and force]({{ '/assets/images/mural-de-recados/01/rails-new-arquivos.png' | relative_url }})

Done? Open step **5. Start the server**

</details>

<details class="passo" markdown="1">
<summary>5. Start the server</summary>

In the terminal, type:

```
bin/rails server
```

**Make a guess:** what will happen to the terminal after this command?

**Check:**

- The terminal shows a few messages and stays still, without going back to the place where you type. That's normal: the server is running, waiting for visitors.
- In the corner of the screen, a message says the application is running on port 3000. Click **Open in Browser**.

![The terminal with the server's messages after the bin/rails server command: the lines Listening on and Use Ctrl-C to stop are highlighted as Server running, and the Open in Browser button, in the message in the bottom right corner, is highlighted too]({{ '/assets/images/mural-de-recados/01/rails-server.png' | relative_url }})

- A new tab opens with the Rails welcome page. 🎉

![The Rails welcome page open at an address ending in app.github.dev: the Rails logo in a red circle and, below it, Rails version 8.1.4 and Ruby version 4.0.6]({{ '/assets/images/mural-de-recados/01/pagina-boas-vindas-rails.png' | relative_url }})

This is the first page of your Message Board app. It doesn't have any messages yet, but the app already exists!

Done? Open step **6. Save your progress**

</details>

<details class="passo" markdown="1">
<summary>6. Save your progress</summary>

The app's files are in the codespace, but they haven't been saved to your repository on GitHub yet. To save them, you'll make a **commit**: a record of how the project is right now, with a message saying what changed. See more in [Git basics]({{ site.baseurl }}{% link extras/git-basics.md %}).

1. In the bar on the left, click the **Source Control** icon (the third one, with dots connected by lines). The number on top of it shows how many files changed.
2. Next to **Changes**, click the **+** (**Stage All Changes**). That way, all the files will go into the commit.

   ![The Source Control panel: 1 marks the Source Control icon in the bar on the left, with the number 106, and 2 marks the + button next to Changes, with the tooltip Stage All Changes]({{ '/assets/images/mural-de-recados/01/commit-stage-all.png' | relative_url }})

3. Check that the list is now called **Staged Changes**. In the message field, write what changed, for example `Create the Message Board app`, and click **Commit**.

   ![The Source Control panel: 1 marks the message field with the text Create the Message Board app and 2 marks the Commit button; below, the Staged Changes list]({{ '/assets/images/mural-de-recados/01/commit-mensagem.png' | relative_url }})

   **Make a guess:** after the commit, do the files already show up in your repository on GitHub?

4. Not yet: the commit is saved only in the codespace. To send it to GitHub, click **Sync Changes**.

   ![The Source Control panel with the Sync Changes button highlighted]({{ '/assets/images/mural-de-recados/01/commit-sync.png' | relative_url }})

5. In the window that opens, click **OK**.

   ![The window This action will pull and push commits from and to origin/main, with the OK button highlighted]({{ '/assets/images/mural-de-recados/01/commit-sync-ok.png' | relative_url }})

**Check:** under **Graph**, at the bottom of the panel, your commit shows up with the **main** label and a cloud icon next to it: this means it's already on GitHub.

![The Graph section of the Source Control panel with the commit Create the Message Board app highlighted, with the main label and the cloud icon]({{ '/assets/images/mural-de-recados/01/commit-sincronizado.png' | relative_url }})

{: .atencao }
A codespace that sits unused for a long time is deleted by GitHub (by default, after 30 days). Anything that wasn't sent with **Sync Changes** is lost with it. That's why you should always finish with the commit and the Sync.

From now on, every chapter ends like this: with the app working and a commit saving your progress.

Done? Open step **7. Check on GitHub**

</details>

<details class="passo" markdown="1">
<summary>7. Check on GitHub</summary>

Now your code isn't only in the codespace: it's also saved in your repository on GitHub.

**Make a guess:** what will show up on your repository's page?

1. Go back to the browser tab with your repository's page (the one from step 1) or open `github.com/your-username/message-board`.
2. Reload the page.

**Check:** the app's folders and files show up in the list, and next to almost all of them is your commit message, **Create the Message Board app**. Only the `.devcontainer` folder and the `LICENSE` still say **Initial commit**: they came from the template.

![The message-board repository page on GitHub with the list of the app's folders and files highlighted, almost all of them with the message Create the Message Board app]({{ '/assets/images/mural-de-recados/01/commit-github.png' | relative_url }})

</details>

## Stuck?

Open the problem that happened to you:

<details class="pergunta" markdown="1">
<summary>The terminal says <code>rails: command not found</code></summary>

The codespace is still installing Rails. Wait for the terminal to stop showing messages and try again. If the error doesn't go away, ask for help.

</details>

<details class="pergunta" markdown="1">
<summary>The port 3000 message didn't show up, or you closed it by accident</summary>

In the bottom panel, open the **Ports** tab and look for the **App (3000)** row. The other ports in the list belong to the editor itself and can be ignored. Hover over the address in the **Forwarded Address** column and click the globe icon that shows up, to open the app in the browser.

![The Ports tab with three ports: 1 marks the Ports tab and 2 marks the App (3000) row, with the address in the Forwarded Address column]({{ '/assets/images/mural-de-recados/01/aba-ports.png' | relative_url }})

</details>

<details class="pergunta" markdown="1">
<summary>The page shows the "Blocked hosts" error</summary>

Rails blocked the codespace's address. Ask someone on the mentoring team for help or see the solution in the [mentoring notes]({{ site.baseurl }}{% link mentors/projects/message-board/01-where-to-start.md %}#blocked-hosts-error).

</details>

<details class="pergunta" markdown="1">
<summary>The codespace shut down or you closed the tab</summary>

1. Open your repository's page on GitHub and click the green **Code** button.
2. Choose the **Codespaces** tab.
3. Click your codespace. GitHub gives it a random name, like *literate invention*.

![The repository page with the Code button menu open: 1 marks the Code button, 2 marks the Codespaces tab and 3 marks the codespace literate invention, with the Active status]({{ '/assets/images/mural-de-recados/01/repositorio-codespace-ativo.png' | relative_url }})

When it opens, start the server again with `bin/rails server`.

You can also find all your codespaces at [github.com/codespaces](https://github.com/codespaces). Click your codespace in the list at the bottom:

![GitHub's Your codespaces page with the codespace literate invention, from the message-board repository, highlighted in the list at the bottom]({{ '/assets/images/mural-de-recados/01/github-codespaces-lista.png' | relative_url }})

Don't click **New codespace** or **Use this template**: they create another codespace, an empty one, without your app.

</details>

<details class="pergunta" markdown="1">
<summary>Closed it without syncing your changes?</summary>

Don't worry: nothing was lost. Your files and your commit are still saved in the codespace. Open the codespace again (see "The codespace shut down or you closed the tab") and, in the **Source Control** panel, click **Sync Changes**. If you hadn't made the commit yet, do the commit steps first.

</details>

Mentors: see the [notes for this chapter]({{ site.baseurl }}{% link mentors/projects/message-board/01-where-to-start.md %}).
