---
title: "Message dates 📅"
parent: Extra challenges
grand_parent: Message Board
nav_order: 1
translation_of: projetos/mural-de-recados/desafios-extras/data-dos-recados.md
translated_from: f922f7d
---

# Message dates 📅

## The challenge

On a full message board, you start wanting to know when each message was posted. Each card gets the date and time the message was written, below the name of the person who wrote it:

> I loved the workshop!
>
> — Bia
>
> Oct 5, 2026 at 11:53

## Think before you code

- Where is this information stored? Do you need to create a new column? Remember the columns Rails creates on its own, in the chapter [How do we store the messages?]({{ site.baseurl }}{% link projects/message-board/02-store-the-messages/hands-on.md %}).
- In what format do people write dates where you live? Day, month and year, in what order?
- Is the app's time the same as your clock's?

## You'll practice

- Using a piece of information Rails already stores on its own.
- Changing the format of a date.
- Changing one of the app's settings.

Try to solve it on your own before opening the hints. Open one at a time, only if you need to.

<details markdown="1">
<summary>Hint 1: the date already exists</summary>

You don't need a migration: Rails stores the date and time each message was created in the `created_at` column, the same one the message board uses to show the newest first.

On each message's card, in the view, right below the author's line, add:

```erb
<p class="is-size-7"><%= message.created_at %></p>
```

`is-size-7` is from Bulma: it makes the text small. Reload and see what shows up.

</details>

<details markdown="1">
<summary>Hint 2: a friendlier format</summary>

The date shows up in a strange format, something like `2026-10-05 14:53:21 UTC`. To choose the format, use `strftime`:

```erb
<p class="is-size-7"><%= message.created_at.strftime("%b %-d, %Y at %H:%M") %></p>
```

Each code with `%` becomes a piece of the date: `%b` is the month's short name, `%-d` the day, `%Y` the year, `%H` the hour and `%M` the minutes. The rest, like the comma and the "at", shows up as it is. Prefer day before month? Try `"%d/%m/%Y at %H:%M"`.

</details>

<details markdown="1">
<summary>Hint 3: the right time</summary>

Is the time off? Rails uses Greenwich time (the `UTC` in the strange format), which may be a few hours ahead of or behind where you are.

Open the file `config/application.rb` and look for the line:

```ruby
# config.time_zone = "Central Time (US & Canada)"
```

Replace it with your time zone, for example:

```ruby
config.time_zone = "London"
```

To see the list of names Rails knows, run `bin/rails time:zones:all` in the terminal.

Save, shut down the server (**Ctrl+C**) and start it again with `bin/rails server`: this file is only read when the server starts. Reload the page.

</details>

## Going further

- Show the date on the edit page too.
- Show "edited on…" on messages that were fixed. Hint: compare `created_at` with `updated_at`.
