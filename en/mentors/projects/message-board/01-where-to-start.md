---
title: "01. Where do we start?"
parent: Message Board notes
grand_parent: Project notes
nav_order: 2
translation_of: mentoras/projetos/mural-de-recados/01-por-onde-comecar.md
translated_from: 1238896
---

# 01. Where do we start?

[See chapter]({{ site.baseurl }}{% link projects/message-board/01-where-to-start/index.md %}) <!-- TODO: once the tags exist, bring back " · Reference code: tag `passo-01`", with a link to the tag in the RailsGirls-SP/mural-de-recados repository. -->

## Questions for "Think before you code"

- "When you open a website, who answers on the other side?" Leads to the idea of a server.
- "The browser is on your computer. What about the rest: where could it be?" Prepares for Codespaces: a computer in the cloud.
- "What needs to exist before the app shows anything?" Helps read the chapter's diagram as a path.

## Common confusions

- **The first codespace takes a while.** The first time can take a few minutes to open. It isn't an error: it's the computer in the cloud being prepared.
- **The question "Do you trust the authors…?"** shows up in the editor. The files come from the Rails Girls SP template: it's safe to trust them.
- **Forgetting the dot in `rails new .`.** Without the dot, the command complains that the app's name is missing. With another name in place of the dot, the app is created in a new folder, inside the repository, and the next commands don't work from the main folder.
- **The question `Overwrite README.md?`** in the middle of `rails new`. The guide shows what to answer: the template's README is replaced by the app's.
- **Typing in the server's terminal.** While the server is running, that terminal is busy. For other commands, open a new terminal with the **+** button.
- **Forgetting Sync Changes.** The commit stays only in the codespace until the Sync. Step 7 is there precisely to check on GitHub.
- **Closing the codespace's tab.** Nothing is lost: the codespace is still on the list at [github.com/codespaces](https://github.com/codespaces). You just need to start the server again.

## Who answers the request: Puma or Rails?

{: .atencao }
Context for mentors only. **You don't need to bring this to the participants**: the chapter only talks about "the web server". Participants only see the name Puma in the glossary and in the list of terminals in chapter 02. Only use it if someone asks.

The chapter simplifies and says that "the web server" serves the requests. If someone asks who answers, it's two programs working together:

- **Puma** is the server that starts when you run `bin/rails server`. It comes installed in every new Rails app, but it's a separate program. It receives the browser's request and sends back the finished page, without knowing anything about messages.
- **Rails, together with the app's code,** decides what to answer: it looks at the requested address, chooses which part of the code takes care of it (route → controller), looks up the messages in the database and puts the page together (view).

In the restaurant analogy used in the chapter:

| At the restaurant | In the app |
|---|---|
| The person at the table, who takes the order and brings the dish | The browser |
| The counter, which receives the order and hands over the dish | Puma |
| The equipped kitchen | Rails |
| The recipe | The app's code |
| The cook, who follows the recipe | Ruby |

Only go deeper if the question comes up. For beginners, "the server receives the request and sends back the page" is enough for this chapter.

## The first commit with "Stage All Changes"

{: .atencao }
Context for mentors only. **You don't need to bring this to the participants**: step 6 only says that **Stage All Changes** puts all the files in the commit. Only use it if the group is curious.

In step 6, the chapter uses **Stage All Changes**, which puts all the changed files in the commit at once. It's the simplest way to start, but it isn't always ideal: in a real project, sometimes it's worth choosing only some files for each commit. If the group is curious, it's a good topic to talk about.

## The red ❌ and the automatic pull requests

{: .atencao }
Context for mentors only. **You don't need to bring this to the participants**: the chapter doesn't talk about the ❌ or the pull requests. Only use it if someone asks, when they see the repository's page.

After Sync Changes (steps 6 and 7), the repository's page on GitHub may show three things the participant didn't do:

- **A red ❌ next to the commit.** `rails new` creates the file `.github/workflows/ci.yml`, and with every push **GitHub Actions** runs automatic checks (tests, security analysis and code style). The ❌ means one of them failed. It's not the participant's mistake and doesn't stop the app from working.
- **"Pull requests" with a number and several branches.** `rails new` also creates `.github/dependabot.yml`. **Dependabot**, a GitHub bot, checks whether new versions of the app's libraries came out and, for each one, creates a branch and opens a pull request proposing the update. Nothing changes in the app if nobody clicks **Merge**.

How to explain it: they're tools real projects use to keep quality up and libraries up to date, and Rails already leaves everything set up. In this project, we won't use any of them (see [No automated tests for now]({{ site.baseurl }}{% link mentors/projects/message-board/index.md %}#no-automated-tests-for-now)). The participant can ignore the pull requests or close them in the **Pull requests** tab.

If the organizing team would rather none of this showed up, `rails new . --skip-ci` doesn't create those two files.

## Port 3000's "Make Public" button

{: .atencao }
Context for mentors only. **You don't need to bring this to the participants**: the chapter only asks for **Open in Browser**. Only use it if someone asks about the other button.

In step 5, the port 3000 message shows two buttons: **Open in Browser** and **Make Public**. Only the first one is needed. If someone asks about the second one:

- **The codespace itself never becomes public.** The editor, files and terminal always belong only to the account owner.
- **What becomes public is the app's address** (`…-3000.app.github.dev`). With the port public, anyone with the link can open the app, without logging in. With the port private, which is the default, only the account owner can open it.
- **The app runs in development mode,** which wasn't made to be exposed: the error pages show details of the code, and anyone with the link can post, edit and delete messages.
- **It only works with the codespace running,** so it's no use for putting the app online. That's what chapter 08 is for.
- **Whoever opens the app uses up the Codespaces quota** of the codespace's owner.

Advise keeping the port **private**. If a participant wants to show the message board to someone in the room, they can make it public for a few minutes and switch it back to private afterwards: in the **Ports** tab, right-click port 3000 and choose **Port Visibility** → **Private**.

## Blocked hosts error

{: .atencao }
For mentors to solve. The chapter's "Stuck?" tells the participant to ask a mentor for help, or to come to this section.

In development mode, Rails only accepts requests from known addresses, and the codespace's address (`*.app.github.dev`) isn't on the list. To allow it, open `config/environments/development.rb` and add, before the last `end`:

```ruby
config.hosts << ".app.github.dev"
```

At Imersão 2025, we used a regular expression, which has the same effect:

```ruby
config.hosts << /.*\.app\.github\.dev/
```

Then shut down the server (Ctrl+C) and start it again with `bin/rails server`.

With the Rails Girls SP template repository, this error **shouldn't show up**: the template already allows the Codespaces address through the environment variable `RAILS_DEVELOPMENT_HOSTS`, in `.devcontainer/devcontainer.json`, and this was checked when testing the template. If the error shows up, the codespace was probably created without the template (for example, from an empty repository). In that case, the line above solves it.

## Next notes

[02. How do we store the messages?]({{ site.baseurl }}{% link mentors/projects/message-board/02-store-the-messages.md %})
