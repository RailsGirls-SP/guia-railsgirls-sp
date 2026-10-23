---
title: "08. How do we show the message board to the world?"
parent: Message Board notes
grand_parent: Project notes
nav_order: 9
translation_of: mentoras/projetos/mural-de-recados/08-como-mostrar-o-mural-para-o-mundo.md
translated_from: 886a813
---

# 08. How do we show the message board to the world?

[See chapter]({{ site.baseurl }}{% link projects/message-board/08-show-it-to-the-world/index.md %}) <!-- TODO: once the tags exist, bring back " · Reference code: tag `passo-08`", with a link to the tag in the RailsGirls-SP/mural-de-recados repository. -->

{: .atencao }
This chapter is **optional**. It was tested in a real deploy on 2026-10-08, with Rails 8.1.4 and Ruby 4.0. Render's screens change often: before the workshop, it's worth having someone from the organizing team redo the chapter, from scratch, with a new account.

## Questions for "Think before you code"

- "Where does the app run today? And when you close the codespace?" Leads to the idea of a computer that's on all the time.
- "Do your test messages come along?" Leads to the separation between development and production.
- "If anyone can open it, what could go wrong?" Opens the conversation about security (see below).

## Common confusions

- **The small password window.** The username is always `board`; the password is the `ACCESS_PASSWORD`. It's common to type the password in the username field. The window belongs to the browser, so the text shows up in the browser's language.

- **Forgetting the commit and Sync Changes in step 5.** Render only sees what's on GitHub.
- **Clicking Generate on `RAILS_MASTER_KEY`.** The button shows up next to the field and looks like the easy way, but it creates a key that doesn't open the app's credentials. The deploy finishes, and the app fails to start.
- **A codespace without `config/master.key`.** `master.key` doesn't go to GitHub, so a codespace created again from the repository (because the old one was deleted, for example) doesn't have the key, and the repository's `credentials.yml.enc` doesn't open with any other. `bin/rails credentials:edit` alone fails with `Couldn't decrypt config/credentials.yml.enc. Perhaps you passed the wrong key?`. The way out is to create a new pair: `rm config/credentials.yml.enc` and then `bin/rails credentials:edit`, which creates a new `master.key` and `credentials.yml.enc`. Without an editor configured, the command shows a message asking for one (`VISUAL="code --wait"`), but it creates both files anyway. Then, commit, **Sync Changes** and the new key pasted into Render. The message board doesn't keep anything in the credentials, so nothing is lost. Tested with Rails 8.1.4.
- **Leaving the Build Command Render suggests.** The field comes with `bundle install; bundle exec rake assets:precompile; bundle exec rake assets:clean;`. You need to delete it and paste the guide's recipe: without `db:prepare`, the app goes online without the tables. The guide's recipe uses `&&`, and not `;`: with `;`, the next command runs even if the previous one failed.
- **Copying the wrong database URL.** It's the **Internal Database URL**, not the External one.
- **Different regions** for the app and the database: the internal address doesn't work across regions.
- **The app "sleeping".** After 15 minutes without access, the first visit takes about a minute. It isn't an error.

## Deploy or deployment?

{: .atencao }
Context for mentors only. **You don't need to bring this to the participants**: the chapter and the glossary only use "deploy". Only use it if someone asks what the difference is.

If someone asks: both exist. *Deploy* is the verb, and *deployment* is the more formal noun. In programmers' everyday speech, "deploy" became a noun too ("do the deploy", "the deploy failed"). Render itself uses **Deploy** on its screens (**Deploys**, **Manual Deploy**, **Deploy web service**). The guide uses only "deploy", like in the [glossary]({{ site.baseurl }}{% link glossary.md %}#deploy).

## The chapter's technical decisions

{: .atencao }
Context for mentors only. **You don't need to bring this to the participants**: the chapter already explains what they need (why PostgreSQL and what each command in the recipe does). Here are the reasons for the choices made by whoever wrote the guide, to answer questions or to redo the chapter if Render changes.

