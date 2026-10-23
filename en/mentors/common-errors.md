---
title: Common errors
parent: Mentoring guide
nav_order: 1
translation_of: mentoras/erros-comuns.md
translated_from: d273cf2
---

# Common errors

The problems that show up most during the Message Board project, and how to solve them. Before fixing anything, remember: several errors show up **on purpose** in the guide, so the participant learns to read the message. Check the [notes for each chapter]({{ site.baseurl }}{% link mentors/projects/message-board/index.md %}) to see whether the error is part of the path.

## Environment problems

| What shows up | Likely cause | How to solve it |
|---|---|---|
| "I fixed it and the error is still there" | The file wasn't saved. | In the editor, the tab of an unsaved file has a dot instead of the **X**. Save with Cmd+S or Ctrl+S and reload the page. |
| The page doesn't change after changing the look | The browser kept the old version. | Reload with Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows and Linux). |
| The first codespace takes a while to open | The computer in the cloud is being prepared. | Wait. It only happens the first time. |
| The app's page doesn't open, or shows a connection error | The server is off. | Start it with `bin/rails server`. If the codespace went to sleep, it shut down the server too. |
| The **Open in Browser** message disappeared | The message only shows up once. | Open it from the **Ports** tab, at the globe icon of port 3000. |
| A typed command doesn't do anything | It was typed in the server's terminal, which is busy. | Open a new terminal with the **+** button on the terminal panel. |
| `rails: command not found` | The codespace wasn't created from the Rails Girls SP template, or it's still finishing its setup. | Wait a few minutes and open a new terminal. If it continues, check whether the repository came from the template. |
| **Blocked hosts** | The codespace was created without the template. | See "Blocked hosts error" in the [notes for chapter 01]({{ site.baseurl }}{% link mentors/projects/message-board/01-where-to-start.md %}#blocked-hosts-error). |
| `InvalidAuthenticityToken` or `HTTP Origin header didn't match` when sending a form | Rails's form protection doesn't recognize the Codespaces address. | See step 9 of chapter 04 and the [notes for chapter 04]({{ site.baseurl }}{% link mentors/projects/message-board/04-post-a-message.md %}). After changing `development.rb`, restart the server. |
| The messages disappeared | The codespace is new: the database doesn't go to GitHub. | Run `bin/rails db:migrate` and post messages again. See the [notes for chapter 02]({{ site.baseurl }}{% link mentors/projects/message-board/02-store-the-messages.md %}). |
| The commit doesn't show up on GitHub | **Sync Changes** was missing. | In the **Source Control** panel, click **Sync Changes**. |
| Red ❌ and automatic pull requests on GitHub | GitHub Actions and Dependabot, which `rails new` sets up. | You can ignore them. See the [notes for chapter 01]({{ site.baseurl }}{% link mentors/projects/message-board/01-where-to-start.md %}). |
| The message board turned dark | The `data-theme="light"` is missing from the layout, and the computer is in dark mode. | See step 2 of chapter 06. |
| Changed a file in the `config` folder and nothing changed | These files are only read when the server starts. | Shut down the server with Ctrl+C and start it again with `bin/rails server`. |

## Code problems

| Error message (or symptom) | Likely cause | Where it shows up |
|---|---|---|
| `NameError: uninitialized constant Message` (in the console) | `message` with a lowercase m, or the model hasn't been created yet. | Chapter 02 |
| `no such table: messages`, or the **PendingMigrationError** page | The migration hasn't run yet. | Chapters 02 and 07 |
| `unknown attribute 'title' for Message` | A column's name is wrong. | Chapter 02 (on purpose, in "Break it on purpose") |
| `No route matches [GET]`, `[POST]`, `[PATCH]` or `[DELETE]` | The route is missing, or the action isn't in the `resources`'s `only`. | Chapters 03, 04 and 05 (on purpose) |
| `uninitialized constant MessagesController` | The controller doesn't exist, or its name is different (it needs to be `Messages`, plural). | Chapter 03 (on purpose) |
| **Unknown action**: `The action '…' could not be found` | The action doesn't exist, or it's written **after** `private`. | Chapters 04 and 05 (on purpose) |
| **No view template for interactive request** | The action's view is missing. | Chapters 04 and 05 (on purpose) |
| `undefined method 'each' for nil` or `undefined method 'empty?' for nil` | The `@` is missing, or the controller didn't prepare the variable (for example, a `render :index` in `create`, instead of `render :new`). | Chapters 03 and 07 |
| `Passed nil to the :model argument` | The `@message = Message.new` is missing from the `new` action. | Chapter 04 |
| `undefined local variable or method 'new_message_path'` | The `:new` is missing from the route. | Chapter 04 (on purpose) |
| `param is missing or the value is empty` | The form's fields don't match `message_params`. | Chapter 04 |
| `undefined method 'edit_message_path'` | The `:edit` is missing from the route. | Chapter 05 |
| `undefined method 'message_path'` when opening the edit page | The `:update` is missing from the route: the edit form has nowhere to send to. | Chapter 05 (on purpose) |
| `Couldn't find Message with 'id'=…` | The number in the address doesn't belong to any message. | Chapter 05 |
| `syntax error` pointing to the end of the file | An `end` is missing (from a `def`, an `if` or a `do`), or there's an extra one. | Any chapter, especially 07 |
| The content doesn't show up, with no error | `<% %>` instead of `<%= %>`. | Chapters 03 and 04 |
| The chosen color isn't stored, with no error | The `:color` is missing from `message_params`. | Extra challenge "Message colors" (on purpose) |
| Clicked a form button (**Post message**, **Save**, **Delete**) and nothing happened on the screen | A form's error doesn't show up in the browser, only in the **server's terminal**. If there's no error there either: the `redirect_to` is missing from `create`, or the `status: :unprocessable_entity` is missing from `render`. | Chapters 04, 05 and 07 |
| The warnings show up as Rails's defaults (`can't be blank`) | The `message:` is missing from the validation. | Chapter 07 |

## When none of this solves it

- **Read the whole error message, together with the person.** The first line usually says what happened, and the file name and line number say where.
- **Compare with the guide's code,** line by line. Most errors are a letter, an `end` or an `@`.
- **Go back to the last commit** if things got very messy. In the **Source Control** panel, you can discard a file's changes and start the step again.
- **Call another mentor.** Two pairs of eyes find it faster, and the participant sees that asking for help is normal, even for people who already program.

## Project notes

For the confusions in each chapter, see the [Project notes]({{ site.baseurl }}{% link mentors/projects/index.md %}).
