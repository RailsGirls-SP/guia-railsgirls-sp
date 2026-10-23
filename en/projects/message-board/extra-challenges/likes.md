---
title: "Likes ❤️"
parent: Extra challenges
grand_parent: Message Board
nav_order: 5
translation_of: projetos/mural-de-recados/desafios-extras/curtidas.md
translated_from: 98afcfc
---

# Likes ❤️

## The challenge

Each message gets a **Like** button. Every time someone clicks it, that message's number of likes goes up by 1, and the number shows up on the card: ❤️ 3.

You don't need to know **who** liked it, only **how many** likes each message has.

## Think before you code

- Where is the number of likes stored? What kind of information is it: text or a number?
- How many likes does a message that was just posted have?
- What happens, step by step, when someone clicks **Like**?

## You'll practice

- Adding a column to a table that already exists, with a new [migration]({{ site.baseurl }}{% link glossary.md %}#migration).
- Doing math with whole numbers.
- Creating a button that changes a piece of data in the database.

In the code, the likes column is called `likes`, and the action to like a message, `like`.

Try to solve it on your own before opening the hints. Open one at a time, only if you need to.

<details markdown="1">
<summary>Hint 1: the new column</summary>

Generate a migration that adds a whole-number (`integer`) column to the `messages` table:

```
bin/rails generate migration AddLikesToMessages likes:integer
```

Before running it, open the migration and make the column start at zero, by changing the `add_column` line to:

```ruby
add_column :messages, :likes, :integer, default: 0, null: false
```

Then run `bin/rails db:migrate`, like in the chapter [How do we store the messages?]({{ site.baseurl }}{% link projects/message-board/02-store-the-messages/hands-on.md %}).

</details>

<details markdown="1">
<summary>Hint 2: adding 1</summary>

In the console, test it before changing the screens:

```ruby
message = Message.first
message.likes
```

The console shows how many likes the message has. Now add 1:

```ruby
message.increment!(:likes)
```

`increment!` adds 1 and stores it in the database right away. Look at the number again:

```ruby
message.likes
```

Run `increment!` once more and watch the number change.

</details>

<details markdown="1">
<summary>Hint 3: the route and the controller</summary>

The click on the button needs a new [route]({{ site.baseurl }}{% link glossary.md %}#route) for the message. In `config/routes.rb`, add a `do ... end` to the `resources :messages` line:

```ruby
resources :messages, only: [ :index, :new, :create, :edit, :update, :destroy ] do
  member do
    post :like
  end
end
```

And a new action in `MessagesController`:

```ruby
def like
  message = Message.find(params[:id])
  message.increment!(:likes)
  redirect_to root_path
end
```

</details>

<details markdown="1">
<summary>Hint 4: the button</summary>

On each message's card, in the view, together with the **Edit** and **Delete** buttons, use `button_to`:

```erb
<%= button_to "❤️ #{message.likes}", like_message_path(message), class: "button is-small" %>
```

The button shows the number of likes and, when clicked, calls the `like` action.

</details>

## Going further

- Make the button show just ❤️ while the message has no likes, and ❤️ 1, ❤️ 2… after that.
- Show at the top of the message board the total number of likes of all the messages added up. Hint: `Message.sum(:likes)`.
- Sort the messages from most liked to least liked.
