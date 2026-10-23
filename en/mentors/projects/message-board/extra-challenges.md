---
title: "Extra challenges notes"
parent: Message Board notes
grand_parent: Project notes
nav_order: 11
translation_of: mentoras/projetos/mural-de-recados/desafios-extras.md
translated_from: 98afcfc
---

# Extra challenges notes

[See chapter]({{ site.baseurl }}{% link projects/message-board/extra-challenges/index.md %})

The challenges are for whoever finishes early. You don't need to make sure everyone gets to them.

## How to run them

- **Let the person choose.** The page's order goes from easiest to hardest, but the participant can start with whichever seems most fun. The exception is "Filter messages by color", which depends on "Message colors".
- **The hints are a ladder.** Before opening the next hint, ask what has already been tried. Often, they're almost there.
- **Commit before starting each challenge.** If it goes wrong, they can go back to the message board that worked.

## Message dates

- **Questions for "Think before you code":** "Do we need a new column?" (no: `created_at` already exists) and "What time is it on the app's clock?" (prepares the time zone).
- **Common confusions:** the time being a few hours off (it's UTC; hint 3 solves it) and forgetting to restart the server after changing `config/application.rb`.
- **Going further:** `time_ago_in_words` ("5 minutes ago") is a nice next step for showing friendlier dates.

## Post straight from the message board

The guide put the form on a page of its own (the `new` action), following the Rails standard CRUD. This challenge brings the form back to the home page, like a real board. It's a good way to show that both ways work, and that the choice belongs to whoever plans the app.

- **Questions for "Think before you code":** "Who prepares the blank message on the home page?" (the `index` action, with `@message = Message.new`) and "Where do the warnings show up when the message is rejected?" (prepares hint 3).
- **Common confusions:** swapping `@message` for `@messages`; and, when replacing `render :new` with `render :index`, forgetting to look up `@messages` again, which gives `undefined method 'empty?' for nil`.
- **The partial helps a lot here:** with chapter 07's bonus done, the form goes in with one line. Without it, the same form now exists in three places, and it's worth suggesting the partial.
- **Going further:** removing the New message page is a good exercise in checking what still uses what before deleting (the link, the action, the route and the view).

## Message colors

It's a good first challenge: it repeats the migration from chapter 02 and the form from chapter 04, with one new thing at a time.

### The color that disappears, on purpose

In hint 3, the participant chooses **Pink** and the message is stored as yellow. This is **on purpose**: `message_params` doesn't have `:color` yet.

{: .atencao }
Don't fix `message_params` too early. Let the participant investigate: first the console (`Message.last.color`), then the `Parameters` line in the server's terminal, and only then the controller. It's the first time a bug shows up **with no error message**, and the path of the investigation is what matters most.

If the person can't find the `Parameters` line, help them find the server's terminal in the list of terminals, on the right of the panel.


### Common confusions

- **Running the migration before reviewing it.** If the migration ran without the `default`, the old messages end up with an empty color (and `null: false` wasn't applied). Undo it with `bin/rails db:rollback`, fix it and run it again.
- **Forgetting the color field in `edit.html.erb`.** The form is in `new.html.erb` and was copied to `edit.html.erb` in chapter 05, so there are two places.
- **The class with the wrong spacing.** `card card-<%= message.color %>`: one space between the two classes and none between `card-` and `<%=`.
- **Forgetting to remove `has-background-warning-light`.** It's the Bulma class that makes every card yellow, and it wins over the participant's colors (Bulma's color classes use `!important`). If everything stays yellow, that's it.
- **White cards in the middle of hint 4.** It's on purpose: `card-pink` doesn't exist in the CSS yet.
- **The browser keeps the old CSS.** Reloading with Cmd+Shift+R (Mac) or Ctrl+Shift+R solves it.


### About the color values

The color is stored as `yellow`, `pink`, `blue` and `green`, and shown with a capital letter in the choice box. There's no validation yet: a modified form could send another color. That's for chapter 07, if there's time (`validates :color, inclusion: { in: [...] }`).


## Filter messages by color

This challenge has no hints on purpose: it's for the participant to plan and solve on their own. Help with questions, not with code. One possible solution, for reference only:

```ruby
# app/controllers/messages_controller.rb, in the index action
@messages = Message.order(created_at: :desc)
@messages = @messages.where(color: params[:color]) if params[:color].present?
```

```erb
<%# app/views/messages/index.html.erb, above the cards %>
<div class="buttons">
  <%= link_to "All", root_path, class: "button is-small" %>
  <%= link_to "Yellow", root_path(color: "yellow"), class: "button is-small" %>
  <%= link_to "Pink", root_path(color: "pink"), class: "button is-small" %>
  <%= link_to "Blue", root_path(color: "blue"), class: "button is-small" %>
  <%= link_to "Green", root_path(color: "green"), class: "button is-small" %>
</div>
```

- **Questions to help:** "How does the controller know the chosen color?" (`params`, like `params[:id]` in chapter 05), "Where are the messages looked up?" (in the `index` action) and "What about when no color comes?" (it shows all of them).
- **Common confusions:** creating a new route without needing it and forgetting the no-color case (`where(color: nil)` doesn't show any message).

## Likes

- **Questions for "Think before you code":** "Is the number of likes text or a number?" and "How many likes does a new message have?" (leads to `default: 0`).
- **Common confusions:** forgetting `default: 0` in the migration, and then the old messages show ❤️ with no number; and the `member` route, which is new. It's worth showing `bin/rails routes` to show the `like_message` route.

## How to take the project further

{: .atencao }
For mentors only. Use this list to talk with whoever finished everything and wants to keep going, on the day or after the workshop. **You don't need to present it to all participants.**

Each idea below is a bigger step than the extra challenges, and almost all of them bring a new Rails concept. It's worth following the guide's approach: start with the problem, plan on paper and build in small stages.

| Idea | The problem | What you learn |
|---|---|---|
| **Replies to messages** | "I want to reply to Bia's message." | A second model (`Reply`) connected to `Message`: the first relationship between tables (`belongs_to` and `has_many`) and nested routes. It's the natural path for version 2 of the project. |
| **Several boards** | "I want a message board for each class, or for each event." | A `Board` model with many messages. Relationships between tables and addresses like `/boards/3/messages`. |
| **User accounts** | "Only whoever wrote a message can fix or delete it." | Login with email and password. Since Rails 8, there's the `bin/rails generate authentication` generator. It brings sessions, securely stored passwords and the idea of "who owns" each message, which chapter 00's plan decided to leave for later. |
| **Moderation** | "Someone needs to approve the messages before they show up." | A new column (`approved`), a filter on the list (`where`) and, together with accounts, the idea of roles (who can approve). |
| **Photos on the messages** | "I want to stick a photo on my sticky note." | File uploads with Active Storage. |
| **Live message board** | "I want to see the new message show up without reloading the page." | Real-time updates with Turbo Streams. |
| **Automated tests** | "How do I know nothing broke after changing something?" | The `test` folder, which the guide set aside. A good start is tests for the validations from chapter 07. |

Some tips:

- **One idea at a time.** Before starting, ask them to write the plan: which screens change, what information is new, what rules come in. It's the same "Think before you code" from the chapters.
- **Replies or several boards first.** Both teach relationships between tables, which are the basis of almost every real app, and don't depend on anything beyond what the project already has.
- **User accounts are the biggest step.** They involve security and sessions and change several parts of the app at once. It's worth doing it calmly, preferably after one of the ideas above.
- **Commit before each idea.** If the change goes wrong, they can go back to the message board that worked.
- **AI as a tutor.** For bigger ideas, it's tempting to ask an AI for everything. Encourage the same use as in the guide: asking in small stages, with the plan, and checking each piece. See [Using AI as a tutor]({{ site.baseurl }}{% link getting-started/ai-as-a-tutor.md %}).