- **PostgreSQL in production, SQLite in development.** On the free plan, Render doesn't have a permanent disk: a SQLite file would be deleted with every deploy or restart. The free PostgreSQL lasts 30 days, which is enough for the workshop. `database.yml` doesn't change: `DATABASE_URL` replaces the main database's configuration in production. Tested locally with Rails 8.1.4 and PostgreSQL 17.
- **The cache, the queue and the cable stay in SQLite** in production (Rails 8's `cache`, `queue` and `cable` databases). Since the app doesn't use cache, jobs or Turbo Streams, it's fine if those files are deleted.
- **The recipe in the Build Command field, and not in a `bin/render-build.sh`.** Render's documentation for Rails uses a `bin/render-build.sh` file, but there's no generator for it: it would mean creating the file by hand and running `chmod +x`, with the risk of a `Permission denied` on deploy. With the field, there are fewer steps. The downside is that the recipe lives on the Render dashboard, and not in the repository.
- **`bin/rails server` in the Start Command.** Render suggests `bundle exec puma -t 5:5 -p ${PORT:-3000} -e ${RACK_ENV:-development}`. It works too: `-e development` only applies when the `RACK_ENV` variable doesn't exist, and Rails gives preference to `RAILS_ENV`, which Render already sets to `production`. The guide swaps it for `bin/rails server` because it's the command the participant already knows, and because it uses the app's `config/puma.rb` and the port from the `PORT` variable, which Render sets.
- **`RAILS_MASTER_KEY`, as Render suggests.** It's the Rails default for production (the app's `Dockerfile` and Kamal use it too). There's another path, a `SECRET_KEY_BASE` generated by Render's **Generate**, but the guide follows Render's suggestion to change as little as possible. **Don't use Generate on `RAILS_MASTER_KEY`:** a random key doesn't open `config/credentials.yml.enc`, and the app fails to start.
- **`db:prepare`, and not `db:migrate`, in the recipe.** `db:prepare` creates the tables of those databases from the `*_schema.rb` files, and `db:migrate` doesn't.
- **The `pg` gem in every environment.** Since version 1.6, the `pg` gem has precompiled versions for Linux, so `bundle add pg` works in Codespaces without installing anything on the system.
- **Ruby 4.0 on Render.** Render reads the app's `.ruby-version` and installs the version on its own. In the test, the log showed `Using Ruby version 4.0.6 via /opt/render/project/src/.ruby-version`, followed by `Installing Ruby version 4.0.6...`.

## Security

{: .atencao }
Context for mentors only. **You don't need to bring this to the participants**: the chapter doesn't have a part about security, only the practical precautions (the password and the secrets, which live on Render). This table is a script for the conversation, if it comes up.

The online app is public: anyone with the address can open it. It's worth talking about this, without scaring anyone. What the guide already covers and what's left out:

| Topic | Situation | What to do |
|---|---|---|
| **Secrets** (`config/master.key` and `DATABASE_URL`) | The guide says to paste them only into Render. `master.key` is already left out of Git by the Rails `.gitignore`. | Check that the participant didn't paste the key anywhere else (chat, AI, screenshot, commit). If it leaks, delete and recreate the database and generate a new key (`bin/rails credentials:edit` with another key). |
| **Bots and curious people** | Step 4 protects the whole app with a password (`http_basic_authenticate_with`, username `board`, password in Render's `ACCESS_PASSWORD` variable). Without the variable, like in the codespace, the protection is off. | Remind them that the password is shared: it can't be a personal password. `/up` (Render's health check) stays open, because it doesn't go through `ApplicationController`. |
| **Whoever has the password can post, fix and delete** | A decision from chapter 00's plan: accepted for a workshop message board. | Suggest sharing the address and the password only with the workshop people. User accounts are in "How to take the project further", in the extra challenges. |
| **Offensive content or spam** | The password keeps the bots out, but there's no moderation or posting limit for whoever has the password. | If it happens, the participant deletes it herself with the **Delete** button. Going further: Rails 8 has `rate_limit` in the controller, for example `rate_limit to: 10, within: 1.minute, only: :create`. |
| **Personal data** | The messages are public. | Advise them not to post anyone's email, phone number, address or full last name in the messages. |
| **Malicious code in the messages** (like `<script>`) | Protected: ERB's `<%= %>` escapes the HTML, and the text shows up as text. | Nothing. If someone tests it, it's a good demonstration of why Rails escapes content by default. |
| **Form protection (CSRF)** | Chapter 04's `forgery_protection_origin_check = false` is only in `development.rb`. In production, the protection is complete. | Nothing. |
| **HTTPS** | Render serves the app with HTTPS. | Nothing. |
| **Render's access to GitHub** | Render asks for permission to read repositories. | Suggest giving access only to the message board's repository (**Only select repositories**). |
| **Data deleted after 30 days** | The free database expires. | Let the participant know, so they aren't surprised when the messages disappear. |

## If time is short

The chapter is **optional**, and its page already says it can be done at home. If there's little time left on the day, the **minimum** is seeing the message board online, which is **steps 1 to 8**. Step 9 (changing the title and seeing the automatic deploy) and "What happened?" are left for home.

If not even that fits, there's a safe stopping point: **after step 5**. At that point, the account and the database already exist on Render, and the app is prepared and sent to GitHub (`pg`, the password and the commit). At home, the participant starts again at step 6, and nothing is left half-done.

Two ideas that help:

- **The Render account** (step 1) can be created earlier, for example during a break, to save time.
- **A demonstration** also works: if few people reach the chapter, one of them does the steps on the big screen, and the others follow along and repeat it at home.

## Next notes

[09. All done! What's next?]({{ site.baseurl }}{% link mentors/projects/message-board/09-whats-next.md %})
