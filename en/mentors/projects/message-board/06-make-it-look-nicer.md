---
title: "06. How do we make the message board look nicer?"
parent: Message Board notes
grand_parent: Project notes
nav_order: 7
translation_of: mentoras/projetos/mural-de-recados/06-como-deixar-o-mural-mais-bonito.md
translated_from: ace1166
---

# 06. How do we make the message board look nicer?

[See chapter]({{ site.baseurl }}{% link projects/message-board/06-make-it-look-nicer/index.md %}) <!-- TODO: once the tags exist, bring back " · Reference code: tag `passo-06`", with a link to the tag in the RailsGirls-SP/mural-de-recados repository. -->

## Questions for "Think before you code"

- "What does a real sticky note look like? What makes it look like paper stuck on a wall?" Leads to the background color and the shadow.
- "On a phone, do the cards fit side by side?" Leads to the grid that adjusts to the screen's width.
- "What changes in the data for the messages to look nice?" Nothing: that's the chapter's point, only how things look changes.

## Common confusions

- **The Bulma line in the wrong place.** The `<link>` needs to be inside the layout's `<head>`, before the `stylesheet_link_tag` line. That way, `application.css`, which comes in with the colors extra challenge, is read after Bulma and can change the cards' colors.
- **Forgetting `data-theme="light"`.** Whoever uses their computer in dark mode sees a dark message board, different from the guide's screenshots.
- **The comma before `class:`.** In `form.text_field :author, class: "input"`, without the comma a syntax error shows up.
- **Leftovers from the old code.** Steps 3, 4 and 5 replace big pieces of the views. It's common to end up with one extra `<% end %>` or one missing. Ask them to compare the whole file with the guide.
- **A missing `</div>`.** It doesn't cause an error, but it messes up the page. The editor helps: when you click a `<div>`, it highlights the matching `</div>`.
- **No internet, no Bulma.** The `<link>` address is from a **CDN** (*Content Delivery Network*): a service, here jsDelivr, that keeps public files like Bulma on servers around the world and delivers from the one closest to whoever asks. That's why nothing needs to be installed, but the browser needs internet to fetch the file. If the event's network goes down, the page goes back to being just text, but the app keeps working. The guide doesn't use the word "CDN" with participants: for them, the `<link>` line just "fetches Bulma's styles from the internet".
- **Inspect.** It's worth showing the browser's **Inspect**: you can see each card's classes and try other classes live, without fear of breaking the file.

## Why Bulma, and not Tailwind

{: .atencao }
For mentors only. **You don't need to explain this to participants**: for them, the guide only says Bulma is a set of ready-made styles.

The chapter's goal is to make the message board look nice at the end of the day, with the least amount of new information. Bulma won because of that:

| | Bulma | Tailwind |
|---|---|---|
| **Installation** | One line in the layout, through the CDN. Nothing to install. | In Rails, it uses the `tailwindcss-rails` gem, a build step and `bin/dev` instead of `bin/rails server`. One more piece that can go wrong in Codespaces. |
| **Class names** | Component names, which read almost like words: `card`, `button`, `box`, `title`. | Utility classes, one for each detail: `p-4 bg-yellow-100 rounded shadow`. Each element gets a long list. |
| **For beginners** | The HTML stays easy to read, and the participant understands what each class does from its name. | It requires knowing CSS to understand what each class does, and the view gets full of classes. |
| **JavaScript** | None: just CSS. | None either, but the build runs alongside. |

Tailwind is widely used in the industry, and Rails itself offers the `--css tailwind` option in `rails new`. For anyone who wants to keep going after the workshop, it's a good next step, together with learning to write CSS from scratch.

**Bootstrap** was also left out: it's similar to Bulma in its component names, but some components depend on JavaScript, and the default look is more recognizable as "the Bootstrap look".

## If time is short

The chapter is a "nice to have": the message board already works without it, and the day's goal is chapter 05. If there's little time left, the **minimum** that already makes the message board look nice is:

| Do | Steps | What the participant gets |
|---|---|---|
| Start the server and bring in Bulma | 1 and 2 | Bulma's basic look on every page |
| Turn the messages into cards | 4 | The board becomes a grid of cards. Step 4 shows the **whole** `index.html.erb`, so step 3 can be skipped |
| Save the progress | 6 | A commit with the result |

Left for later, or for home: **step 3** (the heading and the link, which step 4's file already has) and **step 5** (the New message and Edit pages, which keep working, just without the styling). Let them know that each step's "Done? Open step…" will lead to the next one, and that the plan is to skip it.

## Going further with Bulma

If there's time left, suggestions to play with on their own, with the [Bulma documentation](https://bulma.io/documentation/) open:

- Change the color of the **Post message** button (`is-link`, `is-info`, `is-success`, `is-warning`).
- Add a header with the `hero` component, with a title and a subtitle.
- Show the number of messages with a `tag`, for example "4 messages" (`@messages.count`).
- Tilt the cards a little, like sticky notes, with their own CSS in `application.css`: `.card { rotate: -1deg; }`.

## Next notes

[07. What if someone sends an empty message?]({{ site.baseurl }}{% link mentors/projects/message-board/07-empty-messages.md %})
