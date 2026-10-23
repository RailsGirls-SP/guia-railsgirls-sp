---
title: Hands-on
parent: "08. How do we show the message board to the world?"
grand_parent: Message Board
nav_order: 1
translation_of: projetos/mural-de-recados/08-como-mostrar-o-mural-para-o-mundo/mao-na-massa.md
translated_from: cbfa04d
---

# Hands-on

<!-- TODO: tested in a real deploy on 2026-10-08 (Ruby 4.0.6 installed through .ruby-version, no credit card, first deploy in about 2 minutes). Missing: the screenshot of the deploy messages (step 7), the one of the message board on a phone (step 8) and the names of the delete buttons on Render (chapter 09). -->

Stuck on a step? See [Stuck?](#stuck), at the end of the page.

In this chapter, you'll step out of the codespace: most of the steps happen on the **Render** website. Render's buttons and screens may change a little over time. If something looks different, look for the most similar name or ask someone on the mentoring team for help.

<details class="passo" markdown="1" open>
<summary>1. Create your Render account</summary>

First, you'll prepare the place where the app is going to run: the account and the database on Render. Then you'll go back to the codespace to prepare the app.

In a new browser tab, open [render.com](https://render.com) and click **Get Started** (or **Sign Up**). Choose to sign in with **GitHub**, the same account you use in the codespace.

GitHub will ask whether Render can access your account. Read it calmly and authorize it.

**Check:** you land on the Render dashboard, with the message **You haven't created any services yet**. The **New** button, which you'll use in the next steps, is at the top right.

![The newly created Render dashboard: at the top right, the New button; in the middle, the message "You haven't created any services yet" and the shortcuts Deploy a Web Service, Deploy a Static Site, Create a Postgres database and Explore all service types]({{ '/assets/images/mural-de-recados/08/painel-vazio.png' | relative_url }})
{: .ilustracao .ilustracao-larga }

Done? Open step **2. Create the database**

</details>

<details class="passo" markdown="1">
<summary>2. Create the database</summary>

In your codespace, the database is a file, `storage/development.sqlite3`. On Render, the app can be restarted at any time, and each time that happens the files it created are deleted. A database that is a file would lose all the messages.

That's why, on Render, the app is going to use another kind of database, **PostgreSQL**, which runs separately from the app and doesn't lose anything when the app restarts. In your codespace, everything stays as it is: PostgreSQL is only for the online app.

On the Render dashboard, click **New** and choose **Postgres**. If the dashboard is still empty, you can also click the **Create a Postgres database** shortcut. Fill in:

- **Name:** `message_board_db` (the name that shows up on the Render dashboard)
- **Project:** leave it blank. It's optional and is for grouping several services, which the message board doesn't need.
- **Database:** `message_board_production` (the database's name, following the Rails custom: the app's name and the environment)
- **User:** leave it blank, Render creates one
- **Region:** choose the one closest to you and to the people who will use the message board. The app is going to be in the same region.
- **PostgreSQL Version:** leave the one that's already selected, the most recent.
- **Datadog API Key** and **Datadog Region:** leave them as they are. They're for people who use Datadog, a service that monitors how the database is running.
- **Compute:** the **$0 / month** option, marked as **Free**. It's already selected.

Leave the rest as it is (**Storage**, **Storage Autoscaling** and **High Availability**). Check that the **Monthly Total**, at the end of the page, is **$0 / month** and click **Create database**.

<details class="pergunta" markdown="1">
<summary>See the filled-in form</summary>

![Render's New Postgres form filled in: Name, Project empty, Database, User empty, Region Virginia (US East), PostgreSQL Version 18, Datadog API Key empty, Datadog Region US1 (default), Compute with the $0 / month (Free) option selected, Storage of 1 GB, Storage Autoscaling and High Availability turned off, Monthly Total of $0 / month and the Create database button]({{ '/assets/images/mural-de-recados/08/novo-banco-de-dados.png' | relative_url }})
{: .ilustracao .ilustracao-larga }

</details>

**Check:** the database shows up with the status **Available** after a minute or two.

Done? Open step **3. Teach the app to talk to PostgreSQL**

</details>

<details class="passo" markdown="1">
<summary>3. Teach the app to talk to PostgreSQL</summary>

The database is ready on Render. Now the app needs a new piece to be able to use this kind of database.

Open your codespace. In the new terminal, type:

```
bundle add pg
```

**Check:** the terminal finishes without an error, and the `Gemfile` file got, at the end, a line similar to this one:

```ruby
gem "pg", "~> 1.7"
```

`pg` is the piece that lets Rails talk to PostgreSQL. The `Gemfile` is the list of all the pieces the app uses.

Done? Open step **4. Protect the message board with a password**

</details>

<details class="passo" markdown="1">
<summary>4. Protect the message board with a password</summary>

Online, anyone with the address can open the message board, including **bots** that crawl the internet looking for open forms to fill with spam. To avoid that, the message board is going to ask for a password before opening. People from the workshop get the password and get in; the bots stay out.

Open the file `app/controllers/application_controller.rb`. It's the "parent" controller of all the others: what you write in it applies to the whole app. Right below the first line, the `class` one, add:

```ruby
  if ENV["ACCESS_PASSWORD"].present?
    http_basic_authenticate_with name: "board", password: ENV["ACCESS_PASSWORD"]
  end
```

The whole file looks like this:

```ruby
class ApplicationController < ActionController::Base
  if ENV["ACCESS_PASSWORD"].present?
    http_basic_authenticate_with name: "board", password: ENV["ACCESS_PASSWORD"]
  end
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  # Changes to the importmap will invalidate the etag for HTML responses
  stale_when_importmap_changes
end
```

Save the file.

- `http_basic_authenticate_with` makes the browser ask for a username and a password before opening any page in the app. The username is always `board`, and the password is the one you choose.
- `ENV["ACCESS_PASSWORD"]` is an **environment variable**: a value that's kept outside the code, in the place where the app runs. That way, the password doesn't go to GitHub. You'll choose the password on Render, in step 6.
- The `if ... present?` only turns the protection on when the variable exists. In your codespace it doesn't exist, so nothing changes while you're coding.

**Make a guess:** reload the app in the codespace. Will it ask for the password?

**Check:** it doesn't. The message board opens as usual, because in the codespace the `ACCESS_PASSWORD` variable doesn't exist.

Done? Open step **5. Save and send to GitHub**

</details>

<details class="passo" markdown="1">
<summary>5. Save and send to GitHub</summary>

Render is going to fetch the code from your GitHub repository. So, the two changes you just made need to be there: the `pg` piece (step 3) and the password (step 4).

**Make a guess:** which files show up under **Changes**, in the **Source Control** panel?

**Check:** three files: `Gemfile` and `Gemfile.lock`, which got `pg`, and `application_controller.rb`, with the password.

Save your progress with a [commit]({{ site.baseurl }}{% link glossary.md %}#commit), like in the **Save your progress** step of [Where do we start?]({{ site.baseurl }}{% link projects/message-board/01-where-to-start/hands-on.md %}):

1. In the **Source Control** panel, click the **+** next to **Changes** (**Stage All Changes**).
2. Write the message `Prepare the app for Render` and click **Commit**.
3. Click **Sync Changes** and, in the window that opens, **OK**.

**Check:** under **Graph**, the commit `Prepare the app for Render` shows up with the **main** label and the cloud icon.

Done? Open step **6. Create the app on Render**

</details>

<details class="passo" markdown="1">
<summary>6. Create the app on Render</summary>

Go back to the Render tab. On the dashboard, click **New** and choose **Web Service**. Under **Git Provider**, choose **GitHub**.

GitHub opens the **Authorize Render** screen. Click **Authorize**: this screen confirms who you are, but it doesn't let Render read your repositories yet.

Now look for your message board's repository in the list. The first time, it doesn't show up. Permission to read the repositories is given separately, by installing Render on your GitHub account:

1. In a new tab, open [github.com/apps/render/installations/new](https://github.com/apps/render/installations/new).
2. Choose the GitHub account where your message board is.
3. Under **Repository access**, choose **Only select repositories** and, in the list, your message board's repository. That way, Render only sees this repository, and not all of yours.
4. Click **Install**.
5. Go back to the Render tab and reload the page.

<!-- TODO: check in a real deploy whether the Web Service form has a link that leads to the installation (without opening the address by hand) and the names of the buttons on the installation screen. -->

**Check:** your message board's repository shows up in the list. Click it.

Fill in:

Render notices that the app is a Rails app and already fills in some fields. Check them and change what's needed:

- **Name:** `message-board` (it becomes part of the app's address; if it already exists, Render adds letters and numbers).
- **Project:** leave it blank, like with the database.
- **Language:** **Ruby**. It's already selected.
- **Branch:** `main`. It's already selected.
- **Region:** the same as the database. It's already selected, with the note **1 existing service** (the database).
- **Root Directory:** leave it blank.
- **Build Command:** the field already has a Render recipe. Delete it and paste the recipe below.
- **Start Command:** the field is also filled in. Delete it and paste the command below.
- **Compute:** the **$0 / month** option, marked as **Free**. It's already selected.

In **Build Command**:

```
bundle install && bin/rails assets:precompile && bin/rails db:prepare
```

In **Start Command**, the same command you use in the codespace to start the app:

```
bin/rails server
```

The **Build Command** is the recipe Render follows to prepare the app before starting it, on every deploy (see [Build command](https://render.com/docs/deploys#build-command), in the Render documentation):

- `bundle install` installs the pieces in the `Gemfile`.
- `bin/rails assets:precompile` prepares the page's files, like the CSS.
- `bin/rails db:prepare` creates the tables in the database, like the `db:migrate` you used in chapter 02.
- `&&` links one command to the next: the next one only runs if the previous one worked. If any step goes wrong, the deploy stops, and the app doesn't go online half-done.

Still on the same page, look for **Environment Variables**. Render has already added two: `WEB_CONCURRENCY`, which can stay as it is, and `RAILS_MASTER_KEY`, still without a value. Complete the list so it looks like this (to add a variable, click **Add Environment Variable**):

| Key | Value |
|---|---|
| `WEB_CONCURRENCY` | leave the value Render put there |
| `RAILS_MASTER_KEY` | the contents of the `config/master.key` file, from your codespace |
| `ACCESS_PASSWORD` | your message board's password, which you choose now |
| `DATABASE_URL` | the database's **Internal Database URL** |

To get the `RAILS_MASTER_KEY`, go back to the codespace, open the `config/master.key` file in the Explorer and copy the line that's in it (a sequence of letters and numbers). Paste it into the **Value** of `RAILS_MASTER_KEY`, on Render.

{: .atencao }
Don't click **Generate**, next to `RAILS_MASTER_KEY`. It creates a new key, different from your app's, and the app can't start.

`config/master.key` is the key that opens the file `config/credentials.yml.enc`, where Rails keeps the app's secrets. `credentials.yml.enc` goes to GitHub scrambled; the key doesn't (Rails already leaves `master.key` out). That's why it needs to be pasted into Render. Don't paste this key anywhere else.

To get the `DATABASE_URL`, open the Render dashboard in a new tab, click the database `message_board_db` and look for the **Connections** section. On the **Internal Database URL** row, click the copy button, the last one on the right. The address shows up hidden with dots, but it's copied in full, starting with `postgresql://`.

![The Connections section of the database page on Render, with the rows Hostname, Port, Database, Username, Password, Internal Database URL, External Database URL and PSQL Command; the Internal Database URL row is highlighted]({{ '/assets/images/mural-de-recados/08/internal-database-url.png' | relative_url }})
{: .ilustracao .ilustracao-larga }

Be careful not to copy the **External Database URL**, right below it: it's for accessing the database from outside Render.

{: .atencao }
The **Internal Database URL** has your database's password. Don't paste this address anywhere other than Render.

For `ACCESS_PASSWORD`, choose a password that's easy to pass on to the people at the workshop, like `sticky-notes`. It's going to be shared with other people, so **don't use one of your real passwords**.

Leave the **Advanced** section closed and click **Deploy web service**.

<details class="pergunta" markdown="1">
<summary>See the filled-in form</summary>

![Render's New Web Service form filled in: Source Code with the repository, Name, Project empty, Language Ruby, Branch main, Region Virginia (US East) with 1 existing service, Root Directory empty, Build Command with bundle install, assets:precompile and db:prepare, Start Command bin/rails server, Compute with the $0 / month (Free) option selected, the variables WEB_CONCURRENCY, RAILS_MASTER_KEY, ACCESS_PASSWORD and DATABASE_URL with hidden values, the Advanced section closed and the Deploy web service button]({{ '/assets/images/mural-de-recados/08/novo-app.png' | relative_url }})
{: .ilustracao .ilustracao-larga }

</details>

Done? Open step **7. Wait for the first deploy**

</details>

<details class="passo" markdown="1">
<summary>7. Wait for the first deploy</summary>

Render starts the **deploy**: it fetches your code from GitHub, runs the **Build Command** recipe and starts the app. On the screen, the process's messages show up, similar to the terminal's.

**Make a guess:** given the recipe you pasted into **Build Command**, what shows up in the messages?

The first deploy takes about 2 or 3 minutes. While you wait, look in the messages for the recipe's steps: `bundle install` installing the pieces, `assets:precompile` and `db:prepare` creating the tables.

**Check:** at the end, the message **Your service is live** 🎉 shows up, and the app's status becomes **Live**.

<!-- TODO: screenshot of the deploy messages with "Your service is live" -->

Done? Open step **8. Open your message board online**

</details>

<details class="passo" markdown="1">
<summary>8. Open your message board online</summary>

At the top of the app's page on Render, there's an address like `https://message-board.onrender.com`. Click it.

The browser opens a small window asking for a username and a password: **Sign in**, with the fields **Username** and **Password**. It belongs to the browser, not to the app. Type `board` as the username and, as the password, the one you chose in step 6. Click **Sign In**.

![A browser opening the message board's address on Render, with the small Sign in window asking for Username and Password, and the Cancel and Sign In buttons]({{ '/assets/images/mural-de-recados/08/pedir-palavra-chave.png' | relative_url }})
{: .ilustracao .ilustracao-larga }

**Check:** your message board shows up, with the **New message** button and the invitation **There are no messages yet. How about posting the first one?**. The messages from your codespace didn't come along: the online app has its own database.

Click **New message** and post the first message on the online message board. 🎉

![The message board online, with the Render address in the browser's bar, the New message button and a yellow card with the message "YAAAY! It worked!" and the Edit and Delete buttons]({{ '/assets/images/mural-de-recados/08/mural-no-ar.png' | relative_url }})
{: .ilustracao .ilustracao-larga }

Now open the same address on your phone, or send it to someone from the workshop, together with the password: anyone who knows the password can open it and leave a message.

<!-- TODO: screenshot of the message board online, on a phone -->

Done? Open step **9. Change it and watch it change online**

</details>

<details class="passo" markdown="1">
<summary>9. Change it and watch it change online</summary>

From now on, every change you send to GitHub goes online on its own.

In the codespace, open `app/views/messages/index.html.erb` and change the heading. For example:

```erb
    <h1 class="title">Rails Girls Message Board</h1>
```

Save, make a commit with the message `Change the board's title` and click **Sync Changes**.

**Make a guess:** what happens on Render?

**Check:** on Render, open the `message-board` app. At the top of the page, an **In progress** bar shows up, with the code of the previous commit, an arrow and the code of your new commit. When the deploy finishes, the bar disappears and the app is **Live** again. Reload the app's address: the new heading shows up on the online message board.

![The message-board app page on Render, with the Live status and, below it, the In progress bar showing the code of the previous commit, an arrow and the code of the new commit]({{ '/assets/images/mural-de-recados/08/deploy-em-andamento.png' | relative_url }})
{: .ilustracao .ilustracao-larga }

</details>

## Stuck?

Open the problem that happened to you:

<details class="pergunta" markdown="1">
<summary>The message board's repository doesn't show up in Render's list</summary>

Render doesn't have permission to read this repository yet. Open [github.com/apps/render/installations/new](https://github.com/apps/render/installations/new), choose the account (or the organization) where the repository is and, under **Repository access**, add the message board's repository. Click **Save** and go back to Render: the repository shows up in the list. It works with public and private repositories.

</details>

<details class="pergunta" markdown="1">
<summary>The deploy failed with a database or connection error</summary>

On Render, check the app's `DATABASE_URL` variable: it needs to be the database's **Internal Database URL**, in full, starting with `postgresql://`. Also check that the app and the database are in the **same region**. After fixing it, click **Manual Deploy** and **Deploy latest commit**.

</details>

<details class="pergunta" markdown="1">
<summary>An error with <code>master key</code>, <code>secret_key_base</code> or <code>credentials</code> shows up</summary>

The `RAILS_MASTER_KEY` variable is missing or has the wrong value (for example, if someone clicked **Generate**). Copy the contents of `config/master.key` from the codespace again, without extra spaces or lines, and paste it into Render, on the app's page, under **Environment**. After fixing it, click **Manual Deploy** and **Deploy latest commit**.

</details>

<details class="pergunta" markdown="1">
<summary>The password window won't accept the password</summary>

Check that you typed `board` as the username, and not the password. The password is exactly what's in the `ACCESS_PASSWORD` variable, on Render, with the same uppercase and lowercase letters. If you change the variable, Render restarts the app on its own.

</details>

<details class="pergunta" markdown="1">
<summary>The app takes a long time to open</summary>

On the free plan, the app "goes to sleep" after about 15 minutes without anyone opening it. The first person who opens it after that waits about a minute. Then it's fast again.

</details>

<details class="pergunta" markdown="1">
<summary>The deploy failed and I didn't understand the message</summary>

Read the last lines of the deploy messages: the error is usually there, like in the terminal. Copy the message and ask someone on the mentoring team for help. 💜 You can also ask an AI to explain the message, like in [Using AI as a tutor]({{ site.baseurl }}{% link start-here/ai-as-a-tutor.md %}).

</details>

Mentors: see the [notes for this chapter]({{ site.baseurl }}{% link mentors/projects/message-board/08-show-it-to-the-world.md %}).

## Done?

Go on to [What happened?]({{ site.baseurl }}{% link projects/message-board/08-show-it-to-the-world/what-happened.md %}) and understand each step.
